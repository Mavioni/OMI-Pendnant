// composer.jsx — Today / write-entry view with AI sidebar.
const { useState: useStateC, useEffect: useEffectC, useRef: useRefC, useMemo: useMemoC } = React;

// AI helper — uses window.claude.complete with graceful fallback.
async function askClaude(prompt, fallback) {
  try {
    if (window.claude && window.claude.complete) {
      const out = await window.claude.complete(prompt);
      return (out || '').trim();
    }
  } catch (e) {}
  return fallback;
}

// ----- Mood picker -----
function MoodPicker({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <span className="label" style={{ fontSize: 10 }}>STATE</span>
      {MOODS.map(m => (
        <button key={m.id} onClick={() => onChange(m.id)} title={m.label}
          className={'mood-pick' + (value === m.id ? ' active' : '')}
          style={{ background: 'transparent' }}>
          <span style={{ width: 16, height: 16, borderRadius: '50%', background: m.color, boxShadow: value === m.id ? `0 0 12px ${m.color}` : 'none' }} />
        </button>
      ))}
      {value && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', marginLeft: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{MOOD_BY_ID[value].label}</span>}
    </div>
  );
}

// ----- Annotation card (sidebar) -----
function AnnotationCard({ kind, title, body, fly = true, onClick }) {
  const tones = {
    pattern:    { label: 'PATTERN',    color: 'var(--accent)' },
    echo:       { label: 'ECHO',       color: '#FBBF24' },
    question:   { label: 'QUESTION',   color: 'var(--fg-2)' },
    summary:    { label: 'SUMMARY',    color: 'var(--accent)' },
    suggestion: { label: 'SUGGESTION', color: '#10B981' },
    theme:      { label: 'THEME',      color: '#6366F1' },
  };
  const tone = tones[kind] || tones.summary;
  return (
    <div className={fly ? 'fly' : ''} onClick={onClick}
      style={{
        padding: 14,
        background: 'var(--bg-2)',
        border: '1px solid var(--bd-1)',
        borderLeft: `2px solid ${tone.color}`,
        borderRadius: 10,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 200ms',
      }}
      onMouseEnter={onClick ? (e) => e.currentTarget.style.background = 'var(--bg-3)' : undefined}
      onMouseLeave={onClick ? (e) => e.currentTarget.style.background = 'var(--bg-2)' : undefined}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: tone.color }} />
        <span className="label" style={{ fontSize: 9, color: tone.color, letterSpacing: '0.1em' }}>{tone.label}</span>
      </div>
      {title && <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--fg-emphasis)', marginBottom: 4 }}>{title}</div>}
      <div style={{ fontSize: 12.5, color: 'var(--fg-1)', lineHeight: 1.55 }}>{body}</div>
    </div>
  );
}

