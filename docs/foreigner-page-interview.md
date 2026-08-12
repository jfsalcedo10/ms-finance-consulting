# Interview guide — the "foreigners / extranjeros" page

**Purpose.** Gather the raw material for `/extranjeros.html` and
`/en/foreigners.html`. These two pages target people who need a Colombian
accountant but aren't Colombian — an audience almost nobody in Cartagena writes
for, and one that searches queries with far less competition than "contador
Cartagena".

**How to use this.** Record the conversation, or take rough notes. Emilio talks;
nobody writes prose during the interview. Answers get turned into pages
afterwards.

**The one rule: nothing goes on the page that Emilio hasn't confirmed.** This is
tax guidance on a practising accountant's site. A wrong threshold or deadline is
a professional-liability problem, not an SEO problem. Where he isn't certain,
that's a fine answer — the page says less, or points to a consultation. Never
fill a gap with something plausible.

**Both languages matter.** A large share of foreigners in Cartagena are
Venezuelan, Argentine, or Spanish and search **in Spanish**. The English page is
not the "real" one with a translation attached. Some questions below are marked
🇻🇪 where they matter most to the Spanish-speaking audience.

---

## A. Who these clients actually are

1. Think of the foreign clients you've had. What countries, and what were they
   doing here — retired, remote worker, bought property, opened a business,
   married a Colombian? Roughly what proportions?
   *→ Decides which scenarios the page leads with. Write for the two or three
   most common, not all of them.*

2. What do they almost always get wrong or not know when they first call?
   *→ This is the single most valuable answer in the interview. Whatever he says
   here becomes the page's opening section, because it's what people are
   searching for.*

3. 🇻🇪 Do Venezuelan clients arrive with different problems than, say, American or
   European ones — PPT or permiso status, documents from Venezuela, informal
   income?
   *→ Determines how much the Spanish page diverges from the English one, rather
   than being a translation.*

## B. Tax residency

4. In plain language, when does a foreigner become a Colombian tax resident?
   How does the 183-day rule actually work — calendar year, rolling window,
   does it need to be continuous?

5. What concretely changes the day someone becomes a tax resident?

6. What's the most common misconception about residency you have to correct?

## C. Registration and paperwork

7. Walk through RUT, cédula de extranjería, NIT and PPT: what each one is, who
   needs which, and in what order.
   *→ "How to get a RUT in Colombia" and "RUT para extranjeros" are real search
   queries with weak results. A clear answer could own them.*

8. What documents does a foreigner need to gather before their first
   appointment? Anything that must come from their home country, apostilled or
   translated?
   *→ A concrete checklist is the kind of thing people bookmark and link to.*

9. What typically goes wrong or causes delays in this paperwork?

## D. Declaración de renta

10. Who has to file, and what are the thresholds in plain numbers? What are the
    deadlines, and how are they assigned?

11. Must a resident foreigner declare income earned **outside** Colombia? What
    about assets held abroad — property, foreign bank accounts?
    *→ This is the question expats worry about most and search most.*

12. What happens if someone has been here for years and never filed? Is that
    fixable, and what does fixing it involve?
    *→ High-intent: people in this situation are actively looking for help now.*

## E. Business and property

13. Can a foreigner open an S.A.S.? What's actually required — residency, a
    Colombian partner, a local address? What surprises people?

14. Buying property as a foreigner: what are the tax and accounting
    consequences people don't anticipate?

15. Anything specific to foreigners who earn abroad and live here — remote
    workers, pensioners drawing a foreign pension?

## F. Working with the practice

16. Can all of this be handled remotely, before someone even moves to Colombia?
    How does that work in practice?
    *→ Directly addresses "can I hire you before I arrive", which is exactly the
    searcher's situation.*

17. What does the first consultation involve, what does it cost, and what does
    someone walk away with?

18. Emilio works in Spanish; Juan Felipe is bilingual. How is an English-speaking
    client actually handled day to day?
    *→ Be precise and honest. "English-speaking accountant" is a strong search
    term, but the page must not overstate what the practice offers.*

19. What do you **not** do, or would refer elsewhere — immigration and visas,
    legal work, anything outside your scope?
    *→ Scope limits protect the practice and build trust. Say them plainly.*

---

## Turning answers into pages

Rough mapping, to be adjusted once the answers exist:

| Page section | Fed by |
|---|---|
| Opening: "you're probably here because…" | Q2, Q3 |
| Are you a Colombian tax resident? | Q4, Q5, Q6 |
| Paperwork you'll need | Q7, Q8, Q9 |
| Filing your declaración de renta | Q10, Q11 |
| If you're behind on filings | Q12 |
| Business and property | Q13, Q14, Q15 |
| Working with us from abroad | Q16, Q17, Q18 |
| What we don't handle | Q19 |

## Constraints when writing

- **One page per language, not one per city.** Twelve near-duplicate
  "Contador en Barranquilla / Santa Marta / …" pages read as doorway pages to
  Google and can damage the whole domain. See the README's SEO section.
- **Depth is the whole point.** A short "we help foreigners too" page ranks for
  nothing. These questions are specific because the answers need to be.
- **No invented facts, no invented testimonials.** `PRODUCT.md` records that the
  practice has no testimonials, case studies or client logos on hand. That
  hasn't changed.
- **The page is generated.** Copy goes in `content/es.json` and
  `content/en.json`, markup in `templates/pages/`, then `python3 build.py`.
  Both language files must gain the same keys or the build fails.
- Add both URLs to `sitemap.xml` via the build, and link to the new page from
  the services page and the homepage — an orphan page with no internal links
  gets crawled late and ranks poorly.

## After it ships

Give it three to four weeks, then read Search Console's Performance tab filtered
to these two URLs. The queries that actually landed tell you what to write next
far better than guessing does — and they'll likely include phrasings nobody in
this conversation predicted.
