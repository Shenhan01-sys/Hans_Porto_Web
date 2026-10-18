# MASTER — Hans Gunawan portfolio design system

Single source of truth for the 2026-10 redesign. Every colour, size, duration and easing in `client/src` comes from this file. A value not listed here is a bug.

Preview of the direction: https://claude.ai/artifact/XN7FysTh8NcjYcZfoPE8ii
Research behind it: `../_resources/README.md` (codapress teardown, React Bits catalog, anime.js v4, motionmaxxing rules, hairline, Mobbin, profile brief).

---

## 1. Theses (validated 2026-10-18)

**Visual thesis.** A violet night lit from inside: a black ground tinted with Deep Night `#240046`, flat plates mixed from the same violet, and one electric accent `#7F00FF` that appears only as light (the dithered plasma field, the cursor label, active states), with Lavender `#B373FD` for accent text. Type is one superfamily: Geist Mono at weight 400 to 500 for display, navigation and data, because the person behind the site writes code for a living, and Geist for the captions, so the 35% that is reading stays easy to read. Hierarchy comes from scale, not bold, with display tracking at −3.5% to −5%. Spacing is cinematic and fluid on an 8px base, every size a clamp on a 1512px reference. Components are sharp-cornered flat plates with 1px violet hairlines: no shadows, no glass, square buttons that invert on hover. *Amendment (user, 2026-10-18): the visuals must be inclusive and immersive, and must say what each audience came to learn. Ratio visual 65% / caption 35%.*

**Interaction thesis.** Measured motion that decelerates into place: entries 400ms on softLand, the hero and the contact call 600 to 1000ms on snapSettle, exits 433ms speeding up on accelExit, opacity only as a 133 to 200ms helper, sibling staggers uneven (100, 67, 67ms). Hover answers with a two-square cursor in difference blend (lerp .2 and .45, 4× on targets, a violet label for VIEW and DRAG), a 400ms character scramble on links and buttons, and a 67ms press to .97. Scroll runs on Lenis (1.2s): headings scramble in at 85% of the viewport, the lede colours itself character by character between 70% and 30%, images open from a clip mask while settling from 1.1×, projects sit on a draggable arc, and the pointer pushes the hero field. Forbidden: lone fades, scale from zero, bounce or elastic (one spring per page, on the contact call), uniform staggers, crossfades between sections, 3D tilt, marquees, circle wipes, glow shadows, blurred blobs, gradient text, and every loop except the hero field and the line-art figures, which sleep offscreen. Reduced motion turns every move into its end state.

**Allowed patterns.** Geist Mono for display, navigation, buttons and data. Uppercase mono only on navigation, buttons and cursor labels, never as a kicker over a heading. 1px violet hairlines on media frames and section seams. A looping WebGL dither field in the hero (30fps idle, 60 while touched, paused offscreen). A custom two-square cursor in difference blend, fine pointers only. Character scramble on headings and link hovers. A tile-wipe intro, once per session. Hairline line-art figures (`@lucasmarkes/hairline`) that answer the pointer. The name set giant over two lines in the hero.

**Amendment 2 (user, 2026-10-18): fewer words, more picture.** Recognition, papers, education, certificates and social posts must carry their story visually and in motion, and a "bring your own AI" section joins the page. Added to the allowed patterns: a pinned horizontal track driven by vertical scroll (prizes), image parallax inside cards, outlined numerals and network names (`.outline-num`, years and platform names only, never section numbers), fanned paper pages that spread on scroll, a scroll-drawn path between school marks, a draggable certificate shelf riding a shallow wave, a masonry wall of locally stored post covers that open in a dialog, and an MCP console that runs real calls against `/api/mcp` with a packet travelling the diagram on each call. The scroll layouts and the drag interactions the user liked stay as they are.

**Dials** (passed to `ui-ux-pro-max`): variance 7 (giant two-line name, draggable arc, asymmetric hero), motion 8 (WebGL field, scramble, scroll-coloured lede, inertial drag), density 3 (cinematic spacing, sections 72 to 325px apart).

From the `ui-ux-pro-max` proposal: kept 16px minimum body on phones, 44px touch targets, .97 press, the 375/768/1024/1440 check. Dropped Inter, glassmorphism, the blue accent, the light background, ambient blobs, expo easing and GSAP Flip: each contradicts the thesis or is a listed tell.

---

## 2. Colour

Ground and plates are Deep Night `#240046` mixed into black. Ratios are WCAG, computed against `--ground` (`#040008`).

