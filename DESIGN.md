---
name: M&S Finance Consulting
description: A father-son accounting practice in Cartagena — 30 years of ledger-and-ink trust, growing into data.
colors:
  deep-harbor-teal: "#036a7a"
  deep-harbor-teal-deep: "#023b45"
  deep-harbor-teal-bright: "#0299a8"
  growth-green: "#7eb92c"
  slate-ink: "#46545d"
  paper: "#f6efe1"
  card-cream: "#fffcf4"
  ink: "#17262a"
  ink-muted: "#566268"
  hairline: "rgba(23, 38, 42, 0.14)"
  grid-line: "rgba(3, 106, 122, 0.07)"
  paper-white: "#ffffff"
typography:
  display:
    fontFamily: "Piazzolla, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.1rem, 4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  headline-lg:
    fontFamily: "Piazzolla, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.9rem, 3.5vw, 2.6rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Piazzolla, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.6rem, 2.5vw, 2.1rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  headline-sm:
    fontFamily: "Piazzolla, Georgia, 'Times New Roman', serif"
    fontSize: "1.15rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  headline-xl:
    fontFamily: "Piazzolla, Georgia, 'Times New Roman', serif"
    fontSize: "1.9rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  brand-mark:
    fontFamily: "Piazzolla, Georgia, 'Times New Roman', serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "'Public Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  body-lg:
    fontFamily: "'Public Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.12rem"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "'Public Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.6
  body-xs:
    fontFamily: "'Public Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'Public Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.04em"
  label-sm:
    fontFamily: "'Public Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.76rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.06em"
  icon-glyph:
    fontFamily: "'Public Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 600
    lineHeight: 1
rounded:
  sm: "7px"
  md: "10px"
spacing:
  gutter: "24px"
  card: "28px"
  rhythm: "76px"
components:
  button-primary:
    backgroundColor: "{colors.growth-green}"
    textColor: "{colors.deep-harbor-teal-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.85em 1.75em"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.deep-harbor-teal-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.85em 1.75em"
  button-secondary-hover:
    backgroundColor: "{colors.deep-harbor-teal-deep}"
    textColor: "{colors.paper}"
  card:
    backgroundColor: "{colors.card-cream}"
    rounded: "{rounded.md}"
    padding: "28px"
  input:
    backgroundColor: "{colors.paper-white}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "12px 14px"
---

# Design System: M&S Finance Consulting

## Overview

**Creative North Star: "The Growth Ledger"**

The practice was built on thirty years of ledgers, ink, and paper — and its future is a father-son partnership where the accounting foundation now grows into data analysis and data engineering. The visual system says both things at once: a warm ledger-paper atmosphere (a faint engraved security-paper texture, ink tones, a serif that reads as trustworthy and established) carries a sparing, deliberate green accent that stands for growth, data, and forward motion. Neither side dominates — the paper-and-ink world is the base layer everything sits on, and the green is the signal that something modern and analytical is happening inside it.

The voice is modern-meets-traditional: it foregrounds the actual contrast in the business (a credentialed accountant of 30+ years, a data scientist son) rather than picking one aesthetic and hiding the other. Components stay precise and document-like — tight corner radii, restrained motion, shadows that only appear in response to touch — because a ledger does not perform for attention; it earns trust through precision.

A dedicated mono/label typeface was tried early and explicitly rejected: it read as a generic "AI-generated dev-tool" aesthetic rather than an accounting practice. The system deliberately runs on exactly two typefaces.

**Key Characteristics:**
- Warm ledger-paper base (faint engraved security-paper texture, cream/paper tones) instead of a flat, gradient, or notebook-like ruled/grid background
- Deep Harbor Teal as the dominant identity color; Growth Green used rarely and only with intent
- Two typefaces only — an editorial serif for trust, a precise sans for everything functional
- Flat-at-rest surfaces; shadows exist only as a response to hover, scroll, or open state
- Tight 7–10px radii everywhere; no pill-shaped buttons

## Colors

A dominant teal-and-paper identity with green treated as a rare, high-value signal rather than a decorative accent color.

### Primary
- **Deep Harbor Teal** (`#036a7a`): The identity color — links, secondary-button borders, icon glyphs, the "M" in the wordmark. Named for Cartagena's port setting.
- **Deep Harbor Teal Deep** (`#023b45`): Headings, the dark end of every gradient band (CTA banner, footer, `.section-alt`), secondary-button hover fill.
- **Deep Harbor Teal Bright** (`#0299a8`): Reserved for the "S" in the M&S wordmark only — a single bright accent inside an otherwise deep-toned identity.

