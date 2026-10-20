// Generates public/favicon.svg and public/og-image.png (run: node scripts/make-assets.mjs).
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#4f46e5"/><text x="32" y="43" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="30" fill="#fff">SP</text></svg>`;
await writeFile(new URL('../public/favicon.svg', import.meta.url), favicon);

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#312e81"/><stop offset="1" stop-color="#4f46e5"/></linearGradient></defs>
<rect width="1200" height="630" fill="url(#g)"/>
<rect x="80" y="90" width="96" height="96" rx="22" fill="#fff" fill-opacity=".15"/>
<text x="128" y="157" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="46" fill="#fff">SP</text>
<text x="80" y="340" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="84" fill="#fff">Sudheer Papineni</text>
<text x="80" y="410" font-family="Arial, Helvetica, sans-serif" font-size="40" fill="#e0e7ff">Freelance Web &amp; Mobile App Developer</text>
<text x="80" y="540" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#c7d2fe">React · React Native · TypeScript · GraphQL</text>
</svg>`;
await sharp(Buffer.from(og)).png().toFile(new URL('../public/og-image.png', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
console.log('assets written');