| Token | Hex | HSL channels | Source | Role | On ground |
|---|---|---|---|---|---|
| `--ground` | `#040008` | `270 100% 1.6%` | Deep Night at 12% on black | Page ground | — |
| `--plate` | `#0D0019` | `271 100% 4.9%` | Deep Night at 35% | Raised surfaces, media frames | — |
| `--plate-2` | `#160029` | `272 100% 8%` | Deep Night at 60% | Buttons, inputs, popovers | — |
| `--line` | `#3C096C` | `271 85% 22.9%` | Deep Night step 2 | Hairlines, ghost lede | 1.44 (decorative) |
| `--line-strong` | `#5A189A` | `270 73% 34.9%` | Deep Night step 3 | Button edges, field mid-tones | 2.01 (decorative) |
| `--input` | `#764BA7` | `268 38% 47.5%` | Lavender `#B373FD` at 65% on ground | Form field edges | 3.31 (UI ≥3 ✓) |
| `--violet` | `#7F00FF` | `270 100% 50%` | Electric step 1 | Light only: field, cursor label, active | 3.32 (large/UI only) |
| `--violet-hi` | `#B373FD` | `268 97% 72.2%` | Lavender step 3 | Links, accent text, focus ring | 6.73 ✓ |
| `--arrive` | `#C49DFF` | `264 100% 80.8%` | Mist step 2 | A word arriving, inline code | 9.53 ✓ |
| `--ink` | `#FCFAFF` | `264 100% 99%` | Mist step 5 | Headings, body | 20.08 ✓ |
| `--ink-2` | `#B4B3C5` | `243 13% 73.7%` | Lavender `#E6E6FA` at 78% | Captions | 10.11 ✓ |
| `--ink-3` | `#878594` | `248 7% 55.1%` | Lavender `#E6E6FA` at 58% | Dates, metadata | 5.76 ✓ |
| `--danger` | `#FF295C` | `346 100% 58%` | Ember step 4 | Form errors only | 5.67 ✓ |

Pairs: `--ink` on `--violet` 6.05:1 (cursor label, primary button active). `--ground` on `--ink` 20.08:1 (button hover). `--ground` on `--violet-hi` 6.73:1.

**Field ramp** (11 levels, hero WebGL): `#040008 #120023 #240046 #3C096C #5A189A #6D0CCD #7F00FF #9E61FF #C49DFF #EBDBFF #FCFAFF`.

**Not used from the chart:** Electric past `#9F00FF` (drifts to magenta), Sunset, Aurora (cyan), Ember except `--danger`. One accent hue, one meaning.

**Never:** Tailwind zinc/slate/gray text colours, pure `#000`, pure `#FFF`, any colour not in this table.

---

## 3. Type