### Secondary
- **Growth Green** (`#7eb92c`): Primary-button fill (rest and hover — see the No-Darker-Green Rule below), focus rings, active nav underlines, footer icon accents, the values-list dot. Never used as a background fill or large surface color.

### Neutral
- **Slate Ink** (`#46545d`): The logo's third color; used for the "&" in the wordmark and nowhere else as a UI color — reserved for that one deliberate echo of the mark.
- **Paper** (`#f6efe1`): Page background; carries the engraved security-paper texture.
- **Card Cream** (`#fffcf4`): Card, form, and dropdown-menu surfaces — a shade lighter than the page paper so surfaces read as "placed on" the page.
- **Ink** (`#17262a`): Primary body text.
- **Ink Muted** (`#566268`): Secondary text — subtitles, card copy, muted footer text.
- **Hairline** (`rgba(23, 38, 42, 0.14)`): Borders on cards, inputs, dropdowns, the header's scrolled-state divider.
- **Grid Line** (`rgba(3, 106, 122, 0.07)` base color, rendered at ~0.06 stroke opacity in the pattern itself): The faint concentric-ring guilloché texture behind the entire page — the engraved pattern used on banknotes, checks, and certificates. (Named for the underlying CSS variable; two earlier versions — a two-axis grid, then plain horizontal rule lines — were both tried and rejected for reading as notebook/school paper rather than a financial document. See the Security-Paper Rule in Layout.)
- **Paper White** (`#ffffff`): Form field backgrounds only, for contrast against the cream card surface they sit inside.

### Named Rules
**The Sparing Green Rule.** Growth Green appears only on things the visitor can act on or that are actively true right now — buttons, focus states, active nav, hover accents. It is never a background, never decorative, and never covers more than a small control at a time.

**The One Bright Accent Rule.** Deep Harbor Teal Bright exists in exactly one place: the "S" of the wordmark. It is not a reusable UI color — its rarity is what makes the wordmark read as a real logotype instead of styled text.

**The No-Darker-Green Rule.** Deep Harbor Teal Deep text only pairs safely with the base Growth Green — darkening the green for a hover/active state drops contrast below WCAG AA (a "Growth Green Deep" fill was tried and measured at 3.15:1 against the 4.5:1 minimum for non-large text, and removed). If a state needs to read as "deeper," change elevation (shadow/lift) or switch to a light-on-Deep-Harbor-Teal-Deep treatment instead of darkening the green under dark text.

## Typography

**Display Font:** Piazzolla (with Georgia, Times New Roman fallback)
**Body Font:** Public Sans (with -apple-system, BlinkMacSystemFont fallback)

**Character:** An editorial serif built for warmth and permanence, paired with a clean geometric sans built for precision — the same father/son, traditional/data-science contrast the whole system is built around. Both typefaces are legible-first and neither leans decorative or trendy.

### Hierarchy

Six Piazzolla (display-family) steps and six Public Sans steps, all consolidated onto values the codebase actually reuses — no step exists for only one element.

**Display family (Piazzolla, 600 weight, 1.2 line-height, -0.01em letter-spacing throughout):**
- **Display** (`clamp(2.1rem, 4vw, 3rem)`): Hero H1 only — the single largest, most weighted text on the site.
- **Headline Large** (`clamp(1.9rem, 3.5vw, 2.6rem)`): Page-header H1s on About/Services/Contact.
- **Headline** (`clamp(1.6rem, 2.5vw, 2.1rem)`): Section H2s — the default, most common headline step.
- **Headline Small** (`1.15rem`, fixed): Card/team H3s and the footer brand name.
- **Headline XL** (`1.9rem`, fixed, rendered italic in the founder/team avatars): The oversized initials inside team-member avatars — the one place Piazzolla appears in its italic form.
- **Brand Mark** (`1.25rem`, fixed): The header logotype text next to the icon. Deliberately not tied to the H1–H4 hierarchy — it is identity/logotype text, not a content heading, so it gets its own step rather than being forced onto a nearby headline size.

