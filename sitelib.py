#!/usr/bin/env python3
"""Constants and helpers shared by build.py and verify.py. Stdlib only."""

SITE = "https://www.mscontadores.com.co"
PAGES = ("index", "about", "services", "contact", "privacy")
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
