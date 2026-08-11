#!/usr/bin/env python3
"""Generate the bilingual static site. Stdlib only.

  python3 build.py          write the site
  python3 build.py --check  exit non-zero if committed output is stale

Spanish pages go to the repo root, English pages to en/. Copy comes from
content/{es,en}.json; markup from templates/.
"""
import json
import re
import sys
from pathlib import Path

from sitelib import LANGS, PAGES, SITE, flatten

ROOT = Path(__file__).resolve().parent
REL = {"es": "", "en": "../"}

PLACEHOLDER = re.compile(r"\{\{\s*([A-Za-z0-9_.]+)\s*\}\}")


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


def build_sitemap():
    rows = []
    for lang in LANGS:
        for page in PAGES:
            loc = canonical(lang, page)
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
