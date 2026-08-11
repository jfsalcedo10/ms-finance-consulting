# Indexable Bilingual URLs — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give each language its own indexable URL — Spanish at the site root, English under `/en/` — so the English site can rank at all.

**Architecture:** A stdlib-only Python generator renders ten static pages from `templates/` + `content/{es,en}.json`. Generated HTML is committed, because GitHub Pages serves from `main`. Runtime language switching is deleted; the URL becomes the source of truth.

**Tech Stack:** Python 3 (standard library only), plain HTML/CSS/JS. Node is used **once**, by a throwaway migration script, and is not a build dependency.

**Spec:** `docs/superpowers/specs/2026-08-11-bilingual-urls-design.md`

## Global Constraints

- **No npm, no bundler, no third-party Python packages.** `build.py` and `verify.py` import stdlib only.
- **The site must still open via `file://`.** Every internal link is a relative file path. Verified mechanically in Task 4.
- **Canonical/hreflang/sitemap URLs are absolute and extensionless for index pages:** `https://www.mscontadores.com.co/` and `https://www.mscontadores.com.co/en/`. All other pages keep `.html`.
- **`hreflang="es"`, never `es-CO`** — `es-CO` excludes Spanish speakers searching from outside Colombia, who are explicitly a target audience.
- **Never fabricate facts** about the practice. Copy is migrated verbatim; no new claims. Forecasting/predictive modelling is deliberately not claimed anywhere.
- **Stylesheet is `css/styles.css?v=3`.** Bump the `?v=` if and only if `css/styles.css` changes (it does in Task 3 — bump to `?v=4`).
- Site constant: `SITE = "https://www.mscontadores.com.co"`.
- Pages: `index`, `about`, `services`, `contact`, `privacy`. Languages: `es`, `en`.

---

### Task 1: Migrate copy to `content/es.json` + `content/en.json`

Copy moves out of `js/i18n.js` into JSON so Python can read it without Node. Nothing consumes these files yet — the site is untouched and still works.

**Files:**
- Create: `tools/extract_content.py` (throwaway, deleted in Task 5)
- Create: `content/es.json`, `content/en.json`
- Create: `verify.py` (parity check only; grows in Task 4)

**Interfaces:**
- Consumes: nothing.
- Produces: `content/{es,en}.json`, each a dict whose top-level keys are the existing i18n namespaces (`nav`, `brand`, `hero`, `home`, `about`, `services`, `contact`, `legal`, `footer`) **plus** three new ones: `meta`, `pages`, `schema`. Task 2's templates reference these by dotted path.

- [ ] **Step 1: Write the failing check**

Create `verify.py`:

```python
#!/usr/bin/env python3
"""Check the generated site. Stdlib only. Run: python3 verify.py"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
FAILURES = []


def fail(msg):
    FAILURES.append(msg)


def flatten(obj, prefix=""):
    flat = {}
    for key, value in obj.items():
        path = f"{prefix}{key}"
        if isinstance(value, dict):
            flat.update(flatten(value, path + "."))
        else:
            flat[path] = value
    return flat


def check_copy_parity():
    """es.json and en.json must expose exactly the same keys."""
    es = json.loads((ROOT / "content" / "es.json").read_text("utf-8"))
    en = json.loads((ROOT / "content" / "en.json").read_text("utf-8"))
    es_keys, en_keys = set(flatten(es)), set(flatten(en))
    for key in sorted(es_keys - en_keys):
        fail(f"copy parity: '{key}' present in es.json, missing from en.json")
    for key in sorted(en_keys - es_keys):
        fail(f"copy parity: '{key}' present in en.json, missing from es.json")
    print(f"  copy parity: {len(es_keys)} keys per language")


def main():
    check_copy_parity()
    if FAILURES:
        print("\nFAILED:", file=sys.stderr)
        for msg in FAILURES:
            print(f"  - {msg}", file=sys.stderr)
        return 1
    print("\nAll checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
```

- [ ] **Step 2: Run it to verify it fails**

Run: `python3 verify.py`
Expected: FAIL — `FileNotFoundError` for `content/es.json`, because the content files do not exist yet.

- [ ] **Step 3: Write the migration script**

Create `tools/extract_content.py`. This uses Node **once** to evaluate the real translations object, which is exact and avoids hand-transcription errors across ~200 strings.

