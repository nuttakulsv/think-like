#!/usr/bin/env node
// Draws docs/roster.svg from skills/minds/SKILL.md and each mind's metadata.
// PNG: npx --yes @resvg/resvg-js-cli docs/roster.svg docs/roster.png
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { parseFrontmatter } from './frontmatter.mjs'

const root = resolve(dirname(new URL(import.meta.url).pathname), '..')
const index = readFileSync(join(root, 'skills/minds/SKILL.md'), 'utf8')

const groups = []
for (const block of index.split('\n## ').slice(1)) {
  const [title, ...rest] = block.split('\n')
  if (title === 'Tools') continue
  const rows = rest
    .filter((l) => /^\| [a-z-]+ \|/.test(l))
    .map((l) => l.split('|').map((c) => c.trim()))
    .map(([, name, , useFor]) => {
      const { data } = parseFrontmatter(readFileSync(join(root, `skills/${name}/SKILL.md`), 'utf8'))
      return { name, person: data.metadata.mind.replace(/\s*\(.*\)$/, ''), useFor }
    })
  groups.push({ title, rows })
}
const total = groups.reduce((n, g) => n + g.rows.length, 0)

const W = 1600
const colW = 362
const gap = 24
const left = (W - groups.length * colW - (groups.length - 1) * gap) / 2
const top = 250
const cardH = 82
const rowsMax = Math.max(...groups.map((g) => g.rows.length))
const H = top + 50 + rowsMax * (cardH + 12) + 120
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
const fit = (s, n) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s)
const accents = ['#c2410c', '#1d4ed8', '#047857', '#7c3aed']

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="#f6f3ec"/>
<g font-family="Helvetica Neue, Helvetica, Arial, sans-serif">
<text x="${left}" y="112" font-size="72" font-weight="700" fill="#1c1917">think-like</text>
<text x="${left}" y="164" font-size="28" fill="#57534e">${total} great minds as agent skills. Their methods, not their voices.</text>
<text x="${W - left}" y="112" font-size="22" fill="#78716c" text-anchor="end">/think-like:council</text>
<text x="${W - left}" y="146" font-size="22" fill="#78716c" text-anchor="end">/think-like:mind-maker</text>
`
groups.forEach((g, i) => {
  const x = left + i * (colW + gap)
  const color = accents[i % accents.length]
  svg += `<text x="${x}" y="${top}" font-size="20" font-weight="700" fill="${color}" letter-spacing="1.5">${esc(g.title.toUpperCase())}</text>\n`
  g.rows.forEach((r, j) => {
    const y = top + 24 + j * (cardH + 12)
    svg += `<rect x="${x}" y="${y}" width="${colW}" height="${cardH}" rx="12" fill="#ffffff" stroke="#e7e5e4"/>
<rect x="${x}" y="${y}" width="6" height="${cardH}" rx="3" fill="${color}"/>
<text x="${x + 24}" y="${y + 34}" font-size="24" font-weight="700" fill="#1c1917">${esc(r.person)}</text>
<text x="${x + 24}" y="${y + 62}" font-size="18" fill="#57534e">${esc(fit(r.useFor, 34))}</text>
`
  })
})
svg += `<text x="${left}" y="${H - 48}" font-size="20" fill="#78716c">github.com/nuttakulsv/think-like</text>
<text x="${W - left}" y="${H - 48}" font-size="20" fill="#78716c" text-anchor="end">Claude Code plugin · Agent Skills · MIT</text>
</g>
</svg>
`
writeFileSync(join(root, 'docs/roster.svg'), svg)
console.log(`docs/roster.svg: ${total} minds, ${W}x${H}`)
