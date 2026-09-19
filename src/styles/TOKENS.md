# Design tokens — extracted from live sites

Captured **2026-09-19** from `https://anywhereworks.com` and
`https://www.serviceforge.com` using Chrome DevTools Protocol against the
rendered pages.

> **Read section 0 first.** The sections below record what the live sites
> actually use. Section 0 records what this project ships instead, and why.

---

## 0. Final decisions (locked 2026-09-19)

### Font substitutions

Three of the four brand faces are proprietary, so the prototype substitutes
licensed Google Fonts of similar character. Loaded via a single `<link>` in
`index.html` — no `@fontsource` packages, deliberately, to keep the prototype
simple.

| Role | Real brand font | Ships as | Weights loaded |
| --- | --- | --- | --- |
| Display heading | `Paralucent-AW` (AnywhereWorks, proprietary) | **Space Grotesk** | 500, 700 |
| Body / UI | `Simplon BP` (AnywhereWorks, proprietary) | **Inter** | 400, 500, 600 |
| Condensed | `Teko` (ServiceForge) | **Teko** — the genuine face, unchanged | 600 |
| ServiceForge body | `delightFont` (proprietary) | folded into **Inter** | — |

Space Grotesk was chosen for its geometric, slightly quirky grotesque character,
which is the closest free match to Paralucent's wide low-contrast display feel.
Inter is a neutral UI grotesque standing in for Simplon BP. `delightFont` has no
dedicated substitute — ServiceForge body copy just uses Inter, so the prototype
carries one body face rather than two.

### Lead color

**AnywhereWorks blue `#6699FF` is the lead brand color**, exposed as
`--color-brand-primary` and used for the nav and hero. This is a redesign of the
*parent* homepage, so the parent brand leads.

**ServiceForge terracotta `#C94E2F` is reserved for the ServiceForge Solutions
card only.** It is named `--color-serviceforge-accent` rather than a generic
`--color-brand-accent` specifically so it cannot be reached for as a
general-purpose accent. Same for `--color-serviceforge-accent-dark` (`#963A23`).

### Verified

A temporary probe component exercising `font-display`, `font-sans`,
`font-condensed`, `bg-brand-primary`, `bg-serviceforge-accent`, `text-ink`,
`rounded-cta`, `h-nav-aw`, `text-heading-2xl`, and `text-meta-md` confirmed all
six font faces reach `status: "loaded"` (Inter 400/500/600, Space Grotesk
500/700, Teko 600) and that every utility resolves to the intended value. The
probe has been deleted.

Two notes from that check:

- **Teko is only loaded at weight 600.** Pair it with `font-semibold` to be
  explicit; at any other weight the browser falls back to the 600 face
  (measured identical glyph widths at 400 and 600).
- Tailwind v4 tree-shakes theme variables nothing references, so most tokens
  will not appear in the compiled CSS until a component uses them. That is
  expected. A long-running dev server can also miss newly added source files —
  restart `npm run dev` if a new utility appears not to generate.
- **This file is excluded from Tailwind's source scanning** via
  `@source not './styles/**/*.md'` in `index.css`. Because the tables above
  quote class names like `font-display` and `bg-serviceforge-accent` in prose,
  Tailwind was otherwise generating those utilities into the production bundle
  from the documentation alone — it accounted for 5.4 kB of the 12.0 kB CSS.
  Keep that directive if this file grows.

**All measurements were taken at a 1920×1080 viewport (DPR 2).** Both sites are
responsive and change type sizes at smaller breakpoints, so the `font-size` and
`line-height` values below are the desktop end of the scale, not fixed values.

---

## 1. AnywhereWorks (anywhereworks.com)

### Fonts

Self-hosted via `@font-face` in `/core/web/css/style.min.css`. No Google Fonts
or Adobe Fonts (Typekit) link tags exist on the page.

