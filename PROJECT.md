# PROJECT.md — Noam Garibi Portfolio Spec

Source of truth for building the site. Every fact below comes from `resume.pdf`. Nothing here may be reworded into a bigger claim than the resume makes. Anything not on the resume is marked **[TODO]** and must stay out of the build until Noam fills it in.

---

## 0. Open inputs (Noam fills these in)

The "About me" fields in the original brief still had placeholder examples, so they are not used:

| Input | Status |
|---|---|
| What I'm looking for | summer SWE internship
| Interests for the interactive piece | **[TODO]**. Until filled, the spec uses the interests listed on the resume: Manchester United, water polo, pickleball |
| Vibe in three words | Professional, Clean, unique
| Headshot / photo | **[TODO]** (optional; the design works without one) |
| Project links (live demo / repo URLs) | **[TODO]** for X-ray, AI Syllabus Calendar, Clumzy Aztecs. Without them, cards show no link |

---

## 1. Content

### 1.1 Headline

> **Noam Garibi** — Computer Science student at San Diego State University building full-stack products that save people time.

Sub-line (small, mono): `B.S. Computer Science · SDSU · Class of 2028 · San Diego, CA`

Status line (only once filled in): `Looking for: [TODO]`

*Basis: B.S. CS at SDSU, Aug 2024 – May 2028; the "save time" framing is backed by the ~7 hours per order figure at LEICHT USA.*

### 1.2 About (first person)

> I’m a Computer Science student at San Diego State University. I chose to pursue coding because I enjoy problem solving and I have a desire to create impact and push innovation forward. I’ve worked on full-stack projects and currently develop product features and automation systems at LEICHT, focusing on clean design, scalability, and practical use. I also help lead the World Computing Organization, where I organize events and collaborate on technical projects. I’m always looking to grow as an engineer and build things that I find important. 

### 1.3 Featured work (3 cards, in this order)

**1. LEICHT USA — Order-revision automation**
- Role: Software Engineer · Jan 2026 – Aug 2026 · Orange County, CA
- What I did: Built a layout-aware PDF parser and an automated order-revision workflow that compares factory confirmations against original orders and flags discrepancies. Moved parsing to background jobs so uploads don't block requests.
- Tools: TypeScript, Next.js, React, Node.js, MongoDB, AWS S3
- Result: Saves designers **approximately 7 hours per order**.

**2. EasyCoach.Club — Staff permissions & custom data**
- Role: Software Engineer Intern · Jun 2026 – Aug 2026 · Tel Aviv, Israel
- What I did: Built an end-to-end staff permissions system and expanded staff/player data models with static and club-defined custom fields across **16 languages**. Rebuilt club onboarding and admin tooling (branding, feature toggles, team/player filters, database-driven per-club feature configuration).
- Tools: React, PHP/CodeIgniter, MySQL, AWS S3, Cloudflare
- Result: Clubs can collect staff data they couldn't before, and sensitive information is restricted from unauthorized users. **15+ production-ready features** shipped across the stack.

**3. X-ray Browser Extension — Detecting manipulative design**
- Role: Personal project · Aug 2026 – Present (in progress, label it "Building")
- What I did: A Chrome extension that detects manipulative web design: asymmetric consent controls, pre-enabled settings, refusal friction, and deceptive banner behavior. Built a React overlay that maps findings to page elements, plus LLM-based analysis through a server-side Next.js API and Vercel AI Gateway for text judgments beyond deterministic rules.
- Tools: TypeScript, React, WXT, Next.js, Vercel
- Result: Detectors validated against **12 saved real-world pages with 115 tests**, including negative cases designed to produce no findings.
- Link: **[TODO]**

**Smaller projects (compact list under the cards):**
- **AI Syllabus Calendar** (Dec 2025 – Jan 2026) · JavaScript, Vercel AI SDK, Google Calendar API. A web app that uses LLM-based text processing to pull exams and deadlines out of uploaded syllabi and create Google Calendar events automatically. Link: **[TODO]**
- **Clumzy Aztecs** (Hackathon) · React, JavaScript, OCR, SendGrid. A lost-ID prototype that reads student identifiers from uploaded images with OCR, matches them against a directory, and sends automated email alerts. Hackathon name/date: **[TODO]**. Link: **[TODO]**

### 1.4 Experience (timeline, newest first)