```python
#!/usr/bin/env python3
"""One-shot migration: js/i18n.js -> content/es.json + content/en.json.

Uses Node once to evaluate the existing translations object exactly.
Delete this script once the migration has landed.
"""
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGES = ("index", "about", "services", "contact", "privacy")

# Spanish schema description, copied verbatim from the current JSON-LD.
ES_SCHEMA_DESC = (
    "Firma de contabilidad, impuestos y consultoría financiera en Cartagena, "
    "Colombia, con más de 30 años de experiencia, que también ofrece análisis "
    "de datos aplicado a las finanzas."
)
EN_SCHEMA_DESC = (
    "Accounting, tax and financial consulting firm in Cartagena, Colombia, "
    "with more than 30 years of experience, also offering data analysis "
    "applied to finance."
)

# English titles/descriptions. The live HTML only carries Spanish ones, so
# these are authored here. They mirror the Spanish intent, not word-for-word.
EN_PAGE_META = {
    "index": {
        "title": "Certified Public Accountant in Cartagena | M&amp;S Finance Consulting",
        "description": "Accounting, tax, financial consulting and data analysis in "
                       "Cartagena, Colombia. Over 30 years of experience, with direct, "
                       "personal attention.",
    },
    "about": {
        "title": "About Us | Accountants and Data Analysts in Cartagena",
        "description": "A public accountant with 30+ years in Cartagena, alongside an "
                       "MSc in Statistics and Data Science. Established financial "
                       "expertise and modern analytical capability in one practice.",
    },
    "services": {
        "title": "Accounting, Tax and Data Services in Cartagena | M&amp;S",
        "description": "Bookkeeping, tax planning, financial consulting, and data "
                       "analysis with AI, automation and custom dashboards, in "
                       "Cartagena, Colombia.",
    },
    "contact": {
        "title": "Contact | Accountant in Cartagena &mdash; M&amp;S Finance Consulting",
        "description": "Get in touch for accounting, tax and financial advice in "
                       "Cartagena, Colombia. We reply within one business day. "
                       "Tel +57 300 787 1159.",
    },
    "privacy": {
        "title": "Privacy Policy | M&amp;S Finance Consulting",
        "description": "M&amp;S Finance Consulting's Personal Data Processing Policy, "
                       "under Colombia's Law 1581 of 2012.",
    },
}


def read_translations():
    src = ROOT / "js" / "i18n.js"
    script = (
        'const fs=require("fs");'
        f"const s=fs.readFileSync({json.dumps(str(src))},'utf8')"
        '.replace(/document\\.addEventListener\\("DOMContentLoaded", initLanguage\\);/,"");'
        'const t=new Function(s+"; return translations;")();'
        "process.stdout.write(JSON.stringify(t));"
    )
    out = subprocess.run(["node", "-e", script], capture_output=True,
                         text=True, check=True).stdout
    return json.loads(out)


def spanish_page_meta():
    """Titles/descriptions are already Spanish in the live HTML."""
    meta = {}
    for page in PAGES:
        html = (ROOT / f"{page}.html").read_text("utf-8")
        title = re.search(r"<title>(.*?)</title>", html, re.S).group(1).strip()
        desc = re.search(r'<meta name="description" content="(.*?)"\s*/?>',
                         html, re.S).group(1).strip()
        meta[page] = {"title": title, "description": desc}
    return meta


def build(lang, translations, es_meta):
    data = dict(translations[lang])
    data["meta"] = {
        "htmlLang": lang,
        "langLabel": lang.upper(),
        "ogLocale": "es_CO" if lang == "es" else "en_US",
        "ogLocaleAlt": "en_US" if lang == "es" else "es_CO",
    }
    data["pages"] = es_meta if lang == "es" else EN_PAGE_META
    data["schema"] = {
        "description": ES_SCHEMA_DESC if lang == "es" else EN_SCHEMA_DESC
    }
    return data


def main():
    translations = read_translations()
    es_meta = spanish_page_meta()
    (ROOT / "content").mkdir(exist_ok=True)
    for lang in ("es", "en"):
        path = ROOT / "content" / f"{lang}.json"
        payload = build(lang, translations, es_meta)
        path.write_text(
            json.dumps(payload, ensure_ascii=False, indent=2) + "\n", "utf-8"
        )
        print(f"wrote {path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
```

- [ ] **Step 4: Run the migration**

Run: `python3 tools/extract_content.py`
Expected: `wrote content/es.json` and `wrote content/en.json`.

- [ ] **Step 5: Run the check to verify it passes**

Run: `python3 verify.py`
Expected: PASS — `copy parity: N keys per language`, then `All checks passed.`

If it reports missing keys, the two language blocks in `js/i18n.js` were already out of sync. Fix `content/*.json` by hand — do **not** loosen the check.

- [ ] **Step 6: Sanity-check the migrated content**

Run:
```bash
python3 -c "
import json
es=json.load(open('content/es.json')); en=json.load(open('content/en.json'))
print('es title:', es['pages']['index']['title'])
print('en title:', en['pages']['index']['title'])
print('es nav:', es['nav'])
print('legal NIT:', es['legal']['s1']['name'])
print('es langNote:', es['legal']['langNote'])
print('en langNote:', en['legal']['langNote'])
"
```
Expected: Spanish title `Contador P&uacute;blico en Cartagena | ...`, English title `Certified Public Accountant in Cartagena | ...`, Spanish nav labels, and the NIT `901.242.087-7` intact.

Both `langNote` values must survive **verbatim** — that is the governing-language
clause of a legal document ("in case of discrepancy, the Spanish text governs").
Once `/en/privacy.html` is indexable, the English policy is a public legal
document in its own right, and that clause is what keeps the Spanish text
authoritative.

- [ ] **Step 7: Commit**

```bash
git add tools/extract_content.py content/es.json content/en.json verify.py
git commit -m "Migrate site copy from js/i18n.js to content/*.json

Pre-rendered pages never fetch copy, so the file:// CORS constraint that
forced JS over JSON no longer applies. Python reads JSON natively, which
keeps Node out of the build.

Nothing consumes these files yet; the site is unchanged."
```

---

### Task 2: Extract `templates/` from the current pages

Turn the five hand-written pages into a shared shell plus five bodies. Still nothing generated — this task's deliverable is templates whose placeholders all resolve.

**Files:**
- Create: `tools/make_templates.py` (throwaway, deleted in Task 5)
- Create: `templates/base.html`, `templates/pages/{index,about,services,contact,privacy}.html`, `templates/head/services.html`
- Modify: `verify.py` (add placeholder-resolution check)

**Interfaces:**
- Consumes: `content/es.json` from Task 1.
- Produces: `templates/base.html` with exactly two structural slots, `{{ content }}` and `{{ head_extra }}`; per-page bodies referencing dotted content keys; `templates/head/services.html` holding the `OfferCatalog` JSON-LD. Task 3's `build.py` renders these.

- [ ] **Step 1: Write the failing check**

Add to `verify.py`, above `main()`:

