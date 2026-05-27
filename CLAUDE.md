# BookGift

Web app at bookgift.app that helps users find the right book as a gift. The user fills in a short form about the recipient; the app returns 4 concrete book suggestions with reasoning and buy links.

## Tech stack

| Part | Choice |
|---|---|
| Frontend | React + Vite |
| Styling | Tailwind CSS v4 |
| Backend | Vercel Edge Functions |
| AI | Claude API (configurable: Haiku 4.5 or Sonnet 4.6) |
| Book covers | Google Books API (server-side, with placeholder fallback) |
| Hosting | Vercel |
| Database | None |

## Three views

- **View 1 – Landing (`/`):** Tagline, CTA button, three-step explanation, trust signals
- **View 2 – Form (`/find`):** Relation (chips), Gift type (chips), Age (number), Budget (dropdown), Interests (chips, multi-select max 3), Occasion (dropdown), Free text (textarea)
- **View 3 – Results (`/results`):** 4 book cards with cover art, title, author, year, reasoning, buy links (Amazon, Bookshop.org, Google Books). "New recommendations" re-fetches with same form data. "← New search" returns to form.

## Form fields and validation

| Field | Type | Required |
|---|---|---|
| Who are you buying for? | Chips (pick one) | Yes |
| What should the gift express? | Chips (pick one) | Yes |
| Age | Number | No |
| Budget | Dropdown | No |
| Interests | Chips (multi-select, max 3) | Yes |
| Occasion | Dropdown | No |
| Anything else about the person? | Textarea | No |

Errors only shown after first submit attempt.

## AI prompt architecture

System prompt is fixed. User prompt is built dynamically from form data. Response must be valid JSON without preamble:

```json
{"books":[{"title":"...","author":"...","year":2019,"isbn":"...","reason":"..."}]}
```

`reason` is written in English, one sentence, explains why this specific person — not the book in general.

## Model selection

Single constant at top of `api/recommend.js`:

```js
const MODEL = "claude-haiku-4-5-20251001"; // or "claude-sonnet-4-6"
```

## Book covers

Fetched server-side in `api/recommend.js` via Google Books API using `GOOGLE_BOOKS_API_KEY`. All 4 covers fetched in parallel via `Promise.all`. Returns `null` on failure — client falls back to BookOpen icon placeholder.

## Buy links

Search links based on title + author:
- Amazon: `https://www.amazon.com/s?k={q}`
- Bookshop.org: `https://bookshop.org/search?keywords={q}`
- Google Books: `https://books.google.com/books?q={q}`

## Environment variables

```bash
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_BOOKS_API_KEY=AIza...
```

Pull locally with `vercel env pull`.
