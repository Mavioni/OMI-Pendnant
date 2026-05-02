/* OMI v2 sections — engineer-to-engineer copy, photo-driven hero, exploded scroll */
const { useState, useEffect, useRef, useMemo } = React;

/* ============== NAV ============== */
function Nav() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className="nav">
      <a href="#top" className="nav__logo"><i />OMI</a>
      <div className="nav__links">
        <a href="#manifesto">Why</a>
        <a href="#architecture">Silicon</a>
        <a href="#exploded">Inside</a>
        <a href="#compare">Compare</a>
        <a href="#specs">Specs</a>
      </div>
      <a href="#reserve" className="nav__cta">Reserve · $100</a>
      <div className="nav__progress" style={{ width: `${progress}%` }} />
    </nav>
  );
}

/* ============== HERO ============== */
function Hero() {
  return (
    <section className="hero wrap" id="top">
      <div className="glow glow--amber glow--top-right" />
      <div className="grid-bg" />
      <div className="hero__grid">
        <div className="hero__copy">
          <div className="hero__chip">
            <i />Gen 1 · Q4 2026 · Reservations open
          </div>
          <h1 className="hero__title">
            Your<br />
            Portable<br />
            <em>AI.</em>
          </h1>
          <p className="hero__sub">
            16 grams. Three mics. One wide-angle sensor. A 24-trit RISC core that runs ternary inference at 38% lower switching energy than binary silicon. Worn at the sternum.
          </p>
          <div className="hero__metrics">
            <div className="hero__metric">
              <div className="hero__metric-num">16.6<small>g</small></div>
              <div className="hero__metric-label">Mass</div>
            </div>
            <div className="hero__metric">
              <div className="hero__metric-num">5500<small>FP</small></div>
              <div className="hero__metric-label">Core</div>
            </div>
            <div className="hero__metric">
              <div className="hero__metric-num">7<small>d</small></div>
              <div className="hero__metric-label">Standby</div>
            </div>
            <div className="hero__metric">
              <div className="hero__metric-num">3<small>min</small></div>
              <div className="hero__metric-label">Charge</div>
            </div>
          </div>
          <div className="hero__ctas">
            <a href="#reserve" className="btn btn--amber">Reserve →</a>
            <a href="#architecture" className="btn btn--ghost">Read the white paper</a>
          </div>
        </div>

        <div className="hero__photo-stack">
          <div className="hero__photo hero__photo--angle">
            <img src={(window.__resources && window.__resources.omiAngle) || "assets/omi-angle.jpg"} alt="Omi pendant — angled view" />
          </div>
          <div className="hero__photo hero__photo--main">
            <img src={(window.__resources && window.__resources.omiFront) || "assets/omi-front.jpg"} alt="Omi pendant — front" />
          </div>
          <div className="hero__photo hero__photo--detail">
            <img src={(window.__resources && window.__resources.omiDetail) || "assets/omi-detail.jpg"} alt="Omi pendant — lens detail" />
          </div>
          <div className="hero__photo-ann hero__photo-ann--lens">12MP · f/2.0 · 120°</div>
          <div className="hero__photo-ann hero__photo-ann--mics">3-MIC · BEAMFORM</div>
        </div>
      </div>
    </section>
  );
}

