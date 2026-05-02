// icons.jsx — minimal lucide-style icons, 1.5 stroke
const Icon = ({ children, size = 18, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...rest}>{children}</svg>
);

const DI = {
  // Navigation
  Home:      (p) => <Icon {...p}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2h-4v-7h-6v7H5a2 2 0 01-2-2z"/></Icon>,
  Calendar:  (p) => <Icon {...p}><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 10h18M7 3v3M17 3v3"/></Icon>,
  Spark:     (p) => <Icon {...p}><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/></Icon>,
  Recap:     (p) => <Icon {...p}><path d="M3 5h18M3 12h18M3 19h12"/></Icon>,
  Settings:  (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/></Icon>,
  Search:    (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></Icon>,
  Plus:      (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>,
  Close:     (p) => <Icon {...p}><path d="M6 6l12 12M6 18L18 6"/></Icon>,
  Check:     (p) => <Icon {...p}><path d="M4 12l5 5L20 6"/></Icon>,
  Arrow:     (p) => <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6"/></Icon>,
  ArrowUp:   (p) => <Icon {...p}><path d="M12 19V5M6 11l6-6 6 6"/></Icon>,
  ChevL:     (p) => <Icon {...p}><path d="M15 18l-6-6 6-6"/></Icon>,
  ChevR:     (p) => <Icon {...p}><path d="M9 18l6-6-6-6"/></Icon>,
  ChevDn:    (p) => <Icon {...p}><path d="M6 9l6 6 6-6"/></Icon>,
  Mic:       (p) => <Icon {...p}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3M9 21h6"/></Icon>,
  MicOff:    (p) => <Icon {...p}><path d="M3 3l18 18"/><path d="M9 9v3a3 3 0 005 2.2M15 13V6a3 3 0 00-6 0M5 11a7 7 0 0011.6 5.3M12 18v3M9 21h6"/></Icon>,
  Pen:       (p) => <Icon {...p}><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/></Icon>,
  Brain:     (p) => <Icon {...p}><path d="M12 5a3 3 0 00-3 3 3 3 0 00-3 3 3 3 0 002 2.8A3 3 0 008 17a3 3 0 004 2 3 3 0 004-2 3 3 0 002-3.2A3 3 0 0018 11a3 3 0 00-3-3 3 3 0 00-3-3z"/><path d="M12 5v14"/></Icon>,
  Tag:       (p) => <Icon {...p}><path d="M20 12l-8 8-9-9V3h8z"/><circle cx="7" cy="7" r="1" fill="currentColor"/></Icon>,
  Quote:     (p) => <Icon {...p}><path d="M3 21V11a4 4 0 014-4M13 21V11a4 4 0 014-4"/></Icon>,
  Sun:       (p) => <Icon {...p}><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M5 12H3M21 12h-2M6 6l1 1M17 17l1 1M6 18l1-1M17 7l1-1"/></Icon>,
  Moon:      (p) => <Icon {...p}><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></Icon>,
  Send:      (p) => <Icon {...p}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></Icon>,
  Sidebar:   (p) => <Icon {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></Icon>,
  Sparkles:  (p) => <Icon {...p}><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M19 14l.7 2.1L22 17l-2.3.9L19 20l-.7-2.1L16 17l2.3-.9z"/></Icon>,
  Trend:     (p) => <Icon {...p}><path d="M3 17l6-6 4 4 8-8M14 7h7v7"/></Icon>,
  Clock:     (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Icon>,
  More:      (p) => <Icon {...p}><circle cx="5"  cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="19" cy="12" r="1.2" fill="currentColor"/></Icon>,
  Filter:    (p) => <Icon {...p}><path d="M3 5h18l-7 9v6l-4-2v-4z"/></Icon>,
  Grid:      (p) => <Icon {...p}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></Icon>,
  List:      (p) => <Icon {...p}><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></Icon>,
  Type:      (p) => <Icon {...p}><path d="M4 7V5h16v2M9 5v14M12 19h-3M12 19h3"/></Icon>,
  Pause:     (p) => <Icon {...p}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></Icon>,
  Play:      (p) => <Icon {...p}><path d="M6 4l14 8-14 8z"/></Icon>,
  Eye:       (p) => <Icon {...p}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></Icon>,
  EyeOff:    (p) => <Icon {...p}><path d="M3 3l18 18M10.6 10.6a3 3 0 004 4M9.9 5.1A9.5 9.5 0 0112 5c6 0 10 7 10 7a17 17 0 01-3.4 4.1M6.6 6.6A17 17 0 002 12s4 7 10 7c1 0 1.9-.2 2.7-.5"/></Icon>,
  Star:      (p) => <Icon {...p}><path d="M12 3l3 6 6 1-4.5 4.5L18 21l-6-3-6 3 1.5-6.5L3 10l6-1z"/></Icon>,
};

window.DI = DI;
