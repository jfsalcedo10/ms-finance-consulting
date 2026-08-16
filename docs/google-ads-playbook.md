# Google Ads — ready-to-run campaign

**Status: parked.** Everything below is decided and character-checked; it needs
budget, not more thinking. Written 2026-08-16 while setting up the Business
Profile, when a promotional credit turned out to carry a matching-spend
requirement.

---

## Read this first: the credit is not free money

The promo offered with the Workspace/Business Profile setup is a **spend-match**:
you spend the qualifying amount within a deadline, and the credit arrives
afterwards. It is not a free budget.

Before committing, confirm in the promotion's own terms:

1. The **matching spend** required
2. The **deadline** to meet it (usually 60 days from activating the promo)
3. When the **credit itself expires**

If it is a straight match, the real budget is roughly double what you put in —
but only if you were going to spend that money regardless. Don't let a credit
talk you into a spend you hadn't otherwise decided on. That's the entire point
of the offer.

---

## Pre-flight — do this before spending anything

**Set up conversion tracking.** The contact form is the practice's only lead
channel. Without tracking, a month of spend tells you your cost per *click* and
nothing about your cost per *enquiry* — and only the second number tells you
whether to do it again.

**The hook already exists.** `reportConversion()` in `js/main.js` runs on a
confirmed successful submission and is **inert by default** — it loads no script,
sets no cookie, and makes no network call until configured. It also always
dispatches a `ms:contact-submitted` DOM event, so anything else that wants to
observe an enquiry has a stable thing to listen on.

To enable it, in this order:

1. **Create the conversion action** in Google Ads → *Goals → Conversions*. Choose
   a *Website* conversion, category *Submit lead form*. This produces the
   conversion **ID** (`AW-XXXXXXXXX`) and **label** — neither exists before this
   step, which is why nothing is hardcoded.

2. **Update the privacy policy — before, not after.** `legal.s9.body` in
   `content/es.json` and `content/en.json` currently states in both languages
   that the site sets no cookies and stores nothing in the browser. Google's
   tag sets advertising cookies, so shipping it without amending that text
   leaves a false disclosure on a Habeas Data policy for a real practice. Amend
   §9 to describe the advertising cookie, its purpose, and that it comes from
   Google.

   Also reconsider **§5 (third parties and international transfer)** — Google
   becomes a second recipient of visitor data alongside Web3Forms, and Article
   26 of Ley 1581 governs that transfer. Worth a look at whether a cookie
   consent banner is warranted at that point; the current design deliberately
   avoids needing one.

3. **Add the gtag snippet** to `templates/base.html`, then rebuild.

4. **Set the values on the form** in `templates/pages/contact.html`:
   `data-conversion-id="AW-XXXXXXXXX"` and `data-conversion-label="…"`.
   The hook reads both and stays silent unless both are present.

5. **Test before spending.** Submit the form once and confirm the conversion
   registers in Ads — a campaign that runs for a month with broken tracking
   produces exactly the number you were trying to avoid: cost per click.

Steps 2 and 3 are the ones to keep in order. Shipping the tag first means the
policy is false for however long the gap lasts.

**Check the floor.** In Keyword Planner, get the estimated CPC for
`[contador cartagena]`, then:

```
clicks per day = daily budget ÷ CPC
```

Under roughly 3–5 clicks/day means weeks before the data says anything. If it
lands there, narrow to one or two keywords so the budget concentrates rather
than spreading thin.

---

## Campaign settings

| Setting | Value | Why |
|---|---|---|
| Type | **Search only** | Turn **off** Display Network expansion — on by default, and it spends the budget on unrelated sites |
| Final URL | `https://www.mscontadores.com.co/` | Homepage title/description already target these terms, which helps Quality Score |
| Language | Spanish | |
| Bidding | **Maximize clicks** with a max CPC cap | Target CPA needs conversion history that doesn't exist yet; with none, it spends erratically |
| Location | Cartagena + **30 km radius** | See below |
| Location options | **"Presence"** — not the default "Presence or interest" | The default shows ads to anyone anywhere who merely searched *about* Cartagena. On a small budget this is the single fastest way to waste it. |

### Keywords — phrase and exact only, never broad

```
[contador cartagena]
[contador público cartagena]
"declaración de renta cartagena"
"asesoría contable cartagena"
```

Broad match on a small budget buys clicks from students and job-seekers
searching "contabilidad".

### Geography

Straight-line distance from Cartagena centro:

| | km |
|---|---|
| Turbaco | 13 |
| Turbaná / Santa Rosa | 16 |
| **Arjona** | **25** |
| Clemencia | 28 |
| María la Baja | 52 |
| Barranquilla / Soledad | 100 |
| Sincelejo | 122 |

A **30 km radius** covers Arjona with margin, plus Turbaco, Turbaná, Santa Rosa
and Clemencia.

