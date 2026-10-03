#!/usr/bin/env node
// Checks every skill, the plugin manifests and the links in the repo. No dependencies.
// Usage: node scripts/validate.mjs [--online]
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { parseFrontmatter } from './frontmatter.mjs'

const root = resolve(dirname(new URL(import.meta.url).pathname), '..')
const online = process.argv.includes('--online')
const errors = []
const fail = (file, msg) => errors.push(`${file}: ${msg}`)

const MIND_SECTIONS = [
  '## When to use',
  '## Method',
  '## Output',
  '## Anti-patterns',
  '## Example (illustration)',
  '## Sources',
]
const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/
const BANNED = [/\bas an ai\b/i, /\bgenerated (by|with)\b/i]


function stripCode(md) {
  return md.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '')
}

function sectionText(body, heading) {
  const start = body.indexOf(heading)
  if (start === -1) return ''
  const rest = body.slice(start + heading.length)
  const next = rest.search(/\n## /)
  return next === -1 ? rest : rest.slice(0, next)
}

const skillsDir = join(root, 'skills')
const skillNames = readdirSync(skillsDir).filter((d) => statSync(join(skillsDir, d)).isDirectory())
const minds = []

for (const dir of skillNames) {
  const file = `skills/${dir}/SKILL.md`
  const path = join(root, file)
  if (!existsSync(path)) {
    fail(file, 'missing')
    continue
  }
  const text = readFileSync(path, 'utf8')
  const fm = parseFrontmatter(text)
  if (!fm) {
    fail(file, 'frontmatter must start on line 1 between --- lines')
    continue
  }
  const { data, body } = fm
  if (data.name !== dir) fail(file, `name "${data.name}" must match folder "${dir}"`)
  if (!NAME_RE.test(data.name ?? '') || (data.name ?? '').length > 64)
    fail(file, 'name must be lowercase letters, digits and hyphens, at most 64 characters')
  const desc = data.description ?? ''
  if (desc.length < 100) fail(file, `description is too short (${desc.length} chars)`)
  if (desc.length > 1024) fail(file, `description is longer than 1024 chars (${desc.length})`)
  if (data.license !== 'MIT') fail(file, 'license must be MIT')
  const lines = text.split('\n').length
  if (lines > 500) fail(file, `${lines} lines; keep SKILL.md under 500 and move detail to references/`)
  for (const re of BANNED) if (re.test(text)) fail(file, `contains banned phrase ${re}`)

  const meta = data.metadata
  if (meta && typeof meta === 'object' && meta.mind) {
    minds.push(dir)
    let last = -1
    for (const heading of MIND_SECTIONS) {
      const at = body.indexOf(`\n${heading}\n`)
      if (at === -1) fail(file, `missing section "${heading}"`)
      else if (at < last) fail(file, `section "${heading}" is out of order`)
      else last = at
    }
    if (!/https?:\/\//.test(sectionText(body, '## Sources')))
      fail(file, 'Sources must include at least one link')
    if (!['true', 'false'].includes(meta.living)) fail(file, 'metadata.living must be "true" or "false"')
    if (meta.living === 'true' && !body.includes('Not affiliated with or endorsed by'))
      fail(file, 'living people need a "Not affiliated with or endorsed by" line')
    if (!/think like/i.test(desc)) fail(file, 'description should include a "think like <name>" trigger')
  }
}

const index = readFileSync(join(root, 'skills/minds/SKILL.md'), 'utf8')
for (const m of minds) {
  if (!new RegExp(`^\\| ${m} \\|`, 'm').test(index)) fail('skills/minds/SKILL.md', `mind "${m}" is not listed`)
}
const council = readFileSync(join(root, 'skills/council/SKILL.md'), 'utf8')
for (const [, picks] of council.matchAll(/^\| [^|]+ \| ([a-z, -]+) \|$/gm)) {
  for (const name of picks.split(',').map((s) => s.trim())) {
    if (!minds.includes(name)) fail('skills/council/SKILL.md', `council map names unknown mind "${name}"`)
  }
}

const plugin = JSON.parse(readFileSync(join(root, '.claude-plugin/plugin.json'), 'utf8'))
const market = JSON.parse(readFileSync(join(root, '.claude-plugin/marketplace.json'), 'utf8'))
if (plugin.name !== 'think-like') fail('.claude-plugin/plugin.json', 'name must be think-like')
if (market.plugins?.[0]?.name !== plugin.name)
  fail('.claude-plugin/marketplace.json', 'plugin entry name must match plugin.json name')
if (!readFileSync(join(root, 'CHANGELOG.md'), 'utf8').includes(`## ${plugin.version}`))
  fail('CHANGELOG.md', `no entry for version ${plugin.version}`)
const countIn = (text) => [...text.matchAll(/(\d+) great minds/g)].map((m) => Number(m[1]))
for (const file of ['.claude-plugin/marketplace.json', 'README.md', 'README.th.md']) {
  if (!existsSync(join(root, file))) continue
  for (const n of countIn(readFileSync(join(root, file), 'utf8')))
    if (n !== minds.length) fail(file, `says ${n} minds, the pack has ${minds.length}`)
}

function markdownFiles(dir) {
  return readdirSync(join(root, dir), { withFileTypes: true }).flatMap((e) => {
    if (e.name.startsWith('.') || e.name === 'node_modules') return []
    const rel = dir ? `${dir}/${e.name}` : e.name
    if (e.isDirectory()) return markdownFiles(rel)
    return e.name.endsWith('.md') ? [rel] : []
  })
}

const external = new Map()
for (const file of markdownFiles('')) {
  const text = stripCode(readFileSync(join(root, file), 'utf8'))
  for (const [, target] of text.matchAll(/\]\(([^)\s]+)\)/g)) {
    if (/^https?:\/\//.test(target)) {
      external.set(target, file)
      continue
    }
    if (target.startsWith('#') || target.startsWith('mailto:')) continue
    const path = resolve(join(root, dirname(file)), target.split('#')[0])
    if (!existsSync(path)) fail(file, `broken link ${target}`)
  }
  for (const [url] of text.matchAll(/(?<![(\[])https?:\/\/[^\s)>"]+/g)) {
    external.set(url.replace(/[.,;]+$/, ''), file)
  }
}

if (online) {
  // Many publishers block scripted requests with 403/429; those links work in a browser.
  const ok = (status) => (status >= 200 && status < 400) || status === 401 || status === 403 || status === 429
  const check = async ([url, file]) => {
    for (const method of ['HEAD', 'GET']) {
      try {
        const res = await fetch(url, {
          method,
          redirect: 'follow',
          signal: AbortSignal.timeout(20000),
          headers: { 'user-agent': 'Mozilla/5.0 (link check)' },
        })
        if (ok(res.status)) return
        if (method === 'GET') fail(file, `link ${url} returned ${res.status}`)
      } catch (err) {
        if (method === 'GET') fail(file, `link ${url} failed: ${err.cause?.code ?? err.message}`)
      }
    }
  }
  const queue = [...external]
  await Promise.all(Array.from({ length: 8 }, async () => {
    while (queue.length) await check(queue.shift())
  }))
}

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join('\n'))
  console.error(`\n${errors.length} error(s)`)
  process.exit(1)
}
console.log(
  `✓ ${skillNames.length} skills (${minds.length} minds), ${external.size} external links${online ? ' checked online' : ''}, no errors`,
)