**Body family (Public Sans):**
- **Body** (400, `1rem`, 1.6 line-height): All paragraph copy. Hero/page-header subtitles are additionally capped near 60–65ch for readability.
- **Body Large** (400, `1.12rem`, 1.6 line-height): The hero subtitle only.
- **Body Small** (400, `0.95rem`, 1.6 line-height): Form input and textarea text.
- **Body XS** (400, `0.85rem`, 1.5 line-height): Form notes, the footer tagline and footer body copy, the team-card role line, language-dropdown menu items.
- **Label** (600, `0.82rem`, uppercase, 0.04em letter-spacing, 1.4 line-height): Nav links and form field labels.
- **Label Small** (600, `0.76rem`, uppercase, 0.06em letter-spacing, 1.4 line-height): Eyebrows, footer column headings, the language-dropdown toggle, the footer copyright line.
- **Icon Glyph** (600, `1.3rem`, Public Sans, no line-height adjustment beyond `1`): The numeral/glyph inside a `.card-icon` chip (e.g. "30+"). Functions as an icon substitute, not running text, so it sits outside the body/label hierarchy on purpose.

### Named Rules
**The No Third Typeface Rule.** Every label, nav link, eyebrow, and button uses the body sans (uppercase + letter-spaced), never a dedicated mono or "UI" font. A mono label font was implemented once and replaced specifically because it read as a generic AI-tool aesthetic rather than a real brand decision — don't reintroduce one.

**The Two-Exception Rule.** Exactly two text treatments sit outside the display/body hierarchy on purpose: the Brand Mark (header logotype) and the Icon Glyph (card numeral chips). Both function as identity/iconography, not content, which is why they don't inherit a nearby headline or label step. Do not add a third "just this once" exception without folding it into the named scale above.

## Layout

A centered `1120px` max-width container with `24px` horizontal padding (the gutter) on every page. Section rhythm runs on a `76px` vertical padding block on desktop (hero `100px`/`76px`, page-header `84px`/`52px`) — tightened at `640px` (hero `56px`/`44px`, page-header `48px`/`16px`, section `32px`) so that stacked padding between a page-header and the section beneath it doesn't compound into ~130px of dead space on a short mobile viewport. Card and service grids run 3-across (or 2-across for the About team) on desktop, dropping to 2 columns at `860px` and stacking to 1 column at `640px`. The header is `position: sticky` with a translucent, blurred paper background that only gains a shadow and hairline border once the page scrolls. The entire page sits on a faint `120px`-tiled concentric-ring guilloché texture (the `grid-line` neutral, at low opacity) — the engraved-line pattern used on banknotes, checks, and certificates — this is the one atmosphere layer that never turns off, including on interior pages.

### Named Rules
**The No-Stacking-Padding Rule.** A section-transition element's padding (page-header, hero) and the padding of whatever follows it are tuned together, not independently — check the *combined* gap they produce, especially at the `640px` breakpoint, not each rule's value in isolation.

### Named Rules
**The Security-Paper Rule.** The background texture is a concentric-ring guilloché pattern — the engraved linework printed on banknotes, checks, and certificates — never straight ruled lines or a plain grid. Both of those were tried and rejected: a two-axis grid read as generic blueprint decoration, and horizontal-only ruled lines read as school-notebook paper. Keep the pattern's opacity very low (~0.06 stroke-opacity) and the tile large (120px) — an earlier denser/darker pass looked fine in an isolated swatch but was overwhelming across a real full-height page. Always verify against a real rendered page, not a small mockup.

## Elevation & Depth

Flat by default, hybrid on interaction. Nothing carries a shadow at rest except the two states that need visual separation from the page (the open language dropdown and the sticky header once scrolled); every card and button is flush with the page until the visitor touches it.

### Shadow Vocabulary
- **Resting lift** (`box-shadow: 0 1px 3px rgba(23, 38, 42, 0.1)`): Cards and buttons at rest, and the header once the page has scrolled.
- **Active lift** (`box-shadow: 0 12px 28px rgba(23, 38, 42, 0.14)`): Card hover, button hover, and the open state of the language dropdown menu.

### Named Rules
**The Flat-Until-Touched Rule.** Depth is earned by interaction, not applied by default. If an element isn't hovered, focused, scrolled-past, or open, it should not carry a shadow.

## Shapes

Two-step radius system: `7px` (buttons, inputs, the language-dropdown toggle) and `10px` (cards, the CTA banner, founder/team avatars). Nothing in the system uses a fully rounded (pill) shape — buttons were deliberately moved away from a pill silhouette to this tighter radius because a document-like, slightly squared corner reads as a ledger/statement rather than a generic SaaS product.

