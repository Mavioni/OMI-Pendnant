# OMI Pendant

> Central repository for **OMI** — a wearable AI pendant with solid-state power and balanced-ternary compute. This repo holds the project's design documentation, the marketing site at [revenantai.net](https://revenantai.net), and (over time) firmware, schematics, CAD, and toolchain.

---

## What this is

OMI is a pendant-sized AI assistant in the spirit of the Plaud NotePin, extended with three first-class research bets:

1. **Balanced-ternary compute** — a 5500FP 24-trit RISC core (120-instruction ISA, ~20 MHz) for energy-efficient on-device inference. Each trit holds three states {−1, 0, +1}, giving higher information density and lower switching activity than binary.
2. **Solid-state battery** — a flexible ~300 mAh ceramic-polymer cell. No liquid electrolyte, faster charging, higher energy density, and 2,000–10,000 cycle lifespan.
3. **On-device camera + audio** — an OV6948 micro image sensor (0.575 × 0.575 mm) plus dual MEMS microphones, with all inference done locally on the ternary core paired with an ESP32-S3 bridge MCU.

Form factor target: **~51 × 21 × 11 mm, 16.6 g.**

The full design rationale, component selection, system architecture, prototype assembly steps, and references are in the canonical design document:

> **[`docs/Designing a Wearable AI Pendant with Solid-State Power and Ternary AI.pdf`](docs/Designing%20a%20Wearable%20AI%20Pendant%20with%20Solid-State%20Power%20and%20Ternary%20AI.pdf)**

That PDF is the source of truth for product intent. Everything else in this repo serves it.

---

## Repository layout

```
.
├── docs/                        # Design documentation (canonical PDF lives here)
├── components/sections.jsx      # All site sections: Hero, Architecture, Exploded, Specs, FAQ, …
├── app.jsx                      # Root mount
├── app.bundle.js                # Built bundle (esbuild → IIFE, vendored React)
├── styles.css                   # Design system + section styles
├── index.html                   # Entry point loaded by GitHub Pages
├── assets/                      # Photography (omi-front.jpg, omi-angle.jpg, omi-detail.jpg)
├── vendor/                      # Pinned React 18 production builds
├── favicon.svg                  # Inline OMI mark
├── robots.txt                   # Search-engine policy
├── sitemap.xml                  # /
├── CNAME                        # revenantai.net (GitHub Pages custom domain)
└── LICENSE
```

---

## The website (revenantai.net)

This repo doubles as the deployment for the public marketing site. GitHub Pages serves directly from `main` — there is no build step on GitHub. The bundle is built locally (esbuild) and committed to `app.bundle.js`.

### Local build

The project uses esbuild to compile `app.jsx` + `components/sections.jsx` into `app.bundle.js`. There is no `package.json` or `node_modules` required at runtime — React is vendored in `vendor/`.

```bash
# One-shot build (requires node + esbuild available)
npx esbuild app.jsx components/sections.jsx \
  --bundle --format=iife --target=es2019 \
  --loader:.jsx=jsx --jsx=transform \
  --jsx-factory=React.createElement --jsx-fragment=React.Fragment \
  --outfile=app.bundle.js
```

### Cache-busting

`index.html` references `styles.css?v=<date>` and `app.bundle.js?v=<date>`. **Bump the `?v=` query string whenever those files change** so browsers fetch the new files instead of serving stale ones from cache. (Planned: switch to content-hashed filenames.)

### Deployment

Push to `main` → GitHub Pages rebuilds within ~1–3 minutes. The custom domain `revenantai.net` is set via `CNAME`. **If a change isn't visible:**

1. Wait ~3 minutes for Pages to rebuild.
2. Hard-refresh: `Cmd/Ctrl + Shift + R` (or open in a private window).
3. Verify the cache-bust query string in `index.html` was bumped for this rev.

---

## Hardware (target spec)

| Subsystem    | Choice                                                  |
| ------------ | ------------------------------------------------------- |
| Ternary core | 5500FP balanced-ternary RISC · 24-trit word · 120 instr |
| Bridge MCU   | Espressif ESP32-S3 (BLE 5.3, Wi-Fi)                     |
| Camera       | OmniVision OV6948 — 200 × 200 @ 30 fps, ~25 mW          |
| Mics         | Dual MEMS, stereo beam-forming                          |
| Memory       | 64 GB eMMC + 8–16 MB PSRAM                              |
| Battery      | Solid-state pouch, ~300 mAh, 3–12 min full charge       |
| User input   | Side tactile button + RGB hardware-gated status LED     |
| Enclosure    | Anodized 6061 aluminum or bioplastic, IP54              |
| Dimensions   | ~51 × 21 × 11 mm, 16.6 g                                |

For the rationale behind every choice, see the design PDF.

---

## Roadmap

Modules planned to live in this repo as the project matures:

- `firmware/` — ESP32-S3 firmware (bridge MCU, sensor drivers, BLE/Wi-Fi, recording state machine)
- `ternary-os/` — minimal runtime + AI-inference loop targeting the 5500FP
- `models/` — quantized ternary weights (speech summarization, scene classification)
- `pcb/` — KiCad schematics + flex-PCB layout
- `cad/` — enclosure (STEP/STL), magnetic-dock geometry
- `tools/` — cross-compiler, ternary simulator, weight quantizer

---

## Contributing

Solo project ([@mavioni](https://github.com/mavioni)) — issues and PRs welcome, especially on:

- Toolchain for the 5500FP (compilers, simulators, debuggers)
- Solid-state battery sourcing and characterization
- Ternary-quantized model weights

---

## License

See [`LICENSE`](LICENSE).
