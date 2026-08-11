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
