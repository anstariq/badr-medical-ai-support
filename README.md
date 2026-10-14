# Badr Medical Group AI Support Demo Page

Single-page demo of a Vapi voice agent, styled as badrhealth.com and placed
behind a sign-in gate. It follows the Cadence Education demo
(`../Cadence Demo`): same structure, gate and call button, with a different
brand.

## Brand reference

The theme replicates badrhealth.com. Values were read from that site's
computed styles.

| Element | Value |
| --- | --- |
| Utility bar | `#1a818e`, 64px tall, white Inter 16px |
| Header | White, sticky, 80px, logo 194px wide |
| Nav links | Inter 16px/500, `#1a818e` |
| Contact button | `#1a818e` pill (radius 9999px), white 14px/500, padding 12px 24px |
| Section headings | Inter 48px/700, `#188490` |
| Body text | `#346b7f`; card copy `#4b5563` |
| Footer | gradient `#0c7483` → `#1a818e` → `#188490` |
| Fonts | Inter (Latin), Cairo (Arabic) |

Assets taken from the live site are served locally, not hot-linked:
`badr-logo.png`, `hero.jpg` (their `homebanner2`), and the files in `img/`
(BRIC logo, Vision 2030 mark, branch photos, doctor portraits). About 5 MB in
total.

### Page sections

The page follows the reference's running order: hero → four feature cards and
a call-us card → Khobar opening → Our Commitment to Excellence → Why Choose
Badr → Our Achievements → Our Medical Centers → footer. All copy is the
client's own text from the live page.

The hero is the one change from the reference. Badr's banner has a flat teal
area on the left, so the headline, the **Click to Call** button and the status
pill sit directly on it, with no scrim. Below 860px the doctor photo slides
under the text, so a teal wash covers it there.

### Subpages

`about.html`, `services.html`, `doctors.html` and `branches.html` copy the
matching pages of badrhealth.com. Vercel's `cleanUrls` serves them at `/about`,
`/services`, `/doctors` and `/branches`. Each one opens with a banner holding its
own **Click to Call** button, wired to the same assistant through `app.js`.

- **About:** the story, vision/mission/values and achievements. One garbled
  sentence in the live site's "Commitment to Quality" paragraph has been tidied.
- **Services:** the nine medical exam cards, the department grid with a
  working branch filter, and the pharmacy section.
- **Doctors:** all 63 doctors, from `doctors-data.js`, rendered by
  `doctors.js`, with search and branch/department filters. The live site's
  queue tokens are left out because they come from Badr's live systems. Seven
  portraits are broken on the live site itself, so those doctors show initials.
- **Branches:** tabs for Dammam, Qatif, Jubail and Khobar, rendered by
  `branches.js`, with a Google Maps embed and photo gallery for each.
  `/branches#jubail` opens a specific tab.

Icons are shared from `icons.svg`. The header and footer are copied into each
page, so a change to them has to be made in all five files.

Navigation works between the five pages. Other links (social, Contact,
English) are inert.

## How the voice agent works

Same as Cadence. `app.js` loads the Vapi html-script-tag SDK and starts an
in-browser web call when the hero button is clicked. Vapi's own floating
button is hidden (`.vapi-btn { display: none }`).

`PUBLIC_KEY` and `ASSISTANT_ID` are at the top of `app.js`.

The assistant is the Badr agent (`4e3335f7…`). The public key is
account-level and shared with the Cadence demo.

## Access gate

`middleware.js` is the Cadence gate. Only the cookie name (`badr_session`) and
the public logo path (`/badr-logo.png`) differ. It is Vercel Edge Middleware
and runs before any file is served. Sessions are stateless HMAC-signed tokens
that last one week. `/logout` clears the session.

There are no hardcoded credentials. Set these in the Vercel project's
environment variables:

| Variable | Meaning |
| --- | --- |
| `AUTH_USER` | Sign-in username (same as the Cadence demo) |
| `AUTH_PASSWORD` | Sign-in password (same as the Cadence demo) |
| `AUTH_SECRET` | HMAC key for the session cookie. Use a new random value, not Cadence's. |

If any variable is missing, the gate returns a 503 instead of serving the page
unprotected.

## Local development

```
npx serve .
```

This serves the page without the gate, because middleware only runs on Vercel
or under `vercel dev`.

## Deploy

```
vercel link          # create a new project, e.g. badr-health-ai-support
vercel env add AUTH_USER production
vercel env add AUTH_PASSWORD production
vercel env add AUTH_SECRET production   # e.g. `openssl rand -base64 32`
vercel --prod
```
