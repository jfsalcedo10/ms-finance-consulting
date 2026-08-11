# M&S Finance Consulting — Website

Bilingual (Spanish/English) static website for M&S Finance Consulting, an
accounting and financial consulting practice in Cartagena, Colombia.

Plain HTML, CSS, and JavaScript — no npm, no bundler, no third-party
dependencies. The site is generated from templates and JSON content by a
small stdlib-only Python script; see "Building" below.

## Preview locally

Simplest option: double-click `index.html` to open it in your browser.

For a closer-to-production preview (recommended once you start testing on
mobile devices via your network), run a local server from this folder:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

Want to share a live preview with someone else (not just view it locally)?
See [`SHARING-A-PREVIEW.md`](SHARING-A-PREVIEW.md) for how to do that with a
free Cloudflare Tunnel.

## Building

The site is generated. Sources are `templates/` and `content/*.json`; the
`.html` files in the repo root and in `en/` are output.

```bash
python3 build.py     # regenerate the site
python3 verify.py    # check the result
```

Run `build.py` before every commit that touches copy or templates. Both
scripts use only the Python standard library — there is nothing to install.
`python3 build.py --check` exits non-zero if the committed output is stale,
which is the fastest way to catch a forgotten rebuild.

## Project structure

```
build.py            Generates the site from templates/ + content/*.json
verify.py            Checks the generated output (run after every build)
sitelib.py           Shared helpers used by build.py and verify.py
templates/           HTML templates (shared header/nav/footer, per-page bodies)
content/es.json       Spanish copy
content/en.json       English copy
index.html            Home page (Spanish, generated — do not hand-edit)
about.html            About page (generated)
services.html         Services page (generated)
contact.html          Contact page (generated)
en/                    English pages, one per Spanish page (generated)
sitemap.xml            Generated — 10 URLs (5 Spanish + 5 English), with hreflang alternates
css/styles.css         All styles (colors, layout, components, responsive rules)
js/main.js              Mobile nav, scroll effects, reveal animations, language dropdown
assets/logo.svg         Site logo (vector), used in the header and favicon
assets/ms-logo.jpg      Original raster logo — source the SVG was traced from;
                        not used directly on the site, kept for reference/reprints
```

## Brand colors

The palette in `css/styles.css` (`:root` custom properties) is sampled
directly from `assets/ms-logo.jpg`:

- `--color-blue` `#036a7a` — deep teal (primary)
- `--color-green` `#7eb92c` — brand green (accents, secondary actions)
- Slate gray `#46545d` appears in the logo mark itself but isn't pulled into
  a variable — the existing `--color-text` / `--color-text-muted` tokens
  were already close enough to it

If the logo ever changes, re-derive these by sampling the new file rather
than eyeballing it — ask Claude to do the same pixel-clustering approach
used originally.

## Language switching

Each language has its own URL — Spanish at the root (`/about.html`), English
under `/en/` (`/en/about.html`). The switcher in the header is a plain link
to the counterpart page, so it works without JavaScript and search engines
can crawl both versions.

Copy lives in `content/es.json` and `content/en.json`. The two files must
have identical key sets; `build.py` refuses to build if they drift.

## TODO before going live

Content placeholders that only the client (dad) can fill in — search
`content/es.json` and `content/en.json` for `TODO` to find what's left:

- [x] Founder's real name — Emilio Salcedo (`about.founder.name`)
- [x] Phone / WhatsApp number — +57 300 787 1159, wired as a `tel:` link
      in the footer (`contact.info.phone.value`)
- [x] Email address — info@mscontadores.com.co, wired as a
      `mailto:` link in the footer (`contact.info.email.value`)
- [ ] Founder's exact professional title/credentials (`about.founder.role`
      currently says "Founder & Lead Consultant, Accountant" — confirm
      wording, e.g. official "Contador Público" / tarjeta profesional no.)
- [x] Address — kept to "Cartagena, Colombia" only, no street address
      (`contact.info.address.value`)