// ----- AI Sidebar (the signature element) -----
function AISidebar({ entry, mood, verbose, onPickPrompt }) {
  const [annotations, setAnnotations] = useStateC([
    { kind: 'question', body: 'What pulled your attention today, even if it didn\'t make the page?' },
  ]);
  const [thinking, setThinking] = useStateC(false);
  const lastRunRef = useRefC('');

  // Live annotation: every ~14s when writing has paused, ask Claude for a brief observation.
  useEffectC(() => {
    if (!entry || entry.length < 80) return;
    const id = setTimeout(async () => {
      if (entry === lastRunRef.current) return;
      lastRunRef.current = entry;
      setThinking(true);
      const moodLabel = mood ? MOOD_BY_ID[mood].label : 'unspecified';
      const tone = verbose === 'terse'
        ? 'Reply in one short sentence (max 14 words). Plain, direct, no preamble.'
        : verbose === 'chatty'
        ? 'Reply in 2 short sentences. Warm but not sappy. No preamble.'
        : 'Reply in one calm sentence (max 20 words). No preamble.';
      const prompt = `You are a quiet, perceptive diary companion. The user is writing today's entry. Their stated mood is "${moodLabel}".\n\nEntry so far:\n"""${entry.slice(-700)}"""\n\nRespond with ONE specific observation, gentle question, or echo of a phrase. ${tone} Do not summarize. Do not say "It sounds like".`;
      const fallback = "Notice the texture of that sentence — you used the word \"again.\"";
      const reply = await askClaude(prompt, fallback);
      setThinking(false);
      setAnnotations(prev => [
        { kind: ['echo','question','pattern'][prev.length % 3], body: reply },
        ...prev,
      ].slice(0, 6));
    }, 4500);
    return () => clearTimeout(id);
  }, [entry, mood, verbose]);

  return (
    <aside style={{
      width: 320, flexShrink: 0,
      borderLeft: '1px solid var(--bd-1)',
      background: 'var(--bg-1)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--bd-1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ position: 'relative', width: 8, height: 8 }}>
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
          </div>
          <span className="wordmark" style={{ fontSize: 11, color: 'var(--fg-emphasis)' }}>OBSERVER <span className="weak">·v3</span></span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.08em' }}>
          {thinking ? <><span className="thinking-dot"/><span className="thinking-dot"/><span className="thinking-dot"/></> : 'LISTENING'}
        </span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 80px', display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* Prompt suggestions */}
        <div style={{ marginBottom: 4 }}>
          <div className="label" style={{ fontSize: 10, marginBottom: 8, padding: '0 2px' }}>TRY A PROMPT</div>
          {PROMPTS_LIBRARY.slice(0, 3).map((p, i) => (
            <button key={i} onClick={() => onPickPrompt(p)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '10px 12px',
                background: 'transparent',
                border: '1px solid var(--bd-1)',
                borderRadius: 8,
                fontSize: 12.5, color: 'var(--fg-1)',
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                cursor: 'pointer',
                marginBottom: 6,
                transition: 'all 150ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-soft)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--bd-1)'; e.currentTarget.style.background = 'transparent'; }}>
              "{p}"
            </button>
          ))}
        </div>

        <div style={{ height: 1, background: 'var(--bd-1)', margin: '8px 0' }} />

        <div className="label" style={{ fontSize: 10, padding: '0 2px' }}>OBSERVATIONS</div>
        {annotations.map((a, i) => <AnnotationCard key={`${i}-${a.body.slice(0,8)}`} kind={a.kind} body={a.body} />)}
        {annotations.length === 0 && (
          <div style={{ fontSize: 12, color: 'var(--fg-3)', padding: '20px 4px', fontStyle: 'italic' }}>
            Start writing. I'll read along.
          </div>
        )}
      </div>
    </aside>
  );
}

// ----- Voice-first composer -----
function VoiceComposer({ onTranscript, onSwitch }) {
  const [recording, setRecording] = useStateC(false);
  const [elapsed, setElapsed] = useStateC(0);
  useEffectC(() => {
    if (!recording) return;
    const id = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(id);
  }, [recording]);

  const fmt = (s) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  const stop = async () => {
    setRecording(false);
    const transcript = await askClaude(
      'Pretend the user just dictated a 90-second diary entry. Generate a plausible, specific, lightly-edited transcript (130-160 words) about their day. Plain prose, no quotes or framing.',
      `So today felt like one of those days where the morning ran ahead of me before I even had coffee. I had three calls back to back and somewhere in the middle I lost track of what I was actually trying to do. It wasn't bad, just rushed. I keep thinking about what Marco said about pacing yourself — he's right, but I never know how to do it without feeling lazy. Walked home the long way and that helped.`
    );
    onTranscript(transcript);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, position: 'relative' }}>
      <div className="l-bracket l-tl" />
      <div className="l-bracket l-tr" />
      <div className="l-bracket l-bl" />
      <div className="l-bracket l-br" />

      <div style={{
        width: 200, height: 200, borderRadius: '50%',
        border: '1px solid var(--bd-1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        marginBottom: 32,
        background: recording ? 'var(--accent-soft)' : 'transparent',
        boxShadow: recording ? 'var(--accent-glow-pulse)' : 'none',
        transition: 'all 300ms',
      }}>
        {recording && (
          <div style={{ position: 'absolute', inset: -12, borderRadius: '50%', border: '1px solid var(--accent)', opacity: 0.4, animation: 'lelu-pulse 3s infinite' }} />
        )}
        <button onClick={() => recording ? stop() : setRecording(true)}
          style={{
            width: 88, height: 88, borderRadius: '50%',
            background: recording ? 'var(--accent)' : '#0a0a0a',
            color: '#fff', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
          {recording ? <DI.Pause size={28} /> : <DI.Mic size={28} />}
        </button>
      </div>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 500, color: recording ? 'var(--accent)' : 'var(--fg-emphasis)', letterSpacing: '0.05em' }}>
        {fmt(elapsed)}
      </div>

      {recording ? (
        <div style={{ display: 'flex', gap: 3, alignItems: 'center', marginTop: 16, height: 32 }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="wave-bar" style={{ height: 28, animationDelay: `${i * 0.05}s` }} />
          ))}
        </div>
      ) : (
        <div style={{ marginTop: 16, fontSize: 13, color: 'var(--fg-2)', fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>
          {elapsed > 0 ? 'Tap to transcribe.' : 'Tap to start. Speak as long as you need.'}
        </div>
      )}

      <button onClick={onSwitch} style={{ marginTop: 40, background: 'transparent', border: 'none', color: 'var(--fg-3)', fontSize: 12, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}>
        ← Switch to text
      </button>
    </div>
  );
}