**Do not stretch the radius to reach Barranquilla.** A 100 km circle also buys
70 km of low-demand highway in between. If Barranquilla is wanted later, add it
**by city name** as a **separate ad group** with its own budget cap — separate
so its performance can be read, and switched off, independently. Paid search has
no proximity ranking, so competing there is legitimate; it is simply a second
market, and shouldn't be entered blind before the home market's numbers are
known.

---

## Assets

All character counts verified against Google's limits. Accented characters count
as one each.

### Headlines (max 30)

```
Contador en Cartagena              21
Contabilidad e Impuestos           24
30+ Años de Experiencia            23
Asesoría Contable Cartagena        27
Declaración de Renta 2026          25
```

Three is the minimum; use all five. Google rotates them at no extra cost.

### Descriptions

Where only two are allowed (one short, one long):

Short (56 / 60):

```
Declaración de renta, IVA, nómina y estados financieros.
```

Long (85 / 90):

```
Más de 30 años ayudando a empresas y personas. Escríbenos y te respondemos en un día.
```

The short line deliberately names **services the headlines don't** — an earlier
draft ("Contabilidad, impuestos y asesoría financiera en Cartagena.") was
dropped for repeating the headlines almost word for word.

Alternates, by angle:

```
services       Renta, IVA, nómina, NIIF y estados financieros al día.         54
audience       Para pymes, independientes y personas naturales.               48
differentiator Trabajas siempre con el contador, no con un call center.       56
differentiator Atención bilingüe, presencial o remota en toda la región.      57
ease           Agenda una consulta sin costo y sin compromiso.                47
```

Long alternates — kept unwrapped so they can be copied verbatim:

```
Contador público con 30 años en Cartagena. Declaración de renta, IVA y contabilidad.
Contabilidad, impuestos y consultoría financiera. Atención directa, no un call center.
```

Note: `Pymes, independientes y extranjeros en Colombia.` (48) names the
foreign-resident audience — a genuine differentiator, but that audience is not
searching "contador cartagena" in Spanish. Save it for a campaign aimed at the
foreigner pages, once those exist.

### Sitelinks (text max 25, each description line max 35)

| Text | Line 1 | Line 2 | URL |
|---|---|---|---|
| `Datos & IA` | `Tableros y automatización` | `para decisiones con datos` | `/datos-ia.html` |
| `Declaración de Renta` | `Personas y empresas` | `Cumple a tiempo y sin líos` | `/services.html` |
| `Nuestros Servicios` | `Contabilidad, impuestos` | `y consultoría financiera` | `/services.html` |

### Callouts (max 25)

```
30+ años en Cartagena              21
Atención personal directa          25
Bilingüe español e inglés          25
Análisis de datos e IA             22
Respuesta en un día hábil          25
```

Callouts are non-clickable text under the ad. They're free, they make the ad
physically larger, and Google picks 2–4 depending on space — so each must stand
alone and must not read as part of a sequence. No prices, no exclamation marks,
no "¡llámanos ya!": Google rejects callouts that read as offers rather than
attributes, and rejected assets silently stop showing.

---

## The one judgement call: data/AI stays out of the headlines

Data & AI appears **only in a sitelink and a callout**, never in a headline or
description.

Headlines determine how well the ad matches the query. Someone typing "contador
cartagena" wants an accountant; a headline mixing in data consulting reads as
less relevant, which lowers click-through, which lowers Quality Score, which
raises cost per click. On a small budget that is the wrong trade.

There is also a demand problem: almost nobody in Cartagena searches for data
consulting, so advertising it means paying to *create* awareness — the most
expensive thing a small search budget can attempt. The sitelink still puts it in
front of the same people at no cost to relevance.

**Do not make `/datos-ia.html` the landing page.** It has no delivered
engagements and no case study behind it yet, so paid clicks would arrive
somewhere that can't convert them.

---

## What to measure

After the run, the questions worth answering:

- **Cost per enquiry**, not cost per click — the reason conversion tracking is
  pre-flight and not optional.
- **Search terms report** — the actual queries that triggered the ad, which is
  usually where the surprises are. If *anything* data-related shows up from
  Cartagena, that's real evidence local demand exists and a separate campaign
  is worth testing. Expect it won't; the report settles the question cheaply
  either way.
- **Cross-check against Search Console.** Paid tells you what people will click
  now; organic tells you what's compounding. If a query converts well in Ads,
  it's a strong candidate for a dedicated page.

### When to stop

Decide the kill criteria before spending, not after: if cost per enquiry exceeds
what a client is worth over their first year, stop and put the effort into
Business Profile reviews instead. Reviews cost nothing and compound; ads stop
the moment you stop paying.

---

## Related

- `docs/google-setup.md` — Search Console and Business Profile setup
- `docs/foreigner-page-interview.md` — the content project that would justify a
  second, differently-targeted campaign