```python
import re

PLACEHOLDER = re.compile(r"\{\{\s*([A-Za-z0-9_.]+)\s*\}\}")
# Slots build.py supplies itself; not content keys.
BUILD_SUPPLIED = {"content", "head_extra", "rel", "page.title", "page.description",
                  "page.canonical", "page.altEs", "page.altEn",
                  "page.langEs", "page.langEn"}


def check_template_placeholders():
    """Every {{ key }} in templates/ must resolve against content/es.json."""
    es = flatten(json.loads((ROOT / "content" / "es.json").read_text("utf-8")))
    templates = sorted((ROOT / "templates").rglob("*.html"))
    if not templates:
        fail("no templates found under templates/")
        return
    for path in templates:
        for key in PLACEHOLDER.findall(path.read_text("utf-8")):
            if key in BUILD_SUPPLIED or key in es:
                continue
            fail(f"{path.relative_to(ROOT)}: unknown placeholder {{{{ {key} }}}}")
    print(f"  template placeholders: {len(templates)} templates checked")
```

And call it from `main()`, after `check_copy_parity()`:

```python
    check_template_placeholders()
```

- [ ] **Step 2: Run it to verify it fails**

Run: `python3 verify.py`
Expected: FAIL — `no templates found under templates/`.

- [ ] **Step 3: Write the extraction script**

Create `tools/make_templates.py`. The header and footer are byte-identical across all five pages (verified), so they can be lifted from `index.html` once.

```python
#!/usr/bin/env python3
"""One-shot: turn the current hand-written pages into templates/.

Lifts the shared header/footer (byte-identical across all five pages) and
converts each page's <main> into a template whose text nodes are {{ key }}
placeholders, taken from the data-i18n attributes already present.
Delete this script once the migration has landed.
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGES = ("index", "about", "services", "contact", "privacy")

# <tag ... data-i18n="k" ...>text</tag>  ->  <tag ...>{{ k }}</tag>
I18N_EL = re.compile(
    r'(<(\w+)(?=[\s>])[^<>]*?)\s*data-i18n="([^"]+)"([^<>]*?>)([^<]*)(</\2>)'
)


def de_i18n(html):
    """Replace data-i18n elements with placeholders, dropping the attribute."""
    return I18N_EL.sub(lambda m: f"{m.group(1)}{m.group(4)}{{{{ {m.group(3)} }}}}{m.group(6)}", html)


HEAD = """<!DOCTYPE html>
<html lang="{{ meta.htmlLang }}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{ page.title }}</title>
  <meta name="description" content="{{ page.description }}" />
  <link rel="canonical" href="{{ page.canonical }}" />
  <link rel="alternate" hreflang="es" href="{{ page.altEs }}" />
  <link rel="alternate" hreflang="en" href="{{ page.altEn }}" />
  <link rel="alternate" hreflang="x-default" href="{{ page.altEs }}" />
  <link rel="icon" type="image/svg+xml" href="{{ rel }}assets/logo.svg?v=2" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Piazzolla:ital,wght@0,400;0,500;0,600;0,700;1,500&family=Public+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="{{ rel }}css/styles.css?v=4" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="M&amp;S Finance Consulting" />
  <meta property="og:title" content="{{ page.title }}" />
  <meta property="og:description" content="{{ page.description }}" />
  <meta property="og:url" content="{{ page.canonical }}" />
  <meta property="og:image" content="https://www.mscontadores.com.co/assets/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="{{ meta.ogLocale }}" />
  <meta property="og:locale:alternate" content="{{ meta.ogLocaleAlt }}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{{ page.title }}" />
  <meta name="twitter:description" content="{{ page.description }}" />
  <meta name="twitter:image" content="https://www.mscontadores.com.co/assets/og-image.png" />

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": "https://www.mscontadores.com.co/#organization",
    "name": "M&S Finance Consulting",
    "legalName": "M&S Finance Consulting S.A.S.",
    "taxID": "901.242.087-7",
    "description": "{{ schema.description }}",
    "image": "https://www.mscontadores.com.co/assets/og-image.png",
    "logo": "https://www.mscontadores.com.co/assets/logo.svg",
    "url": "https://www.mscontadores.com.co/",
    "telephone": "+57 300 787 1159",
    "email": "info@mscontadores.com.co",
    "knowsLanguage": ["es", "en"],
    "currenciesAccepted": "COP",
    "knowsAbout": [
      "Contabilidad",
      "Tenedur\\u00eda de libros",
      "Impuestos y planeaci\\u00f3n tributaria",
      "Estados financieros",
      "Consultor\\u00eda financiera",
      "An\\u00e1lisis de datos",
      "Inteligencia artificial aplicada a las finanzas",
      "Automatizaci\\u00f3n de procesos",
      "Tableros y Business Intelligence"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cartagena",
      "addressRegion": "Bol\\u00edvar",
      "addressCountry": "CO"
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Regi\\u00f3n Caribe, Colombia" },
      { "@type": "City", "name": "Cartagena" },
      { "@type": "City", "name": "Barranquilla" },
      { "@type": "City", "name": "Santa Marta" },
      { "@type": "City", "name": "Monter\\u00eda" },
      { "@type": "City", "name": "Sincelejo" },
      { "@type": "City", "name": "Valledupar" },
      { "@type": "City", "name": "Riohacha" }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    },
    "founder": {
      "@type": "Person",
      "name": "Emilio Salcedo"
    },
    "employee": [
      {
        "@type": "Person",
        "name": "Emilio Salcedo",
        "worksFor": { "@id": "https://www.mscontadores.com.co/#organization" }
      },
      {
        "@type": "Person",
        "name": "Juan Felipe Salcedo",
        "jobTitle": "Ingeniero de Datos y Consultor en Tecnolog\\u00eda",
        "worksFor": { "@id": "https://www.mscontadores.com.co/#organization" }
      }
    ]
  }
  </script>
{{ head_extra }}</head>
"""

# The language menu becomes real links. Anchors, not <li> click handlers, so
# the switcher works without JavaScript and is crawlable.
LANG_MENU = """          <ul class="lang-select-menu" role="listbox" aria-label="Language">
            <li role="option"><a href="{{ page.langEn }}">English</a></li>
            <li role="option"><a href="{{ page.langEs }}">Español</a></li>
          </ul>"""


def main():
    src = (ROOT / "index.html").read_text("utf-8")

    header = re.search(r'  <header class="site-header">.*?</header>', src, re.S).group(0)
    footer = re.search(r'  <footer class="site-footer">.*?</footer>', src, re.S).group(0)

    header = de_i18n(header)
    footer = de_i18n(footer)

    # Language switcher: current label + menu of real links.
    header = header.replace(
        "<span data-lang-current>ES</span>", "<span>{{ meta.langLabel }}</span>"
    )
    header = re.sub(
        r'          <ul class="lang-select-menu".*?</ul>', LANG_MENU, header, flags=re.S
    )

    base = (
        HEAD
        + "<body>\n"
        + header
        + "\n\n{{ content }}\n\n"
        + footer
        + '\n\n  <script src="{{ rel }}js/main.js"></script>\n</body>\n</html>\n'
    )
    (ROOT / "templates").mkdir(exist_ok=True)
    (ROOT / "templates" / "base.html").write_text(base, "utf-8")
    print("wrote templates/base.html")

    (ROOT / "templates" / "pages").mkdir(exist_ok=True)
    for page in PAGES:
        html = (ROOT / f"{page}.html").read_text("utf-8")
        main_block = re.search(r"  <main>.*?</main>", html, re.S).group(0)
        out = ROOT / "templates" / "pages" / f"{page}.html"
        out.write_text(de_i18n(main_block) + "\n", "utf-8")
        print(f"wrote {out.relative_to(ROOT)}")

    # services.html carries structured data the other pages do not.
    services = (ROOT / "services.html").read_text("utf-8")
    catalog = re.search(
        r'  <script type="application/ld\+json">\s*\{\s*"@context".*?</script>',
        services, re.S,
    ).group(0)
    offer = re.search(r'"hasOfferCatalog":\s*\{.*?\n    \}', catalog, re.S).group(0)
    (ROOT / "templates" / "head").mkdir(exist_ok=True)
    (ROOT / "templates" / "head" / "services.html").write_text(
        '  <script type="application/ld+json">\n  {\n'
        '    "@context": "https://schema.org",\n'
        '    "@id": "https://www.mscontadores.com.co/#organization",\n'
        f"    {offer}\n"
        "  }\n  </script>\n",
        "utf-8",
    )
    print("wrote templates/head/services.html")


if __name__ == "__main__":
    main()
```

