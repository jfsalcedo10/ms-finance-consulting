# Google Search Console + Business Profile — setup runbook

Both of these need authenticated access to the practice's Google account, so
they're done by hand, not by the build. This records the exact steps and the
facts about our DNS that determine which path is fastest.

## What's already true (verified 2026-08-15)

| Fact | Value |
|---|---|
| DNS host | domaindiscount24 (`ns1/ns2/ns3.domaindiscount24.net`) |
| Google Workspace | active — MX points at `aspmx.l.google.com` |
| Site verification TXT | **already present** on the apex |
| `www` | CNAME → `jfsalcedo10.github.io` |
| Apex (`mscontadores.com.co`) | A records → GitHub Pages, 301s to `www` |
| Canonical form | `https://www.mscontadores.com.co/…` |

The apex → www redirect is correct and needs no change.

---

## 1. Search Console

**Use a Domain property, not a URL-prefix property.** A Domain property covers
every subdomain and both protocols in one place, which matters here because the
site answers on both the apex and `www`.

There is already a `google-site-verification=…` TXT record on the apex from the
Workspace setup, so **verification should complete immediately with no DNS
change.** If it doesn't, Search Console will show a TXT record to add — that
goes in the domaindiscount24 control panel, on the apex (`@`), and existing TXT
records must be kept, not replaced (removing the SPF record would break email).

1. <https://search.google.com/search-console> → **Add property** → **Domain**
2. Enter `mscontadores.com.co` (no `https://`, no `www`)
3. Verify
4. **Sitemaps** → enter `sitemap.xml` → Submit
   Full URL: `https://www.mscontadores.com.co/sitemap.xml` (12 URLs)
5. **URL Inspection** → request indexing for, in order:
   - `https://www.mscontadores.com.co/` — Spanish home
   - `https://www.mscontadores.com.co/datos-ia.html` — newest, no inbound links
   - `https://www.mscontadores.com.co/en/` — English tree entry point
   - `https://www.mscontadores.com.co/en/services.html`

Expect days to weeks for new URLs. The Spanish pages should be undisturbed
throughout — none of their URLs ever moved.

### What to look at after ~4 weeks

**Performance → Queries** is the only honest feedback on whether the SEO work
paid off. Filter by page to compare the Spanish and English trees. The queries
that actually appear are a better guide to what to write next than any amount
of upfront guessing — and they will include phrasings nobody predicted.

Check **Indexing → Pages** for anything excluded. `404.html` is intentionally
`noindex` and absent from the sitemap; anything else being excluded is a bug
worth investigating.

---

## 2. Google Business Profile

**This is the single biggest lever for "contador en Cartagena", and it is not a
code change.** The local pack — the three map results above the organic list —
is ranked mostly on proximity, profile completeness, and reviews. On-page SEO
decides where you rank *below* the pack; it cannot get you into it.

**Blocker: the street address.** Still an open TODO in `README.md`. Verification
effectively requires a real address even if it's later hidden.

1. <https://business.google.com> → create a profile, signed in as the practice's
   Workspace account (not a personal Gmail — the Workspace account keeps
   ownership with the business)
2. **Name:** `M&S Finance Consulting` — exactly as on the site. Do not append
   keywords like "Contador Cartagena"; that violates Google's naming guidelines
   and is a common cause of suspension.
3. **Primary category:** `Contador` (Accountant).
   Secondary: `Servicio de contabilidad`, and consider `Asesor fiscal`.
   The primary category carries far more ranking weight than the others — get
   it right rather than hedging.
4. **Address:** the real street address. If Emilio prefers not to publish it,
   choose *"I deliver goods and services to my customers"* — the address is used
   for verification but hidden from the public listing.
5. **Service areas:** Cartagena plus the Caribbean cities we already list in the
   site's `areaServed` — Barranquilla, Santa Marta, Montería, Sincelejo,
   Valledupar, Riohacha. Up to 20 are allowed.
   Calibrate expectations: service areas affect *eligibility and display*, not
   proximity ranking. **You cannot rank in Barranquilla's local pack from
   Cartagena.**
6. **Phone:** `+57 300 787 1159` — identical to the site and the footer.
7. **Website:** `https://www.mscontadores.com.co/`
8. **Hours:** Monday–Friday 08:00–17:00, matching the site and the JSON-LD.
9. Verify — usually video or postcard for a service business in Colombia.

### After it's live

- **Reviews are the biggest ongoing lever.** Ask satisfied clients directly;
  Google provides a short review link in the profile dashboard. Review count and
  recency both matter. Never buy reviews.
- **Keep NAP identical everywhere.** Name, Address, Phone must match
  character-for-character across the site, GBP, and any directory. Inconsistent
  NAP actively dilutes local ranking. Worth listing in Páginas Amarillas and the
  Cámara de Comercio de Cartagena directory — with the exact same details.
- Add photos once real ones exist (also an open TODO).

---

## Sequence

1. Search Console — two minutes, unblocked today, do it first
2. Get the street address from Emilio
3. Google Business Profile — blocked on step 2
4. Reviews and directory listings — ongoing, after GBP is verified

Steps 2–4 will move local ranking more than anything left in this repo.
