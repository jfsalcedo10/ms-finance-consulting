# M&S Finance Consulting — context for Claude

Read this before making changes. It covers the *why* behind decisions that
aren't obvious from the code, plus mistakes already made once — don't repeat
them.

## Who this is for

Real client site for the user's dad, Emilio Salcedo, a one-man accounting
practice (M&S Finance Consulting) in Cartagena, Colombia, 30+ years in
business. The user (Juan Felipe Salcedo) recently joined offering data
analysis/tech services under the same brand — that's why "Data Analysis" is
a first-class service alongside traditional accounting, and why he appears
on the About page as a second team member. The user is a data scientist,
comfortable technically but rusty on frontend/web dev, and this was their
first time using Claude Code — so favor explaining *why*, not just doing.

Not in production yet. Currently previewed via a local `python3 -m
http.server` + a Cloudflare quick tunnel (ephemeral URL, dies when the
process stops — don't assume a tunnel from a past session is still live;
start a fresh one if asked to share a preview link). GitHub Pages is the
agreed path once the client is ready to go live — see README.

## Stack and non-negotiables

Plain HTML/CSS/JS, zero build tools, zero npm dependencies. This is
intentional — the site must open directly via `file://` (double-click
`index.html`) or a trivial static server, nothing more. Don't introduce a
bundler, framework, or package.json unless explicitly asked; it would break
the "just open the file" simplicity that was a deliberate choice.

Bilingual (ES/EN), default language is **Spanish** (not browser-language
detection — that was tried and explicitly rejected, see Decisions below).
All copy lives in `js/i18n.js` as a JS object (not fetched JSON, so it works
over `file://` without CORS issues). **Edit copy in `js/i18n.js`, never in
the HTML text nodes** — every element with `data-i18n="key.path"` has its
textContent overwritten on page load, so HTML edits get silently discarded.
This has already tripped up the user once.

## Design system

"Ledger" aesthetic: warm cream paper background with a faint grid-line
texture, deep-teal ink, brand green used sparingly as a sharp accent (not a
pastel wash). Typography is **Piazzolla** (headings) + **Public Sans**
(body/UI) — deliberately *not* Fraunces/IBM Plex Mono, which was the first
attempt and got user feedback that it "looks very Claude-like" (an
editorial-serif + engineering-mono pairing has become a recognizable
AI-generated-site signature). If picking fonts again, avoid that formula —
don't reach for a serif+mono combo as the "distinctive" default.

All three brand colors (`--color-teal`, `--color-green`, `--color-slate` in
`css/styles.css`) were sampled directly from the client's real logo
(`assets/ms-logo.jpg`) via pixel clustering, not eyeballed. If the logo ever
changes, re-derive by sampling the new file the same way rather than
guessing.

Icons are hand-drawn inline SVGs (stroke-based, `currentColor`), not a
library like Feather/Heroicons/Lucide — that was a deliberate call to avoid
another "every AI site looks like this" tell.

Language switcher is a dropdown (`.lang-select`), not a two-button toggle —
user explicitly disliked the toggle's feel.

## Known gotchas (already debugged once — don't reintroduce)

1. **Don't put a CSS `transform` (including via `animation`) on the same
   SVG element that already has an SVG `transform` *attribute*.** The CSS
   transform completely replaces the attribute instead of composing with
   it, silently breaking the element's position/scale. This bit the logo's
   `ms-slate`/`ms-teal` groups — fixed by wrapping in an extra `<g>`: outer
   group holds the position/scale attribute, inner group holds the
   CSS-animated class. See the header markup in any page for the pattern.

2. **Don't reference the logo via `<img src="assets/logo.svg">` if it needs
   to animate.** Safari does not reliably run CSS animations on SVGs loaded
   through `<img>` — it can freeze on the animation's first frame forever.
   The animated logo is inlined directly in each page's `<header>`;
   `assets/logo.svg` is kept only as a clean static reference (used for the
   favicon, where this doesn't matter).

3. **Don't put two classes with independently-declared `margin`/layout
   rules on the same element** (e.g. `class="container cta-banner"`) if one
   of them relies on `margin: 0 auto` for centering — the later CSS rule
   silently wins and kills the centering. This broke the CTA banner once.
   Prefer nesting: `<div class="container"><div class="cta-banner">`.

4. Every page repeats the same header/nav/language-dropdown/footer markup
   (no templating, by design). When changing any of them, **grep across all
   four HTML files** (`index.html`, `about.html`, `services.html`,
   `contact.html`) — it's easy to update three and miss one.

## Outstanding TODOs

Tracked in `README.md` under "TODO before going live" — currently just the
full street address, a real Web3Forms access key for the contact form (it's
wired up in `contact.html`/`js/main.js` but still has the placeholder
`WEB3FORMS_ACCESS_KEY` value — see "Contact form setup" in README),
founder's exact professional credentials wording, and real photos. Check
that section before assuming something is still a placeholder.
