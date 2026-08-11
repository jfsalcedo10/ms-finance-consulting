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
