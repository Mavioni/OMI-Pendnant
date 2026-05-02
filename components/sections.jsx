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
  // Two copies: CSS translateX(-50%) moves exactly one full copy → seamless loop
  const repeated = [...items, ...items];
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
    }, 300); // 300ms > 250ms CSS transition so each cell finishes before next update
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

/*
  All four layers share the same coordinate origin (320 × 600 viewBox).
  Anatomical constants keep parts pixel-perfect aligned when layers are stacked.
*/
const LAYER = {
  W: 320, H: 600, R: 140,           // device outline
  WALL: 16,                          // shell wall inset
  CX: 160, CY: 300,                  // centroid
  LENS_X: 160, LENS_Y: 155,         // camera lens center
  MIC_Y: 300,                        // microphone array row
  MICS: [116, 160, 204],             // three mic X positions
  LED_X: 68, LED_Y: 155,            // status LED
  LANYARD_Y: 40,                     // lanyard hole
  CHARGE_Y: 510,                     // magnetic charging ring
};
const { W, H, R: LR } = LAYER;
const mkOutline = (r, inset = 0) => {
  const ri = r - inset, x0 = inset, x1 = W - inset, y0 = inset, y1 = H - inset;
  return `M ${r},${y0} L ${x1 - r + inset},${y0} A ${ri},${ri} 0 0 1 ${x1},${r} L ${x1},${y1 - r + inset} A ${ri},${ri} 0 0 1 ${x1 - r + inset},${y1} L ${r},${y1} A ${ri},${ri} 0 0 1 ${x0},${y1 - r + inset} L ${x0},${r} A ${ri},${ri} 0 0 1 ${r},${y0} Z`;
};
const OUTLINE  = mkOutline(LR);
const CAVITY   = mkOutline(LR - LAYER.WALL, LAYER.WALL);
const VB = `-20 -20 ${W + 40} ${H + 40}`;

