# Design: Indexable bilingual URLs

**Date:** 2026-08-11
**Status:** Approved, ready for implementation planning
**Depends on:** the `privacy-policy-and-seo` branch being merged first (this spec
assumes five pages per language, including `privacy.html`).

## Problem

The site is bilingual but serves both languages from a single URL per page.
Language is swapped client-side by `js/i18n.js` after load, with the choice kept
in `localStorage`. Consequences:

- There is no `hreflang`, and no way to express that an English version exists.
- Google indexes one version per URL. In practice that is Spanish, the default.
- The English site is therefore effectively absent from search results.

This matters more than it would for a generic site. `PRODUCT.md` names
foreign/expat residents and business owners in Cartagena as a primary audience,
and the practice's differentiator — a credentialed accountant paired with an
in-house MSc in Statistics and Data Science — is most valuable to exactly the
people least able to find it today.

## Scope

Infrastructure only: give each language its own indexable URL and wire up the
SEO metadata that depends on that.

**Out of scope**, handled as a separate follow-up project: the actual
expat/foreigner copy, data-science keyword targeting, Google Business Profile
setup, and the street address. That project adds `extranjeros.html` /
`en/foreigners.html` — one page per language — which this generator supports
with no changes.

## Decisions

| Decision | Choice | Why |
|---|---|---|
| Page generation | Python stdlib script, output committed | Separate URLs need 10 HTML files; hand-maintaining them doubles an already-documented drift hazard. No npm, no bundler. |
| URL scheme | Spanish at root, English under `/en/` | GitHub Pages cannot issue 301s. This needs no redirect at all and leaves every currently-indexed Spanish URL untouched. |
| EN/ES symmetry | Strict mirror | Every page exists in both languages, so `hreflang` pairs are always clean. |
| Copy source | `content/es.json`, `content/en.json` | Pre-rendered pages never fetch copy, so the `file://` CORS constraint that forced JS over JSON no longer applies. Python reads JSON natively — no Node in the build. |

### On "expat" ≠ "English-speaking"

Foreigner-focused content belongs in **both** languages. Cartagena's foreign
population includes many Venezuelan, Argentine, and Spanish residents and
business owners who search in Spanish. The audience axis (local vs. foreign) is
independent of the language axis, and treating them as the same thing would aim
the follow-up content at roughly half its real market.

The page *set* stays symmetric; copy **depth** differs per language. The English
foreigner page explains DIAN, RUT, and declaración de renta from first
principles; the Spanish one can assume a Latin American reader already knows
what they are.

## Architecture

```
build.py                 python3 build.py   -> writes /*.html and en/*.html
verify.py                python3 verify.py  -> checks the generated output
templates/
  base.html              shared shell: <head>, header/nav, footer
  pages/
    index.html           page bodies, {{ key.path }} placeholders
    about.html
    services.html
    contact.html
    privacy.html
content/
  es.json                copy — source of truth
  en.json
css/styles.css           unchanged
js/main.js               unchanged behaviour, minus i18n
```

Generated output committed to the repo, because GitHub Pages serves from `main`:

```
index.html  about.html  services.html  contact.html  privacy.html
en/index.html  en/about.html  en/services.html  en/contact.html  en/privacy.html
sitemap.xml
```

### Template engine

`{{ key.path }}` string substitution against the language's JSON. No loops, no
conditionals, no expressions. If a template ever needs logic, that is a signal
the content model is wrong, not that the engine needs features.

`base.html` exposes exactly **two** slots:

- `{{ content }}` — the page body
- `{{ head_extra }}` — per-page `<head>` markup

The second slot is required, not optional. `services.html` already carries a
JSON-LD `hasOfferCatalog` block that the other four pages do not, so structured
data cannot live entirely in `base.html` without the engine growing
conditionals. Each page template owns its own JSON-LD and emits it through
`head_extra`; the shared organization fields stay in `base.html`.

Scalar per-page `<head>` values (title, meta description, OG fields) come from
the language JSON under a `pages.<name>.meta` namespace.

### Path handling

Two different URL forms coexist, and conflating them is the easiest way to get
this wrong:

**Internal links are relative file paths**, so double-clicking a file still
works and the `file://` guarantee in `CLAUDE.md` survives:

| From | To Spanish home | To English home | To sibling page |
|---|---|---|---|
| `/index.html` | `index.html` | `en/index.html` | `about.html` |
| `/en/index.html` | `../index.html` | `index.html` | `about.html` |
| `/en/about.html` | `../index.html` | `index.html` | `services.html` |

Note that from any `/en/` page, `../index.html` is the **Spanish** home — it is
the language-switcher target, never a navigation link. English navigation within
`/en/` uses bare siblings.

`build.py` computes the prefix (`""` or `"../"`) per output directory.

**Canonical, `hreflang`, and sitemap URLs are absolute and extensionless for
index pages:**

| Page | Canonical URL |
|---|---|
| Spanish home | `https://www.mscontadores.com.co/` |
| English home | `https://www.mscontadores.com.co/en/` |
| Other Spanish | `https://www.mscontadores.com.co/about.html` |
| Other English | `https://www.mscontadores.com.co/en/about.html` |

GitHub Pages serves both `/en/` and `/en/index.html`, so the two forms are live
whether we like it or not. The canonical tag is what collapses them into one
indexed URL, and it must consistently name the directory form. Internal links
still point at `en/index.html` — that mismatch is deliberate and is precisely
what the canonical exists to resolve. `/` is already the form used in the
current `sitemap.xml`, so this is consistent with what Google has already
crawled.

## SEO wiring

Per page, generated automatically:

- `<html lang="es">` / `<html lang="en">`
- Self-referencing absolute `<link rel="canonical">`, in the extensionless form
  above
- Reciprocal alternates: `hreflang="es"`, `hreflang="en"`, and
  `hreflang="x-default"` pointing at the Spanish URL (Spanish is the default)
- `og:locale` / `og:locale:alternate` matching the page's language
- `sitemap.xml` regenerated with all 10 URLs, each carrying `xhtml:link`
  alternate entries

**Use `es`, not `es-CO`.** `es-CO` targets Spanish speakers located in Colombia.
A Venezuelan, Argentine, or Spanish national researching a Cartagena accountant
*before* relocating is searching from outside Colombia, and that audience is
explicitly part of the target per the section above. Plain `es` reaches Spanish
speakers everywhere, Colombia included, and gives up nothing.

`sitemap.xml` deliberately omits `lastmod`. An earlier version derived it from
git — the commit date of the last change to the page's template or its
content JSON — but `build.py` builds from the working tree while that date
reflects committed state, so the normal edit → build → commit cycle baked in
the *previous* commit's date and `build.py --check` then contradicted itself
on a perfectly normal workflow. `--check` is the project's only guard against
shipping stale output, and a stale-output gate that raises false alarms gets
ignored. Google also largely ignores `lastmod` in ranking, so the field
wasn't worth the churn.

`robots.txt` and `CNAME` are unchanged — the sitemap URL does not move.

## Runtime JavaScript

`js/i18n.js` is deleted. The URL becomes the source of truth for language, so
there is no runtime text swapping and no `localStorage` language preference.

The language switcher keeps its dropdown UI — the two-button toggle was
explicitly rejected — but its items become plain `<a href>` links to the
counterpart URL, generated per page.

`js/main.js` currently calls `getTranslation()` for the contact form's
sending/success/error messages. Those three strings move to `data-msg-sending`,
`data-msg-success`, and `data-msg-error` attributes on the `<form>`, baked in per
language at build time. This leaves `main.js` entirely language-agnostic and
removes its only dependency on the i18n layer.

No browser-language auto-redirect. That was tried and explicitly rejected
previously; the decision stands.

## Verification

No test framework — that would contradict the zero-dependency premise. Checks
are split by when they can be known, and each belongs to exactly one script.

**`build.py` fails fast, before writing anything:**

1. **Copy parity** — `es.json` and `en.json` must have identical key sets. A
   missing translation aborts the build rather than emitting a page with a raw
   `{{ placeholder }}` in it.
2. **No unresolved placeholders** — if any `{{ … }}` survives substitution, the
   build fails.

**`verify.py` (stdlib) inspects generated output, runnable on demand:**

3. **Determinism** — rebuilding produces byte-identical output to what is
   committed. `build.py --check` performs the same comparison without writing,
   for use before committing.
4. **Well-formedness** — every generated page parses with balanced tags.
5. **`hreflang` reciprocity** — every alternate points at a page that exists and
   that links back.
6. **Canonical hygiene** — every canonical uses the extensionless index form
   where applicable, and no two pages declare the same canonical.
7. **Link integrity** — every relative `href`/`src` resolves to a real file on
   disk, which is what makes the `file://` guarantee testable rather than
   assumed.
8. **Structured data** — every JSON-LD block parses, and `@id` is consistent
   across pages.

## Risks

**Stale generated output** is the main one: editing copy and forgetting to
rebuild ships a site that does not match its sources. Mitigated by
`build.py --check` and a prominent README note. This is the cost of choosing a
build step, accepted knowingly.

**Documentation drift.** `CLAUDE.md` currently instructs "edit copy in
`js/i18n.js`, never in the HTML" and `README.md` documents the client-side
language switch and the no-build-tools premise. All of that becomes wrong the
moment this lands, and must be rewritten in the same commit — not left for
later.

**One large mechanical commit.** The migration touches every HTML file at once.
It should land as a single reviewable commit whose diff is dominated by
generated output, with the hand-written parts (`build.py`, `verify.py`,
templates, JSON) reviewed carefully and the generated files taken on faith from
`verify.py` passing.

**No visual regression safety net.** The generated pages must render identically
to the current ones. Verification is manual: compare each page before and after
in a browser. Worth doing deliberately rather than assuming, since the migration
rewrites every page's markup path.

**The English privacy policy becomes genuinely public.** Today it is near
invisible to search; afterwards it is an indexed legal document in its own right.
Nothing about it changes, but the governing-language clause ("Issued in Spanish.
The English translation is informational; in case of discrepancy, the Spanish
text governs") starts doing real work rather than sitting on a page nobody can
find. It must survive the migration verbatim.

## Rollback

Generated output is committed and `js/i18n.js` is deleted, so sources and
outputs swap roles in a single commit. If indexing degrades or the canonical
strategy proves wrong, the recovery path is **revert the merge commit** — that
restores `js/i18n.js`, the five original pages, and the previous `sitemap.xml`
together, as a consistent set.

Reverting is safe with respect to search: the Spanish URLs never move in either
direction, so a revert only removes the `/en/` pages, which Google drops as
404s. It does not disturb anything currently ranking. Do not attempt a partial
rollback of individual files; the build's whole premise is that output is
derived, so a half-reverted tree is neither valid input nor valid output.

## Success criteria

- `https://www.mscontadores.com.co/en/` and its four siblings exist, are
  crawlable, and carry correct reciprocal `hreflang`.
- Every existing Spanish URL still resolves at its current path, unchanged.
- The site still opens correctly by double-clicking a file (`file://`).
- `python3 build.py && python3 verify.py` passes from a clean checkout with no
  third-party packages installed.
- Google Search Console shows the English pages indexed after resubmission.