/* ============== MARQUEE ============== */
function Marquee() {
  const items = ["SEE", "·", "UNDERSTAND", "·", "EMPOWER", "·", "5500FP", "·", "24-TRIT RISC", "·", "SOLID-STATE", "·", "16.6 GRAMS"];
  const repeated = [...items, ...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee__track">
        {repeated.map((t, i) => (
          <span key={i} className={t === "·" ? "amber" : (i % 12 === 0 ? "" : "")}>
            {t === "·" ? <span style={{ color: 'var(--amber)' }}>●</span> : <i>{t}</i>}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============== MANIFESTO ============== */
function Manifesto() {
  return (
    <section className="section manifesto" id="manifesto">
      <div className="wrap">
        <div className="rail-label">01 · Manifesto</div>
        <p className="manifesto__lede">
          Phones are <span className="strike">tools</span> distractions. Voice assistants are <span className="strike">helpers</span> microphones for ad networks. Laptops are <span className="strike">portable</span> tethered. We built <em>Omi</em> because intelligence belongs <em>with you</em>, not behind a screen — running on your body, on your power, on your watch.
        </p>
        <div className="manifesto__cols">
          <div className="manifesto__col">
            <div className="manifesto__col-num">→ 01</div>
            <h4>On-device by default.</h4>
            <p className="t-body">Your conversations never leave the pendant unless you ask them to. Nothing is uploaded for training. Nothing is logged in a datacenter. The mic is hard-wired to a status LED you can see.</p>
          </div>
          <div className="manifesto__col">
            <div className="manifesto__col-num">→ 02</div>
            <h4>Ternary, on principle.</h4>
            <p className="t-body">Binary is two states pretending to be a brain. We chose balanced ternary — −1, 0, +1 — because the math works better, the silicon switches less, and weights quantize down to where they fit on your collarbone.</p>
          </div>
          <div className="manifesto__col">
            <div className="manifesto__col-num">→ 03</div>
            <h4>Solid-state, for real.</h4>
            <p className="t-body">No liquid electrolyte. No thermal runaway. No swelling. A ceramic-polymer pouch you can flex, fold, and dunk — that charges full in three minutes and dies after ten thousand cycles.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== ARCHITECTURE / SOC ============== */
function Architecture() {
  // Animated SoC die — blocks light up in a sequence to suggest data flow
  const [activeBlock, setActiveBlock] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActiveBlock(b => (b + 1) % 6), 700);
    return () => clearInterval(id);
  }, []);

  const blocks = [
    { top: '12%', left: '12%', width: '30%', height: '18%', label: 'CORE / 5500FP' },
    { top: '12%', left: '52%', width: '34%', height: '18%', label: 'TRIT SRAM' },
    { top: '38%', left: '12%', width: '20%', height: '22%', label: 'MAC' },
    { top: '38%', left: '38%', width: '24%', height: '22%', label: 'NEURAL ENG' },
    { top: '38%', left: '68%', width: '18%', height: '22%', label: 'DSP' },
    { top: '70%', left: '12%', width: '74%', height: '14%', label: 'I/O · BLE · USB-C · POWER' },
  ];

  return (
    <section className="section section--alt" id="architecture">
      <div className="wrap">
        <div className="rail-label">02 · Silicon</div>
        <div className="section-head">
          <div>
            <div className="t-mono-amber" style={{ marginBottom: 16 }}>FUJI 5500FP · 24-TRIT RISC · 20 MHZ · 120 INSTR</div>
            <h2 className="t-h1">A core built<br />for thinking,<br />not counting.</h2>
          </div>
          <p className="section-head__sub">
            Balanced ternary stores three values per trit instead of two per bit. A 24-trit word holds 14.26 bits of binary-equivalent information, packs 41 trits into ~64 bits of state, and runs convolutions with subtract-and-accumulate primitives that map cleanly onto our quantized weights.
          </p>
        </div>

        <div className="soc-grid">
          <div className="soc-die">
            {blocks.map((b, i) => (
              <div
                key={i}
                className={`soc-block ${activeBlock === i ? '' : 'dim'}`}
                style={{ ...b, transition: 'all 400ms', boxShadow: activeBlock === i ? '0 0 24px rgba(255,138,61,0.4)' : 'none' }}
              >{b.label}</div>
            ))}
            {/* Pin grid — visual chip pins */}
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={`pt${i}`} className="soc-pin" style={{ top: 4, left: `${10 + i * 6}%` }} />
            ))}
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={`pb${i}`} className="soc-pin" style={{ bottom: 4, left: `${10 + i * 6}%` }} />
            ))}
          </div>

          <div>
            <div className="t-mono" style={{ marginBottom: 16 }}>SELECTED ISA · 120 INSTRUCTIONS TOTAL</div>
            <div className="isa-list">
              {[
                ['TADD', 'Ternary add with carry', '1 clk'],
                ['TMUL', 'Multiply, balanced ternary', '3 clk'],
                ['TMAC', 'Multiply-accumulate (8 lanes)', '4 clk'],
                ['TCONV', 'Convolution, 3×3 ternary kernel', '12 clk'],
                ['TQUANT', 'Quantize fp16 → trit', '6 clk'],
                ['TSIGN', 'Trit sign extract → {−1,0,+1}', '1 clk'],
                ['TSAT', 'Saturating add, clip to ±max', '2 clk'],
                ['TLOAD', 'Aligned trit load (24-trit word)', '2 clk'],
              ].map((r, i) => (
                <div className="isa-row" key={i}>
                  <span className="op">{r[0]}</span>
                  <span className="desc">{r[1]}</span>
                  <span className="clk">{r[2]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <TritStream />
      </div>
    </section>
  );
}

/* Live ternary stream */
function TritStream() {
  const [cells, setCells] = useState(() => Array(64).fill(0).map(() => Math.floor(Math.random() * 3) - 1));
  useEffect(() => {
    const id = setInterval(() => {
      setCells(prev => prev.map(v => Math.random() < 0.35 ? Math.floor(Math.random() * 3) - 1 : v));
    }, 220);
    return () => clearInterval(id);
  }, []);
  const labels = { '-1': '−', '0': '0', '1': '+' };
  const cls = { '-1': 'trit--neg', '0': 'trit--zero', '1': 'trit--pos' };
  return (
    <div className="trit-board" style={{ marginTop: 64 }}>
      <div className="trit-board__head">
        <span>5500FP · INFERENCE LOOP</span>
        <span className="live"><i />20 MHZ · LIVE</span>
      </div>
      <div className="trit-grid">
        {cells.map((v, i) => (
          <div key={i} className={`trit ${cls[String(v)]}`}>{labels[String(v)]}</div>
        ))}
      </div>
      <div className="trit-board__legend">
        <span><i style={{ background: '#1f1410', border: '1px solid #3a221b' }} />−1 · DENY</span>
        <span><i style={{ background: '#161616', border: '1px solid #232323' }} />0 · AUDIT</span>
        <span><i style={{ background: 'var(--amber)' }} />+1 · ALLOW</span>
        <span style={{ marginLeft: 'auto', color: 'var(--ink-3)' }}>41 TRITS ≈ 64 BITS · ↓38% SWITCHING ENERGY</span>
      </div>
    </div>
  );
}

/* ============== EXPLODED VIEW (scroll-driven) ============== */

/* Each "slice" is an isometric SVG render of one layer of the device.
   Coordinate convention: 320 wide × 600 tall, rounded-rect outline matching the capsule. */
function DeviceLayer({ kind }) {
  const W = 320, H = 600, R = 150;
  const outline = `M ${R},0 L ${W - R},0 A ${R} ${R} 0 0 1 ${W} ${R} L ${W} ${H - R} A ${R} ${R} 0 0 1 ${W - R} ${H} L ${R} ${H} A ${R} ${R} 0 0 1 0 ${H - R} L 0 ${R} A ${R} ${R} 0 0 1 ${R} 0 Z`;

  if (kind === 'shell') {
    return (
      <svg viewBox={`-20 -20 ${W + 40} ${H + 40}`} className="layer-svg">
        <defs>
          <linearGradient id="shellG" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#3a3a3f" />
            <stop offset="40%" stopColor="#1a1a1d" />
            <stop offset="100%" stopColor="#0a0a0c" />
          </linearGradient>
        </defs>
        {/* outer shell */}
        <path d={outline} fill="url(#shellG)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
        {/* inner cavity (hollow) */}
        <path d={`M ${R - 18},18 L ${W - R + 18},18 A ${R - 18} ${R - 18} 0 0 1 ${W - 18} ${R} L ${W - 18} ${H - R} A ${R - 18} ${R - 18} 0 0 1 ${W - R + 18} ${H - 18} L ${R - 18} ${H - 18} A ${R - 18} ${R - 18} 0 0 1 18 ${H - R} L 18 ${R} A ${R - 18} ${R - 18} 0 0 1 ${R - 18} 18 Z`}
              fill="#050505" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        {/* lanyard hole */}
        <circle cx={W / 2} cy={36} r="14" fill="#050505" stroke="rgba(255,255,255,0.1)" />
        {/* equatorial seam */}
        <line x1="0" y1={H / 2} x2={W} y2={H / 2} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      </svg>
    );
  }

  if (kind === 'optics') {
    return (
      <svg viewBox={`-20 -20 ${W + 40} ${H + 40}`} className="layer-svg">
        <defs>
          <radialGradient id="lensG" cx="0.35" cy="0.35">
            <stop offset="0%" stopColor="#5b3a1a" />
            <stop offset="40%" stopColor="#1a0e06" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
        </defs>
        {/* substrate */}
        <path d={outline} fill="rgba(20,15,10,0.85)" stroke="rgba(255,138,61,0.25)" strokeWidth="1" />
        {/* lens housing */}
        <circle cx={W / 2} cy={170} r="62" fill="#0a0a0c" stroke="rgba(255,138,61,0.5)" strokeWidth="1.5" />
        <circle cx={W / 2} cy={170} r="48" fill="url(#lensG)" />
        <circle cx={W / 2} cy={170} r="38" fill="none" stroke="rgba(255,138,61,0.4)" strokeWidth="0.5" />
        <circle cx={W / 2 - 12} cy={158} r="8" fill="rgba(255,180,100,0.3)" />
        {/* mic array (3 mics) */}
        {[0, 1, 2].map(i => (
          <circle key={i} cx={W / 2 - 30 + i * 30} cy={310} r="6" fill="#000" stroke="rgba(255,138,61,0.3)" />
        ))}
        {/* status LED */}
        <circle cx={W / 2 - 86} cy={170} r="4" fill="#ff8a3d">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2.4s" repeatCount="indefinite" />
        </circle>
        {/* flex traces */}
        <path d={`M ${W / 2},232 L ${W / 2},290 M ${W / 2 - 60},170 L 30,170 M ${W / 2 + 60},170 L ${W - 30},170`}
              stroke="rgba(255,138,61,0.25)" strokeWidth="0.5" fill="none" />
        {/* ribbon connector to next layer */}
        <rect x={W / 2 - 40} y={H - 80} width="80" height="36" rx="3" fill="#1a1208" stroke="rgba(255,138,61,0.4)" />
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={W / 2 - 36 + i * 6.5} y1={H - 76} x2={W / 2 - 36 + i * 6.5} y2={H - 48}
                stroke="rgba(255,180,100,0.5)" strokeWidth="0.6" />
        ))}
      </svg>
    );
  }

  if (kind === 'soc') {
    return (
      <svg viewBox={`-20 -20 ${W + 40} ${H + 40}`} className="layer-svg">
        {/* PCB */}
        <path d={outline} fill="#0a1108" stroke="rgba(255,138,61,0.35)" strokeWidth="1" />
        {/* Trace grid */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={20 + i * 30} x2={W} y2={20 + i * 30} stroke="rgba(120,200,140,0.06)" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 32} y1="0" x2={i * 32} y2={H} stroke="rgba(120,200,140,0.06)" strokeWidth="0.5" />
        ))}
        {/* SoC die — central */}
        <rect x={W / 2 - 60} y={H / 2 - 60} width="120" height="120" rx="6"
              fill="#1a1208" stroke="rgba(255,138,61,0.7)" strokeWidth="1.5" />
        <rect x={W / 2 - 50} y={H / 2 - 50} width="100" height="100" rx="2"
              fill="#221a0a" stroke="rgba(255,180,100,0.4)" />
        <text x={W / 2} y={H / 2 - 18} textAnchor="middle" fill="#ff8a3d"
              style={{ font: '600 11px ui-monospace, Geist Mono, monospace', letterSpacing: '0.15em' }}>5500FP</text>
        <text x={W / 2} y={H / 2 + 4} textAnchor="middle" fill="rgba(255,180,100,0.6)"
              style={{ font: '8px ui-monospace, Geist Mono, monospace', letterSpacing: '0.18em' }}>24-TRIT · 20MHZ</text>
        {/* die grid pattern */}
        {Array.from({ length: 8 }).map((_, i) => Array.from({ length: 8 }).map((_, j) => (
          <rect key={`d${i}-${j}`} x={W / 2 - 40 + i * 10} y={H / 2 + 12 + j * 4} width="6" height="2" fill="rgba(255,138,61,0.15)" />
        )))}
        {/* package pins */}
        {Array.from({ length: 14 }).map((_, i) => (
          <React.Fragment key={i}>
            <rect x={W / 2 - 56 + i * 8.6} y={H / 2 - 70} width="3" height="8" fill="rgba(255,180,100,0.5)" />
            <rect x={W / 2 - 56 + i * 8.6} y={H / 2 + 62} width="3" height="8" fill="rgba(255,180,100,0.5)" />
          </React.Fragment>
        ))}
        {/* peripheral chips */}
        <rect x={50} y={120} width="60" height="40" rx="3" fill="#1a1208" stroke="rgba(255,138,61,0.4)" />
        <text x={80} y={143} textAnchor="middle" fill="rgba(255,180,100,0.6)" style={{ font: '7px ui-monospace, monospace', letterSpacing: '0.15em' }}>ESP32-S3</text>
        <rect x={W - 110} y={120} width="60" height="40" rx="3" fill="#1a1208" stroke="rgba(255,138,61,0.4)" />
        <text x={W - 80} y={143} textAnchor="middle" fill="rgba(255,180,100,0.6)" style={{ font: '7px ui-monospace, monospace', letterSpacing: '0.15em' }}>PSRAM</text>
        <rect x={50} y={H - 160} width="60" height="40" rx="3" fill="#1a1208" stroke="rgba(255,138,61,0.4)" />
        <text x={80} y={H - 137} textAnchor="middle" fill="rgba(255,180,100,0.6)" style={{ font: '7px ui-monospace, monospace', letterSpacing: '0.15em' }}>eMMC</text>
        <rect x={W - 110} y={H - 160} width="60" height="40" rx="3" fill="#1a1208" stroke="rgba(255,138,61,0.4)" />
        <text x={W - 80} y={H - 137} textAnchor="middle" fill="rgba(255,180,100,0.6)" style={{ font: '7px ui-monospace, monospace', letterSpacing: '0.15em' }}>PMIC</text>
        {/* passives */}
        {Array.from({ length: 18 }).map((_, i) => (
          <rect key={i} x={20 + (i % 9) * 32} y={H - 40 - Math.floor(i / 9) * 12} width="8" height="3" fill="rgba(255,138,61,0.5)" />
        ))}
      </svg>
    );
  }

  if (kind === 'cell') {
    return (
      <svg viewBox={`-20 -20 ${W + 40} ${H + 40}`} className="layer-svg">
        <defs>
          <linearGradient id="cellG" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1a2332" />
            <stop offset="50%" stopColor="#0e1620" />
            <stop offset="100%" stopColor="#070b12" />
          </linearGradient>
        </defs>
        {/* pouch outer */}
        <path d={outline} fill="url(#cellG)" stroke="rgba(120,180,255,0.25)" strokeWidth="1" />
        {/* heat seal margin */}
        <path d={`M ${R - 12},12 L ${W - R + 12},12 A ${R - 12} ${R - 12} 0 0 1 ${W - 12} ${R} L ${W - 12} ${H - R} A ${R - 12} ${R - 12} 0 0 1 ${W - R + 12} ${H - 12} L ${R - 12} ${H - 12} A ${R - 12} ${R - 12} 0 0 1 12 ${H - R} L 12 ${R} A ${R - 12} ${R - 12} 0 0 1 ${R - 12} 12 Z`}
              fill="none" stroke="rgba(120,180,255,0.18)" strokeWidth="0.5" strokeDasharray="3 2" />
        {/* lattice — solid-state ceramic-polymer matrix */}
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={`hh${i}`} x1="40" y1={50 + i * 36} x2={W - 40} y2={50 + i * 36}
                stroke="rgba(120,180,255,0.1)" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`vv${i}`} x1={50 + i * 36} y1="50" x2={50 + i * 36} y2={H - 50}
                stroke="rgba(120,180,255,0.1)" strokeWidth="0.5" />
        ))}
        {/* tabs */}
        <rect x={W / 2 - 36} y="-10" width="20" height="22" fill="#cccccc" stroke="rgba(255,255,255,0.5)" />
        <rect x={W / 2 + 16} y="-10" width="20" height="22" fill="#666" stroke="rgba(255,255,255,0.3)" />
        <text x={W / 2 - 26} y="6" textAnchor="middle" fill="#000" style={{ font: '700 8px ui-monospace, monospace' }}>+</text>
        <text x={W / 2 + 26} y="6" textAnchor="middle" fill="#fff" style={{ font: '700 8px ui-monospace, monospace' }}>−</text>
        {/* label */}
        <text x={W / 2} y={H / 2} textAnchor="middle" fill="rgba(150,200,255,0.4)"
              style={{ font: '300 28px Inter Tight, sans-serif', letterSpacing: '-0.02em' }}>500</text>
        <text x={W / 2} y={H / 2 + 22} textAnchor="middle" fill="rgba(150,200,255,0.4)"
              style={{ font: '8px ui-monospace, monospace', letterSpacing: '0.3em' }}>mAh · SOLID-STATE</text>
      </svg>
    );
  }
  return null;
}

