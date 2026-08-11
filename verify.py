#!/usr/bin/env python3
"""Check the generated site. Stdlib only. Run: python3 verify.py"""
import json
import re
import sys
from pathlib import Path

from sitelib import flatten

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


def main():
    check_copy_parity()
    check_template_placeholders()
    if FAILURES:
        print("\nFAILED:", file=sys.stderr)
        for msg in FAILURES:
            print(f"  - {msg}", file=sys.stderr)
        return 1
    print("\nAll checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
