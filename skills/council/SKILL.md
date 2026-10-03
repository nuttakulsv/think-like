---
name: council
description: >
  Convene a council of 3–5 great minds from this pack to review one decision, design, plan, or
  piece of code. Each mind critiques it with its own method, then a synthesis makes the
  disagreements explicit and recommends what to do. Use for important or contested decisions:
  architecture choices, build vs buy, rewrites, risky migrations, launch plans, or a pull request
  that deserves more than one point of view. Triggers: "council", "convene the council", "ask the
  great minds", "get multiple perspectives", "/council", "เรียกสภา", "ขอหลายมุมมอง",
  "ให้อัจฉริยะช่วยกันคิด". Names can be given: "council with Munger, Dijkstra and Bezos".
argument-hint: "[topic] [with name, name, ...]"
license: MIT
---

# The council

One mind gives one angle. A council puts several methods on the same problem so the trade-offs
show up before you commit. The value is in the disagreements, so the synthesis must not paper
over them.

## Who sits on the council

If the user names members, use exactly those (3–5). Otherwise pick 3–5 whose methods fit the
question, covering different angles, using this map:

| The question is mostly about… | Strong picks |
|---|---|
| Whether to build it at all, scope | musk, bezos, socrates |
| Risk, irreversible or expensive choices | munger, kahneman, bezos |
| Architecture and module design | ousterhout, hickey, liskov, brooks |
| Correctness, concurrency, money | dijkstra, liskov, einstein |
| Distributed systems, time, scale | einstein, tesla, carmack |
| Performance | carmack, knuth |
| Code review | torvalds, fowler, ousterhout, beck |
| Incidents and recurring bugs | ohno, feynman, polya |
| Estimates and staffing | brooks, kahneman |
| Stuck problems, new approaches | polya, shannon, feynman |
| Requirements and acceptance | socrates, turing, bezos |
| Convincing stakeholders | hopper, bezos |

Always include at least one mind that is likely to argue against the direction the user seems
to prefer.

## Procedure

1. **Restate the question** in one or two sentences, with the options on the table. If the question is too vague to judge, ask up to three clarifying questions first (Socratic style) and stop.
2. **Gather facts once:** read the relevant code, docs, numbers. All members use the same facts; mark anything unknown.
3. **Each member speaks**, applying their skill's method (load `skills/<name>/SKILL.md` if not already in context). Each gives: their angle in one line, the 2–4 findings their method produces, and their vote. Keep each member under ~120 words. Living people are represented by their documented principles, not imitated voices.
4. **Synthesis:** where they agree, where they disagree and why (which assumption or value differs), what would settle the disagreement (a measurement, a prototype, a question for a person).
5. **Recommendation:** one decision, its conditions, and the first concrete step. Say what would make you reverse it.

## Output format

```
## Council: <question in a few words>
Members: <names> (chosen because <one line>)

### <Mind 1>
Angle: …
- finding
- finding
Vote: …

### <Mind 2> …

### Synthesis
Agree: …
Disagree: <A> vs <B> because …
What would settle it: …

### Recommendation
Decision: …
Conditions / reverse if: …
First step: …
```

Write in the user's language (member names stay as they are). Be concise; no member gets a speech.

## Anti-patterns

- A council where everyone agrees on everything (pick better members or look harder)
- Members whose comments could have come from any of them (each must use its own method)
- A synthesis that averages opinions instead of naming the real trade-off
- Ending without a decision