// ----- Chat composer (back-and-forth that becomes the entry) -----
function ChatComposer({ messages, setMessages, verbose }) {
  const [input, setInput] = useStateC('');
  const [thinking, setThinking] = useStateC(false);
  const scrollRef = useRefC(null);

  useEffectC(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, thinking]);

  const send = async () => {
    if (!input.trim()) return;
    const next = [...messages, { who: 'user', text: input }];
    setMessages(next);
    const userTurn = input;
    setInput('');
    setThinking(true);
    const tone = verbose === 'terse' ? 'one short sentence' : verbose === 'chatty' ? '2-3 sentences, warm but unsentimental' : '1-2 sentences, calm and curious';
    const reply = await askClaude(
      `You are a thoughtful diary companion. The user is journaling out loud. Your job is to ask one good follow-up question that helps them go deeper, OR briefly reflect a specific phrase back. ${tone}. No preamble, no "It sounds like", no advice unless asked.\n\nConversation so far:\n${next.map(m => `${m.who === 'user' ? 'User' : 'You'}: ${m.text}`).join('\n')}`,
      "What was the moment in that, that you keep returning to?"
    );
    setThinking(false);
    setMessages([...next, { who: 'ai', text: reply }]);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '24px 8px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {messages.map((m, i) => (
          <div key={i} className="fly" style={{
            alignSelf: m.who === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '75%',
            padding: '12px 16px',
            background: m.who === 'user' ? 'var(--bg-2)' : 'transparent',
            border: m.who === 'user' ? '1px solid var(--bd-1)' : 'none',
            borderRadius: 14,
            fontFamily: m.who === 'ai' ? 'var(--font-display)' : 'var(--font-sans)',
            fontSize: m.who === 'ai' ? 17 : 14.5,
            fontStyle: m.who === 'ai' ? 'italic' : 'normal',
            color: m.who === 'ai' ? 'var(--fg-2)' : 'var(--fg-1)',
            lineHeight: 1.6,
          }}>
            {m.who === 'ai' && <DI.Quote size={14} style={{ marginRight: 6, opacity: 0.5, verticalAlign: '-2px' }} />}
            {m.text}
          </div>
        ))}
        {thinking && (
          <div style={{ alignSelf: 'flex-start', padding: '10px 16px' }}>
            <span className="thinking-dot"/><span className="thinking-dot"/><span className="thinking-dot"/>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '14px 4px 4px', borderTop: '1px solid var(--bd-1)' }}>
        <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Speak a thought…"
          style={{
            flex: 1, padding: '12px 16px',
            background: 'var(--bg-2)', border: '1px solid var(--bd-1)',
            borderRadius: 10, fontSize: 14, color: 'var(--fg-1)', outline: 'none',
          }} />
        <button onClick={send} disabled={!input.trim()}
          style={{
            padding: '0 16px',
            background: input.trim() ? '#0a0a0a' : 'var(--bg-2)',
            color: input.trim() ? '#fff' : 'var(--fg-3)',
            border: input.trim() ? '1px solid rgba(59,130,246,0.45)' : '1px solid var(--bd-1)',
            borderRadius: 10, cursor: input.trim() ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', gap: 6, fontSize: 13,
            boxShadow: input.trim() ? 'var(--accent-glow)' : 'none',
          }}>
          <DI.Send size={14} />
        </button>
      </div>
    </div>
  );
}

