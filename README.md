# M&S Finance Consulting — Website

Bilingual (Spanish/English) static website for M&S Finance Consulting, an
accounting and financial consulting practice in Cartagena, Colombia.

No build tools or dependencies — plain HTML, CSS, and JavaScript.

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

## Project structure

```
index.html        Home page
about.html         About page
services.html      Services page
contact.html       Contact page
css/styles.css     All styles (colors, layout, components, responsive rules)
js/i18n.js         Spanish/English translations + language switcher
js/main.js         Mobile nav, scroll effects, reveal animations
assets/logo.svg    Site logo (vector), used in the header and favicon
assets/ms-logo.jpg Original raster logo — source the SVG was traced from;
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

All page text is tagged with `data-i18n="key.path"` attributes. Translations
live in `js/i18n.js` under the `translations` object (`en` and `es`). The
language toggle in the header swaps text client-side and remembers the
choice in `localStorage`. To edit copy, change it in `js/i18n.js` — not in
the HTML files directly, since HTML text gets overwritten on page load.

## TODO before going live

Content placeholders that only the client (dad) can fill in — search
`js/i18n.js` for `TODO` to find what's left:

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

- `robots.txt` and `sitemap.xml` (4 pages) are in the repo root.
- Every page has a unique `<title>`/description, a `rel="canonical"` link,
  Open Graph + Twitter Card tags, and `AccountingService` JSON-LD structured
  data (name, contact info, hours, founder — kept in sync with the real
  facts in `PRODUCT.md`, never fabricated).
- `assets/og-image.png` is the 1200×630 social-share preview image (shown
  when a link is shared on WhatsApp/Facebook/etc.) — regenerate it by
  re-rendering an HTML fixture using the site's real fonts/colors at that
  exact size if the brand mark ever changes; there's no build step for it.
- **Known limitation, not a quick fix:** the site is bilingual via
  client-side JS (one URL per page, language swapped after load), so
  there's no `hreflang` and no way for Google to index the English and
  Spanish versions as separate pages — only whichever language renders
  (Spanish, by default) is realistically indexed. Properly fixing this
  means separate URLs per language, which is a real restructure, not
  something to bolt on casually.
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