| Family | Weights loaded | Files | Declared fallbacks |
| --- | --- | --- | --- |
| `Paralucent-AW` | 700 only | `Paralucent-AW.woff2` / `.woff` / `.ttf` | `'Trebuchet MS', Trebuchet, sans-serif` |
| `Simplon BP` | 400, 500 | `SimplonBP-Regular.*`, `SimplonBP-Medium.*` | `'Helvetica Neue', Arial, sans-serif` |

Paralucent is the display face (all headings); Simplon BP is body and nav.

### CSS custom properties

**None.** The site defines zero `--` custom properties — confirmed by reading
computed styles on `html` and `body` (0 properties each) and by walking every
readable stylesheet rule for `--` declarations (0 found). There is no exposed
token layer, so every value below is a *computed style* read off a real element.

### Measured elements

| Element | Property | Value |
| --- | --- | --- |
| `nav.navbar` (at scroll 0) | `background-color` | `rgba(255,255,255,0)` — fully transparent over hero |
| | `position` / `height` | `fixed` / `80px` |
| | `color` | `rgb(255,255,255)` → `#FFFFFF` |
| `nav.navbar` (scrolled) | `background-color` | `rgb(255,255,255)` → `#FFFFFF` |
| | `color` and link color | `rgb(24,24,24)` → `#181818` |
| | `transition` | `color 0.4s linear, background-color 0.4s linear` |
| nav links | `font` | Simplon BP, 18px, weight 500, no transform |
| `h1.title--xl` (hero) | `font-family` | `Paralucent-AW, 'Trebuchet MS', Trebuchet, sans-serif` |
| | `font-size` / `line-height` | `120px` / `112px` |
| | `font-weight` | `700` |
| | `letter-spacing` | `-0.5px` |
| | `color` | `rgb(255,255,255)` → `#FFFFFF` |
| hero eyebrow ("OUR MISSION IS SIMPLE") | `font` | Simplon BP, 16px/24px, weight 500 |
| | `letter-spacing` / `text-transform` | `1px` / `uppercase` |
| | `color` | `#FFFFFF` |
| `h2` (section heading) | `font-family` | Paralucent-AW |
| | `font-size` / `line-height` | `72px` / `72px` |
| | `letter-spacing` / `color` | `-0.15px` / `rgb(0,0,0)` → `#000000` |
| hero/section body copy | `font` | Simplon BP, 20px/32px, weight 400 |
| | `color` | `rgb(64,73,91)` → `#40495B` |
| `body` | `color` | `rgb(64,73,91)` → `#40495B` |
| | `background-color` | `rgb(102,153,255)` → `#6699FF` |
| | `font` | Simplon BP, 16px/24px, weight 400 |
| `header.hero` | `background-color` | `rgb(24,24,24)` → `#181818` (behind a photo) |

### Primary CTA — `a.link.link--lg.link--button`

| Property | Value |
| --- | --- |
| `background-color` | `rgb(102,153,255)` → **`#6699FF`** |
| `color` | `rgb(255,255,255)` → `#FFFFFF` |
| `border-radius` | `28px` (pill — exactly half the 56px height) |
| `padding` | `0px 40px` |
| `height` / `line-height` | `56px` / `56px` (text centered via line-height, not padding) |
| `font` | Simplon BP, 20px, weight 500 |
| `letter-spacing` | `0.2px` |
| `border` / `box-shadow` | none |

---

## 2. ServiceForge (serviceforge.com)

Next.js + **Tailwind CSS v4**, and it exposes its entire `@theme` as 134 CSS
custom properties on `:root`. These are authored tokens, not inferred — the
highest-confidence data in this document.

ServiceForge **does run a distinct sub-brand color** from the AnywhereWorks
parent: terracotta `#C94E2F`, not the AnywhereWorks blue `#6699FF`. The two
share no palette values. Its footer links back to AnywhereWorks, confirming the
parent/sub-brand relationship.

### Fonts

| Family | Role | Weights | Source |
| --- | --- | --- | --- |
| `Teko` | display / headings / buttons | 400–700 declared; **700 is the only one actually loaded** | Google font, self-hosted by Next.js |
| `delightFont` | body / nav | 300, 400, 600 loaded | Proprietary, self-hosted |

