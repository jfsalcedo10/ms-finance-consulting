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
- [x] Email address — emiliosalcedo@mscontadores.com.co, wired as a
      `mailto:` link in the footer (`contact.info.email.value`)
- [ ] Founder's exact professional title/credentials (`about.founder.role`
      currently says "Founder & Lead Consultant, Accountant" — confirm
      wording, e.g. official "Contador Público" / tarjeta profesional no.)
- [x] Address — kept to "Cartagena, Colombia" only, no street address
      (`contact.info.address.value`)
- [ ] Contact form (`contact.html`) currently does not send anywhere — wire
      it up to a service like Formspree or EmailJS before launch
- [ ] Consider adding real photos (founder headshot, office) to replace the
      current monogram placeholders

## Deploying

Once ready to go live, the easiest free option for a static site like this
is GitHub Pages: push this repo to GitHub, enable Pages in the repo
settings, and point it at the `main` branch. We can set that up together
when you're ready.