- [ ] **Step 4: Run the extraction**

Run: `python3 tools/make_templates.py`
Expected: seven `wrote …` lines.

- [ ] **Step 5: Run the check to verify it passes**

Run: `python3 verify.py`
Expected: PASS — both checks report, then `All checks passed.`

Any `unknown placeholder` failure means a `data-i18n` key exists in HTML but not in `content/es.json`. Fix the content file; do not add the key to `BUILD_SUPPLIED`.

- [ ] **Step 6: Eyeball the base template**

Run: `grep -n "{{" templates/base.html`
Expected: `meta.htmlLang`, `page.title`, `page.description`, `page.canonical`, `page.altEs`, `page.altEn`, `rel`, `meta.ogLocale`, `meta.ogLocaleAlt`, `schema.description`, `head_extra`, `meta.langLabel`, `page.langEn`, `page.langEs`, `nav.*`, `brand.tail`, `footer.*`, `contact.info.*`, and exactly one `{{ content }}`.

Confirm there are **no** `data-i18n` attributes left: `grep -c data-i18n templates/base.html` should print `0`.

- [ ] **Step 7: Commit**

```bash
git add tools/make_templates.py templates verify.py
git commit -m "Extract templates/ from the current hand-written pages

base.html holds the shared shell with two slots: {{ content }} and
{{ head_extra }}. The second is required because services.html carries a
JSON-LD OfferCatalog the other four pages do not, which a logic-free
template engine cannot express with one slot.

Nothing renders these yet."
```

---

### Task 3: `build.py` and the cutover

The atomic switch: generate all ten pages, port the language-dropdown behaviour out of the doomed `i18n.js`, and delete the runtime i18n layer. This task cannot be split — a half-migrated tree is neither valid input nor valid output.

**Files:**
- Create: `build.py`
- Create (generated): `en/{index,about,services,contact,privacy}.html`
- Modify (generated): `index.html`, `about.html`, `services.html`, `contact.html`, `privacy.html`, `sitemap.xml`
- Modify: `js/main.js`, `css/styles.css`, `templates/pages/contact.html`
- Delete: `js/i18n.js`

**Interfaces:**
- Consumes: `templates/` and `content/*.json` from Tasks 1–2.
- Produces: `python3 build.py` (writes) and `python3 build.py --check` (exits non-zero if committed output differs from a fresh build). Task 4's `verify.py` inspects the output.

- [ ] **Step 1: Port the language dropdown into `js/main.js`**

`openLangSelect`, `closeLangSelect` and the dropdown wiring currently live in `js/i18n.js`. Deleting that file without porting them removes the dropdown entirely. Append to `js/main.js`, inside the existing `DOMContentLoaded` callback, just before its closing `});`:

```javascript
  // Language dropdown. The menu items are now real links (the URL carries the
  // language), so this only handles open/close and keyboard navigation.
  const closeLangSelect = (select, { returnFocus } = {}) => {
    const wasOpen = select.classList.contains("is-open");
    select.classList.remove("is-open");
    const toggle = select.querySelector(".lang-select-toggle");
    toggle.setAttribute("aria-expanded", "false");
    if (returnFocus && wasOpen) toggle.focus();
  };

  document.querySelectorAll(".lang-select").forEach((select) => {
    const toggle = select.querySelector(".lang-select-toggle");
    const links = Array.from(select.querySelectorAll(".lang-select-menu a"));

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      if (select.classList.contains("is-open")) {
        closeLangSelect(select);
      } else {
        select.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
        if (links[0]) links[0].focus();
      }
    });

    links.forEach((link, index) => {
      link.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          links[(index + 1) % links.length].focus();
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          links[(index - 1 + links.length) % links.length].focus();
        } else if (event.key === "Escape") {
          closeLangSelect(select, { returnFocus: true });
        }
      });
    });

    select.addEventListener("focusout", (event) => {
      if (!select.contains(event.relatedTarget)) closeLangSelect(select);
    });
  });

  document.addEventListener("click", (event) => {
    document.querySelectorAll(".lang-select.is-open").forEach((select) => {
      if (!select.contains(event.target)) closeLangSelect(select);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document
        .querySelectorAll(".lang-select.is-open")
        .forEach((select) => closeLangSelect(select, { returnFocus: true }));
    }
  });
```

- [ ] **Step 2: Make the contact form language-agnostic**

Replace the status-message block in `js/main.js`. Find:

```javascript
    const currentLang = () => document.documentElement.lang || "es";
    const setStatus = (key) => {
      statusEl.setAttribute("data-i18n", `contact.form.${key}`);
      statusEl.setAttribute("data-state", key);
      statusEl.textContent = getTranslation(currentLang(), `contact.form.${key}`);
    };
```

Replace with:

```javascript
    // Strings are baked into the form per language at build time, so this
    // file has no dependency on the translation layer.
    const MESSAGES = {
      sending: contactForm.dataset.msgSending,
      success: contactForm.dataset.msgSuccess,
      error: contactForm.dataset.msgError,
    };
    const setStatus = (key) => {
      statusEl.setAttribute("data-state", key);
      statusEl.textContent = MESSAGES[key] || "";
    };
```

Then in `templates/pages/contact.html`, add the three strings to the `<form>` tag. Change:

```html
        <form class="contact-form-wrap reveal" id="contact-form" action="https://api.web3forms.com/submit" method="POST">
```

to:

```html
        <form class="contact-form-wrap reveal" id="contact-form" action="https://api.web3forms.com/submit" method="POST"
              data-msg-sending="{{ contact.form.sending }}"
              data-msg-success="{{ contact.form.success }}"
              data-msg-error="{{ contact.form.error }}">
```

`data-msg-sending` reaches JavaScript as `dataset.msgSending` — the attribute is
kebab-case, the property camelCase. The three `MESSAGES` keys must match the
strings passed to `setStatus()` (`"sending"`, `"success"`, `"error"`) exactly.

- [ ] **Step 3: Restyle the language menu items as links**

`.lang-select-menu li` currently carries the padding, hover and cursor. With an `<a>` inside, the padded area stops being clickable. In `css/styles.css`, replace:

```css
.lang-select-menu li {
  padding: 8px 10px;
  border-radius: 5px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-ink);
  cursor: pointer;
}
```

with:

```css
.lang-select-menu li {
  border-radius: 5px;
}

/* Padding lives on the anchor so the whole row is a click target, not just
   the text. The menu items are links now — the URL carries the language. */
.lang-select-menu li a {
  display: block;
  padding: 8px 10px;
  border-radius: 5px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-ink);
  cursor: pointer;
}
```

Then update the two hover/focus selectors immediately below it, changing `.lang-select-menu li:hover` to `.lang-select-menu li a:hover` and `.lang-select-menu li:focus-visible` to `.lang-select-menu li a:focus-visible`.

Because `css/styles.css` changed, the stylesheet version must move to `?v=4` — already set in the Task 2 template.

- [ ] **Step 4: Write `build.py`**

