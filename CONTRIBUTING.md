# Contributing

Thanks for helping. Issues and pull requests are welcome in English or Thai.

## Fixing an existing mind

Corrections to a method, a better primary source, or a clearer example are the most useful
contributions. Please link the source that supports the change.

## Adding a mind

A new mind needs all of these:

1. **A distinct job.** It must make the agent do something no mind in the pack already does. If it mostly overlaps (for example, another "keep it simple" mind), improve the existing one instead.
2. **Primary sources.** The person's own books, papers, talks, letters, or posts. Biographies and articles can fill gaps but not carry the skill.
3. **Quotes with links.** Anything in quotation marks must link to where it was said. Otherwise paraphrase.
4. **The standard sections, in order:** When to use, Method, Output, Anti-patterns, Example (illustration), Sources. 60–120 lines.
5. **Rules for living people.** Only their published principles, no imitation of voice or personality, and the line "Not affiliated with or endorsed by <name>." For private individuals and creators, written permission from the person, linked in the PR.
6. **Out of scope:** politicians, religious leaders, royalty.

The quickest way to draft one is `/think-like:mind-maker` with the sources. Then:

```bash
node scripts/validate.mjs            # must pass
node scripts/validate.mjs --online   # also checks external links
```

Also update, in the same PR:

- `skills/minds/SKILL.md` (the index table) and, if it fits, the map in `skills/council/SKILL.md`
- the roster tables in `README.md` and `README.th.md`, and the mind count in both READMEs and `.claude-plugin/marketplace.json`
- `docs/roster.svg` and `docs/roster.png`:

  ```bash
  node scripts/roster-image.mjs
  npx --yes @resvg/resvg-js-cli docs/roster.svg docs/roster.png
  ```

- `CHANGELOG.md`

If you have Claude Code installed, `claude plugin validate .` checks the plugin manifests too.

## Writing style

Short sentences, concrete steps, examples from real engineering work. Avoid hype words and
motivational filler; the skills are read by agents and by the engineers who review their output.