Faces: **Geist Mono** (display, navigation, buttons, data) and **Geist** (captions, body). Google Fonts, `display=swap`, variable weights 300..700. Fallbacks: `"Geist Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace` and `"Geist", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.

Fluid formula: `clamp(min, N/1512*100vw, N*2.538px)`.

| Token | Face | Weight | Size | Leading | Tracking | Case |
|---|---|---|---|---|---|---|
| `--t-hero` | Geist Mono | 500 | `clamp(56px, 13vw, 480px)` | .82 | −.05em | upper |
| `--t-h2` | Geist Mono | 400 | `clamp(30px, 4.23vw, 162px)` | .95 | −.035em | sentence |
| `--t-h3` | Geist | 500 | `clamp(20px, 1.85vw, 71px)` | 1.15 | −.02em | sentence |
| `--t-lede` | Geist | 400 | `clamp(21px, 2.25vw, 86px)` | 1.25 | −.015em | sentence |
| `--t-body` | Geist | 400 | `clamp(16px, 1.06vw, 41px)` | 1.55 | 0 | sentence |
| `--t-small` | Geist Mono | 400–500 | `clamp(13px, .8vw, 31px)` | 1.4 | 0 (data) / .06em (labels) | data: as written; labels: upper |

Rules: hierarchy by scale, never bold above 500. Body measure 62ch. Headings `text-wrap: balance`. Numbers in data use `tabular-nums`. Mono stops at display, navigation, buttons, data and code: captions and paragraphs are always Geist.

---

## 4. Space, layout, edges

- Base unit 8px. Fluid tokens: `--s-1 clamp(8px,.53vw,20px)`, `--s-2 clamp(16px,1.06vw,41px)`, `--s-3 clamp(24px,1.59vw,61px)`, `--s-4 clamp(32px,2.12vw,81px)`, `--s-6 clamp(48px,3.17vw,122px)`, `--s-8 clamp(64px,4.23vw,162px)`, `--s-section clamp(72px,8.5vw,325px)`.
- Gutter: `max(16px, env(safe-area-inset-*))`, then `clamp(16px, 3.31vw, 127px)` from tablet up.
- Content column 1180px at 1512 (`--w-content: clamp(320px, 78vw, 2995px)`); text measure 62ch; full-bleed bands for the hero, the arc and media.
- Radius: `--radius: 0`. Everything is square, the cursor too. Exception: none.
- Hairline: `1px solid var(--line)`; on active or selected: `1px solid var(--ink)`. Dashed divider: `repeating-linear-gradient(to right, var(--line) 0 12px, transparent 12px 16px)`, 1px high.
- Elevation: none. No `box-shadow` anywhere. Depth comes from plates (`--ground` < `--plate` < `--plate-2`) and from motion.
- z-index scale: content 0, sticky nav 30, overlays (menu, chatbot) 40, cursor 50, intro 60, toasts 70.

---

## 5. Motion

### Durations
| Token | ms | Use |
|---|---|---|
| `--dur-press` | 67 | Press down, tile stagger |
| `--dur-micro` | 133 | Opacity helper, menu height wipe |
| `--dur-fade` | 200 | Colour ramps on hover, supporting entries |
| `--dur-quick` | 333 | Cursor scale, release after press |
| `--dur-enter` | 400 | Text and panel entries |
| `--dur-exit` | 433 | Anything leaving |
| `--dur-long` | 800 | Clip-mask opening on images |
| `--dur-hero` | 1000 | Hero lines, contact call |

### Easings
| Token | CSS | Use |
|---|---|---|
| `--ease-land` | `cubic-bezier(.22,.78,.51,.94)` | Entries (softLand) |
| `--ease-snap` | `cubic-bezier(.13,1.06,.31,.94)` | Hero, contact call (snapSettle) |
| `--ease-glide` | `cubic-bezier(.53,.91,.89,1)` | Hover shifts, scroll pushes |
| `--ease-inout` | `cubic-bezier(.34,.07,.66,.93)` | Colour and opacity ramps |
| `--ease-exit` | `cubic-bezier(.29,0,.63,.04)` | Leaving (accelExit) |
| linear | `linear` | Scroll-scrubbed values, the field, counters |

TS mirror lives in `client/src/lib/motion.ts`: framer-motion arrays, anime.js `cubicBezier()` functions (never framer-style ease strings in anime: they silently run linear), the pointer spring `{ stiffness: 100, damping: 18, mass: 1 }` shared with hairline.

### Staggers and distances
- Siblings: 100, 67, 67, 67, 67ms; whole wave ≤ 600ms. Never one uniform `staggerChildren`.
- Headline words: 133 to 200ms with ±40% jitter; 1.5 to 2× before the key word. Split by word, never letter, except the scramble.
- Scramble: per char opacity .1→1 in 100ms from `i × 20ms`, random glyphs for 400ms, trigger at 85% of the viewport, once.
- Lede: colour `--ghost` (`#3C096C`) → `--ink` per char, stagger .02, duration .4 in timeline units, scrubbed from 70% to 30% of the viewport.
- Entry offsets: text y +0.03 to 0.07 of its line height; panels slide 0.14 of width or rise from below; images 1.1× → 1 inside the mask.
- Press: .97 in 67ms, release 333ms on land. One spring per page: the contact call lands on snap and may lean once.
- Cursor: big 30px lerp .2, small 8px lerp .45, label lerp .2; hover scale 4 in 333ms; labelled state fill `--violet`, text `--ink`.
- Intro: once per session (`sessionStorage`), 24 × n tiles, two layers (`#EBDBFF`, then `#240046` 200ms later), each 1.05 → 0 toward its bottom-right in 1000ms on land, diagonal wave 1200ms; hero lines from ±5vw.
- Field: WebGL2, one dither cell = 4 CSS px (3 under 640px), 8×8 Bayer, 11 levels, 30fps idle, 60fps while the pointer moves, paused offscreen, on a hidden tab and under reduced motion (one still frame).
- Lenis: `duration: 1.2`, `smoothWheel: true`, `syncTouch: false`; never created under reduced motion.

### Reduced motion
`prefers-reduced-motion: reduce` (and the in-page toggle, if one ships) means: no intro, no Lenis, no custom cursor, the field draws one still frame, scramble and lede jump to their end state, reveals render final, carousel focus jumps without a tween, hairline figures handle themselves. Nothing that carries information may exist only in motion.

---

## 6. Components

All interactive components ship five states: default, hover, focus-visible, active, disabled.