Two deliberate exceptions sit outside the 7px/10px scale, both nested inside a parent that already carries a scale radius: the language-dropdown's individual menu items use `5px` (slightly tighter than the 7px menu container they sit inside, which is the standard convention for a radius nested one level deep), and the nav-link hover underline — a 2px-tall decorative bar — uses `2px` purely to soften its own end-caps, unrelated to any container shape. Neither is a new scale step; both are one-off, single-use details.

### Named Rules
**The No-Pill Rule.** No button, chip, or badge is ever fully rounded. The system's two radius steps (7px / 10px) are the ceiling.

## Components

### Buttons
- **Shape:** 7px radius (`rounded-sm`), never pill-shaped.
- **Primary:** Growth Green background, Deep Harbor Teal Deep text, `0.85em 1.75em` padding, resting-lift shadow. Hover keeps the same Growth Green fill — a darker fill was tried and dropped for failing WCAG AA contrast against the dark text (3.15:1, needs 4.5:1) — and signals interactivity with active-lift shadow and a `-2px` Y-axis lift only, the same shadow-plus-lift language cards use.
- **Secondary:** Transparent background, Deep Harbor Teal Deep text and border. Hover fills solid Deep Harbor Teal Deep with Paper-colored text — a full color inversion, not just a border-color change.

### Cards
- **Corner Style:** 10px radius.
- **Background:** Card Cream, one shade lighter than the page's Paper background.
- **Shadow Strategy:** Resting-lift at rest, active-lift plus a border-color shift to Deep Harbor Teal on hover (see Elevation & Depth).
- **Border:** 1px Hairline.
- **Internal Padding:** 28px standard; team/founder cards and the contact form use 32px.

### Inputs / Fields
- **Style:** 1px Hairline border, Paper White background, 7px radius, `12px 14px` padding.
- **Focus:** Border shifts to Growth Green plus a soft `3px` Growth Green glow ring (`rgba(126, 185, 44, 0.2)`) — no default browser outline.

### Navigation
- **Style:** Uppercase Label-typography links with 0.03em letter-spacing. An underline grows from 0 to 100% width in Growth Green on hover; the active page's link stays solid Deep Harbor Teal Deep with the underline permanently shown.
- **Language switcher:** A bordered dropdown toggle (current language code + chevron) opening a small menu — not a two-button toggle; that pattern was tried and replaced for feeling too utilitarian.
- **Mobile:** The nav collapses into a fixed full-width panel that slides down from under the header, triggered by a 3-line hamburger icon; the header's "Finance Consulting" wordmark tail hides below 640px to avoid wrapping.

### Logo Mark (signature component)
The header logo is an inline `<svg>` written directly into each page's `<header>` — never `<img src="logo.svg">` — because Safari does not reliably run CSS animations on images loaded that way. On load, the mark's bar-chart shapes and slate/teal layers rise in with a staggered `translateY` + opacity animation (`msRiseIn`, 0.55s, staggered 0.05s–0.58s), echoing the actual growth-chart icon in the real logo. `assets/logo.svg` itself stays a clean, unanimated copy used only for the favicon.

## Do's and Don'ts

### Do:
- **Do** keep Growth Green rare — buttons, focus rings, active states, small accents only. Never a fill for a large surface.
- **Do** keep the engraved security-paper texture running under every page; it is the system's one constant atmosphere layer. Keep it very quiet (~0.06 opacity) — this pattern reads correctly only at low intensity.
- **Do** hold buttons, inputs, and small controls to the 7px radius and cards/banners to 10px — never introduce a pill shape.
- **Do** apply shadows only in response to hover, scroll, or open state (Flat-Until-Touched Rule).
- **Do** respect `prefers-reduced-motion` for every animation in the system (hero/page-header reveals, scroll-reveal cards, the logo grow-in).

### Don't:
- **Don't** introduce a third typeface, especially a mono/"dev-tool" one, for labels or UI text — Public Sans at a smaller uppercase treatment is the label style; a dedicated mono font was tried and rejected for reading as generic AI-tool output.
- **Don't** load the animated logo via `<img src="assets/logo.svg">` — inline the SVG in the page's markup so its CSS animation actually runs in Safari.
- **Don't** fabricate testimonials, certifications, client logos, or case studies. PRODUCT.md confirms none exist yet; only real, confirmed facts belong on the site.
- **Don't** give the two-button toggle pattern back to the language switcher — it was replaced by the dropdown for feeling too utilitarian for this brand.