| Dates | Role | Org | Summary (resume facts only) |
|---|---|---|---|
| Aug 2026 – Present | Teaching Associate, Computer Organization and Data Structures | San Diego State University | Guide 90+ students through programming concepts and debugging in office hours and one-on-one sessions; grade assignments and give feedback on code quality and problem-solving. |
| Jun 2026 – Aug 2026 | Software Engineer Intern | EasyCoach.Club, Tel Aviv | 15+ production features for a football-club management platform; staff permissions; 16-language custom fields; onboarding/admin rebuild; safe retries for failure-prone network workflows. |
| Jan 2026 – Aug 2026 | Software Engineer | LEICHT USA, Orange County | Production features for a kitchen-design project management platform (design workflows, orders, project tracking, catalogs, financial data); PDF order-revision workflow (~7 hrs/order saved); led an automated CRM lead follow-up system with eligibility rules and cron scheduling; AI competitor analysis, AI website audits, and custom Claude skills for campaign assets, contributing to 800+ new website users and a 100%+ increase in average engagement time within one month. |
| Nov 2025 – Present | Vice President | World Computing Organization, SDSU | Lead a 12-member executive board serving a 200+ member computing org; organize workshops, speakers, hack days, and project events averaging ~55 attendees. |
| Aug 2025 – Dec 2025 | Recruitment Assistant | Hillel Business Initiative | Led recruitment that grew average club membership from ~20 to 35–40 students. |

Education line: **San Diego State University** — B.S. Computer Science, Aug 2024 – May 2028 · GPA 3.81 · Dean's List.

> Note for the build: the LEICHT and EasyCoach dates overlap (Jun–Aug 2026). That's what the resume says, so show it as-is. Don't "fix" it.

### 1.5 Skills (grouped exactly as on the resume)

- **Languages:** TypeScript, JavaScript, Python, C++, Assembly, HTML/CSS
- **Frameworks/Backend:** React, Next.js, Node.js, PHP/CodeIgniter
- **Data/Cloud/Tools:** MySQL, MongoDB, AWS S3, Cloudflare, Vercel, Git
- **APIs/AI:** OpenAI GPT-4o, Vercel AI SDK, Google Calendar API, SendGrid, OCR

No proficiency bars, percentages, or star ratings. They would be invented numbers.

### 1.6 Contact (email, LinkedIn, GitHub)

- Email: `noamgaribi@gmail.com` (plain `mailto:` link)
- LinkedIn: `linkedin.com/in/noamgaribi`
- GitHub: `github.com/NoamGaribi`

---

## 2. Leave-out list (on the resume, NOT on the site)

| Item | Reason |
|---|---|
| Phone number (949-…) | Privacy |
| AEPi affiliation | Personal/Greek-life affiliation; leave off unless Noam opts in |
| Game of Thrones interest | Keeps the About tight; not needed for the interactive piece |
| Home address, birthday, references | Not on the resume. Never add them |
| Resume PDF download | Not requested, and the PDF contains the phone number |

---

## 3. Pages and sections

**One page** (`app/page.tsx`), sections in this order, with an anchor nav:

1. **Header / nav** (sticky, minimal): name mark on the left; `Work · Experience · Play · Contact` on the right. On mobile it collapses to the name mark plus a single "Contact" link. No hamburger.
2. **Hero** (`#top`): headline, sub-line, status line (once filled), two text links: "See my work ↓" and "Email me".
3. **About** (`#about`): the two-paragraph About from §1.2.
4. **Featured work** (`#work`): 3 project cards from §1.3, then the compact "Smaller projects" list.
5. **Experience** (`#experience`): timeline from §1.4, education line at the bottom.
6. **Skills** (`#skills`): four grouped rows from §1.5.
7. **Play** (`#play`): the interactive piece from §5.
8. **Contact** (`#contact`): one large line, "Say hi →", with the email, LinkedIn, and GitHub links.
9. **Footer**: `© 2026 Noam Garibi · Built with Next.js`. Nothing else.

Also: `app/not-found.tsx` (a one-line 404 in the site style with a link home), and real `metadata` in `app/layout.tsx` (title "Noam Garibi", description from the headline).

---

## 4. Design direction

**Concept: "the inspection sheet."** Noam's best work is about *checking things carefully*: comparing factory confirmations against orders, X-raying web pages for manipulation, grading code. The site should feel like a beautifully typeset technical inspection report with annotation marks on it, warmed up by a sporty accent color.

### Fonts (via `next/font/google`, built into Next, so no new package)
- **Display:** *Bricolage Grotesque*, weight 700–800, tight tracking (−0.03em), for the name, section titles, and big numbers.
- **Body:** *Geist* (already set up), 17–18px, line-height 1.6.
- **Annotations / metadata:** *Geist Mono* (already set up), 12–13px, uppercase, wide tracking, for dates, tool lists, labels, and callout marks.

### Colors (CSS variables in `globals.css`, exposed to Tailwind via `@theme inline`)

White is dominant and black is secondary. One light theme only, with no dark-mode switch.

| Token | Value | Use |
|---|---|---|
| `--paper` | `#FFFFFF` | Background |
| `--ink` | `#0A0A0A` | Text, borders, keeper |
| `--muted` | `#5C5C5C` | Metadata |
| `--rule` | `#E4E4E4` | Hairlines, grid |
| `--mark` | `#D7263D` (red) | Signature annotations, key numbers, focus rings |
| `--pool` | `#1C6E8C` (pool blue) | Links on hover, game accents |

