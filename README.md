# Sudheer Papineni — Portfolio

Static portfolio built with [Astro](https://astro.build), TypeScript and Tailwind CSS. Live at https://sudir81.github.io.

## Run locally
```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to dist/
npm run preview    # serve the production build
```

## Edit content
All personal text lives in `src/data/`:
- `profile.ts` — name, bio, services, email, LinkedIn, resume (set `resume` to `'/resume.pdf'` after adding `public/resume.pdf`).
- `skills.ts` — skill groups.
- `project-config.json` — project categories, featured list, demo links and hand-written descriptions.
- `projects.json` — generated; do not edit by hand.
- `avatar.jpg` — profile photo (replace the file to change it).

## Resync GitHub data
```bash
npm run sync:github
```
Reads public repos (forks excluded) and rewrites `src/data/projects.json`. The site never calls the GitHub API at runtime. Unauthenticated requests are limited to 60/hour (a full run uses ~80), so set `GITHUB_TOKEN` locally or let the weekly workflow (`.github/workflows/sync-github.yml`) do it.

Descriptions come from `project-config.json` first, then the GitHub description, then the README. Most were written from repo names and languages and **need your review**; edit them in `project-config.json`.

## Deploy
Pushing to `main` runs `.github/workflows/deploy.yml` (official `withastro/action` + `actions/deploy-pages`). In the repo: **Settings → Pages → Source = GitHub Actions**.

Custom domain later: add `public/CNAME` containing the domain, set DNS `A` records to GitHub Pages IPs (185.199.108.153, .109.153, .110.153, .111.153) and a `CNAME` record for `www` to `sudir81.github.io`, then update `site` in `astro.config.mjs` and `profile.site`.