Font files are hashed (`/_next/static/media/*.woff2`) and preloaded via
`<link rel="preload" as="font">`. Family names come from computed styles and
`document.fonts`, since the stylesheet itself is cross-origin (see gaps below).

Note: the `--font-teko` and `--font-delight` variables resolve to **empty
strings** at `:root`. Next.js injects the real family names on a wrapper
`<div class="__variable_08d9a1 __variable_462b96 font-delight">`, so reading
those two variables alone is misleading.

### Published color tokens (verbatim)

| Token | Value |
| --- | --- |
| `--color-primary` | `#c94e2f` |
| `--color-action-red` | `#c94e2f` |
| `--color-red-light` | `#c94e2f` |
| `--color-red-dark` | `#963a23` |
| `--color-black` | `#150808` |
| `--color-black-100` | `#192525` |
| `--color-brown` | `#240d0d` |
| `--color-white` | `#fff` |
| `--color-white-100` | `#fdfdf7` |
| `--color-yellow-light` | `#f9f9ea` |
| `--color-yellow-dark` | `#f2f1db` |
| `--color-pale-blue` | `#61cefc` |
| `--color-gray-75` | `#e8e3e3` |
| `--color-gray-100` / `--color-divider` | `#e2e2e7` |
| `--color-gray-200` / `--text-alt-gray` | `#999c9e` |
| `--color-gray-300` | `#707477` |
| `--text-alt-orange` | `#c94e2f` |
| `--gradient-dark-overlay` | `linear-gradient(270deg,#1925254d 26.3%,#192525 80.81%)` |

`--color-gray-500` through `--color-gray-900` are Tailwind v4 defaults in
`oklch()` and are not part of the brand palette.

### Published type scale (verbatim)

| Token | Size | Line height | Weight |
| --- | --- | --- | --- |
| `--text-heading-3xl` | `5.625rem` | `100px` | 800 |
| `--text-heading-2xl` | `4rem` | `3.6rem` | 800 |
| `--text-heading-xl` | `3rem` | `2.7rem` | 800 |
| `--text-heading-lg` | `2.5rem` | `2.25rem` | 800 |
| `--text-heading-md` | `2rem` | `1.8rem` | 800 |
| `--text-heading-sm` | `1.5rem` | `2.1rem` | 700 |
| `--text-body-xl` | `1.25rem` | `1.75rem` | — |
| `--text-body-lg` | `1.125rem` | `1.575rem` | — |
| `--text-body-md` | `16px` | `20px` | — |
| `--text-meta-md` | `0.875rem` | `1.25rem` | 600, `letter-spacing: 1px` |

Other structural tokens: `--sf-nav-height: 5.5rem` (88px),
`--shadow-black-sm: 0 4px 4px 0 #0000000d`, `--radius-lg: .5rem`,
`--radius-2xl: 1rem`, `--radius-3xl: 1.5rem`, `--blur-sm: 8px`.

### Measured elements

| Element | Property | Value |
| --- | --- | --- |
| `header` (at scroll 0) | classes | `fixed z-50 w-full transition-all duration-300 ease-in-out bg-transparent shadow-none` |
| | `background-color` / `height` | transparent / `88px` |
| `header` (scrolled) | classes | `bg-yellow-light shadow-black-sm` |
| | `background-color` | `rgb(249,249,234)` → `#F9F9EA` |
| | `box-shadow` | `0 4px 4px 0 #0000000d` |
| nav items | `font` | delightFont, 14px, weight 700 |
| | `color` over hero / scrolled | `#FDFDF7` / `--color-gray-700` |
| `h1` ("GET BOOKED. GET PAID.") | classes | `font-teko font-extrabold text-heading-xl md:text-heading-3xl tracking-[0.02em]` |
| | `font-family` | `Teko, 'Teko Fallback'` |
| | `font-size` / `line-height` | `90px` / `100px` |
| | `font-weight` | `800` |
| | `letter-spacing` | `1.8px` (= `0.02em`) |
| | `color` | `rgb(253,253,247)` → `#FDFDF7` |
| hero subhead | `font-family` | `delightFont` |
| | `font-size` / `line-height` | `20px` / `28px` |
| | `font-weight` / `color` | `400` / `#FDFDF7` |
| `body` | `background-color` | `rgb(249,249,234)` → `#F9F9EA` |
| | `color` | `rgb(0,0,0)` |
| | `font-family` | falls back to `--font-sans` (Tailwind default UI stack) |