Red is a quiet nod to Manchester United and pool blue to water polo. Neither is used as a large fill; both appear only as ink-like marks.

### Layout
- Max content width ~1120px, 12-column grid on desktop, single column on mobile with 20px gutters.
- **Asymmetric**: section labels sit in a narrow left column in mono (`01 — WORK`), and content fills the right 9 columns. On mobile the labels sit above the content.
- Hairline rules (`--rule`) separate sections. No drop shadows, no gradient blobs, no rounded "SaaS cards". Project cards are bordered sheets with square corners.
- Generous whitespace; the hero takes about 80vh with the name set very large (clamp ~56–128px).

### Signature detail: red-pen annotations
The key metric on each project card (**~7 hrs/order**, **16 languages**, **115 tests**) and in the timeline gets a hand-drawn **red circle or underline** drawn in inline SVG. It "draws itself" (stroke-dashoffset animation, ~600ms) the first time it scrolls into view, using `IntersectionObserver`. A tiny mono margin note sits next to it (e.g. `↖ verified on 12 real pages`, using only resume wording). It reads like a reviewer marking up an inspection sheet, which ties directly to the order-checking and X-ray work. With `prefers-reduced-motion`, the marks render already drawn, with no animation.

### Accessibility
WCAG AA contrast for all text, visible `--mark` focus rings, semantic headings (one `h1`), annotations marked `aria-hidden` (the underlying text already carries the meaning), and full keyboard navigation.

---

## 5. Interactive piece: "Penalty Box"

A tiny penalty-shootout game in the `#play` section. It's based on Manchester United (on the resume), and it ties to the EasyCoach.Club football-club platform Noam worked on. Water polo / pickleball variants are possible once §0 interests are confirmed.

### How it works
- Rendered with **SVG + React state** (no canvas library, no physics package). A goal frame is split into a **3×2 grid of 6 target zones**, with a keeper in the middle.
- 5 shots per round. For each shot the player picks a zone; the keeper dives to a zone picked by a simple seeded pseudo-random strategy that is slightly biased toward the player's last two choices. That way spamming one corner gets punished, which makes it feel "smart" without real AI.
- Ball flight is a ~400ms CSS transform along a curve; the keeper's dive is a CSS transform. On a goal, the net ripples and the scoreboard ticks up. A save flashes "SAVED" in mono.
- After 5 shots: scoreline in the display font (e.g. `4 / 5`) plus a one-line verdict ("Top corner merchant." / "Keeper read you like a PDF."), and a "Again" button.
- Score lives **in React state only**: no localStorage, no cookies, nothing sent anywhere.

### Controls
- **Desktop:** click a zone, or use the keyboard: arrow keys move a red aim reticle between zones and Enter/Space shoots. `R` restarts.
- **Phones:** tap a zone directly. Zones are at least 48×48px tap targets; the goal scales to the container width (aspect ratio preserved). No swipe gestures, no device motion, and no scroll hijacking (the SVG doesn't capture touch-move, so the page still scrolls normally).
- **Reduced motion:** ball and keeper jump straight to their final positions; the result text still shows.
- **Screen readers:** each zone is a `<button aria-label="Shoot top left">`; results are announced via an `aria-live="polite"` region.

### How it ties back to me
- A caption under the game: *"I'm a Manchester United fan, and I spent summer 2026 building software for football clubs at EasyCoach.Club."*. Both halves are resume facts.
- Visual consistency: the aim reticle and goal markings use the same red-pen annotation style as the signature detail, so the game looks like part of the "inspection sheet."

---

## 6. Tech

- **Use the existing project as-is:** Next.js 16.4.2 (App Router), React 19.3, TypeScript, Tailwind CSS v4 (`@import "tailwindcss"` + `@theme inline` in `app/globals.css`).
- **Read `node_modules/next/dist/docs/` before writing code** (per AGENTS.md). This Next version has breaking changes, e.g. typed `LayoutProps<"/">` is already used in `layout.tsx`.
- **No new dependencies.** Fonts through `next/font/google`. Animation through CSS + `IntersectionObserver`. Game in SVG + React.
- **Server Components by default.** Only the game (`components/PenaltyBox.tsx`) and the annotation-mark component (`components/Mark.tsx`) are `"use client"`.
- **Content in one typed file**, `content/site.ts` (headline, about, projects, experience, skills, contact), so copy edits don't touch components. All `[TODO]` items live there and are hidden from render while unset.
- **No forms, no backend, no API routes, no analytics, no cookies, no localStorage, no third-party embeds or scripts.** Contact is a `mailto:` link plus LinkedIn and GitHub links only.
- Fully static: `next build` must produce a static page; `npm run lint` and `next build` must pass with zero errors.
- Responsive check at 375px, 768px, and 1280px.
- Replace the default `public/*.svg` boilerplate and the "Create Next App" metadata.
