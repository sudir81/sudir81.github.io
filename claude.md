# MASTER PROMPT — Personal Portfolio for Sudheer Papineni

You are building and deploying my personal portfolio website. Work step by step, show me the plan first, then build, test locally, and deploy. Ask me only when something below is marked [ASK ME].

## 1. About me (source of truth)

- Name: **Sudheer Papineni**
- Title: Web & Mobile Applications Developer
- Location: Texas, USA
- GitHub: https://github.com/sudir81 (username `sudir81`)
- Avatar: https://avatars.githubusercontent.com/u/55796541?v=4
- Email / LinkedIn / Resume PDF: [ASK ME] — if I skip, leave these out of the site entirely (no fake links).
- Core skills (from my repos): JavaScript, TypeScript, React, React Native, Redux, GraphQL / Apollo, Node.js, HTML/CSS, Webpack, Gatsby, Playwright (E2E testing).

Do NOT invent jobs, clients, employers, dates, testimonials or metrics. Use only facts above, from my GitHub, or that I give you. Use clearly marked `TODO:` placeholders for anything missing.

## 2. Pull my real data from GitHub

1. Use the public GitHub REST API (no token needed): `GET https://api.github.com/users/sudir81` and `GET https://api.github.com/users/sudir81/repos?per_page=100&sort=updated`.
2. **Exclude forks** (`fork: true`) — e.g. three.js, tesseract.js, puck, claude-skills, free-claude-code, app-ideas, OfficeDocs-SharePoint, design-resources-for-developers, react-bootstrap-table2, m3l2/m4l1 labs.
3. For each remaining repo, read its README (`GET /repos/sudir81/{repo}/readme`) and languages (`/languages`) to write an honest 1–2 sentence description. If a repo has no README or description, write a short description from the repo name and code, and list it in a "needs review" note for me.
4. Save the result as `src/data/projects.json` (committed — the site must NOT call the GitHub API at runtime, to avoid rate limits). Add an npm script `npm run sync:github` that regenerates this file.
5. Group projects into categories:
   - **Mobile (React Native):** rn-uber-clone, rn-teslaclone, rn-ubereats_all, rn-spotify_all, rn-CovidApp-All, rn-pollmama-all, rn-goodFood, ReactNative_All
   - **Web Apps (React):** r-KidsShop (kids e-commerce), shopping-site, cars-showroom, netflix_clone, expense_track, live-covid, angjs2reactjs, JS-Apps, react_styled_jsx, custom_modal, StarGame, Games
   - **GraphQL & State:** ApolloGQL-tutorial, graphql-react, redux-learn
   - **Testing & Tooling:** playwright-work, WebPack_DemoApp, Gatsby, Tek_HackRan_ReactApp
6. Mark 6 as **Featured** (default: rn-uber-clone, rn-spotify_all, r-KidsShop, cars-showroom, playwright-work, ApolloGQL-tutorial) — show me the list and let me swap before finalizing.

## 3. Tech stack

- **Astro** (latest stable) + **TypeScript** + **Tailwind CSS** — static output, near-zero JS, fast.
- Small interactive pieces (project filter, theme toggle) as tiny vanilla TS or React islands.
- No backend, no database, no paid services.

## 4. Pages & sections (single page + project detail pages)

1. **Hero** — name, title, one-line intro ("I build web and mobile apps with React and React Native"), avatar, buttons: "View Work", "GitHub", "Contact".
2. **About** — short bio (draft 3 versions, let me pick), location, what I offer freelance clients.
3. **Skills** — grouped badges (Frontend, Mobile, Data/API, Testing, Tooling), from section 1.
4. **Featured Projects** — cards with title, description, tech tags, GitHub link, live-demo link only if a `homepage` exists (react_styled_jsx → https://react-styled-jsx.sudir81.vercel.app — check it loads; drop it if dead).
5. **All Projects** — filterable grid by category + search by name/tech.
6. **Project detail page** (`/projects/[slug]`) — README summary, tech stack, repo link, screenshots if the README has images.
7. **Services** — Web apps, Mobile apps, UI modernization (e.g. AngularJS → React), E2E test automation.
8. **Contact** — mailto link + GitHub/LinkedIn icons. Optional free contact form via **Formspree** or **Web3Forms** [ASK ME before adding].
9. **Footer** — © {current year} Sudheer Papineni, "Built with Astro".

## 5. Design

- Clean, modern, minimal; lots of whitespace; one accent color (indigo/blue).
- Light + dark mode (respect system preference, plus toggle saved in localStorage).
- Font: Inter (or system font stack).
- Fully responsive (test 375px, 768px, 1280px). No horizontal scroll on mobile.
- Subtle animations only (fade-in on scroll); respect `prefers-reduced-motion`.
- Accessible: semantic HTML, alt text, visible focus, contrast ≥ WCAG AA.

## 6. SEO & quality

- `<title>`, meta description, Open Graph + Twitter card tags, generated OG image with my name.
- `sitemap.xml`, `robots.txt`, favicon (initials "SP").
- JSON-LD `Person` schema (name, jobTitle, url, sameAs: GitHub).
- Lighthouse target: ≥ 95 in Performance, Accessibility, Best Practices, SEO. Run it and report scores.

## 7. Project structure

```
src/
  components/   (Hero, About, Skills, ProjectCard, ProjectGrid, Contact, ThemeToggle, Footer)
  data/         (profile.ts, skills.ts, projects.json)
  layouts/      (BaseLayout.astro)
  pages/        (index.astro, projects/[slug].astro, 404.astro)
scripts/sync-github.mjs
public/         (favicon, og-image, resume.pdf if provided)
.github/workflows/deploy.yml
README.md
```

Keep all personal content in `src/data/` so I can edit text without touching components.

## 8. Free deployment — GitHub Pages

1. Create a git repo named **`sudir81.github.io`** (user site → URL `https://sudir81.github.io`, no base path needed). Use `gh repo create sudir81.github.io --public --source=. --push` if `gh` is logged in; otherwise give me the exact commands.
2. Set `site: 'https://sudir81.github.io'` in `astro.config.mjs`.
3. Add `.github/workflows/deploy.yml` using the official `withastro/action` + `actions/deploy-pages`, triggered on push to `main` and manual dispatch.
4. Tell me to set **Settings → Pages → Source = GitHub Actions** (or do it via `gh api` if permitted).
5. Optional: a scheduled weekly workflow that runs `npm run sync:github` and commits updated `projects.json`.
6. After deploy, open the live URL, verify every section and link works, and report back.
7. (Optional, later) Custom domain: explain how to add a `CNAME` file + DNS records if I buy a domain.

## 9. Workflow rules

- First: show me the plan + featured list + bio drafts, wait for my OK.
- Build in small commits with clear messages.
- Run `npm run build` and preview locally (`npm run preview`) before deploying; fix all errors and warnings.
- Write a `README.md`: how to run locally, how to edit content, how to resync GitHub data, how deploy works.
- Don't commit secrets. Don't add analytics/trackers unless I ask (if I do, use free privacy-friendly ones like GoatCounter).
- At the end, give me: live URL, Lighthouse scores, list of TODO placeholders I need to fill.
