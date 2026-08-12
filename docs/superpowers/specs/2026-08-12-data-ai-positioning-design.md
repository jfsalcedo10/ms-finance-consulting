# Design: Data & AI positioning

**Date:** 2026-08-12
**Status:** Approved, ready for implementation planning
**Depends on:** the generated bilingual site (spec `2026-08-11-bilingual-urls-design.md`), already live.

## Problem

The practice's data/AI capability appears in fourteen content keys across the
site, all of it in the same unfalsifiable register — "modern data analysis", "AI-assisted
reporting", "clear, actionable insights". None of it describes anything a buyer
could picture receiving, and there is no page to rank, to link to, or to send
someone to.

This matters more than ordinary vague copy, because the pairing of a
credentialed accountant with a credentialed data scientist is what `PRODUCT.md`
names as the practice's actual differentiator. It is currently the least
substantiated thing on the site.

## Goal and constraints

The data/AI line is a **second business line**, not a bolt-on to the accounting
service. Its owner intends it to grow from side income into something that
eventually supports reducing hours at a full-time job — a multi-year arc, with
the accounting practice as anchor client and first proof.

Two constraints shape every decision below:

- **5–10 hours per week, sustainably.** Not on a motivated week. One
  fixed-scope engagement at a time, and productised where possible. Explicitly
  not at the cost of a life outside the work.
- **The family's reputation is collateral.** Emilio Salcedo has thirty years of
  standing in Cartagena. One overcommitted engagement delivered late costs more
  than a year of good SEO earns. Every offer is sized for the worst week, not
  the best.

## Scope

Two new pages — `/datos-ia.html` and `/en/data-ai.html` — plus targeted rewrites
of the existing data/AI copy so it is specific and points at the new page.

The existing mentions are more widespread than they first appear. In each
language file:

- `hero.subtitle` — "now enhanced with modern data analysis"
- `home.highlights.data.title` / `.body`
- `about.body2`, `about.values.learning.body`, `about.analyst.bio`
- `services.title`, `services.intro`, `services.items.data.title` / `.body`
- `pages.index.description`, `pages.about.title`, `pages.services.description`
- `schema.description`

Not all of these need to change — `schema.description` and `about.body2` are
accurate as they stand. But the rewrite must be planned against the full list
rather than the services item alone, or the page will contradict copy elsewhere.
Nothing outside these keys and the new pages changes.

**Out of scope:** a `/data/` sub-section with multiple pages, a blog, case
studies, and any content engine requiring ongoing publication. Those are what
you build *after* one page proves demand, and they are incompatible with the
capacity constraint. The foreigner/expat pages are a separate project.

## The argument the pages make

> Enterprise data engineering, applied to businesses that could never hire a
> data team — working alongside an accounting practice that has been reading
> their numbers for thirty years.

Three claims carry it, all true today:

1. **Five years of professional delivery.** Leal (Series C Colombian startup —
   locally recognisable, which matters to a Colombian reader) and a global
   materials technology company (enterprise data volume). dbt, Spark, cloud data
   platforms, Postgres, plus data and solution architecture.
2. **Works from vague business needs, not specs.** Requirements are interpreted,
   not handed over. This is the consulting skill, and the reason most SME data
   projects fail: a small business owner cannot write a spec. They say "I don't
   know if we're making money on this product."
3. **Rigour about AI, not novelty.** The Groundwork project — a tool-calling
   agent over an embedded corpus (Spark ingestion, pgvector retrieval, Llama 3.3
   70B, deployed to a live app) — cites its sources and **scores its own
   groundedness so it flags when it is speculating rather than citing**.

Claim 3 is the strongest asset and the least obvious. The single biggest
objection to AI near financial data is "it makes things up." Someone who builds
evaluation into AI systems converts that objection into a proof point, and
almost nobody selling "AI solutions" to SMEs can say anything comparable.

## Page structure

Same structure in both languages. Copy depth may differ; the section set does
not.

| Section | Purpose |
|---|---|
| Opening | The problem in the owner's words: you have the numbers, you cannot see the answer. |
| The offer | Up front, before capability. What you get and what it costs you to find out. |
| How it works | Paid scoping week, then build and handover. States the walk-away point explicitly. |
| What I build | Dashboards and reporting, pipelines and integration, automation of manual work, AI where it can be checked. Concrete, named tooling. |
| Why me | The three claims above, in plain language. |
| AI you can check | The groundedness argument. Why this matters when the data is financial. |
| What I don't do | Scope limits, stated plainly. |
| Contact | One call to action. |

Two sections earn their place against the instinct to cut them. **"What I don't
do"** filters bad fits before they cost evenings, and reads as confidence rather
than limitation. **"AI you can check"** is where the differentiator lives; a
reader will not derive it unaided.

## The offer

