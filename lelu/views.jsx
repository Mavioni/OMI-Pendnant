// insights.jsx — AI Insights dashboard, Recap, Entry detail, Settings, Onboarding.

// ===== INSIGHTS =====
function InsightsView({ entries }) {
  const [insight, setInsight] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // Compute mood stats
  const moodCounts = React.useMemo(() => {
    const c = {};
    for (const e of entries) c[e.mood] = (c[e.mood] || 0) + 1;
    return c;
  }, [entries]);

  const avgMood = React.useMemo(() => {
    const sum = entries.reduce((a, e) => a + (MOOD_BY_ID[e.mood]?.value || 3), 0);
    return (sum / entries.length).toFixed(2);
  }, [entries]);

  const wordTotal = React.useMemo(() => entries.reduce((a, e) => a + e.body.split(/\s+/).length, 0), [entries]);

  const generateInsight = async () => {
    setLoading(true);
    const sample = entries.slice(0, 10).map(e => `[${e.date} · ${MOOD_BY_ID[e.mood]?.label || ''}] ${e.body}`).join('\n\n');
    const text = await askClaude(
      `These are the last 10 diary entries from the user. Find ONE specific, non-obvious pattern. Return 2-3 sentences, plain prose, no preamble. Be specific (quote a phrase, name a person, note a recurring shape). Don't be generic ("you seem stressed"). \n\n${sample}`,
      "You write more on Sundays than any other day, and those entries lean toward gratitude. The Tuesday entries are consistently your shortest — usually one paragraph, often clipped. Worth noticing."
    );
    setLoading(false);
    setInsight(text);
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '32px 48px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Stat row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { k: 'ENTRIES',   v: entries.length, sub: 'last 30 days' },
            { k: 'WORDS',     v: wordTotal.toLocaleString(), sub: `${Math.round(wordTotal/entries.length)} avg per entry` },
            { k: 'AVG MOOD',  v: avgMood, sub: 'on a 1–5 scale' },
            { k: 'STREAK',    v: '30', sub: 'days unbroken' },
          ].map(s => (
            <div key={s.k} style={{ padding: 20, background: 'var(--bg-2)', border: '1px solid var(--bd-1)', borderRadius: 12 }}>
              <div className="label" style={{ fontSize: 10, marginBottom: 10 }}>{s.k}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 500, color: 'var(--fg-emphasis)', lineHeight: 1, marginBottom: 6 }}>{s.v}</div>
              <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {/* Mood distribution */}
          <div style={{ padding: 24, background: 'var(--bg-2)', border: '1px solid var(--bd-1)', borderRadius: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, color: 'var(--fg-emphasis)' }}>Mood distribution</h3>
              <span className="label" style={{ fontSize: 10 }}>30D</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {MOODS.map(m => {
                const n = moodCounts[m.id] || 0;
                const pct = (n / entries.length) * 100;
                return (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ width: 70, fontSize: 12, color: 'var(--fg-1)' }}>{m.label}</span>
                    <div style={{ flex: 1, height: 8, background: 'var(--bg-3)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: m.color, borderRadius: 4, transition: 'width 600ms var(--ease-out)' }} />
                    </div>
                    <span style={{ width: 36, textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-2)' }}>{n}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Themes */}
          <div style={{ padding: 24, background: 'var(--bg-2)', border: '1px solid var(--bd-1)', borderRadius: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, color: 'var(--fg-emphasis)' }}>Recurring themes</h3>
              <span className="label" style={{ fontSize: 10 }}>AUTO-TAGGED</span>
            </div>
            {THEMES.map(t => (
              <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: '1px solid var(--bd-2)' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: t.color, boxShadow: `0 0 8px ${t.color}` }} />
                <span style={{ flex: 1, fontSize: 14, color: 'var(--fg-1)' }}>{t.label}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.06em' }}>{t.count} MENTIONS</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: t.trend === 'rising' ? 'var(--status-success)' : t.trend === 'falling' ? 'var(--status-warning)' : 'var(--fg-3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {t.trend === 'rising' ? '↗' : t.trend === 'falling' ? '↘' : '→'} {t.trend}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI insight panel */}
        <div style={{ padding: 28, background: 'var(--bg-2)', border: '1px solid var(--bd-1)', borderLeft: '2px solid var(--accent)', borderRadius: 12, marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <DI.Sparkles size={14} style={{ color: 'var(--accent)' }} />
            <span className="label" style={{ fontSize: 10, color: 'var(--accent)' }}>AI · PATTERN ANALYSIS</span>
          </div>
          {insight ? (
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--fg-emphasis)', lineHeight: 1.55, letterSpacing: '-0.005em' }}>
              "{insight}"
            </div>
          ) : (
            <div style={{ fontSize: 14, color: 'var(--fg-2)', marginBottom: 16, fontStyle: 'italic', fontFamily: 'var(--font-display)', fontSize: 18 }}>
              I've read your last 30 days. Want me to find a pattern you might have missed?
            </div>
          )}
          <button onClick={generateInsight} disabled={loading}
            style={{
              marginTop: 16,
              padding: '9px 18px', background: '#0a0a0a', color: '#fff',
              border: '1px solid rgba(59,130,246,0.45)', borderRadius: 10,
              fontSize: 13, cursor: loading ? 'wait' : 'pointer',
              boxShadow: 'var(--accent-glow)',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
            {loading ? <><span className="thinking-dot"/><span className="thinking-dot"/><span className="thinking-dot"/></> : <><DI.Sparkles size={14}/> {insight ? 'Find another' : 'Surface a pattern'}</>}
          </button>
        </div>

        {/* On this day */}
        <div style={{ padding: 24, background: 'var(--bg-2)', border: '1px solid var(--bd-1)', borderRadius: 12 }}>
          <div className="label" style={{ fontSize: 10, marginBottom: 12 }}>· A YEAR AGO TODAY</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--fg-emphasis)', marginBottom: 8 }}>The patio in the rain</div>
          <div style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.6, fontStyle: 'italic' }}>
            "Stood under the awning watching the gutters flood and felt that strange satisfaction of finishing a thing on time…"
          </div>
        </div>

      </div>
    </div>
  );
}

// ===== RECAP =====
function RecapView({ entries }) {
  const week = entries.slice(0, 7);
  const [recap, setRecap] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const generate = async () => {
    setLoading(true);
    const text = await askClaude(
      `Write a short weekly recap (3 short paragraphs) of this person's week, based on their diary entries. Use second-person ("you"). Be specific — name the people, places, recurring images. Plain prose, calm tone, no marketing language.\n\nEntries:\n${week.map(e => `[${e.date}] ${e.body}`).join('\n\n')}`,
      `You worked through a heavy week and shipped on Wednesday — the kind of finish you've been chasing for ten weeks. Marco's nervousness about Q3 sat with you longer than you expected. Anna's return from Lisbon gave you the easiest two and a half hours of the week.\n\nThe pattern: you write longer when you're alone in the house. Sunday's entry ran 240 words; Tuesday's, eaten between meetings, ran 28.\n\nYou've used the word "rhythm" four times in seven days. Worth holding onto.`
    );
    setLoading(false);
    setRecap(text);
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '40px 48px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>

        {/* Dossier header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, paddingBottom: 20, borderBottom: '1px solid var(--bd-strong)' }}>
          <div>
            <div className="label" style={{ fontSize: 10, marginBottom: 8 }}>WEEKLY DOSSIER · CONFIDENTIAL</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 400, color: 'var(--fg-emphasis)', letterSpacing: '-0.02em', lineHeight: 1 }}>
              Week of <br/>{new Date(week[week.length-1].date + 'T00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </h1>
          </div>
          <div className="dossier-stamp">FILE №{Math.floor(Math.random()*900+100)}</div>
        </div>

        {/* Pulse strip */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 40 }}>
          {week.slice().reverse().map(e => {
            const m = MOOD_BY_ID[e.mood];
            const dow = new Date(e.date + 'T00:00').toLocaleDateString('en-US', { weekday: 'short' });
            return (
              <div key={e.id} style={{ flex: 1, padding: 12, background: 'var(--bg-2)', border: '1px solid var(--bd-1)', borderTop: `2px solid ${m.color}`, borderRadius: 8 }}>
                <div className="label" style={{ fontSize: 9, marginBottom: 8 }}>{dow.toUpperCase()}</div>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: m.color, boxShadow: `0 0 6px ${m.color}`, marginBottom: 8 }} />
                <div style={{ fontSize: 11, color: 'var(--fg-2)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {e.body.slice(0, 80)}…
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Narrative */}
        <div style={{ marginBottom: 40 }}>
          <div className="label" style={{ fontSize: 10, marginBottom: 16, color: 'var(--accent)' }}>● THE WEEK, RETOLD</div>
          {recap ? (
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--fg-1)', lineHeight: 1.7, whiteSpace: 'pre-wrap', letterSpacing: '-0.005em' }}>
              {recap}
            </div>
          ) : (
            <div style={{ padding: 32, border: '1px dashed var(--bd-1)', borderRadius: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 14, color: 'var(--fg-2)', marginBottom: 16, fontStyle: 'italic', fontFamily: 'var(--font-display)', fontSize: 18 }}>
                Seven days, ready to be put back together.
              </div>
              <button onClick={generate} disabled={loading} className="pulse"
                style={{
                  padding: '11px 22px', background: '#0a0a0a', color: '#fff',
                  border: '1px solid rgba(59,130,246,0.45)', borderRadius: 10,
                  fontSize: 13, cursor: loading ? 'wait' : 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>
                {loading ? <><span className="thinking-dot"/><span className="thinking-dot"/><span className="thinking-dot"/></> : <><DI.Sparkles size={14}/> Compose recap</>}
              </button>
            </div>
          )}
        </div>

        {/* Pull quotes */}
        <div style={{ marginBottom: 40 }}>
          <div className="label" style={{ fontSize: 10, marginBottom: 16 }}>LINES TO REMEMBER</div>
          {[
            '"Nervous is fine, panicked is not."',
            '"The work isn\'t the work, the rhythm is the work."',
            '"We tell ourselves stories in order to live."',
          ].map((q, i) => (
            <div key={i} style={{ padding: '20px 0', borderTop: '1px solid var(--bd-1)', fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--fg-emphasis)', lineHeight: 1.4, letterSpacing: '-0.01em' }}>
              {q}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== ENTRY DETAIL =====
function EntryDetail({ entry, onClose }) {
  if (!entry) return null;
  const m = MOOD_BY_ID[entry.mood] || MOODS[2];
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'var(--bg-modal)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="fly"
        style={{ width: '100%', maxWidth: 760, maxHeight: '90vh', background: 'var(--bg-1)', border: '1px solid var(--bd-1)', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--bd-1)', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: m.color, boxShadow: `0 0 10px ${m.color}` }} />
          <div style={{ flex: 1 }}>
            <div className="label" style={{ fontSize: 10, marginBottom: 4 }}>{new Date(entry.date + 'T00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 400, color: 'var(--fg-emphasis)', letterSpacing: '-0.015em' }}>
              {entry.title || 'Untitled'}
            </h2>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, background: 'transparent', border: '1px solid var(--bd-1)', borderRadius: 8, color: 'var(--fg-2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DI.Close size={14} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '28px 28px 32px' }}>
          {entry.aiSummary && (
            <div style={{ padding: 14, background: 'var(--bg-2)', borderLeft: '2px solid var(--accent)', borderRadius: 6, marginBottom: 24 }}>
              <div className="label" style={{ fontSize: 9, color: 'var(--accent)', marginBottom: 6 }}>AI SUMMARY</div>
              <div style={{ fontSize: 13, color: 'var(--fg-1)', fontStyle: 'italic' }}>{entry.aiSummary}</div>
            </div>
          )}

          <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, color: 'var(--fg-1)', lineHeight: 1.7, whiteSpace: 'pre-wrap', letterSpacing: '-0.003em' }}>
            {entry.body}
          </div>

          {entry.annotations && entry.annotations.length > 0 && (
            <div style={{ marginTop: 32 }}>
              <div className="label" style={{ fontSize: 10, marginBottom: 12 }}>OBSERVATIONS</div>
              {entry.annotations.map((a, i) => <AnnotationCard key={i} kind="pattern" body={a.text} fly={false} />)}
            </div>
          )}

          {entry.tags && entry.tags.length > 0 && (
            <div style={{ display: 'flex', gap: 6, marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--bd-1)' }}>
              {entry.tags.map(t => (
                <span key={t} style={{ padding: '3px 9px', background: 'var(--bg-2)', border: '1px solid var(--bd-1)', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{t}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ===== SETTINGS =====
function SettingsView() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '40px 48px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        {[
          { title: 'Privacy', items: [
            { k: 'Local-only mode', v: 'Entries never leave this device', on: true },
            { k: 'Encrypt at rest',  v: 'AES-256 on the local store',     on: true },
            { k: 'AI processing',    v: 'On — used for prompts, summaries, themes', on: true },
          ]},
          { title: 'AI behavior', items: [
            { k: 'Daily prompt',          v: 'Suggest a prompt each morning', on: true },
            { k: 'Live observations',     v: 'Quiet annotations as you write', on: true },
            { k: 'Auto-tag',              v: 'Detect themes and add tags',     on: true },
            { k: 'Voice transcription',   v: 'Whisper · on-device',            on: false },
          ]},
          { title: 'Reminders', items: [
            { k: 'Evening reminder', v: '21:00, weekdays',  on: true },
            { k: 'Weekly recap',     v: 'Sunday morning',  on: true },
          ]},
        ].map(section => (
          <div key={section.title} style={{ marginBottom: 40 }}>
            <div className="label" style={{ fontSize: 10, marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid var(--bd-1)' }}>{section.title.toUpperCase()}</div>
            {section.items.map(it => <SettingRow key={it.k} item={it} />)}
          </div>
        ))}

        <div style={{ padding: 20, border: '1px solid var(--bd-1)', borderRadius: 12, background: 'var(--bg-2)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--fg-emphasis)', marginBottom: 6 }}>Export your diary</div>
          <div style={{ fontSize: 13, color: 'var(--fg-2)', marginBottom: 16 }}>Download every entry as plain markdown. No lock-in.</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ padding: '8px 14px', background: 'var(--bg-1)', color: 'var(--fg-1)', border: '1px solid var(--bd-1)', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>Export .md</button>
            <button style={{ padding: '8px 14px', background: 'var(--bg-1)', color: 'var(--fg-1)', border: '1px solid var(--bd-1)', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>Export JSON</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingRow({ item }) {
  const [on, setOn] = React.useState(item.on);
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--bd-2)' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, color: 'var(--fg-1)', marginBottom: 2 }}>{item.k}</div>
        <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>{item.v}</div>
      </div>
      <button onClick={() => setOn(!on)}
        style={{
          width: 38, height: 22, borderRadius: 11,
          background: on ? 'var(--accent)' : 'var(--bg-3)',
          border: '1px solid ' + (on ? 'var(--accent)' : 'var(--bd-1)'),
          padding: 0, cursor: 'pointer', position: 'relative',
          boxShadow: on ? 'var(--accent-glow)' : 'none',
          transition: 'all 200ms',
        }}>
        <span style={{
          position: 'absolute', top: 2, left: on ? 18 : 2,
          width: 16, height: 16, borderRadius: '50%', background: '#fff',
          transition: 'left 200ms var(--ease-standard)',
        }} />
      </button>
    </div>
  );
}

// ===== ONBOARDING =====
function Onboarding({ onDone }) {
  const [step, setStep] = React.useState(0);
  const steps = [
    { eyebrow: '01 · WELCOME', title: 'A diary that listens back.', body: 'Massimo reads alongside you, quietly. It notices the patterns you forget to look for. It never speaks unless you ask.' },
    { eyebrow: '02 · YOUR VOICE', title: 'Type, talk, or have a conversation.', body: 'Three ways to write. Pick whichever your day allows. The diary doesn\'t care.' },
    { eyebrow: '03 · YOUR DATA', title: 'Local. Encrypted. Yours.', body: 'Entries live on this device. AI processing is opt-in, per-feature, and never used to train models.' },
    { eyebrow: '04 · BEGIN', title: 'How are you, today?', body: 'That\'s the whole interface. The rest unfolds from there.' },
  ];
  const cur = steps[step];

  return (
    <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, overflow: 'hidden' }}>
      <div className="grid-bg" style={{ position: 'absolute', inset: 0 }} />
      <div className="l-bracket l-tl" /><div className="l-bracket l-tr" /><div className="l-bracket l-bl" /><div className="l-bracket l-br" />

      <div style={{ position: 'relative', maxWidth: 620, width: '100%', textAlign: 'center' }}>
        <div className="wordmark" style={{ fontSize: 14, color: 'var(--fg-emphasis)', marginBottom: 56 }}>
          MASSIMO <span className="weak">·DIARY</span>
        </div>

        <div className="label" style={{ fontSize: 11, color: 'var(--accent)', marginBottom: 20 }}>{cur.eyebrow}</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 64, fontWeight: 400, color: 'var(--fg-emphasis)', letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 24 }}>
          {cur.title}
        </h1>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 19, color: 'var(--fg-2)', lineHeight: 1.6, fontStyle: 'italic', maxWidth: 480, margin: '0 auto 48px' }}>
          {cur.body}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 40 }}>
          {steps.map((_, i) => (
            <span key={i} style={{
              width: i === step ? 24 : 6, height: 6, borderRadius: 3,
              background: i === step ? 'var(--accent)' : i < step ? 'var(--fg-2)' : 'var(--bd-1)',
              boxShadow: i === step ? 'var(--accent-glow)' : 'none',
              transition: 'all 300ms',
            }} />
          ))}
        </div>

        <button onClick={() => step < steps.length - 1 ? setStep(step + 1) : onDone()} className="pulse"
          style={{
            padding: '12px 28px', background: '#0a0a0a', color: '#fff',
            border: '1px solid rgba(59,130,246,0.45)', borderRadius: 10,
            fontSize: 13, fontWeight: 500, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 10,
          }}>
          {step < steps.length - 1 ? 'Continue' : 'Open today'}
          <DI.Arrow size={14} />
        </button>
      </div>
    </div>
  );
}

window.InsightsView = InsightsView;
window.RecapView = RecapView;
window.EntryDetail = EntryDetail;
window.SettingsView = SettingsView;
window.Onboarding = Onboarding;
