// timeline.jsx — multiple visualizations for past entries.

function TimelineView({ entries, onOpen, density }) {
  const [mode, setMode] = React.useState('river'); // river | grid | list | heatmap
  const [filterMood, setFilterMood] = React.useState(null);
  const [query, setQuery] = React.useState('');

  const filtered = React.useMemo(() => entries.filter(e =>
    (!filterMood || e.mood === filterMood) &&
    (!query || (e.body + (e.title || '')).toLowerCase().includes(query.toLowerCase()))
  ), [entries, filterMood, query]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 32px', borderBottom: '1px solid var(--bd-1)' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
          <DI.Search size={14} style={{ position: 'absolute', left: 12, top: 11, color: 'var(--fg-3)' }} />
          <input value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search entries…"
            style={{ width: '100%', padding: '8px 12px 8px 34px', background: 'var(--bg-2)', border: '1px solid var(--bd-1)', borderRadius: 8, fontSize: 13, color: 'var(--fg-1)', outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--bg-2)', border: '1px solid var(--bd-1)', borderRadius: 8 }}>
          {[
            { id: 'river',   label: 'River',   Icon: DI.Trend },
            { id: 'grid',    label: 'Grid',    Icon: DI.Grid },
            { id: 'list',    label: 'List',    Icon: DI.List },
            { id: 'heatmap', label: 'Heatmap', Icon: DI.Calendar },
          ].map(m => (
            <button key={m.id} onClick={() => setMode(m.id)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '5px 10px',
                background: mode === m.id ? 'var(--bg-1)' : 'transparent',
                color: mode === m.id ? 'var(--fg-emphasis)' : 'var(--fg-2)',
                border: 'none', borderRadius: 5,
                fontSize: 12, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em',
                cursor: 'pointer',
                boxShadow: mode === m.id ? 'var(--shadow-1)' : 'none',
              }}>
              <m.Icon size={12} /> {m.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <span className="label" style={{ fontSize: 9 }}>MOOD</span>
          <button onClick={() => setFilterMood(null)} style={{ width: 18, height: 18, borderRadius: '50%', background: 'transparent', border: filterMood === null ? '2px solid var(--accent)' : '1px solid var(--bd-1)', cursor: 'pointer' }} />
          {MOODS.map(m => (
            <button key={m.id} onClick={() => setFilterMood(filterMood === m.id ? null : m.id)} title={m.label}
              style={{ width: 14, height: 14, borderRadius: '50%', background: m.color, border: filterMood === m.id ? '2px solid var(--accent)' : 'none', cursor: 'pointer', boxShadow: filterMood === m.id ? `0 0 8px ${m.color}` : 'none' }} />
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
        {mode === 'river'   && <RiverView entries={filtered} onOpen={onOpen} />}
        {mode === 'grid'    && <GridView entries={filtered} onOpen={onOpen} />}
        {mode === 'list'    && <ListView entries={filtered} onOpen={onOpen} />}
        {mode === 'heatmap' && <HeatmapView entries={filtered} onOpen={onOpen} />}
      </div>
    </div>
  );
}

// ----- River: chronological flow with mood ribbon -----
function RiverView({ entries, onOpen }) {
  // Group by month
  const groups = React.useMemo(() => {
    const m = {};
    for (const e of entries) {
      const k = e.date.slice(0, 7);
      (m[k] = m[k] || []).push(e);
    }
    return Object.entries(m).sort((a, b) => b[0].localeCompare(a[0]));
  }, [entries]);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Mood ribbon — sparkline of mood values */}
      <div style={{ marginBottom: 32, padding: '20px 24px', background: 'var(--bg-2)', border: '1px solid var(--bd-1)', borderRadius: 12 }}>
        <div className="label" style={{ fontSize: 10, marginBottom: 12 }}>30-DAY MOOD RIBBON</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 56 }}>
          {entries.slice().reverse().map((e, i) => {
            const m = MOOD_BY_ID[e.mood] || MOODS[2];
            return (
              <div key={e.id} onClick={() => onOpen(e)} title={`${e.date} · ${m.label}`}
                style={{
                  flex: 1,
                  height: `${m.value * 18 + 4}%`,
                  background: m.color,
                  borderRadius: 2,
                  cursor: 'pointer',
                  opacity: 0.85,
                  transition: 'all 150ms',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = 1; e.currentTarget.style.boxShadow = `0 0 8px ${m.color}`; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = 0.85; e.currentTarget.style.boxShadow = 'none'; }}
              />
            );
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)' }}>{entries[entries.length - 1]?.date}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)' }}>{entries[0]?.date}</span>
        </div>
      </div>

      {groups.map(([month, items]) => (
        <div key={month} style={{ marginBottom: 40 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 400, color: 'var(--fg-emphasis)', marginBottom: 20, letterSpacing: '-0.02em' }}>
            {new Date(month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {items.map(e => <RiverRow key={e.id} entry={e} onOpen={() => onOpen(e)} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

function RiverRow({ entry, onOpen }) {
  const m = MOOD_BY_ID[entry.mood] || MOODS[2];
  const day = new Date(entry.date + 'T00:00').getDate();
  const dow = new Date(entry.date + 'T00:00').toLocaleDateString('en-US', { weekday: 'short' });
  return (
    <div className="entry-row" onClick={onOpen}
      style={{ display: 'flex', gap: 24, padding: '20px 16px', borderTop: '1px solid var(--bd-1)', cursor: 'pointer' }}>
      <div style={{ width: 60, flexShrink: 0, textAlign: 'right' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--fg-emphasis)', lineHeight: 1 }}>{day}</div>
        <div className="label" style={{ fontSize: 10, marginTop: 4 }}>{dow.toUpperCase()}</div>
      </div>
      <div style={{ width: 2, background: m.color, borderRadius: 1, opacity: 0.6 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        {entry.title && <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--fg-emphasis)', marginBottom: 6 }}>{entry.title}</div>}
        <div style={{ fontSize: 14, color: 'var(--fg-1)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {entry.body}
        </div>
        {entry.tags && entry.tags.length > 0 && (
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            {entry.tags.map(t => (
              <span key={t} style={{ padding: '2px 8px', background: 'var(--bg-2)', border: '1px solid var(--bd-1)', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-2)' }}>{t}</span>
            ))}
          </div>
        )}
      </div>
      <div style={{ width: 80, textAlign: 'right' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: m.color }} />
          {m.label}
        </span>
      </div>
    </div>
  );
}

// ----- Grid: card view -----
function GridView({ entries, onOpen }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, maxWidth: 1200, margin: '0 auto' }}>
      {entries.map(e => {
        const m = MOOD_BY_ID[e.mood] || MOODS[2];
        return (
          <div key={e.id} onClick={() => onOpen(e)}
            style={{
              padding: 16, background: 'var(--bg-2)', border: '1px solid var(--bd-1)',
              borderTop: `2px solid ${m.color}`,
              borderRadius: 10, cursor: 'pointer', transition: 'all 200ms',
              minHeight: 180, display: 'flex', flexDirection: 'column',
            }}
            onMouseEnter={(ev) => { ev.currentTarget.style.background = 'var(--bg-3)'; ev.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(ev) => { ev.currentTarget.style.background = 'var(--bg-2)'; ev.currentTarget.style.transform = 'translateY(0)'; }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span className="label" style={{ fontSize: 10 }}>{new Date(e.date + 'T00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}</span>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: m.color, boxShadow: `0 0 6px ${m.color}` }} />
            </div>
            {e.title && <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, color: 'var(--fg-emphasis)', marginBottom: 8 }}>{e.title}</div>}
            <div style={{ fontSize: 13, color: 'var(--fg-1)', lineHeight: 1.55, flex: 1, display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {e.body}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ----- List: terminal-style -----
function ListView({ entries, onOpen }) {
  return (
    <div style={{ maxWidth: 920, margin: '0 auto', fontFamily: 'var(--font-mono)' }}>
      <div style={{ display: 'flex', padding: '8px 12px', borderBottom: '1px solid var(--bd-1)', fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        <div style={{ width: 110 }}>DATE</div>
        <div style={{ width: 90 }}>MOOD</div>
        <div style={{ flex: 1 }}>EXCERPT</div>
        <div style={{ width: 60, textAlign: 'right' }}>WORDS</div>
      </div>
      {entries.map(e => {
        const m = MOOD_BY_ID[e.mood] || MOODS[2];
        const wc = e.body.split(/\s+/).length;
        return (
          <div key={e.id} onClick={() => onOpen(e)} className="entry-row"
            style={{ display: 'flex', padding: '10px 12px', borderBottom: '1px solid var(--bd-2)', cursor: 'pointer', alignItems: 'center', fontSize: 12 }}>
            <div style={{ width: 110, color: 'var(--fg-2)' }}>{e.date}</div>
            <div style={{ width: 90, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--fg-2)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: m.color }} /> {m.label.toLowerCase()}
            </div>
            <div style={{ flex: 1, color: 'var(--fg-1)', fontFamily: 'var(--font-sans)', fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: 12 }}>
              {e.title ? <strong style={{ fontWeight: 500, marginRight: 8 }}>{e.title}</strong> : null}
              {e.body}
            </div>
            <div style={{ width: 60, textAlign: 'right', color: 'var(--fg-3)' }}>{wc}</div>
          </div>
        );
      })}
    </div>
  );
}

// ----- Heatmap: github-style -----
function HeatmapView({ entries, onOpen }) {
  // Map date → entry
  const map = Object.fromEntries(entries.map(e => [e.date, e]));
  // Build last ~12 weeks
  const today = new Date('2026-05-01');
  const days = [];
  for (let i = 83; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  // Grid: 12 cols (weeks) × 7 rows (Mon-Sun)
  return (
    <div style={{ maxWidth: 920, margin: '0 auto' }}>
      <div className="label" style={{ fontSize: 10, marginBottom: 12 }}>LAST 12 WEEKS · COLOR = MOOD</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'repeat(7, 1fr)', gridAutoFlow: 'column', gap: 4, maxWidth: 720 }}>
        {days.map(d => {
          const e = map[d];
          const m = e ? MOOD_BY_ID[e.mood] : null;
          return (
            <div key={d} onClick={() => e && onOpen(e)} title={d + (e ? ' · ' + (m?.label || '') : '')}
              style={{
                aspectRatio: '1',
                background: m ? m.color : 'var(--bg-2)',
                opacity: m ? 0.85 : 0.5,
                borderRadius: 3,
                cursor: e ? 'pointer' : 'default',
                border: '1px solid var(--bd-2)',
                transition: 'all 150ms',
              }}
              onMouseEnter={(ev) => { if (e) { ev.currentTarget.style.opacity = 1; ev.currentTarget.style.transform = 'scale(1.15)'; }}}
              onMouseLeave={(ev) => { ev.currentTarget.style.opacity = m ? 0.85 : 0.5; ev.currentTarget.style.transform = 'scale(1)'; }}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 14, marginTop: 24, alignItems: 'center' }}>
        <span className="label" style={{ fontSize: 10 }}>LEGEND</span>
        {MOODS.map(m => (
          <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: m.color }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

window.TimelineView = TimelineView;