A **fixed-scope build** is the headline — a working thing, delivered — not a
document. Rationale: the goal is independence, which requires shipped systems to
point at; an SME owner wants the problem fixed, not diagnosed; and the practice
has no case studies, which a build produces and a report does not.

Scope protection sits inside the offer rather than before it:

1. **Week 1 — paid scoping.** Look at where the data actually lives and what is
   being done by hand. Ends in either a confirmed scope or a written assessment
   handed back, with the engagement ending there. Either outcome is a complete,
   paid deliverable.
2. **Weeks 2–4 — build and handover.**

The page states plainly what is included, what is not, and that week 1 can end
it. This is the difference between a scoping step and a sales device.

**Pricing is not published on the page.** It states fixed scope and a fixed
price agreed before any build begins. Publishing a number is a later
optimisation, once there is evidence of what engagements actually cost to
deliver; guessing one now, with no delivered engagements to calibrate against,
would be worse than omitting it.

**The first engagement is Emilio's practice** — thorough, and written up. It
produces the case study the site currently lacks and calibrates the pricing.

## What the pages target

Task-shaped queries, not the discipline. Nobody with this problem searches "data
analysis"; they search the symptom.

- **Spanish** carries the volume: *automatizar informes*, *dashboard para pyme*,
  *análisis de datos para empresas*, *automatización de procesos*.
- **English** is credibility plus foreign-owned businesses operating in
  Colombia, which is where this quietly overlaps with the planned foreigner
  pages.

**Local search volume for this will be small, and that is expected.** Scarcity
of supply in the Colombian Caribbean implies scarcity of local search demand —
you can rank first for a phrase nobody types. The Cartagena win comes from
Emilio having something concrete to point at, not from traffic. Ranking locally
is trivially easy and worth doing; it is not where leads come from.

## Avoiding self-competition

The services page currently carries a full paragraph on data and is titled
*"Servicios Contables, Tributarios y de Datos en Cartagena"*. Left alone, it
would compete with the new page for the same queries, and split signals mean
neither ranks well.

- The services page's data item becomes a **short pointer** — two sentences and
  a link — visibly a "there is more here" card rather than a peer of the three
  accounting services.
- The services page's title and meta description **refocus on accounting and
  tax**, dropping "y de Datos", so the new page owns those queries.
- The home highlight and the About bio get the same treatment: specific, short,
  linking to the real page.

Complete picture on Services, one clear internal link into the new page, depth
in exactly one place.

## What will not be claimed

- **No forecasting or predictive modelling.** The owner can likely do it but
  does not practise it daily. A services page is a promise, and the first client
  to take it up gets a project being learned on, in evenings, with the family
  reputation attached. It costs nothing to omit — nobody browsing this page is
  searching for forecasting. If a real engagement calls for it, it can be
  offered then, scoped as exploratory, and added to the page once delivered.
  This upholds `PRODUCT.md`'s existing position.
- **No case studies or testimonials**, until the engagement with Emilio's
  practice is complete and written up.
- **No implied client delivery.** Groundwork is a bootcamp capstone and side
  project. It demonstrates capability and must be described as such, never as
  work delivered to a client.
- **The current employer is described generically** ("a global materials
  technology company") until the owner has checked whether their contract
  permits naming it on a page selling consulting services. Leal is past
  employment and safe to name.

## Site integration

- Both pages are added to `PAGES` in `sitelib.py`, which propagates
  automatically to `build.py`, `verify.py`, `sitemap.xml` and the hreflang
  alternates. Both language versions ship together — the strict mirror is
  enforced by the build, and mismatched keys fail it.
- Copy lives in `content/es.json` and `content/en.json` under a new namespace;
  markup in `templates/pages/`.
- **A fifth main-nav item** (*Datos e IA* / *Data & AI*) is added. This is a
  business line, not a sub-service, and a nav link materially helps the page get
  crawled.
- Page filenames differ per language (`datos-ia.html` / `data-ai.html`), unlike
  every existing page. The generator currently derives output filenames from a
  single page key shared by both languages, so this requires a per-language
  filename mapping — the one non-trivial technical change in this project.

## Inputs required before implementation

These are dependencies with a named owner, not open questions in the design:

1. **Contract check** on naming the current employer. Until confirmed, the
   generic description is used.
2. **The first build's concrete deliverable** — a dashboard over the client's
   accounting data is the working assumption; the owner is better placed to say
   what is realistic in three weeks of evenings.
3. **One or two additional capability examples** if desired, anonymised as
   needed. Groundwork alone is sufficient to write from but is a side project;
   professional examples would strengthen the "why me" section.

## Success criteria

- Both pages exist, are indexable, mirror each other, and pass `verify.py`.
- The services page no longer competes for data queries; exactly one internal
  path leads into each new page from Services, Home and About.
- A reader can state, after one pass, what they would buy and what it commits
  them to.
- Nothing on either page overstates what has been delivered.
- Emilio can send the link to a prospect and have it do useful work unaccompanied.
