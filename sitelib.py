#!/usr/bin/env python3
"""Constants and helpers shared by build.py and verify.py. Stdlib only."""

SITE = "https://www.mscontadores.com.co"
PAGES = ("index", "about", "services", "contact", "privacy", "data")

# Page keys whose output FILENAME differs per language. Every other page uses
# its key as the filename in both trees. A Spanish page called data-ai.html (or
# an English one called datos-ia.html) would read as a mistake to the visitor
# and waste the slug, which carries a little weight in search.
FILENAMES = {
    "data": {"es": "datos-ia", "en": "data-ai"},
}


def filename(lang, page):
    """Output filename stem for a page in a given language."""
    return FILENAMES.get(page, {}).get(lang, page)
LANGS = ("es", "en")


def flatten(obj, prefix=""):
    """Flatten nested dicts to dotted keys: {'a': {'b': 1}} -> {'a.b': 1}."""
    flat = {}
    for key, value in obj.items():
        path = f"{prefix}{key}"
        if isinstance(value, dict):
            flat.update(flatten(value, path + "."))
        else:
            flat[path] = value
    return flat