- **Button**: Geist Mono 500, `--t-small`, upper, .06em; padding 14px 18px, min height 44px; `--plate-2` fill, 1px `--line-strong` edge, square. Hover: fill `--ink`, text `--ground` in 200ms on inout, label scramble 400ms. Focus: 2px outline `--violet-hi`, offset 3px. Active: scale .97 in 67ms. Disabled: transparent, `--ink-3` text, 1px dashed `--line`, no scramble.
- **Link**: `--violet-hi`, 1px underline in currentColor; hover to `--ink` in 200ms; focus as button.
- **Input / textarea**: `--plate-2` fill, 1px `--input` edge, square, min height 44px, Geist 16px; focus: edge `--violet-hi` + 2px outline; error: edge `--danger`, message below in `--danger` with an icon, never colour alone.
- **Tag (stack, role)**: Geist Mono 13px, `--ink-2`, 1px `--line` edge, padding 4px 8px. Not interactive, no hover.
- **Media frame**: 1px `--line`, `--plate` behind, clip-mask reveal, real screenshot cropped to readable detail, `alt` that says what the screen shows.
- **Section heading**: `--t-h2` Geist Mono 400, scramble on entry. No kicker, no number above it.
- **Nav**: full-width bar at the top that becomes a square capsule on scroll (fill `--plate-2`, no blur), Geist Mono labels, active section marked by a 1px `--ink` underline and `aria-current`.

---

## 7. Inclusive by default (WCAG 2.2 AA)

- Contrast from section 2; every text pair ≥ 4.5:1, every UI edge that carries meaning ≥ 3:1.
- Skip link to `#main`, landmarks (`header`, `nav`, `main`, `footer`), one `h1`, headings in order, `lang="en"`.
- Keyboard reaches everything the pointer reaches: the arc carousel moves with arrow keys, Home and End, Escape leaves it; focus is never hidden under the sticky nav (`scroll-margin-top`).
- Visible focus everywhere: 2px `--violet-hi` outline, offset 3px. Never `outline: none` without a replacement.
- Touch targets ≥ 44 × 44px. Body ≥ 16px on phones.
- No audio plays until the visitor presses play (the current autoplay attempt goes). No content flashes more than 3 times a second.
- Split text keeps a readable copy: the visual copy is `aria-hidden`, a `.sr-only` copy or `aria-label` carries the words.
- WebGL, cursor, intro and figures are decorative: `aria-hidden`, and the page reads the same without them.
- Third-party embeds (Instagram, TikTok, X, LinkedIn, YouTube) load on request behind a labelled button, so the page stays fast and nothing tracks a visitor who did not ask.
- Every screenshot has alt text that describes what the screen shows; certificates link to their PDF with the file type in the link text.

---

## 8. Libraries and where each source is used

| Source | Role in the build |
|---|---|
| framer-motion 11.18 (installed) | UI state: `AnimatePresence` for menu, chatbot, music volume, floating buttons; `useScroll`/`useTransform` for the hero parallax and the lede scrub; the arc's settle (`animate` on one motion value, driven by a hand-written pointer drag so links inside cards stay clickable); the contact magnet spring |
| anime.js 4.5 | Choreography: `splitText` for headings and the lede, `onScroll` triggers, hero line entrance, clip-mask image reveals, sibling reveals. The intro tiles use the same softLand curve on a canvas. One element is never animated by both libraries. |
| Lenis 1.3 | Smooth scroll, off under reduced motion |
| React Bits (shadcn MCP, `@react-bits`) | Pattern source, ported to anime/framer instead of pulling GSAP: SplitText, ScrollReveal and DecryptedText (headings, lede), Magnet (contact call), GlareHover (one light sweep on the featured project), Dither (reference for the field), CircularGallery or DomeGallery (recognition wall, decided per section) |
| `/api/mcp` (own code) | Read-only MCP server (Streamable HTTP, stateless JSON) in `client/src/content/portfolio-mcp.ts`, wrapped by `client/api/mcp.ts`, `api/mcp.ts` and `server/routes.ts`. Tools read `client/src/content/site.ts`, so the page, the AI and the console never disagree |
| `@lucasmarkes/hairline` | Line-art figures per section, vanilla named imports (about 7 kB each), lazy below the fold, themed from section 2 |
| codapress.co.uk teardown | Field, scramble, lede, cursor, arc, intro, capsule nav |
| agenticwebteam.com | Tracking ladder, Geist pairing, rhythm |
| motionmaxxing | Durations, easings, staggers, the forbidden list |
| Mobbin MCP | Section layout references (`_resources/notes/mobbin-patterns.md`) |
| genjutsu | This pipeline: theses, MASTER, section-by-section build, audit |

Not installed on purpose: GSAP, three.js, `motion` (React Bits `motion/react` imports are aliased to `framer-motion`).

---

## 9. Forbidden (audit checks these)

Lone opacity fades; scale from 0; bounce or elastic beyond the one contact spring; uniform staggers; crossfades between sections; 3D tilt cards; marquee or velocity bands; circle or colour-flood wipes; `box-shadow` glows; blurred blobs; gradient-filled text; `backdrop-filter` panels; perpetual loops other than the field and figures; numbered eyebrows and `01 / 04` counters; tracked-caps kickers over headings; skill percentage bars; big-number stat tiles; scroll cues; emoji as icons; em dashes in copy; filler verbs (elevate, seamless, unleash, empower, revolutionize).
