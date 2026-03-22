# Contributing Guide — sahithi_portfolio

## Project Overview

Personal portfolio site for Sahithi Aekka, Cloud Engineer.

- **Live site**: https://sahithiaekka.github.io/sahithi_portfolio/
- **Repo**: github.com/SahithiAekka/sahithi_portfolio
- **Deployment**: GitHub Pages via GitHub Actions — auto-deploys on push to `main`

## Project Structure

```
index.html                         ← entire portfolio (single file)
resume.pdf                         ← resume download
.github/workflows/deploy.yml       ← auto-deploy workflow
.github/ISSUE_TEMPLATE/            ← issue templates (bug, change request)
CONTRIBUTING.md                    ← this file
.gitignore
```

This is a **single-file site**. Everything lives in `index.html` — HTML, CSS (inline + Tailwind CDN), and JavaScript. No build tools, no frameworks, no npm.

## Tech Stack

- **HTML** — single file, semantic sections
- **CSS** — Tailwind CDN (`cdn.tailwindcss.com`) + custom `<style>` block + inline styles
- **JS** — vanilla, inline (theme toggle only)
- **Fonts** — Google Fonts CDN: Bricolage Grotesque (display), DM Sans (body), DM Mono (mono)
- **Deploy** — GitHub Actions → GitHub Pages

## Design System

### Color Scheme
- **Theme**: Dark by default, light/dark toggle via CSS `filter: invert(1) hue-rotate(180deg)`
- **Background**: `#0a0a0a` (dark), `#0d0d0d` (alt sections)
- **Text**: `#e8e8e8` (primary), `#888` (muted), `#555` (muted2), `#444` (labels)
- **Accent**: `#10B981` (emerald) — used on:
  - Badge dot (pulsing indicator)
  - Primary button (`btn-p`) background
  - Ghost text stroke on section headings (`rgba(16,185,129,0.35-0.4)`)
  - Section number labels ("01 /", "02 /", etc.)
  - "How I work" bullet dots
  - Verified dots on cert cards
  - Timeline active dot
  - Availability dot
  - Send Message button
  - Quote block left border
- **Accent hover**: `#059669` (darker emerald for hover states)

### CSS Variables (in `:root`)
```css
--bg: #0a0a0a;  --surface: #111111;  --border: rgba(255,255,255,0.08);
--border2: rgba(255,255,255,0.14);  --muted: #555555;  --muted2: #888888;
--text: #e8e8e8;  --white: #ffffff;  --accent: #10B981;
```

### Typography
- **Display headings**: `Bricolage Grotesque`, weight 800, tight letter-spacing (-0.04em)
- **Body text**: `DM Sans`, weights 300-500
- **Monospace labels**: `DM Mono`, weights 300-500, uppercase, wide letter-spacing

### Effects
- Ghost/outline text: `-webkit-text-stroke` with emerald tint, `color: transparent`
- Grain texture overlay on `body::after`
- Subtle grid background in hero with radial mask
- Sparkle animations (CSS cross shapes)
- Fade-up animations (`.fu` class with staggered delays `.d1`–`.d6`)
- Backdrop blur on nav

## Site Sections (in order)

| # | Section ID | Nav Label |
|---|---|---|
| — | `hero` | (not in nav) |
| 01 | `about` | About |
| 02 | `certs` | Certs |
| 03 | `projects` | Projects |
| 04 | `experience` | Experience |
| 05 | `contact` | Contact |

**Nav link order MUST match this**: About → Certs → Projects → Experience → Contact

## Important Links in the Site

- **Resume**: all links point to `resume.pdf` (3 locations: nav, hero CTA, footer)
- **Email**: all links use `mailto:sahithiaekka@gmail.com`
- **GitHub**: https://github.com/SahithiAekka
- **LinkedIn**: https://www.linkedin.com/in/sahithiaekka/
- **AWS Topic Hub**: https://d14m79rqbppspq.cloudfront.net/

## Commit Style

- Use short, descriptive messages: `fix: ...`, `feat: ...`, `update: ...`
- Do not include co-author lines or AI attribution in commits
- One logical change per commit

## Issue Workflow

### Creating Issues
- Use the GitHub Issue templates (Bug Report or Change Request)
- Or describe the problem — it should be converted into a proper structured issue:
  - **Title**: short, clear
  - **Type**: bug or enhancement
  - **Section**: which part of the site (Hero, About, Certs, Projects, Experience, Contact, Nav, Footer, Theme, Whole Site)
  - **Description**: what needs to change
  - **Expected result**: what it should look like after
- Always confirm the formatted issue before recording it on GitHub

### Working on Issues
1. Read the issue details (`gh issue view N`)
2. Make changes in `index.html`
3. Show a summary of what changed
4. Ask to review and test — live site: https://sahithiaekka.github.io/sahithi_portfolio/
5. Only after confirmation: commit, push, and close the issue
6. After deploy, confirm: "Deployed — test it now at the live URL"

### Development Workflow

1. **Create Issue** — Log bugs/features directly on the GitHub website. The mobile app doesn't support this well — use desktop or web version
2. **Describe the Fix** — Reference the issue number and describe what needs to be fixed
3. **Branch & Fix** — Changes are made on a feature branch, committed, and pushed
4. **Create PR** — PR is created with `Closes #<issue>` in the body to link it to the issue
5. **Review & Merge** — Compare changes on GitHub, approve, and merge the PR
6. **Automated Testing** — CI/CD runs tests on the PR
7. **Issue Auto-Closes** — Once merged, the linked issue closes automatically
8. **Done**

### Checking Open Issues
```
gh issue list --repo SahithiAekka/sahithi_portfolio
```

## Verification Checklist (after every change)

Run through this before pushing:

- [ ] All 6 sections present and rendering (hero, about, certs, projects, experience, contact)
- [ ] Nav link order: About → Certs → Projects → Experience → Contact
- [ ] Resume links (3) all point to `resume.pdf`
- [ ] Email links use `mailto:sahithiaekka@gmail.com`
- [ ] Theme toggle switches between dark and light
- [ ] Emerald accent (#10B981) visible on key elements
- [ ] Mobile responsive (check `@media` queries at 768px and 900px breakpoints)
- [ ] No broken CDN links
- [ ] No browser console errors