### Primary CTA — "Start FREE"

Two sizes are in use. Both are `Teko` weight 700 on terracotta.

| Property | Hero / large | Nav / small |
| --- | --- | --- |
| `background-color` | `rgb(201,78,47)` → **`#C94E2F`** | same |
| `color` | `rgb(242,241,219)` → `#F2F1DB` (the cream, not pure white) | same |
| `border-radius` | fully rounded (`rounded-full`, reported as `1.67772e+07px`) | same |
| `padding` | `16px 32px` | `10px 20px` |
| `height` | `57.2px` | `40px` |
| `font-size` | `18px` | `14px` |
| `letter-spacing` | `normal` | `0.5px` |
| `border` / `box-shadow` | none | none |

---

## 3. Gaps and things I could not read reliably

Listed explicitly rather than guessed.

1. **Both sites' main stylesheets are cross-origin**, so `cssRules` throws
   `SecurityError` and I could not enumerate their authored rules:
   - ServiceForge: `https://cdn.serviceforge.com/_next/static/css/3ac75b976fa45e83.css`.
     This means **no `@font-face` blocks were readable** for ServiceForge — the
     Teko and delightFont names come from computed styles and `document.fonts`,
     which is reliable for family/weight but gives no `src` URLs or unicode
     ranges. Its color and type tokens were still fully recoverable because
     they are exposed as custom properties.
   - AnywhereWorks: `https://storage.googleapis.com/.../IntlTelInput/intlInput.css`.
     This is a third-party phone-input widget stylesheet and contains no brand
     tokens. The AnywhereWorks brand stylesheet itself was same-origin and read
     successfully.

2. **The ServiceForge hero has no readable background color.** Every ancestor
   from `h1` up to `body` computes to `rgba(0,0,0,0)`. The dark backdrop is a
   photo/video element plus `--gradient-dark-overlay`. The gradient token is
   real and captured; the apparent "dark hero background" is not a single color
   value and I have not invented one. Its section uses variant classes
   (`black:bg-black-100`, `yellowDark:bg-yellow-dark`, …) switched by a data
   attribute, so the *possible* backgrounds are `#192525`, `#F2F1DB`, and
   `#F9F9EA`.

3. **The AnywhereWorks hero background is a photograph.** `header.hero`
   computes to `#181818`, which is the fill behind the image, not a flat brand
   background. Treat it as a dark-surface value only.

4. **Three of the four brand fonts are proprietary and not publicly
   obtainable**: `Paralucent-AW` and `Simplon BP` (AnywhereWorks) and
   `delightFont` (ServiceForge). They are served from the brands' own origins
   and are not on Google Fonts. Only **Teko** is freely available. This is
   resolved by the substitutions in section 0 — the `@theme` block no longer
   references the proprietary families, so **no measurement in this document
   describes what the prototype actually renders.** Treat sections 1 and 2 as a
   record of the live sites, not of this codebase.

5. **`delightFont` weight 700 is synthesized.** ServiceForge's nav applies
   weight 700 but only 300/400/600 faces are loaded, so the browser fakes it.

6. **Type sizes are viewport-dependent.** Both heroes were measured at 1920px.
   ServiceForge's `h1` measured `90px` there via `md:text-heading-3xl`, while
   its base class `text-heading-xl` is `3rem`/48px on small screens. The
   AnywhereWorks `120px` h1 will likewise be smaller at narrower widths; I did
   not capture its breakpoint ladder.

7. **No hover or focus states were captured** for either CTA — those require
   synthetic pointer state that CDP `Input.*` is blocked from driving here.
   `--color-red-dark: #963a23` is ServiceForge's likely hover fill given its
   name, but I did not observe it applied.
