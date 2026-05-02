// shell.jsx — App shell, sidebar, top bar.
const { useState, useEffect, useRef, useMemo, useCallback } = React;

function NavItem({ item, active, onClick }) {
  const [hover, setHover] = useState(false);
  const bg = active ? 'var(--bg-2)' : (hover ? 'var(--bg-2)' : 'transparent');
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        width: '100%', padding: '8px 10px',
        background: bg,
        color: active ? 'var(--fg-emphasis)' : 'var(--fg-2)',
        border: 'none', borderRadius: 8,
        fontSize: 13, fontFamily: 'var(--font-sans)', fontWeight: active ? 500 : 400,
        cursor: 'pointer',
        transition: 'all 150ms var(--ease-standard)',
        textAlign: 'left',
        position: 'relative',
      }}>
      <item.Icon size={16} />
      <span style={{ flex: 1 }}>{item.label}</span>
      {active && <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }} />}
    </button>
  );
}

function Sidebar({ view, setView, onCompose, dark }) {
  const items = [
    { id: 'today',    label: 'Today',     Icon: DI.Pen,      hint: 'T' },
    { id: 'timeline', label: 'Timeline',  Icon: DI.Calendar, hint: 'L' },
    { id: 'insights', label: 'Insights',  Icon: DI.Sparkles, hint: 'I' },
    { id: 'recap',    label: 'Recap',     Icon: DI.Recap,    hint: 'R' },
    { id: 'settings', label: 'Settings',  Icon: DI.Settings, hint: ',' },
  ];
  return (
    <aside style={{
      width: 224, flexShrink: 0,
      borderRight: '1px solid var(--bd-1)',
      background: 'var(--bg-1)',
      display: 'flex', flexDirection: 'column',
      padding: '16px 12px',
      gap: 4,
    }}>
      <div style={{ padding: '8px 8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="wordmark" style={{ fontSize: 13, color: 'var(--fg-emphasis)' }}>
          MASSIMO <span className="weak">·DIARY</span>
        </div>
      </div>

      <div style={{ padding: '0 8px 12px' }}>
        <button onClick={onCompose} className="pulse" style={{
          width: '100%',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '10px 14px',
          background: dark ? '#0a0a0a' : '#0a0a0a',
          color: '#fff',
          border: '1px solid rgba(59,130,246,0.45)',
          borderRadius: 10,
          fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500,
          cursor: 'pointer',
        }}>
          <DI.Plus size={14} /> New entry
        </button>
      </div>

      <div className="label" style={{ padding: '4px 8px 8px', fontSize: 10 }}>NAVIGATE</div>
      {items.map(it => <NavItem key={it.id} item={it} active={view === it.id} onClick={() => setView(it.id)} />)}

      <div style={{ flex: 1 }} />

      {/* Streak block */}
      <div style={{ margin: '8px', padding: 12, border: '1px solid var(--bd-1)', borderRadius: 10, background: 'var(--bg-2)' }}>
        <div className="label" style={{ fontSize: 10, marginBottom: 6 }}>CURRENT STREAK</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 600, color: 'var(--fg-emphasis)' }}>30</span>
          <span style={{ fontSize: 12, color: 'var(--fg-3)' }}>days</span>
        </div>
        <div style={{ display: 'flex', gap: 2, marginTop: 8 }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 6, borderRadius: 1,
              background: i >= 27 ? 'var(--accent)' : i >= 20 ? 'var(--fg-2)' : 'var(--bg-3)',
              opacity: i >= 27 ? 1 : 0.6,
            }} />
          ))}
        </div>
      </div>
    </aside>
  );
}

function TopBar({ view, dark, setDark, onSearch, sidebarOpen, setSidebarOpen, density }) {
  const titles = {
    today: 'Today',
    timeline: 'Timeline',
    insights: 'Insights',
    recap: 'Weekly recap',
    settings: 'Settings',
    entry: 'Entry',
    onboarding: 'Welcome',
  };
  return (
    <header style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 24px',
      borderBottom: '1px solid var(--bd-1)',
      background: 'var(--bg-1)',
      position: 'sticky', top: 0, zIndex: 10,
    }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, color: 'var(--fg-emphasis)', letterSpacing: '-0.01em' }}>
          {titles[view] || 'Diary'}
        </h2>
        <span className="label" style={{ fontSize: 10 }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </span>
      </div>

      <button onClick={() => setSidebarOpen(s => !s)} title="Toggle AI sidebar"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '7px 11px',
          background: sidebarOpen ? 'var(--accent-soft)' : 'transparent',
          color: sidebarOpen ? 'var(--accent)' : 'var(--fg-2)',
          border: '1px solid var(--bd-1)',
          borderRadius: 8,
          fontSize: 12, fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', textTransform: 'uppercase',
          cursor: 'pointer',
        }}>
        <DI.Sidebar size={14} /> AI
      </button>

      <button onClick={() => setDark(d => !d)} title="Toggle theme"
        style={{
          width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'transparent', color: 'var(--fg-2)',
          border: '1px solid var(--bd-1)', borderRadius: 8, cursor: 'pointer',
        }}>
        {dark ? <DI.Sun size={14} /> : <DI.Moon size={14} />}
      </button>
    </header>
  );
}

window.Sidebar = Sidebar;
window.TopBar = TopBar;