function DeviceLayer({ kind }) {

  if (kind === 'shell') {
    const { LENS_X, LENS_Y, MICS, MIC_Y, LED_X, LED_Y, LANYARD_Y, CHARGE_Y } = LAYER;
    return (
      <svg viewBox={VB} className="layer-svg">
        <defs>
          <linearGradient id="sG" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#38383e" />
            <stop offset="50%" stopColor="#1c1c20" />
            <stop offset="100%" stopColor="#0d0d10" />
          </linearGradient>
          <linearGradient id="sEdge" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>
        </defs>
        {/* body */}
        <path d={OUTLINE} fill="url(#sG)" stroke="rgba(255,255,255,0.13)" strokeWidth="1.5" />
        {/* inner cavity */}
        <path d={CAVITY} fill="#060608" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
        {/* surface brushing — fine horizontal lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={i} x1={LAYER.WALL + 4} y1={90 + i * 22} x2={W - LAYER.WALL - 4} y2={90 + i * 22}
                stroke="rgba(255,255,255,0.022)" strokeWidth="0.6" />
        ))}
        {/* top highlight arc */}
        <path d={`M ${LR},0 L ${W - LR},0 A ${LR},${LR} 0 0 1 ${W},${LR}`}
              fill="none" stroke="url(#sEdge)" strokeWidth="1" />
        {/* equatorial parting seam */}
        <line x1={LAYER.WALL} y1={LAYER.CY} x2={W - LAYER.WALL} y2={LAYER.CY}
              stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />
        {/* lanyard hole */}
        <circle cx={LENS_X} cy={LANYARD_Y} r="16" fill="#030305" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
        <circle cx={LENS_X} cy={LANYARD_Y} r="9"  fill="none"    stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
        {/* camera aperture — matches optics lens exactly */}
        <circle cx={LENS_X} cy={LENS_Y} r="52" fill="#030305" stroke="rgba(255,255,255,0.10)" strokeWidth="1.2" />
        <circle cx={LENS_X} cy={LENS_Y} r="43" fill="#000"    stroke="rgba(255,255,255,0.05)" strokeWidth="0.6" />
        <circle cx={LENS_X} cy={LENS_Y} r="30" fill="#020204" />
        {/* mic ports — align with MICS array */}
        {MICS.map((mx, i) => (
          <React.Fragment key={i}>
            <circle cx={mx} cy={MIC_Y} r="7"   fill="#000" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
            <circle cx={mx} cy={MIC_Y} r="3.5" fill="#040404" />
          </React.Fragment>
        ))}
        {/* LED port — matches optics LED */}
        <circle cx={LED_X} cy={LED_Y} r="4" fill="#000" stroke="rgba(255,255,255,0.09)" strokeWidth="0.8" />
        {/* magnetic charging ring */}
        <circle cx={LENS_X} cy={CHARGE_Y} r="34" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" strokeDasharray="5 3" />
        <circle cx={LENS_X} cy={CHARGE_Y} r="22" fill="#040406" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
      </svg>
    );
  }

  if (kind === 'optics') {
    const { LENS_X, LENS_Y, MICS, MIC_Y, LED_X, LED_Y, LANYARD_Y } = LAYER;
    return (
      <svg viewBox={VB} className="layer-svg">
        <defs>
          <radialGradient id="lensG" cx="0.38" cy="0.32">
            <stop offset="0%" stopColor="#5a341a" />
            <stop offset="45%" stopColor="#1a0d05" />
            <stop offset="100%" stopColor="#030202" />
          </radialGradient>
          <radialGradient id="lensShine" cx="0.32" cy="0.28">
            <stop offset="0%" stopColor="rgba(255,190,110,0.45)" />
            <stop offset="55%" stopColor="rgba(255,140,60,0)" />
          </radialGradient>
        </defs>
        {/* PCB substrate (dark, amber-tinted) */}
        <path d={OUTLINE} fill="rgba(10,10,8,0.92)" stroke="rgba(255,138,61,0.22)" strokeWidth="1" />
        {/* lanyard pass-through */}
        <circle cx={LENS_X} cy={LANYARD_Y} r="16" fill="#040404" stroke="rgba(255,138,61,0.10)" strokeWidth="0.8" />
        {/* camera module — LENS_X/LENS_Y exactly matches shell aperture */}
        <circle cx={LENS_X} cy={LENS_Y} r="56" fill="#080806" stroke="rgba(255,138,61,0.48)" strokeWidth="1.5" />
        <circle cx={LENS_X} cy={LENS_Y} r="47" fill="#050504" stroke="rgba(255,138,61,0.22)" strokeWidth="0.8" />
        <circle cx={LENS_X} cy={LENS_Y} r="38" fill="url(#lensG)" />
        <circle cx={LENS_X} cy={LENS_Y} r="28" fill="url(#lensShine)" />
        <circle cx={LENS_X} cy={LENS_Y} r="18" fill="rgba(255,255,255,0.04)" />
        {/* lens flare specular */}
        <circle cx={LENS_X - 10} cy={LENS_Y - 13} r="5" fill="rgba(255,200,130,0.22)" />
        {/* flex routing: lens → mics */}
        <path d={`M ${LENS_X},${LENS_Y + 52} L ${LENS_X},${MIC_Y - 22}`}
              stroke="rgba(255,138,61,0.18)" strokeWidth="0.6" fill="none" />
        {/* LED trace */}
        <path d={`M ${LED_X + 8},${LED_Y} L ${LENS_X - 54},${LENS_Y}`}
              stroke="rgba(255,138,61,0.15)" strokeWidth="0.5" fill="none" />
        {/* MEMS microphones — same X positions as shell mic ports */}
        {MICS.map((mx, i) => (
          <React.Fragment key={i}>
            <circle cx={mx} cy={MIC_Y} r="13" fill="#0a0a08" stroke="rgba(255,138,61,0.35)" strokeWidth="1" />
            <circle cx={mx} cy={MIC_Y} r="7"  fill="#060605" stroke="rgba(255,138,61,0.18)" strokeWidth="0.6" />
            <circle cx={mx} cy={MIC_Y} r="3"  fill="rgba(255,138,61,0.28)" />
          </React.Fragment>
        ))}
        {/* mic bus trace */}
        <path d={`M ${MICS[0]},${MIC_Y + 14} L ${MICS[2]},${MIC_Y + 14} L ${LENS_X},${MIC_Y + 48}`}
              stroke="rgba(255,138,61,0.15)" strokeWidth="0.5" fill="none" />
        {/* status LED — same position as shell port */}
        <circle cx={LED_X} cy={LED_Y} r="6"  fill="#120802" stroke="rgba(255,138,61,0.42)" strokeWidth="1" />
        <circle cx={LED_X} cy={LED_Y} r="3.5" fill="#ff8a3d">
          <animate attributeName="opacity" values="0.35;1;0.35" dur="2.4s" repeatCount="indefinite" />
        </circle>
        {/* FPC ribbon connector to SoC layer */}
        <rect x={LENS_X - 38} y={H - 88} width="76" height="30" rx="2.5"
              fill="#140e04" stroke="rgba(255,138,61,0.40)" strokeWidth="1" />
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={i} x1={LENS_X - 32 + i * 6.2} y1={H - 85} x2={LENS_X - 32 + i * 6.2} y2={H - 62}
                stroke="rgba(255,180,100,0.45)" strokeWidth="0.7" />
        ))}
      </svg>
    );
  }

  if (kind === 'soc') {
    const { LENS_X, LENS_Y, MICS, MIC_Y, LANYARD_Y, CX } = LAYER;
    const DIE_Y = 415; // SoC die center — well below the camera zone
    return (
      <svg viewBox={VB} className="layer-svg">
        {/* PCB — dark forest green */}
        <path d={OUTLINE} fill="#080e06" stroke="rgba(255,138,61,0.28)" strokeWidth="1" />
        {/* trace grid */}
        {Array.from({ length: 18 }).map((_, i) => (
          <line key={`h${i}`} x1={LAYER.WALL} y1={60 + i * 28} x2={W - LAYER.WALL} y2={60 + i * 28}
                stroke="rgba(100,180,90,0.045)" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={LAYER.WALL + i * 34} y1={LAYER.WALL} x2={LAYER.WALL + i * 34} y2={H - LAYER.WALL}
                stroke="rgba(100,180,90,0.045)" strokeWidth="0.5" />
        ))}
        {/* lanyard pass-through */}
        <circle cx={LENS_X} cy={LANYARD_Y} r="16" fill="#040604" stroke="rgba(255,138,61,0.08)" strokeWidth="0.8" />
        {/* camera optical path — empty zone matching shell/optics */}
        <circle cx={LENS_X} cy={LENS_Y} r="52" fill="#040604" stroke="rgba(255,138,61,0.12)" strokeWidth="0.8" strokeDasharray="4 3" />
        {/* mic alignment markers (assembly reference) */}
        {MICS.map((mx, i) => (
          <circle key={i} cx={mx} cy={MIC_Y} r="7" fill="#040604" stroke="rgba(255,138,61,0.10)" strokeWidth="0.6" strokeDasharray="2 2" />
        ))}
        {/* Wi-Fi / BLE meandered antenna */}
        <path d={`M ${CX - 52},${LENS_Y + 78} L ${CX - 52},${LENS_Y + 60} L ${CX + 52},${LENS_Y + 60} L ${CX + 52},${LENS_Y + 78} L ${CX - 28},${LENS_Y + 78} L ${CX - 28},${LENS_Y + 68} L ${CX + 28},${LENS_Y + 68} L ${CX + 28},${LENS_Y + 78}`}
              stroke="rgba(255,180,100,0.38)" strokeWidth="1" fill="none" />
        <text x={CX} y={LENS_Y + 58} textAnchor="middle" fill="rgba(255,138,61,0.32)"
              style={{ font: '6px ui-monospace,monospace', letterSpacing: '0.12em' }}>ANT · 2.4 GHz</text>
        {/* main 5500FP SoC die — centered at DIE_Y */}
        <rect x={CX - 58} y={DIE_Y - 58} width="116" height="116" rx="6"
              fill="#181208" stroke="rgba(255,138,61,0.72)" strokeWidth="1.5" />
        <rect x={CX - 48} y={DIE_Y - 48} width="96" height="96" rx="3"
              fill="#201608" stroke="rgba(255,180,100,0.32)" strokeWidth="0.8" />
        {/* die cell array */}
        {Array.from({ length: 6 }).map((_, r) => Array.from({ length: 6 }).map((_, c) => (
          <rect key={`${r}-${c}`} x={CX - 36 + c * 12} y={DIE_Y - 36 + r * 12}
                width="8" height="8" rx="0.5" fill="rgba(255,138,61,0.10)" />
        )))}
        <text x={CX} y={DIE_Y - 8} textAnchor="middle" fill="#ff8a3d"
              style={{ font: '700 11px ui-monospace,monospace', letterSpacing: '0.16em' }}>5500FP</text>
        <text x={CX} y={DIE_Y + 8} textAnchor="middle" fill="rgba(255,180,100,0.52)"
              style={{ font: '7px ui-monospace,monospace', letterSpacing: '0.14em' }}>24·TRIT  20MHZ</text>
        {/* BGA solder balls */}
        {Array.from({ length: 12 }).map((_, i) => (
          <React.Fragment key={i}>
            <rect x={CX - 52 + i * 8.8} y={DIE_Y - 64} width="3" height="5" rx="0.5" fill="rgba(255,200,100,0.48)" />
            <rect x={CX - 52 + i * 8.8} y={DIE_Y + 59} width="3" height="5" rx="0.5" fill="rgba(255,200,100,0.48)" />
            <rect x={CX - 64}            y={DIE_Y - 52 + i * 8.8} width="5" height="3" rx="0.5" fill="rgba(255,200,100,0.48)" />
            <rect x={CX + 59}            y={DIE_Y - 52 + i * 8.8} width="5" height="3" rx="0.5" fill="rgba(255,200,100,0.48)" />
          </React.Fragment>
        ))}
        {/* ESP32-S3 bridge MCU — left of main die */}
        <rect x={28} y={DIE_Y - 40} width="58" height="42" rx="3"
              fill="#0e1208" stroke="rgba(255,138,61,0.38)" strokeWidth="1" />
        <text x={57} y={DIE_Y - 16} textAnchor="middle" fill="rgba(255,180,100,0.50)"
              style={{ font: '6.5px ui-monospace,monospace', letterSpacing: '0.08em' }}>ESP32-S3</text>
        <text x={57} y={DIE_Y - 4}  textAnchor="middle" fill="rgba(255,180,100,0.30)"
              style={{ font: '5.5px ui-monospace,monospace', letterSpacing: '0.08em' }}>BLE 5.3</text>
        {/* routing trace from SoC → ESP32 */}
        <path d={`M ${CX - 58},${DIE_Y - 20} L 86,${DIE_Y - 20}`}
              stroke="rgba(255,138,61,0.18)" strokeWidth="0.6" fill="none" />
        {/* PSRAM — right of main die */}
        <rect x={W - 86} y={DIE_Y - 42} width="58" height="38" rx="3"
              fill="#0e1208" stroke="rgba(255,138,61,0.35)" strokeWidth="1" />
        <text x={W - 57} y={DIE_Y - 20} textAnchor="middle" fill="rgba(255,180,100,0.50)"
              style={{ font: '6.5px ui-monospace,monospace', letterSpacing: '0.08em' }}>16M PSRAM</text>
        {/* eMMC — bottom left */}
        <rect x={28} y={DIE_Y + 28} width="58" height="38" rx="3"
              fill="#0e1208" stroke="rgba(255,138,61,0.32)" strokeWidth="1" />
        <text x={57} y={DIE_Y + 50} textAnchor="middle" fill="rgba(255,180,100,0.50)"
              style={{ font: '6.5px ui-monospace,monospace', letterSpacing: '0.08em' }}>64G eMMC</text>
        {/* PMIC — bottom right */}
        <rect x={W - 86} y={DIE_Y + 28} width="58" height="38" rx="3"
              fill="#0e1208" stroke="rgba(255,138,61,0.32)" strokeWidth="1" />
        <text x={W - 57} y={DIE_Y + 50} textAnchor="middle" fill="rgba(255,180,100,0.50)"
              style={{ font: '6.5px ui-monospace,monospace', letterSpacing: '0.08em' }}>PMIC</text>
        {/* 0402 passive components */}
        {[
          [CX - 90, DIE_Y - 18], [CX - 90, DIE_Y],    [CX - 90, DIE_Y + 18],
          [CX + 72, DIE_Y - 18], [CX + 72, DIE_Y],     [CX + 72, DIE_Y + 18],
          [CX - 30, DIE_Y + 78], [CX, DIE_Y + 78],     [CX + 30, DIE_Y + 78],
          [CX - 20, LENS_Y + 92],[CX + 20, LENS_Y + 92],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="9" height="4" rx="0.5" fill="rgba(255,138,61,0.44)" />
        ))}
      </svg>
    );
  }

  if (kind === 'cell') {
    const { LENS_X, LANYARD_Y, CHARGE_Y, CX, CY } = LAYER;
    const SEAL = mkOutline(LR - 12, 12);
    return (
      <svg viewBox={VB} className="layer-svg">
        <defs>
          <linearGradient id="cellBG" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#14202e" />
            <stop offset="55%" stopColor="#0c1520" />
            <stop offset="100%" stopColor="#060c16" />
          </linearGradient>
          <linearGradient id="cellSheen" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"   stopColor="rgba(120,190,255,0.10)" />
            <stop offset="50%"  stopColor="rgba(120,190,255,0.02)" />
            <stop offset="100%" stopColor="rgba(120,190,255,0.10)" />
          </linearGradient>
        </defs>
        {/* pouch body */}
        <path d={OUTLINE} fill="url(#cellBG)" stroke="rgba(120,180,255,0.28)" strokeWidth="1.4" />
        {/* metallic foil sheen */}
        <path d={OUTLINE} fill="url(#cellSheen)" />
        {/* heat-seal perimeter */}
        <path d={SEAL} fill="none" stroke="rgba(120,180,255,0.16)" strokeWidth="0.6" strokeDasharray="5 3" />
        {/* electrode laminate stack lines */}
        {Array.from({ length: 18 }).map((_, i) => (
          <line key={i}
                x1={36} y1={100 + i * 21} x2={W - 36} y2={100 + i * 21}
                stroke={i % 3 === 0 ? 'rgba(130,190,255,0.12)' : 'rgba(130,190,255,0.05)'}
                strokeWidth="0.6" />
        ))}
        {/* lanyard pass-through marker */}
        <circle cx={LENS_X} cy={LANYARD_Y} r="16" fill="#040810" stroke="rgba(120,180,255,0.08)" strokeWidth="0.6" strokeDasharray="3 2" />
        {/* positive terminal tab */}
        <rect x={CX - 34} y={-22} width="22" height="28" rx="2"
              fill="#d0d0d6" stroke="rgba(220,220,220,0.7)" strokeWidth="1" />
        <text x={CX - 23} y={-5} textAnchor="middle" fill="#1a1a1a"
              style={{ font: '700 9px ui-monospace,monospace' }}>+</text>
        {/* negative terminal tab */}
        <rect x={CX + 12} y={-22} width="22" height="28" rx="2"
              fill="#555" stroke="rgba(255,255,255,0.32)" strokeWidth="1" />
        <text x={CX + 23} y={-5} textAnchor="middle" fill="#ddd"
              style={{ font: '700 9px ui-monospace,monospace' }}>−</text>
        {/* protection circuit module (PCB strip near tabs) */}
        <rect x={CX - 54} y={18} width="108" height="20" rx="2"
              fill="#0a140a" stroke="rgba(100,200,80,0.30)" strokeWidth="0.8" />
        {Array.from({ length: 6 }).map((_, i) => (
          <rect key={i} x={CX - 46 + i * 15} y={22} width="10" height="10" rx="1"
                fill="#152010" stroke="rgba(100,200,80,0.22)" strokeWidth="0.5" />
        ))}
        {/* capacity label */}
        <text x={CX} y={CY - 24} textAnchor="middle" fill="rgba(140,200,255,0.38)"
              style={{ font: '300 34px Inter Tight,sans-serif', letterSpacing: '-0.03em' }}>500</text>
        <text x={CX} y={CY + 4} textAnchor="middle" fill="rgba(140,200,255,0.28)"
              style={{ font: '7px ui-monospace,monospace', letterSpacing: '0.36em' }}>mAh</text>
        <text x={CX} y={CY + 22} textAnchor="middle" fill="rgba(140,200,255,0.22)"
              style={{ font: '6px ui-monospace,monospace', letterSpacing: '0.22em' }}>SOLID · STATE</text>
        {/* magnetic charging contact — matches shell ring */}
        <circle cx={LENS_X} cy={CHARGE_Y} r="34" fill="none"
                stroke="rgba(120,180,255,0.18)" strokeWidth="0.8" strokeDasharray="4 3" />
        <circle cx={LENS_X} cy={CHARGE_Y} r="22" fill="#080e18"
                stroke="rgba(120,180,255,0.14)" strokeWidth="0.8" />
        <text x={CX} y={CHARGE_Y + 4} textAnchor="middle" fill="rgba(120,180,255,0.28)"
              style={{ font: '6px ui-monospace,monospace', letterSpacing: '0.12em' }}>MAG</text>
      </svg>
    );
  }
  return null;
}