// ----- Today / main composer -----
function TodayView({ density, layout, sidebarOpen, verbose, dark }) {
  const [text, setText] = useStateC('');
  const [mood, setMood] = useStateC(null);
  const [tags, setTags] = useStateC([]);
  const [tagInput, setTagInput] = useStateC('');
  const [chatMessages, setChatMessages] = useStateC([
    { who: 'ai', text: "How did today actually feel — not how it went, but how it felt?" },
  ]);
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const addTag = (t) => {
    if (!t || tags.includes(t)) return;
    setTags([...tags, t]);
    setTagInput('');
  };

  const onPickPrompt = (p) => {
    setText(text ? `${text}\n\n${p}\n\n` : `${p}\n\n`);
  };

  const compactMain = layout === 'compact';

  return (
    <div style={{ flex: 1, display: 'flex', minHeight: 0, overflow: 'hidden' }}>
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: density === 'cozy' ? '32px 56px' : '56px 80px',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ maxWidth: compactMain ? 640 : 760, width: '100%', margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column' }}>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span className="label" style={{ fontSize: 10, color: 'var(--accent)' }}>● TODAY · DRAFT</span>
            <span className="label" style={{ fontSize: 10 }}>{dateStr.toUpperCase()}</span>
            <div style={{ flex: 1 }} />
            <span className="label" style={{ fontSize: 10 }}>{wordCount} WORDS</span>
          </div>

          {/* Mood */}
          <div style={{ marginBottom: 24 }}>
            <MoodPicker value={mood} onChange={setMood} />
          </div>

          {/* Layout switcher */}
          {layout === 'voice' ? (
            <VoiceComposer onTranscript={(t) => setText(t)} onSwitch={() => {}} />
          ) : layout === 'chat' ? (
            <ChatComposer messages={chatMessages} setMessages={setChatMessages} verbose={verbose} />
          ) : (
            <>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="It's a Friday afternoon and…"
                className={text ? '' : 'cursor-blink'}
                style={{
                  flex: 1, minHeight: 320,
                  fontFamily: layout === 'classic' ? 'var(--font-display)' : 'var(--font-sans)',
                  fontSize: layout === 'classic' ? 22 : 16,
                  lineHeight: layout === 'classic' ? 1.55 : 1.7,
                  color: 'var(--fg-1)',
                  letterSpacing: layout === 'classic' ? '-0.005em' : 0,
                }}
              />

              {/* Tags */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--bd-1)' }}>
                <DI.Tag size={14} style={{ color: 'var(--fg-3)' }} />
                {tags.map(t => (
                  <span key={t} style={{ padding: '3px 9px', background: 'var(--bg-2)', border: '1px solid var(--bd-1)', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {t}
                    <button onClick={() => setTags(tags.filter(x => x !== t))} style={{ background: 'transparent', border: 'none', color: 'var(--fg-3)', cursor: 'pointer', padding: 0, lineHeight: 1, fontSize: 12 }}>×</button>
                  </span>
                ))}
                <input value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') addTag(tagInput.trim().toLowerCase()); }}
                  placeholder="add tag…"
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--fg-1)', padding: 4 }} />
              </div>

              {/* Footer actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 20 }}>
                <button style={{
                  padding: '9px 18px', background: '#0a0a0a', color: '#fff',
                  border: '1px solid rgba(59,130,246,0.45)', borderRadius: 10,
                  fontSize: 13, fontWeight: 500, cursor: 'pointer',
                  boxShadow: 'var(--accent-glow)',
                }}>Save entry</button>
                <button style={{ padding: '8px 14px', background: 'var(--bg-2)', color: 'var(--fg-1)', border: '1px solid var(--bd-1)', borderRadius: 10, fontSize: 13, cursor: 'pointer' }}>Save & summarize</button>
                <div style={{ flex: 1 }} />
                <span className="label" style={{ fontSize: 10 }}>⌘+S TO SAVE</span>
              </div>
            </>
          )}
        </div>
      </div>

      {sidebarOpen && (
        <AISidebar entry={text} mood={mood} verbose={verbose} onPickPrompt={onPickPrompt} />
      )}
    </div>
  );
}

window.TodayView = TodayView;
window.AnnotationCard = AnnotationCard;
window.askClaude = askClaude;
