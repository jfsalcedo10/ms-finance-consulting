#!/usr/bin/env python3
"""Check the generated site. Stdlib only. Run: python3 verify.py"""
import json
import re
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

from sitelib import PAGES, SITE, flatten

ROOT = Path(__file__).resolve().parent
FAILURES = []


def fail(msg):
    FAILURES.append(msg)


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


PLACEHOLDER = re.compile(r"\{\{\s*([A-Za-z0-9_.]+)\s*\}\}")
# Slots build.py supplies itself; not content keys.
BUILD_SUPPLIED = {"content", "head_extra", "rel", "page.title", "page.description",
                  "page.canonical", "page.altEs", "page.altEn",
                  "page.langEs", "page.langEn"}


def check_template_placeholders():
    """Every {{ key }} in templates/ must resolve against content/es.json.

    templates/404.html is a special case: it renders both languages onto one
    page, so its placeholders are prefixed "es."/"en." rather than bare keys.
    """
    es = flatten(json.loads((ROOT / "content" / "es.json").read_text("utf-8")))
    en = flatten(json.loads((ROOT / "content" / "en.json").read_text("utf-8")))
    templates = sorted((ROOT / "templates").rglob("*.html"))
    if not templates:
        fail("no templates found under templates/")
        return
    for path in templates:
        is_404 = path == ROOT / "templates" / "404.html"
        for key in PLACEHOLDER.findall(path.read_text("utf-8")):
            if key in BUILD_SUPPLIED:
                continue
            if is_404:
                if key.startswith("es.") and key[len("es."):] in es:
                    continue
                if key.startswith("en.") and key[len("en."):] in en:
                    continue
                fail(f"{path.relative_to(ROOT)}: unknown placeholder {{{{ {key} }}}}")
                continue
            if key in es:
                continue
            fail(f"{path.relative_to(ROOT)}: unknown placeholder {{{{ {key} }}}}")
    print(f"  template placeholders: {len(templates)} templates checked")


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


def check_404():
    """404.html is a deliberate exception: GitHub Pages serves it for every
    missing path across the whole site (including under /en/), so every
    asset path on it must be absolute or root-relative — a bare relative
    path would resolve against the missing path's directory, not the root.
    It also answers for both languages on one page, so it must not be part
    of the ES/EN mirror or the sitemap.
    """
    path = ROOT / "404.html"
    if not path.exists():
        fail("404.html: missing")
        return
    html = path.read_text("utf-8")
    if "noindex" not in html:
        fail("404.html: missing noindex")
    for attr in re.findall(r'(?:href|src)="([^"]+)"', html):
        if attr.startswith(("http://", "https://", "mailto:", "tel:", "#", "data:", "/")):
            continue
        fail(f"404.html: bare relative asset path '{attr}' (must be root-relative or absolute)")
    sitemap = (ROOT / "sitemap.xml").read_text("utf-8")
    if "404.html" in sitemap:
        fail("404.html: must not appear in sitemap.xml")
    print("  404 page: present, noindex, root-relative assets, excluded from sitemap")


def main():
    check_copy_parity()
    check_template_placeholders()
    check_determinism()
    check_well_formed()
    check_hreflang_and_canonical()
    check_links_resolve()
    check_structured_data()
    check_404()
    if FAILURES:
        print("\nFAILED:", file=sys.stderr)
        for msg in FAILURES:
            print(f"  - {msg}", file=sys.stderr)
        return 1
    print("\nAll checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
