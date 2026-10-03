// Reads the small YAML subset used in SKILL.md frontmatter.
export function parseFrontmatter(text) {
  const lines = text.split('\n')
  if (lines[0] !== '---') return null
  const end = lines.indexOf('---', 1)
  if (end === -1) return null
  const data = {}
  let key = null
  let parent = null
  for (const line of lines.slice(1, end)) {
    const top = /^([a-z][a-z0-9_-]*):\s*(.*)$/.exec(line)
    const nested = /^ {2}([a-z][a-z0-9_-]*):\s*(.*)$/.exec(line)
    if (top) {
      key = top[1]
      parent = null
      const value = top[2]
      if (value === '>' || value === '|') data[key] = ''
      else if (value === '') {
        data[key] = {}
        parent = key
      } else data[key] = unquote(value)
    } else if (nested && parent) {
      data[parent][nested[1]] = unquote(nested[2])
    } else if (key && typeof data[key] === 'string' && line.startsWith('  ')) {
      data[key] = (data[key] + ' ' + line.trim()).trim()
    }
  }
  return { data, body: lines.slice(end + 1).join('\n'), bodyStart: end + 2 }
}

const unquote = (v) => v.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1')
