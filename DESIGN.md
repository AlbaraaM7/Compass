# Compass — Design Package

The whole point of this build is a video that plays as the visitor scrolls,
and which video plays depends on which "genre" (track) the visitor picks.

---

## 1. Brand premise

**Compass is the catalog your orientation week never gave you — a one-page,
scroll-driven look at what four years inside a chosen track actually feels
like, before you pay for the wrong one.**

---

## 2. Color tokens per track

All values are CSS custom properties on the root of each track-themed section.
Never pure black, never pure white.

### Engineering & Tech — "Circuit at dawn"

| Token | Value | Use |
|---|---|---|
| `--canvas` | `#0B1226` | Page background, deep midnight navy |
| `--panel` | `#131A33` | Cards, raised surfaces |
| `--accent` | `#5AE6FF` | Primary accent, electric cyan |
| `--accent-hover` | `#8FF1FF` | Hover state |
| `--accent-muted` | `#2A4A6E` | Faint accent, dividers |
| `--text-primary` | `#E6F0FF` | Headlines, body |
| `--text-secondary` | `#93A8C4` | Captions, labels |

### Business & Entrepreneurship — "Boardroom at dusk"

| Token | Value | Use |
|---|---|---|
| `--canvas` | `#1B0F08` | Page background, deep oxblood |
| `--panel` | `#261810` | Cards, raised surfaces |
| `--accent` | `#E8A957` | Primary accent, warm amber |
| `--accent-hover` | `#FFC97D` | Hover state |
| `--accent-muted` | `#6B4A28` | Faint accent, dividers |
| `--text-primary` | `#F5EAD9` | Headlines, body |
| `--text-secondary` | `#B5A088` | Captions, labels |

### Arts & Design — "Studio at midnight"

| Token | Value | Use |
|---|---|---|
| `--canvas` | `#170A22` | Page background, deep ink violet |
| `--panel` | `#1F1230` | Cards, raised surfaces |
| `--accent` | `#FF5DA2` | Primary accent, magenta rose |
| `--accent-hover` | `#FF87B8` | Hover state |
| `--accent-muted` | `#5A2A55` | Faint accent, dividers |
| `--text-primary` | `#F4E9F5` | Headlines, body |
| `--text-secondary` | `#A88FB0` | Captions, labels |

### Health & Science — "Clinic at first light"

| Token | Value | Use |
|---|---|---|
| `--canvas` | `#08191B` | Page background, deep clinical teal |
| `--panel` | `#0E2628` | Cards, raised surfaces |
| `--accent` | `#7CE0B5` | Primary accent, soft mint |
| `--accent-hover` | `#A6EBC9` | Hover state |
| `--accent-muted` | `#2A5C50` | Faint accent, dividers |
| `--text-primary` | `#E5F4EC` | Headlines, body |
| `--text-secondary` | `#88B5A8` | Captions, labels |

---

## 3. Type trio

| Role | Family | Why |
|---|---|---|
| Display | **Bricolage Grotesque** (variable) | Distinctive, geometric, modern, not Inter, not Roboto. Variable weight axis lets us push to 900 for hero headlines without an extra file. |
| Body | **Inter Tight** | Calm, neutral, readable at small sizes. Quiet on purpose — display does the talking. |
| Mono | **JetBrains Mono** | For the small mono labels (track codes, scroll hints, time stamps). |

All three are on Google Fonts. No install, one CSS link.

---

## 4. Hero band map (per track)

Each track has the same five caption beats at the same scroll ranges. The
copy and the canvas subject change per track.

| Beat | Scroll range | What's on screen | Caption copy |
|---|---|---|---|
| 1 | 0–18% | Subject at top of frame, motion starting | (track name fades in) |
| 2 | 18–38% | Subject descending | (track one-liner) |
| 3 | 38–58% | Subject mid-frame | (track second beat) |
| 4 | 58–78% | Subject arriving | (track final beat) |
| 5 | 78–100% | Subject at rest, full negative space for CTA | "Choose your track." |

Per-track copy for beats 2–4 (beat 1 is the track name in display, beat 5 is
shared CTA):

**Engineering & Tech**
- 2: "Pick a path."
- 3: "See what four years inside it actually feels like."
- 4: "Before you pay for the wrong one."

**Business & Entrepreneurship**
- 2: "The pitch deck is not the product."
- 3: "Four years is one long customer interview."
- 4: "Find the people who would pay tomorrow."

**Arts & Design**
- 2: "Talent is a practice, not a portfolio."
- 3: "The work is the long quiet hours."
- 4: "See the studio before you choose the studio."

**Health & Science**
- 2: "Caring for people is a craft."
- 3: "Labs, rounds, study, sleep. Repeat."
- 4: "Know the weight before you carry it."

---

## 5. Below-fold outline, in order

For every track, in order:

### 5a. A real "week in the life" timeline

