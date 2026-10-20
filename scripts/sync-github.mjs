// Regenerates src/data/projects.json from the public GitHub API (no token needed).
// Hand-written descriptions live in src/data/project-config.json -> "descriptions".
import { readFile, writeFile } from 'node:fs/promises';

const USER = 'sudir81';
const API = 'https://api.github.com';
const headers = { 'User-Agent': 'portfolio-sync', Accept: 'application/vnd.github+json' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const get = async (path, raw = false) => {
  const res = await fetch(API + path, { headers });
  if (res.status === 404) return null;
  if (res.status === 403) throw new Error('GitHub rate limit hit (60/hr unauthenticated). Wait an hour or set GITHUB_TOKEN.');
  if (!res.ok) throw new Error(`${path} -> ${res.status}`);
  return raw ? res.text() : res.json();
};

const config = JSON.parse(await readFile(new URL('../src/data/project-config.json', import.meta.url), 'utf8'));
const categoryOf = (name) =>
  Object.entries(config.categories).find(([, names]) => names.includes(name))?.[0] ?? 'Other';

const firstParagraph = (md) => {
  const lines = md
    .replace(/<[^>]+>/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p && !/^[#>`|\-*=]/.test(p) && p.length > 40 && !/create react app|getting started|available scripts/i.test(p));
  return lines[0]?.replace(/\s+/g, ' ').slice(0, 220);
};

const images = (md, repo, branch) =>
  [...md.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)|<img[^>]+src="([^"]+)"/g)]
    .map((m) => m[1] || m[2])
    .map((u) => (/^https?:/.test(u) ? u : `https://raw.githubusercontent.com/${USER}/${repo}/${branch}/${u.replace(/^\.?\//, '')}`))
    .filter((u) => !/badge|shields\.io|travis|\.svg(\?|$)/i.test(u))
    .slice(0, 6);

const repos = (await get(`/users/${USER}/repos?per_page=100&sort=updated`)).filter((r) => !r.fork);
const projects = [];
const needsReview = [];

for (const r of repos) {
  const [langs, readmeRaw] = await Promise.all([
    get(`/repos/${USER}/${r.name}/languages`),
    fetch(`${API}/repos/${USER}/${r.name}/readme`, { headers: { ...headers, Accept: 'application/vnd.github.raw+json' } }).then((x) => (x.ok ? x.text() : null)),
  ]);
  const readme = readmeRaw ?? '';
  const description = config.descriptions[r.name] ?? r.description ?? firstParagraph(readme);
  if (!config.descriptions[r.name] && !r.description) needsReview.push(r.name);
  projects.push({
    slug: r.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: r.name,
    description: description ?? `${r.name.replace(/[-_]/g, ' ')} (TODO: add description)`,
    category: categoryOf(r.name),
    featured: config.featured.includes(r.name),
    languages: Object.keys(langs ?? {}).slice(0, 5),
    topics: r.topics ?? [],
    url: r.html_url,
    homepage: config.homepages[r.name] ?? (r.homepage ? (r.homepage.startsWith('http') ? r.homepage : `https://${r.homepage}`) : null),
    updatedAt: r.pushed_at,
    hasReadme: Boolean(readmeRaw),
    readmeSummary: firstParagraph(readme) ?? null,
    images: images(readme, r.name, r.default_branch),
  });
}

projects.sort((a, b) => Number(b.featured) - Number(a.featured) || b.updatedAt.localeCompare(a.updatedAt));
await writeFile(new URL('../src/data/projects.json', import.meta.url), JSON.stringify(projects, null, 2) + '\n');
console.log(`Wrote ${projects.length} projects.`);
console.log('Needs review (no GitHub description, no curated description):', needsReview.join(', ') || 'none');
