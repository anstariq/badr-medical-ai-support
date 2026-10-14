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
(BRIC logo, Vision 2030 mark, branch exterior photos). About 650 KB in total.

### Page sections

The page follows the reference's running order: hero → four feature cards and
a call-us card → Khobar opening → Our Commitment to Excellence → Why Choose
Badr → Our Achievements → Our Medical Centers → footer. All copy is the
client's own text from the live page.

The hero is the one change from the reference. Badr's banner has a flat teal
area on the left, so the headline, the **Click to Call** button and the status
pill sit directly on it, with no scrim. Below 860px the doctor photo slides
under the text, so a teal wash covers it there.

Every link is inert (`href="#"`). The call button is the only working control.

## How the voice agent works

Same as Cadence. `app.js` loads the Vapi html-script-tag SDK and starts an
in-browser web call when the hero button is clicked. Vapi's own floating
button is hidden (`.vapi-btn { display: none }`).

`PUBLIC_KEY` and `ASSISTANT_ID` are at the top of `app.js`.

> **Placeholder assistant:** `ASSISTANT_ID` still points to the Cadence agent
> (`add0f8a4…`, "Cadence Academy Agent A"). Change it to the Badr assistant's
> ID once that assistant exists in Vapi. The public key is account-level and
> stays the same.

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