```python
#!/usr/bin/env python3
"""Generate the bilingual static site. Stdlib only.

  python3 build.py          write the site
  python3 build.py --check  exit non-zero if committed output is stale

Spanish pages go to the repo root, English pages to en/. Copy comes from
content/{es,en}.json; markup from templates/.
"""
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SITE = "https://www.mscontadores.com.co"
PAGES = ("index", "about", "services", "contact", "privacy")
LANGS = ("es", "en")
REL = {"es": "", "en": "../"}

PLACEHOLDER = re.compile(r"\{\{\s*([A-Za-z0-9_.]+)\s*\}\}")


def flatten(obj, prefix=""):
    flat = {}
    for key, value in obj.items():
        path = f"{prefix}{key}"
        if isinstance(value, dict):
            flat.update(flatten(value, path + "."))
        else:
            flat[path] = value
    return flat


def check_parity(es, en):
    es_keys, en_keys = set(flatten(es)), set(flatten(en))
    problems = [f"missing from en.json: {k}" for k in sorted(es_keys - en_keys)]
    problems += [f"missing from es.json: {k}" for k in sorted(en_keys - es_keys)]
    if problems:
        for line in problems:
            print(f"  {line}", file=sys.stderr)
        sys.exit("build failed: content/es.json and content/en.json key sets differ")


def canonical(lang, page):
    if page == "index":
        return f"{SITE}/" if lang == "es" else f"{SITE}/en/"
    return f"{SITE}/{page}.html" if lang == "es" else f"{SITE}/en/{page}.html"


def output_path(lang, page):
    return ROOT / f"{page}.html" if lang == "es" else ROOT / "en" / f"{page}.html"


def render(template, values, where):
    def replace(match):
        key = match.group(1)
        if key not in values:
            sys.exit(f"build failed: unknown placeholder {{{{ {key} }}}} in {where}")
        return str(values[key])

    out = PLACEHOLDER.sub(replace, template)
    leftover = PLACEHOLDER.search(out)
    if leftover:
        sys.exit(f"build failed: unresolved placeholder {leftover.group(0)} in {where}")
    return out


def git_date(paths):
    """Commit date of the last change to any of these files, or None."""
    try:
        result = subprocess.run(
            ["git", "log", "-1", "--format=%cs", "--", *[str(p) for p in paths]],
            cwd=ROOT, capture_output=True, text=True, check=True,
        )
        return result.stdout.strip() or None
    except Exception:
        return None


def existing_lastmods():
    """Preserve lastmod values if git is unavailable, rather than inventing one."""
    path = ROOT / "sitemap.xml"
    if not path.exists():
        return {}
    text = path.read_text("utf-8")
    return dict(
        re.findall(r"<loc>(.*?)</loc>\s*<lastmod>(.*?)</lastmod>", text, re.S)
    )


def build_sitemap():
    previous = existing_lastmods()
    rows = []
    for lang in LANGS:
        for page in PAGES:
            loc = canonical(lang, page)
            sources = [
                ROOT / "templates" / "pages" / f"{page}.html",
                ROOT / "content" / f"{lang}.json",
            ]
            lastmod = git_date(sources) or previous.get(loc)
            priority = "1.0" if page == "index" else ("0.3" if page == "privacy" else "0.8")
            freq = "yearly" if page == "privacy" else "monthly"
            alts = "".join(
                f'\n    <xhtml:link rel="alternate" hreflang="{other}" '
                f'href="{canonical(other, page)}" />'
                for other in ("es", "en")
            )
            alts += (
                f'\n    <xhtml:link rel="alternate" hreflang="x-default" '
                f'href="{canonical("es", page)}" />'
            )
            entry = f"  <url>\n    <loc>{loc}</loc>"
            if lastmod:
                entry += f"\n    <lastmod>{lastmod}</lastmod>"
            entry += f"{alts}\n    <changefreq>{freq}</changefreq>"
            entry += f"\n    <priority>{priority}</priority>\n  </url>"
            rows.append(entry)
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
        + "\n".join(rows)
        + "\n</urlset>\n"
    )


def generate():
    content = {lang: json.loads((ROOT / "content" / f"{lang}.json").read_text("utf-8"))
               for lang in LANGS}
    check_parity(content["es"], content["en"])

    base = (ROOT / "templates" / "base.html").read_text("utf-8")
    outputs = {}

    for lang in LANGS:
        values = flatten(content[lang])
        for page in PAGES:
            body_tpl = (ROOT / "templates" / "pages" / f"{page}.html").read_text("utf-8")
            head_path = ROOT / "templates" / "head" / f"{page}.html"
            head_extra = head_path.read_text("utf-8") if head_path.exists() else ""

            page_values = dict(values)
            page_values.update({
                "rel": REL[lang],
                "page.title": values[f"pages.{page}.title"],
                "page.description": values[f"pages.{page}.description"],
                "page.canonical": canonical(lang, page),
                "page.altEs": canonical("es", page),
                "page.altEn": canonical("en", page),
                "page.langEs": (f"{page}.html" if lang == "es" else f"../{page}.html"),
                "page.langEn": (f"en/{page}.html" if lang == "es" else f"{page}.html"),
            })
            body = render(body_tpl, page_values, f"templates/pages/{page}.html ({lang})")
            page_values["content"] = body
            page_values["head_extra"] = head_extra
            outputs[output_path(lang, page)] = render(
                base, page_values, f"templates/base.html ({lang}/{page})"
            )

    outputs[ROOT / "sitemap.xml"] = build_sitemap()
    return outputs


def main():
    check_only = "--check" in sys.argv
    outputs = generate()
    stale = []
    for path, text in sorted(outputs.items()):
        current = path.read_text("utf-8") if path.exists() else None
        if current == text:
            continue
        if check_only:
            stale.append(path.relative_to(ROOT))
        else:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(text, "utf-8")
    if check_only:
        if stale:
            for path in stale:
                print(f"  stale: {path}", file=sys.stderr)
            sys.exit("build --check failed: committed output does not match a fresh build")
        print(f"build --check: {len(outputs)} files up to date")
        return
    print(f"built {len(outputs)} files")


if __name__ == "__main__":
    main()
```

- [ ] **Step 5: Build**

Run: `python3 build.py`
Expected: `built 11 files` (ten pages plus `sitemap.xml`).

- [ ] **Step 6: Verify the generated output is sane**

Run:
```bash
grep -o '<link rel="canonical" href="[^"]*"' index.html en/index.html about.html en/about.html
grep -c 'hreflang="es-CO"' index.html || true
grep -o 'hreflang="[^"]*"' en/about.html
```
Expected: canonicals `https://www.mscontadores.com.co/`, `…/en/`, `…/about.html`, `…/en/about.html`. Zero occurrences of `es-CO`. `en/about.html` shows `es`, `en`, `x-default`.

Run: `grep -c data-i18n *.html en/*.html | grep -v ':0' || echo "no data-i18n remains"`
Expected: `no data-i18n remains`.

- [ ] **Step 7: Delete the runtime i18n layer**

```bash
git rm js/i18n.js
grep -rn "i18n" *.html en/*.html js/main.js || echo "no references remain"
```
Expected: `no references remain`. If any page still has `<script src="js/i18n.js">`, the base template was not applied — rerun `python3 build.py`.

- [ ] **Step 8: Confirm the build is idempotent**

Run: `python3 build.py --check`
Expected: `build --check: 11 files up to date`.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "Generate the site from templates: Spanish at root, English at /en/