- [x] Contact form (`contact.html`) is wired to
      [Web3Forms](https://web3forms.com) with a real access key — see
      "Contact form setup" below
- [ ] Consider adding real photos (founder headshot, office) to replace the
      current monogram placeholders
- [x] Legal identification of the Responsable in the privacy policy —
      M&S Finance Consulting S.A.S., NIT 901.242.087-7 (`legal.s1.name` in
      `content/es.json` / `content/en.json`). See "Privacy policy" below.

## Privacy policy

`privacy.html` is the *Política de Tratamiento de Datos Personales*, required
because the contact form collects personal data. It's written to satisfy the
minimum content prescribed by **Ley 1581 de 2012** and **Decreto 1074 de
2015**: identification of the Responsable, purposes, the data subject's
Article 8 rights, the channel and legal deadlines for consultas (10 business
days) and reclamos (15 business days), and an effective date.

Two things to know:

- **The consent checkbox on `contact.html` is the legally load-bearing part**,
  not the page itself. The law requires *prior, express, and informed*
  authorization before collecting — a published policy alone doesn't satisfy
  it. The checkbox is `required`, so the browser's native validation blocks
  submission before `main.js`'s submit handler ever runs. Its value is posted
  to Web3Forms under `Autorizacion_datos` so the delivered email doubles as
  evidence of the authorization (Article 8 gives the data subject the right to
  request proof of it). **Don't remove the checkbox or drop the `required`
  attribute.**
- **Web3Forms is an international transfer.** Messages pass through servers
  abroad, which Article 26 restricts unless the data subject expressly
  authorizes it — that's why the checkbox text names it explicitly. If the
  form's delivery service ever changes, update `legal.s5` to match.

The Spanish text is the governing version; the English is a convenience
translation, and the page says so (`legal.langNote`). Edit both when changing
anything substantive.

**Not required:** registration in the SIC's *Registro Nacional de Bases de
Datos* (RNBD). That obligation only reaches sociedades with total assets above
100,000 UVT — far above a practice this size.

## Contact form setup

The form on `contact.html` posts to [Web3Forms](https://web3forms.com), a
free service that emails form submissions straight to an inbox — no server
or account login required, just an access key:

1. Go to [web3forms.com](https://web3forms.com) and enter the inbox address
   that should receive messages.
2. Web3Forms emails back an **access key** (a long string, no account/login
   needed).
3. In `contact.html`, the hidden `access_key` input already carries the real
   key.
4. Test it: fill out the form on the live site and confirm the email
   arrives at the inbox the key was registered to.

Note: `info@mscontadores.com.co` initially bounced from Web3Forms'
suppression list when registering. Confirm which inbox the current key
actually delivers to (see below) before relying on it.

The key is safe to have in public HTML — it only authorizes submissions
*to* that inbox, not reading or changing anything.

## SEO

- `robots.txt` and `sitemap.xml` (10 URLs — 5 Spanish pages plus their 5
  English counterparts, each with reciprocal `hreflang` alternates) are in
  the repo root.
- Every page has a unique `<title>`/description, a `rel="canonical"` link,
  Open Graph + Twitter Card tags, and `AccountingService` JSON-LD structured
  data (name, legal name, NIT, contact info, hours, founder — kept in sync
  with the real facts in `PRODUCT.md`, never fabricated). All pages share one
  `@id` (`…/#organization`) so crawlers treat them as a single business
  entity rather than five separate ones. `services.html` additionally carries
  an `OfferCatalog` of the four services.
- **Each language's pages carry their own `<title>`/description/OG metadata
  in that language — Spanish pages are Spanish, English pages under `/en/`
  are English.** Before this site had separate URLs per language, all pages
  served Spanish-rendered HTML with English metadata bolted on client-side,
  which told crawlers the page was English while the rendered page was
  Spanish and undercut ranking for the Spanish queries the practice actually
  competes on. That's fixed now: `build.py` generates each language's pages
  straight from `content/es.json` / `content/en.json`, so the served markup
  and its metadata always agree.
- Titles/descriptions target real search terms ("contador público en
  Cartagena", "servicios contables y tributarios"), not just the brand name —
  nobody searches "M&S Finance Consulting" who isn't already a client.
- Inner-page `<h1>`s carry keywords rather than a single bare noun
  ("Servicios" → "Servicios contables, tributarios y de análisis de datos").
  The **homepage** `<h1>` and the hero eyebrow are deliberately left as brand
  voice — don't SEO-ify them.
- The data/AI side of the practice is surfaced deliberately, since it's the
  actual differentiator and was previously almost invisible to crawlers: it's
  in the `about`/`services` titles and descriptions, in `knowsAbout` on the
  organization, as four separate `OfferCatalog` entries (analysis, AI-assisted
  reporting, automation, dashboards/BI) rather than one lumped item, and via
  an `employee` entry for Juan Felipe. **Forecasting/predictive modelling is
  deliberately absent** — `PRODUCT.md` records that it hasn't been done in a
  finance context, so it isn't claimed here either.

**Bump the `?v=` on `css/styles.css` when you change the stylesheet** — every
page links it as `css/styles.css?v=2`. GitHub Pages caches CSS aggressively, so
without a bump returning visitors keep the old styles after a deploy. The same
applies while previewing locally: `python3 -m http.server` sends no
`Cache-Control`, so a plain reload can show stale CSS (hard-reload with
Cmd+Shift+R if a change doesn't appear). `assets/logo.svg?v=2` already used
this convention.

Do **not** put `.reveal` on a long document like `privacy.html`'s policy: the
reveal observer uses a 0.15 threshold, and an element taller than the viewport
can't hit it until the user scrolls, so the page loads blank.
- `assets/og-image.png` is the 1200×630 social-share preview image (shown
  when a link is shared on WhatsApp/Facebook/etc.) — regenerate it by
  re-rendering an HTML fixture using the site's real fonts/colors at that
  exact size if the brand mark ever changes; there's no build step for it.
- Both languages are separately indexable: every page carries a
  self-referencing canonical plus reciprocal `hreflang` (`es`, `en`,
  `x-default`). Index pages use the extensionless canonical form (`/` and
  `/en/`) while internal links stay relative file paths — that mismatch is
  deliberate, and the canonical is what collapses the two forms Pages serves.
  `hreflang` is plain `es`, not `es-CO`, so Spanish speakers searching from
  outside Colombia are included.
- `areaServed` in the JSON-LD lists the Región Caribe plus the main cities
  (Cartagena, Barranquilla, Santa Marta, Montería, Sincelejo, Valledupar,
  Riohacha), because the practice serves clients across the region, not only
  Cartagena. **This does not make the site rank in those cities' local packs** —
  see the note below on what would.
- **Don't create thin per-city pages** ("Contador en Barranquilla", "Contador
  en Santa Marta") that are the same copy with the city swapped. Google treats
  those as doorway pages and they can hurt the whole domain. A single
  substantive "Zonas que atendemos" page describing how remote engagements
  actually work is safe; twelve near-duplicate pages are not.
- Not code, but higher-leverage for local search than any of the above:
  setting up a **Google Business Profile** for the practice, and verifying
  the domain in **Google Search Console** (submit `sitemap.xml` there once
  the custom domain's HTTPS is live).

## Deploying

Live on GitHub Pages, deployed from the `main` branch — pushing to `main`
redeploys automatically. Custom domain: `www.mscontadores.com.co` (DNS
configured through the Google Workspace admin console, since the domain
was purchased through Workspace's registrar partner; MX/email records are
untouched). The bare domain (`mscontadores.com.co`) 301-redirects to
`www`. HTTPS is issued automatically by GitHub once DNS propagation
finishes — check status with `gh api repos/jfsalcedo10/ms-finance-consulting/pages`.
