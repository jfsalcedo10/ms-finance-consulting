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
assets/logo.svg    Placeholder logo
```

## Language switching

All page text is tagged with `data-i18n="key.path"` attributes. Translations
live in `js/i18n.js` under the `translations` object (`en` and `es`). The
language toggle in the header swaps text client-side and remembers the
choice in `localStorage`. To edit copy, change it in `js/i18n.js` — not in
the HTML files directly, since HTML text gets overwritten on page load.

## TODO before going live

Content placeholders that only the client (dad) can fill in — search
`js/i18n.js` for `TODO` to find them all:

- [ ] Founder's real name and exact professional title/credentials
      (`about.founder.name`, `about.founder.role`)
- [ ] Phone / WhatsApp number (`contact.info.phone.value`)
- [ ] Email address (`contact.info.email.value`)
- [ ] Full physical address (`contact.info.address.value`)
- [ ] Replace `assets/logo.svg` placeholder with a real logo, if there is one
- [ ] Contact form (`contact.html`) currently does not send anywhere — wire
      it up to a service like Formspree or EmailJS before launch
- [ ] Consider adding real photos (founder headshot, office) to replace the
      current monogram placeholders

## Deploying

Once ready to go live, the easiest free option for a static site like this
is GitHub Pages: push this repo to GitHub, enable Pages in the repo
settings, and point it at the `main` branch. We can set that up together
when you're ready.