function Exploded() {
  const ref = useRef(null);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      setPct(Math.min(Math.max(-rect.top / total, 0), 1));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Discrete step for text panel; continuous pct drives the 3D separation
  const step = Math.min(3, Math.floor(pct * 4.25));
  // 0 → 260 px continuous separation that scrolls with the page
  const sep = pct * 260;
  // Reveal thresholds — each layer fades in as the scroll reaches it
  const REVEAL = [0, 0.18, 0.42, 0.66];

  const layers = [
    { name: 'Aluminum shell',   tag: 'CNC · 6061',   render: 'shell' },
    { name: 'Optics + mics',    tag: 'Sensor stack', render: 'optics', accent: true },
    { name: '5500FP SoC',       tag: 'Compute',      render: 'soc',   accent: true },
    { name: 'Solid-state cell', tag: '500 mAh',      render: 'cell' },
  ];

  const steps = [
    { num: '01', title: 'Outer shell',       body: 'Single-billet 6061 aluminum, anodized matte black. Two halves laser-welded along the equatorial seam. 16.6 g, 52 × 31 × 9 mm.' },
    { num: '02', title: 'Sensor stack',      body: '12MP wide-angle sensor with f/2.0 optic, three MEMS mics in stereo beam-forming geometry, hardware status LED hard-wired to recording state.' },
    { num: '03', title: '5500FP SoC',        body: 'Custom 24-trit RISC core at 20 MHz, paired with an ESP32-S3 bridge MCU for BLE 5.3. 16 MB PSRAM, 64 GB eMMC for moments.' },
    { num: '04', title: 'Solid-state cell',  body: '500 mAh ceramic-polymer pouch. No liquid electrolyte. Three-minute full charge via magnetic dock. 10,000-cycle rated lifespan.' },
  ];

  return (
    <section className="exploded-section" id="exploded" ref={ref}>
      <div className="exploded-sticky">
        <div className="wrap" style={{ width: '100%' }}>
          <div className="exploded-grid">
            <div className="left">
              <div className="rail-label" style={{ marginBottom: 12 }}>03 · Inside</div>
              <div className="t-mono-amber" style={{ marginBottom: 8 }}>SCROLL TO EXPLODE</div>
              <h2 className="exploded-h2">Four layers.<br />One ounce.</h2>
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
                  const revealed = pct >= REVEAL[i];
                  return (
                    <div
                      key={i}
                      className={`exp-slice ${l.accent ? 'is-accent' : ''}`}
                      style={{
                        transform: `translate(-50%, -50%) translateY(${offset}px) rotateX(54deg) rotateZ(-20deg)`,
                        zIndex: 10 - i,
                        opacity: revealed ? 1 : 0.08,
                      }}
                    >
                      <DeviceLayer kind={l.render} />
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
    // Single setState drives CSS transition — no stacking intervals, no unmount leak
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setPct(100);
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
