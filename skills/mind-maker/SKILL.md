---
name: mind-maker
description: >
  Build a new mind skill for this pack from sources the user provides (books, papers, talks,
  interviews, blog posts, a mentor's own notes): extract the person's methods, heuristics and
  anti-patterns into a SKILL.md with the same structure as the other minds, with sources and an
  ethics check for living people. Use when the user wants to add a person, mentor, or expert to
  think-like, or turn someone's way of working into an agent skill. Triggers: "make a mind",
  "create a skill from this person", "add <name> to think-like", "distill how X thinks",
  "/mind-maker", "สร้าง skill จากคนนี้", "ทำ skill ของ", "เพิ่มอัจฉริยะ".
argument-hint: "[person] [sources...]"
license: MIT
---

# Mind maker

Turns a person's documented way of working into a skill that changes what an agent does. The goal
is a method, not an impression: steps, checks and output formats that someone could follow
without knowing the person.

## 1. Consent and scope check (do this first)

- **Living person:** use only principles they published or stated publicly, cited. No imitation of voice, catchphrases, or personality. Add the line "Not affiliated with or endorsed by <name>." If the person is a private individual, a colleague, or a creator with a community (for example a YouTuber or streamer), ask the user whether they have the person's permission. Without it, stop and suggest building the skill around the method itself, without the person's name.
- **Do not build:** politicians, religious leaders, royalty, or anyone where the skill could be read as speaking for them on public affairs.
- **Historical figures:** a light voice is fine, but the method still comes first and quotes still need sources.

## 2. Gather and read sources

Ask for, or locate, 2–5 primary sources: the person's own books, papers, talks, letters, posts. Secondary sources (biographies, articles) only to fill gaps, marked as such. For each source, note what it says about *how* they work, not what they achieved.

## 3. Extract

Fill this table before writing anything:

| Part | Questions |
|---|---|
| Distinct job | What does this method do that no existing mind in the pack already does? If it overlaps heavily, stop and say which mind covers it. |
| Method | What steps do they actually follow? In what order? What do they check? |
| Output | What artifact or format does their way of working produce? |
| Anti-patterns | What do they explicitly reject or warn against? |
| Triggers | In what situations would a user want this mind? Phrases in English and in the user's language. |
| Quotes | Any exact quote must have a source link. Otherwise paraphrase. |

## 4. Write the skill

Create `skills/<slug>/SKILL.md` with this structure (match the other minds):

```markdown
---
name: <slug>
description: >
  <who> <method in one sentence>. Use when <situations>. Triggers: "<phrase>", "<phrase>", "<phrase in user's language>".
license: MIT
metadata:
  mind: <Full Name> (<years>)
  living: "<true|false>"
---

# Think like <Name>

<2–3 lines: who, and why their method matters for this kind of work.>
<If living: Not affiliated with or endorsed by <Name>. Built from <sources>.>

## When to use
## Method
## Output
## Anti-patterns
## Example (illustration)
## Sources
```

Keep it 60–120 lines. Method steps must be things an agent can do with code, docs, data, or a conversation. The example is labelled as an illustration and uses a realistic engineering task.

## 5. Validate

Run `node scripts/validate.mjs` from the repo root. Fix every error. Then try the skill on one real task and check that its output follows the format.

## Output to the user

- The consent/scope decision
- The extraction table
- The new SKILL.md
- Validator result
Write in the user's language.