Three moments from a real-feeling week. No filler. No brochure.

**Engineering & Tech**
- Monday, 9am — Algorithms lecture, 400-seat hall. The TA draws a recursion tree and erases it before you've copied it down.
- Wednesday, 2pm — Lab. The bug is not in your code. It's in your assumptions. You pair up with a third-year who points at one line and says "that one."
- Friday, 6pm — Build night. Your team ships a side project. Pizza arrives. Someone commits at midnight. Someone else leaves at 9. Both of you ship by Sunday.

**Business & Entrepreneurship**
- Monday, 8am — Case study cold open. Twenty pages dropped at 7am. Your team has until 3pm. The case is about a founder who almost fired herself.
- Tuesday, 7pm — Pitch night at the entrepreneurship center. Three founders, ten minutes each, real questions from the floor. One of them is twenty years old.
- Friday, 4pm — Coffee with the alum who sold her second company. She tells you what she wishes she'd known. She didn't tell you to network. She told you to write.

**Arts & Design**
- Tuesday, 10am — Studio critique. Twelve works on the wall, twelve different ways to be wrong. The professor points at yours and asks one question that takes the rest of the day to answer.
- Thursday, midnight — Printmaking studio. The press is yours for two hours if no one is waiting. You lose track of time. You find your work changed.
- Sunday, morning — Open figure drawing. Same model, same pose, different hand. You notice what you didn't see last week.

**Health & Science**
- Monday, 7am — Anatomy lab. The donor on your table has been here longer than most of your professors. You learn to look at what can't be unseen.
- Thursday, noon — Hospital rounds. You stand where the team stands. The attending asks you to summarize in one sentence. You do. You learn later it was the right one.
- Saturday, morning — Study group in the library basement. Someone brings flashcards. Someone brings coffee. Someone brings a friend who cried in last week's exam and needs to pass this one.

### 5b. "What you'll actually build or do"

Three specific, named outcomes. Not "develop skills." Not "gain experience."

**Engineering & Tech**
- A working compiler for a tiny language, by week six of your second year.
- A side project with strangers you met at a hackathon, kept alive on weekends.
- A portfolio that reads as proof, not promise.

**Business & Entrepreneurship**
- A real business model for a real customer, validated in a semester.
- A deck you've pitched to a room that wasn't grading you.
- A notebook of small favors that's actually worth more than a contact list.

**Arts & Design**
- A body of work that doesn't fit on a single portfolio page.
- A critique vocabulary sharp enough to take apart your own work.
- A practice you can defend on the days you don't feel like defending anything.

**Health & Science**
- A clinical instinct you can name, not just feel.
- A study system that survives contact with the syllabus.
- A clear-eyed sense of who you are at the end of a long week.

### 5c. Resources and clubs

Three to four connected places a real student would look for. Not generic.

**Engineering & Tech**
- ACM student chapter — meet your first collaborator here.
- The maker space — 3D printers, soldering irons, someone at the front desk who knows where the parts are.
- Hackathon calendar — three per semester, all on campus, all free.
- Office hours — the professor actually answers, if you actually go.

**Business & Entrepreneurship**
- The entrepreneurship center — free desk space, free coffee, no free advice.
- The pitch competition — your first investor simulation.
- Alumni mentor list — ask one good question, get one honest answer.
- The writing circle — your best business skill is the sentence you write at 11pm.

**Arts & Design**
- The studio coop — cheap materials, late hours, no questions.
- Visiting artist talks — most are free, almost all are worth it.
- The print lab — analog skills sharpen digital work.
- Senior thesis show — your deadline, your audience, your opening night.

**Health & Science**
- The simulation center — practice the worst day of your career on a mannequin before it happens for real.
- Shadow program — eight hours in a unit you think you want.
- The wellness office — for the weeks when the work is the work.
- Peer support network — the people who will study with you at 2am because they need it too.

### 5d. CTA

Same CTA across all tracks.

**Heading:** One email a month. A real look at what each track actually feels like.
**Body:** No newsletter. No funnels. One short note, the first Sunday of the month, with the week-in-the-life for one track and a link to last month's.
**Button:** Subscribe (mailto stub, this is a design concept).

---

## 6. Copy gate

Before showing this to anyone:

- Zero em dashes (—). Use periods, colons, or restructure.
- Zero of: leverage, seamless, empower, unlock, robust, actionable,
  data-driven, solutions, testament, landscape, delve, elevate.
- Every line is checked in `grep` before deploy.

---

## 7. Clarity rule

The track picker and the one-line explanation must be visible in the first
viewport, before any video has played its first beat. The visitor knows what
this site is and what to do next within two seconds of load.

Above the fold, in the first viewport:
- Wordmark: **Compass**
- One-line explanation: **Pick a track. See what four years inside it actually feels like.**
- Four track buttons, always visible, with a small label below each.