function Exploded() {
  const ref = useRef(null);
  const [step, setStep] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const pct = Math.min(Math.max(-rect.top / total, 0), 1);
      setStep(Math.min(3, Math.floor(pct * 4)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const layers = [
    { name: 'Aluminum shell',  tag: 'CNC · 6061',     render: 'shell' },
    { name: 'Optics + mics',   tag: 'Sensor stack',   render: 'optics', accent: true },
    { name: '5500FP SoC',      tag: 'Compute',        render: 'soc',    accent: true },
    { name: 'Solid-state cell',tag: '500 mAh',        render: 'cell' },
  ];
  // Vertical separation grows with scroll. At step 0 layers are stacked; at step 3 fully exploded.
  const sep = 40 + step * 95;   // px between layers (40 → 325)

  const steps = [
    { num: '01', title: 'Outer shell', body: 'Single-billet 6061 aluminum, anodized matte black. Two halves laser-welded along the equatorial seam. 16.6 g, 52 × 31 × 9 mm.' },
    { num: '02', title: 'Sensor stack', body: '12MP wide-angle sensor with f/2.0 optic, three MEMS mics in stereo beam-forming geometry, hardware status LED hard-wired to recording state.' },
    { num: '03', title: '5500FP SoC', body: 'Custom 24-trit RISC core at 20 MHz, paired with an ESP32-S3 bridge MCU for BLE 5.3. 16 MB PSRAM, 64 GB eMMC for moments.' },
    { num: '04', title: 'Solid-state cell', body: '500 mAh ceramic-polymer pouch. No liquid electrolyte. Three-minute full charge via magnetic dock. 10,000-cycle rated lifespan.' },
  ];

  return (
    <section className="exploded-section" id="exploded" ref={ref}>
      <div className="exploded-sticky">
        <div className="wrap" style={{ width: '100%' }}>
          <div className="rail-label">03 · Inside</div>
          <div className="exploded-grid">
            <div className="left">
              <div className="t-mono-amber" style={{ marginBottom: 16 }}>SCROLL TO EXPLODE</div>
              <h2 className="t-h1" style={{ marginBottom: 32 }}>Four<br />layers.<br />One ounce.</h2>
              {steps.map((s, i) => (
                <div key={i} className={`exp-step ${step === i ? 'active' : ''}`}>
                  <div className="num">{s.num} / 04</div>
                  <h4>{s.title}</h4>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>

            <div className="exploded-stage">
              <div className="exploded-scene">
                {layers.map((l, i) => {
                  const offset = (i - 1.5) * sep;
                  return (
                    <div
                      key={i}
                      className={`exp-slice ${l.accent ? 'is-accent' : ''} ${step >= i ? 'is-active' : ''}`}
                      style={{
                        transform: `translate(-50%, -50%) translateY(${offset}px) rotateX(58deg) rotateZ(-14deg)`,
                        zIndex: 10 - i,
                      }}
                    >
                      <DeviceLayer kind={l.render} />
                      <div className="exp-slice__tag">
                        <span className="exp-slice__num">L0{i + 1}</span>
                        <span className="exp-slice__name">{l.name}</span>
                        <span className="exp-slice__sub">{l.tag}</span>
                      </div>
                      <div className="exp-slice__leader" />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="right exp-stats">
              <div className="exp-stat">
                <div className="exp-stat__num">16.6g</div>
                <div className="exp-stat__label">Total mass</div>
              </div>
              <div className="exp-stat">
                <div className="exp-stat__num">9mm</div>
                <div className="exp-stat__label">Profile depth</div>
              </div>
              <div className="exp-stat">
                <div className="exp-stat__num">38%</div>
                <div className="exp-stat__label">↓ switching energy</div>
              </div>
              <div className="exp-stat">
                <div className="exp-stat__num">10k</div>
                <div className="exp-stat__label">Cycle life</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== BATTERY ============== */
function Battery() {
  const [pct, setPct] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let p = 0;
        const id = setInterval(() => {
          p += 2;
          setPct(p);
          if (p >= 100) clearInterval(id);
        }, 60);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section className="section section--alt" ref={ref}>
      <div className="wrap">
        <div className="rail-label">04 · Power</div>
        <div className="battery-grid">
          <div>
            <div className="t-mono-amber" style={{ marginBottom: 16 }}>SOLID-STATE · 500 MAH · CERAMIC-POLYMER MATRIX</div>
            <h2 className="t-h1">Three minutes<br />to full.</h2>
            <p className="t-body-lg" style={{ marginTop: 24, maxWidth: 480 }}>
              Liquid electrolytes catch fire. They swell. They die. We use a flexible solid-state pouch — 2.3× the energy density of a lithium-polymer of the same volume, no thermal runaway, full charge in under three minutes via magnetic dock.
            </p>
            <div className="battery-stats">
              <div className="battery-stat">
                <div className="battery-stat__num">3<small>min</small></div>
                <div className="battery-stat__label">Full charge</div>
              </div>
              <div className="battery-stat">
                <div className="battery-stat__num">500<small>mAh</small></div>
                <div className="battery-stat__label">Capacity</div>
              </div>
              <div className="battery-stat">
                <div className="battery-stat__num">10<small>k cycles</small></div>
                <div className="battery-stat__label">Lifespan</div>
              </div>
              <div className="battery-stat">
                <div className="battery-stat__num">7<small>days</small></div>
                <div className="battery-stat__label">Standby</div>
              </div>
            </div>
          </div>
          <div className="battery-vis">
            <div className="cell">
              <div className="cell__fill" style={{ width: `${pct}%` }} />
              <div className="cell__pct">{pct}%</div>
            </div>
            <div className="battery-vis__cap">
              <span>SOLID-STATE CELL</span>
              <span>∂E/∂t ≈ 0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== COMPARISON ============== */
function Compare() {
  const rows = [
    ['Compute', 'Ternary 24-trit RISC', 'ARM Cortex-M', 'ARM Cortex-M', 'Snapdragon AR1'],
    ['On-device inference', 'Yes — full pipeline', 'Cloud only', 'Cloud + voice', 'Hybrid'],
    ['Battery', 'Solid-state · 500 mAh', 'Li-Po · 200 mAh', 'Li-Po · 240 mAh', 'Li-Po · 1500 mAh'],
    ['Standby', '7 days', '~30 hours', '15 hours', '8 hours'],
    ['Charge time', '3 min', '90 min', '60 min', '120 min'],
    ['Mass', '16.6 g', '~24 g', '~32 g', '~55 g'],
    ['Mic array', '3-mic beamform', '2-mic', '2-mic', 'Single'],
    ['Camera', '12MP wide', 'None', 'None', '13MP + projector'],
    ['Privacy LED', 'Hardwired', 'Software', 'Software', 'Software'],
    ['Open SDK', 'Yes — full toolchain', 'No', 'Limited', 'Closed'],
    ['Subscription', 'None', '$ Required', '$ Required', '$ Required'],
    ['Price (Gen 1)', '$489', '$229', '$199', '$699'],
  ];
  return (
    <section className="section" id="compare">
      <div className="wrap">
        <div className="rail-label">05 · Compare</div>
        <div className="section-head">
          <div>
            <div className="t-mono-amber" style={{ marginBottom: 16 }}>HEAD TO HEAD · GEN 1 · MAY 2026</div>
            <h2 className="t-h1">No cloud.<br />No subscription.<br />No compromise.</h2>
          </div>
          <p className="section-head__sub">
            Every other wearable AI on the market is a microphone with a SaaS bill attached. We shipped the silicon so you don't have to ship your conversations to a stranger's GPU.
          </p>
        </div>
        <table className="compare">
          <thead>
            <tr>
              <th></th>
              <th className="us">OMI</th>
              <th>Plaud</th>
              <th>Friend</th>
              <th>Humane Pin</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td className="feat">{r[0]}</td>
                <td className="us">{r[1]}</td>
                <td>{r[2]}</td>
                <td>{r[3]}</td>
                <td>{r[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ============== SPECS ============== */
function Specs() {
  const left = [
    ['Dimensions', '52 × 31 × 9 mm'],
    ['Mass', '16.6 g'],
    ['Materials', '6061 aluminum · ceramic core · medical-grade silicone'],
    ['Ingress', 'IP54 — splash & dust resistant'],
    ['Camera', '12MP · f/2.0 · 120° wide-angle · 30 fps'],
    ['Microphones', '3-mic MEMS array · stereo beamform'],
  ];
  const right = [
    ['Compute', 'Fuji 5500FP · 24-trit RISC · 20 MHz · 120 instr'],
    ['Bridge MCU', 'ESP32-S3 · BLE 5.3 LE'],
    ['Memory', '16 MB PSRAM · 64 GB eMMC', 'On-device moment store · 1000+ hrs audio'],
    ['Battery', '500 mAh solid-state · ceramic-polymer', '~3 min full charge · 10,000 cycles · 7-day standby'],
    ['Charging', 'Magnetic dock · USB-C 1A · pogo pin'],
    ['In box', 'Pendant · dock · USB-C cable · lanyard, clip, lapel pin'],
  ];
  return (
    <section className="section" id="specs">
      <div className="wrap">
        <div className="rail-label">06 · Specs</div>
        <div className="section-head">
          <div>
            <div className="t-mono-amber" style={{ marginBottom: 16 }}>EVERYTHING THAT MATTERS</div>
            <h2 className="t-h1">Specs.</h2>
          </div>
          <p className="section-head__sub">No marketing weights. No "up to" qualifiers. The numbers below are nominal at 23°C, measured on Gen 1 silicon.</p>
        </div>
        <div className="specs-grid">
          <div>{left.map((r, i) => (
            <div key={i} className="spec-row">
              <div className="label">{r[0]}</div>
              <div className="val">{r[1]}{r[2] && <small>{r[2]}</small>}</div>
            </div>
          ))}</div>
          <div>{right.map((r, i) => (
            <div key={i} className="spec-row">
              <div className="label">{r[0]}</div>
              <div className="val">{r[1]}{r[2] && <small>{r[2]}</small>}</div>
            </div>
          ))}</div>
        </div>
      </div>
    </section>
  );
}

/* ============== RESERVE / CTA ============== */
function CTA() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle'); // idle | error | ok
  const submit = (e) => {
    e.preventDefault();
    const v = email.trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    if (!ok) { setState('error'); return; }
    setState('ok');
    setTimeout(() => { setState('idle'); setEmail(''); }, 4500);
  };
  return (
    <section className="cta" id="reserve">
      <div className="glow glow--amber" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <div className="t-mono-amber" style={{ marginBottom: 24 }}>GEN 1 · LIMITED TO 5,000 UNITS · Q4 2026</div>
        <h2 className="cta__title">Be on<br />the <em>first batch.</em></h2>
        <p className="cta__sub">$100 fully refundable deposit. We email you when your serial number ships.</p>
        <form className={`cta__form ${state}`} onSubmit={submit} noValidate>
          <input
            type="email"
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (state !== 'idle') setState('idle'); }}
            aria-label="Email for reservation"
          />
          <button type="submit" className="btn btn--amber">Reserve →</button>
        </form>
        <div className="cta__msg">
          {state === 'ok' && <span className="cta__success show">✓ YOU'RE ON THE LIST · CONFIRMATION SENT TO {email.toUpperCase()}</span>}
          {state === 'error' && <span className="cta__error show">⚠ THAT EMAIL DOESN'T LOOK RIGHT — TRY AGAIN</span>}
        </div>
        <div className="cta__price">FROM <strong>$489</strong> · DEPOSIT <strong>$100</strong> · REFUNDABLE UNTIL SHIP</div>
        <div className="cta__guarantees">
          <div className="cta__guar"><span className="cta__guar-icon">⟳</span><span>30-day refund</span></div>
          <div className="cta__guar"><span className="cta__guar-icon">⌁</span><span>2-year warranty</span></div>
          <div className="cta__guar"><span className="cta__guar-icon">⇆</span><span>Worldwide shipping</span></div>
          <div className="cta__guar"><span className="cta__guar-icon">⌬</span><span>Open-source firmware</span></div>
        </div>
      </div>
    </section>
  );
}

/* ============== TRUST / PRESS BAR ============== */
function Trust() {
  return (
    <div className="trust">
      <div className="wrap">
        <div className="trust__head">As seen on</div>
        <div className="trust__row">
          <span className="trust__logo">WIRED</span>
          <span className="trust__logo">TechCrunch</span>
          <span className="trust__logo">The Verge</span>
          <span className="trust__logo">Hacker News</span>
          <span className="trust__logo">a16z</span>
          <span className="trust__logo">MIT Tech Review</span>
        </div>
      </div>
    </div>
  );
}

/* ============== STICKY MOBILE CTA ============== */
function StickyMobileCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      // Hide when CTA section or footer is in view
      const cta = document.getElementById('reserve');
      const ftr = document.querySelector('.footer');
      const vh = window.innerHeight;
      let inCta = false;
      if (cta) { const r = cta.getBoundingClientRect(); inCta = r.top < vh && r.bottom > 0; }
      let inFtr = false;
      if (ftr) { const r = ftr.getBoundingClientRect(); inFtr = r.top < vh && r.bottom > 0; }
      setShow(window.scrollY > 600 && !inCta && !inFtr);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <a href="#reserve" className={`mobile-cta ${show ? 'show' : ''}`}>
      <span className="mobile-cta__price">$489 · $100 deposit</span>
      <span className="mobile-cta__btn">Reserve →</span>
    </a>
  );
}

/* ============== FAQ ============== */
function FAQ() {
  const [open, setOpen] = useState(0);
  const items = [
    { q: 'When does Gen 1 ship?', a: 'Production begins Q4 2026. Reservations are filled in deposit order; your $100 is fully refundable until your serial number ships.' },
    { q: 'Is everything recorded all the time?', a: 'No. Recording requires either a wake gesture or a button press. The amber LED is hard-wired to the mic and camera supply rails — when it\'s dark, those subsystems are powered down.' },
    { q: 'Where does my data live?', a: 'On the device, in 64 GB of local eMMC, until you sync. The companion app uses end-to-end encryption derived from a key generated on-pendant. We cannot decrypt your moments.' },
    { q: 'What is balanced ternary, exactly?', a: 'A base-3 numeral system using {−1, 0, +1} as digits. It minimizes representation error per digit, supports symmetric arithmetic without sign bits, and pairs naturally with quantized neural network weights.' },
    { q: 'Will the SoC be available standalone?', a: 'The 5500FP is licensed under our Fuji program for partners building wearables and edge devices. Eval kits ship Q1 2027.' },
    { q: 'Can I write my own firmware?', a: 'Yes. The bridge MCU is ESP32-S3 (Espressif IDF compatible). The 5500FP toolchain ships with a C-like cross-compiler, an LLVM backend, and a Python-callable simulator.' },
  ];
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="rail-label">07 · FAQ</div>
        <div className="section-head" style={{ gridTemplateColumns: '1fr', textAlign: 'center', marginBottom: 24 }}>
          <h2 className="t-h1">Questions.</h2>
        </div>
        <div className="faq">
          {items.map((it, i) => (
            <div key={i} className={`faq__item ${open === i ? 'open' : ''}`} onClick={() => setOpen(open === i ? -1 : i)}>
              <div className="faq__q"><span>{it.q}</span><span className="faq__plus">+</span></div>
              <div className="faq__a">{it.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== FOOTER ============== */
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__big">OMI<i>.</i></div>
        <div className="footer__cols">
          <div className="footer__brand">
            <div className="nav__logo" style={{ fontSize: 22 }}><i />OMI</div>
            <p>Wearable intelligence built on solid-state power and balanced ternary compute. Designed in San Francisco. Fabbed in Hsinchu.</p>
          </div>
          <div className="footer__col">
            <h5>Product</h5>
            <a href="#manifesto">Why</a>
            <a href="#architecture">Silicon</a>
            <a href="#exploded">Inside</a>
            <a href="#specs">Specs</a>
          </div>
          <div className="footer__col">
            <h5>Developers</h5>
            <a href="#">Fuji SDK</a>
            <a href="#">5500FP datasheet</a>
            <a href="#">ISA reference</a>
            <a href="#">Eval kit</a>
          </div>
          <div className="footer__col">
            <h5>Company</h5>
            <a href="#">About</a>
            <a href="#">Press</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 OMI INC.</span>
          <span>SEE · UNDERSTAND · EMPOWER</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, Marquee, Manifesto, Architecture, Exploded, Battery, Compare, Specs, CTA, FAQ, Footer, Trust, StickyMobileCTA });
