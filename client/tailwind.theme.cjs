// Shared Tailwind theme for both build entries (root tailwind.config.js and client/tailwind.config.cjs).
// Values mirror MASTER.md; the CSS variables live in client/src/index.css.
const rgb = (name) => `rgb(var(--${name}) / <alpha-value>)`;
const hsl = (name) => `hsl(var(--${name}))`;

const themeExtend = {
  colors: {
    background: hsl("background"),
    foreground: hsl("foreground"),
    card: { DEFAULT: hsl("card"), foreground: hsl("card-foreground") },
    popover: { DEFAULT: hsl("popover"), foreground: hsl("popover-foreground") },
    primary: { DEFAULT: hsl("primary"), foreground: hsl("primary-foreground") },
    secondary: { DEFAULT: hsl("secondary"), foreground: hsl("secondary-foreground") },
    muted: { DEFAULT: hsl("muted"), foreground: hsl("muted-foreground") },
    accent: { DEFAULT: hsl("accent"), foreground: hsl("accent-foreground") },
    destructive: { DEFAULT: hsl("destructive"), foreground: hsl("destructive-foreground") },
    border: hsl("border"),
    input: hsl("input"),
    ring: hsl("ring"),
    chart: {
      1: hsl("chart-1"),
      2: hsl("chart-2"),
      3: hsl("chart-3"),
      4: hsl("chart-4"),
      5: hsl("chart-5"),
    },
    sidebar: {
      DEFAULT: hsl("sidebar-background"),
      foreground: hsl("sidebar-foreground"),
      primary: hsl("sidebar-primary"),
      "primary-foreground": hsl("sidebar-primary-foreground"),
      accent: hsl("sidebar-accent"),
      "accent-foreground": hsl("sidebar-accent-foreground"),
      border: hsl("sidebar-border"),
      ring: hsl("sidebar-ring"),
    },
    ground: rgb("ground"),
    plate: { DEFAULT: rgb("plate"), 2: rgb("plate-2") },
    line: { DEFAULT: rgb("line"), strong: rgb("line-strong") },
    edge: rgb("edge"),
    violet: { DEFAULT: rgb("violet"), hi: rgb("violet-hi") },
    arrive: rgb("arrive"),
    ghost: rgb("ghost"),
    ink: { DEFAULT: rgb("ink"), 2: rgb("ink-2"), 3: rgb("ink-3") },
    danger: rgb("danger"),
  },
  fontFamily: {
    sans: ["Geist", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
    display: ["Geist Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
    mono: ["Geist Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
  },
  fontSize: {
    hero: ["var(--t-hero)", { lineHeight: ".82", letterSpacing: "-.05em" }],
    h2: ["var(--t-h2)", { lineHeight: ".95", letterSpacing: "-.035em" }],
    h3: ["var(--t-h3)", { lineHeight: "1.15", letterSpacing: "-.02em" }],
    lede: ["var(--t-lede)", { lineHeight: "1.25", letterSpacing: "-.015em" }],
    body: ["var(--t-body)", { lineHeight: "1.55" }],
    small: ["var(--t-small)", { lineHeight: "1.4" }],
  },
  spacing: {
    "s-1": "var(--s-1)",
    "s-2": "var(--s-2)",
    "s-3": "var(--s-3)",
    "s-4": "var(--s-4)",
    "s-6": "var(--s-6)",
    "s-8": "var(--s-8)",
    section: "var(--s-section)",
    nav: "var(--nav-h)",
  },
  maxWidth: {
    measure: "62ch",
    content: "var(--w-content)",
  },
  borderRadius: {
    lg: "var(--radius)",
    md: "var(--radius)",
    sm: "var(--radius)",
  },
  transitionTimingFunction: {
    land: "var(--ease-land)",
    snap: "var(--ease-snap)",
    glide: "var(--ease-glide)",
    inout: "var(--ease-inout)",
    exit: "var(--ease-exit)",
  },
  transitionDuration: {
    press: "67ms",
    micro: "133ms",
    fade: "200ms",
    quick: "333ms",
    enter: "400ms",
    exit: "433ms",
    long: "800ms",
    hero: "1000ms",
  },
  zIndex: {
    nav: "30",
    overlay: "40",
    cursor: "50",
    intro: "60",
    toast: "70",
  },
  keyframes: {
    "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
    "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
  },
  animation: {
    "accordion-down": "accordion-down 0.2s ease-out",
    "accordion-up": "accordion-up 0.2s ease-out",
  },
};

module.exports = { themeExtend };
