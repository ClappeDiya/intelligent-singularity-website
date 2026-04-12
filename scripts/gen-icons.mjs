#!/usr/bin/env node
import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'node:fs';

mkdirSync('public/icons', { recursive: true });

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#0F1712"/>
  <circle cx="256" cy="240" r="216" fill="none" stroke="rgba(168,230,207,0.15)" stroke-width="2"/>
  <line x1="56" y1="260" x2="456" y2="260" stroke="#A8E6CF" stroke-width="4" stroke-linecap="round"/>
  <circle cx="256" cy="232" r="48" fill="#A8E6CF"/>
</svg>`;

writeFileSync('/tmp/is-icon.svg', SVG);

for (const size of [192, 512]) {
  await sharp('/tmp/is-icon.svg').resize(size, size).png().toFile(`public/icons/icon-${size}.png`);
}
await sharp('/tmp/is-icon.svg').resize(512, 512).png().toFile('public/icons/icon-maskable.png');
console.log('Icons written to public/icons/');