Cutover to build.py. Ten pages are now generated from templates/ plus
content/*.json, each with a self-referencing canonical, reciprocal
hreflang (es / en / x-default) and per-language og:locale. Index pages
use the extensionless canonical form (/ and /en/) while internal links
stay relative file paths, so the site still opens via file://.

js/i18n.js is deleted. Its language-dropdown behaviour moved to
js/main.js — the menu items are real links now, so the switcher works
without JavaScript. Contact-form status strings are baked into the form
as data attributes, leaving main.js language-agnostic.

Menu padding moved from the <li> to the <a> so the full row stays
clickable; stylesheet bumped to ?v=4."
```

---

### Task 4: Finish `verify.py`

`verify.py` currently checks content parity and template placeholders. Add the four checks that need generated output.

**Files:**
- Modify: `verify.py`

**Interfaces:**
- Consumes: generated pages from Task 3.
- Produces: `python3 verify.py` exiting 0 only when every check passes.

- [ ] **Step 1: Write the failing checks**

Add to `verify.py` above `main()`:

```python
import subprocess
from html.parser import HTMLParser
from urllib.parse import urlparse

SITE = "https://www.mscontadores.com.co"
PAGES = ("index", "about", "services", "contact", "privacy")
VOID = {"meta", "link", "br", "img", "input", "hr", "path", "rect", "circle",
        "source", "area", "col", "embed", "track", "wbr"}


def generated_pages():
    return [ROOT / f"{p}.html" for p in PAGES] + [ROOT / "en" / f"{p}.html" for p in PAGES]


class TagBalance(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack, self.errors = [], []

    def handle_starttag(self, tag, attrs):
        if tag not in VOID:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        if not self.stack or self.stack[-1] != tag:
            self.errors.append(f"line {self.getpos()[0]}: unexpected </{tag}>")
            if tag in self.stack:
                while self.stack and self.stack.pop() != tag:
                    pass
        else:
            self.stack.pop()


def check_determinism():
    result = subprocess.run([sys.executable, "build.py", "--check"],
                            cwd=ROOT, capture_output=True, text=True)
    if result.returncode != 0:
        fail("determinism: committed output is stale — run `python3 build.py`")
    else:
        print("  determinism: output matches a fresh build")


def check_well_formed():
    for path in generated_pages():
        parser = TagBalance()
        parser.feed(path.read_text("utf-8"))
        for err in parser.errors:
            fail(f"{path.relative_to(ROOT)}: {err}")
        if parser.stack:
            fail(f"{path.relative_to(ROOT)}: unclosed tags {parser.stack}")
    print(f"  well-formedness: {len(generated_pages())} pages parsed")


def check_hreflang_and_canonical():
    seen = {}
    for path in generated_pages():
        html = path.read_text("utf-8")
        rel = path.relative_to(ROOT)
        canon = re.search(r'<link rel="canonical" href="([^"]+)"', html)
        if not canon:
            fail(f"{rel}: no canonical")
            continue
        url = canon.group(1)
        if url in seen:
            fail(f"{rel}: duplicate canonical {url} (also {seen[url]})")
        seen[url] = rel
        if path.name == "index.html" and not url.endswith("/"):
            fail(f"{rel}: index canonical must be extensionless, got {url}")
        alts = dict(re.findall(r'<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"', html))
        if set(alts) != {"es", "en", "x-default"}:
            fail(f"{rel}: hreflang set is {sorted(alts)}, expected es/en/x-default")
        if "es-CO" in html:
            fail(f"{rel}: uses es-CO; spec requires plain es")
        for code, target in alts.items():
            if code == "x-default":
                continue
            path_part = urlparse(target).path
            local = ROOT / (path_part.strip("/") or "index.html")
            if local.is_dir() or path_part.endswith("/"):
                local = ROOT / path_part.strip("/") / "index.html"
            if not local.exists():
                fail(f"{rel}: hreflang {code} -> {target} has no file ({local.name})")
    print(f"  hreflang/canonical: {len(seen)} unique canonicals")


def check_links_resolve():
    for path in generated_pages():
        html = path.read_text("utf-8")
        for attr in re.findall(r'(?:href|src)="([^"]+)"', html):
            if attr.startswith(("http://", "https://", "mailto:", "tel:", "#", "data:")):
                continue
            target = (path.parent / attr.split("?")[0].split("#")[0]).resolve()
            if not target.exists():
                fail(f"{path.relative_to(ROOT)}: broken relative link '{attr}'")
    print("  link integrity: all relative links resolve on disk")


def check_structured_data():
    for path in generated_pages():
        html = path.read_text("utf-8")
        blocks = re.findall(
            r'<script type="application/ld\+json">(.*?)</script>', html, re.S
        )
        if not blocks:
            fail(f"{path.relative_to(ROOT)}: no JSON-LD")
        for block in blocks:
            try:
                data = json.loads(block)
            except json.JSONDecodeError as exc:
                fail(f"{path.relative_to(ROOT)}: invalid JSON-LD ({exc})")
                continue
            if data.get("@id") != f"{SITE}/#organization":
                fail(f"{path.relative_to(ROOT)}: JSON-LD @id is {data.get('@id')!r}")
    print("  structured data: every JSON-LD block parses with a consistent @id")
```

Put the three new imports at the top of the file with the existing ones, not
mid-file. Then replace `main()` in full:

```python
def main():
    check_copy_parity()
    check_template_placeholders()
    check_determinism()
    check_well_formed()
    check_hreflang_and_canonical()
    check_links_resolve()
    check_structured_data()
    if FAILURES:
        print("\nFAILED:", file=sys.stderr)
        for msg in FAILURES:
            print(f"  - {msg}", file=sys.stderr)
        return 1
    print("\nAll checks passed.")
    return 0
```

- [ ] **Step 2: Run it**

Run: `python3 verify.py`
Expected: all seven checks print, then `All checks passed.`

If `link integrity` fails on `en/*.html`, the `{{ rel }}` prefix is missing from an asset path in `templates/base.html`. If `hreflang` fails, `canonical()` and the alternates disagree.

- [ ] **Step 3: Prove the checks actually catch things**

Temporarily break the build and confirm the failure is caught:

```bash
python3 -c "
from pathlib import Path
p = Path('en/about.html'); s = p.read_text()
p.write_text(s.replace('hreflang=\"es\"', 'hreflang=\"es-CO\"'))"
python3 verify.py; echo "exit=$?"
git checkout en/about.html
```
Expected: FAILs with `uses es-CO` and `determinism: committed output is stale`, exit 1. After `git checkout`, `python3 verify.py` passes again.

- [ ] **Step 4: Commit**

```bash
git add verify.py
git commit -m "Add generated-output checks to verify.py

Determinism, tag balance, hreflang reciprocity, canonical uniqueness and
extensionless index form, relative-link resolution (which is what makes
the file:// guarantee testable), and JSON-LD validity with a consistent
@id."
```

---

### Task 5: Documentation and manual verification

The build step invalidates the two documents that tell contributors how this repo works. Leaving them stale is how the next person edits a generated file and loses their work.

**Files:**
- Modify: `CLAUDE.md`, `README.md`
- Delete: `tools/extract_content.py`, `tools/make_templates.py`

**Interfaces:**
- Consumes: everything above.
- Produces: accurate docs. No code.

- [ ] **Step 1: Remove the throwaway migration scripts**

```bash
git rm tools/extract_content.py tools/make_templates.py
rmdir tools 2>/dev/null || true
```

They ran once. Keeping them invites someone to re-run them over the templates and clobber hand edits.

- [ ] **Step 2: Rewrite the stale sections of `CLAUDE.md`**

Replace the paragraph beginning "Bilingual (ES/EN), default language is **Spanish**" with:

```markdown
Bilingual (ES/EN), default language is **Spanish** (not browser-language
detection — that was tried and explicitly rejected). Each language has its
own URL: Spanish at the site root, English under `/en/`. This is what makes
the English pages indexable; the previous client-side text-swapping approach
meant Google only ever saw Spanish.

**The HTML files are generated. Never edit them by hand — your changes will
be overwritten.** Copy lives in `content/es.json` and `content/en.json`;
markup lives in `templates/`. After changing either, run `python3 build.py`
and commit the regenerated pages alongside your edit. `python3 verify.py`
checks the result.

`build.py` and `verify.py` are stdlib-only. There is still no npm, no
bundler, and no third-party dependency, and the generated site still opens
directly via `file://` — every internal link is a relative path.
```

Also update the "Known gotchas" section: replace item 4 (about grepping across the four HTML files) with:

```markdown
4. **Header/nav/footer markup lives once, in `templates/base.html`.** The old
   hazard — change it in three files and miss the fourth — is gone. But the
   inverse now applies: editing a generated `.html` file directly is silently
   discarded on the next build.
```

- [ ] **Step 3: Rewrite the stale sections of `README.md`**

Replace the "Language switching" section with:

```markdown
## Language switching

Each language has its own URL — Spanish at the root (`/about.html`), English
under `/en/` (`/en/about.html`). The switcher in the header is a plain link
to the counterpart page, so it works without JavaScript and search engines
can crawl both versions.

Copy lives in `content/es.json` and `content/en.json`. The two files must
have identical key sets; `build.py` refuses to build if they drift.
```

Replace the "Known limitation, not a quick fix" bullet in the SEO section with:

```markdown
- Both languages are separately indexable: every page carries a
  self-referencing canonical plus reciprocal `hreflang` (`es`, `en`,
  `x-default`). Index pages use the extensionless canonical form (`/` and
  `/en/`) while internal links stay relative file paths — that mismatch is
  deliberate, and the canonical is what collapses the two forms Pages serves.
  `hreflang` is plain `es`, not `es-CO`, so Spanish speakers searching from
  outside Colombia are included.
```

Add a new section after "Preview locally":

```markdown
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
```

Update the "Project structure" block to list `build.py`, `verify.py`,
`templates/`, `content/`, and `en/`, and to drop `js/i18n.js`.

- [ ] **Step 4: Run the full check**

Run: `python3 verify.py`
Expected: all seven checks pass.

- [ ] **Step 5: Manual browser pass — do not skip**

There is no automated visual regression net, and this migration rewrote every page's markup path. Start a server and check each page in both languages:

```bash
python3 -m http.server 8765
```

Open and confirm:
- `http://localhost:8765/` — Spanish, renders as before
- `http://localhost:8765/en/` — English
- The language dropdown opens, and clicking English navigates to `/en/` (this is the ported JS — if the dropdown does not open, Step 1 of Task 3 was missed)
- `http://localhost:8765/en/privacy.html` — English policy renders immediately, not blank until scrolled
- Submit the contact form in both languages and confirm the status message appears in the right language (this exercises the `data-msg` attributes)
- Resize to mobile width and confirm the nav toggle and footer still behave

Then confirm `file://` still works: open `index.html` by double-clicking it, and click through to About and to the English home.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Update docs for the generated bilingual site

CLAUDE.md and README.md described a client-side language switch and a
no-build-tools workflow, both of which are now wrong. Records that the
HTML is generated and must not be hand-edited, how to run build.py and
verify.py, and why the canonical form differs from the link form.

Removes the one-shot migration scripts."
```

---

## Post-merge

Not part of the plan's tasks, but required for the change to pay off:

1. Resubmit `sitemap.xml` in Google Search Console — it now contains ten URLs with alternates.
2. Use the URL Inspection tool on `https://www.mscontadores.com.co/en/` and request indexing.
3. Expect a lag. New URLs take days to weeks to index; the Spanish pages should be unaffected throughout, since their URLs never moved.

## Rollback

If indexing degrades or the canonical strategy proves wrong, revert the merge commit. That restores `js/i18n.js`, the five original pages and the previous `sitemap.xml` as a consistent set. A partial revert produces a tree that is neither valid input nor valid output — do not attempt one. Reverting only removes the `/en/` pages, which Google drops as 404s; nothing currently ranking is disturbed.
