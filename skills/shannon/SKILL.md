---
name: shannon
description: >
  Claude Shannon's six ways to attack a hard design problem, from his 1952 Bell Labs talk on
  creative thinking: simplify, find a similar solved problem, restate it, generalize, break it
  into parts, invert it. Use when you need a new approach rather than a fix: designing an
  algorithm, protocol, data model, or architecture where the obvious idea doesn't work. Also
  useful for cutting noise from alerts, logs, and metrics. Triggers: "think like Shannon",
  "need a new approach", "different angle", "creative solution", "คิดแบบแชนนอน", "ขอวิธีใหม่",
  "มองมุมอื่น". Not for routine CRUD work.
license: MIT
metadata:
  mind: Claude Shannon (1916–2001)
  living: "false"
---

# Think like Shannon

Founder of information theory (1948). In a 1952 talk at Bell Labs he described how he actually
found ideas: not by waiting for inspiration, but by deliberately transforming the problem until a
version of it gave way.

## When to use

- The first design idea fails and you need options, not a patch
- A problem feels too big or too tangled to start
- Too much noise: alerts nobody reads, logs nobody can search, metrics that don't answer questions

## Method

Run the six moves on the problem. For each, write the transformed problem in one line and what it suggests. Skip moves that don't apply, but try at least four.

1. **Simplify.** Strip details until you can see the core: one user, one record, no failures. Solve that. Then add details back one at a time.
2. **Similar known problem.** What solved problem has the same unknown? (Rate limiting is a token bucket; undo is a stack; sync is a merge.) Borrow its solution.
3. **Restate.** Change the words, the units, or the point of view. "Avoid double booking" becomes "make the second insert fail" becomes "unique constraint".
4. **Generalize.** Solve the N case instead of the special case you were given; sometimes the general version is simpler and removes special branches.
5. **Structural analysis.** Break the problem into parts that can be solved separately, solve each, then check how they connect.
6. **Invert.** Start from the desired result and work backwards to the inputs; or ask how to guarantee the opposite and avoid that.

For noise problems, add one question: **what is the signal?** Name the decision the alert, log, or metric is supposed to drive; everything that doesn't change that decision is noise.

## Output

- `Problem:` one line
- `Moves:` a short table, one row per move tried: transformed problem → idea it suggests
- `Best candidates:` 1–3 ideas with their trade-offs
- `Next step:` the cheapest experiment that tells you which candidate works
- Write in the user's language.

## Anti-patterns

- Polishing the first idea instead of generating alternatives
- Solving the full messy problem head-on when a simplified version would show the way
- Adding more alerts or logs to fix a noise problem

## Example (illustration)

> **Problem:** keep a shopping cart in sync between the phone app (offline) and the web.
>
> | Move | Transformed problem | Idea |
> |---|---|---|
> | Simplify | one device, then two devices, no conflicts | last-write-wins per item is enough for most edits |
> | Similar | it's a merge of two edit logs | store operations (add/remove/qty) instead of the final cart |
> | Restate | "which changes did the other side not see?" | per-device sequence numbers |
> | Invert | when would a merge be wrong? | only when both sides change the same item's quantity |
>
> **Best candidate:** operation log merged by item, last-write-wins only for the quantity conflict. **Next step:** script the three conflict cases as tests before writing the sync code.

## Sources

- Claude Shannon, "Creative Thinking", talk at Bell Labs, 20 March 1952 (transcript): https://fs.blog/great-talks/creative-thinking-claude-shannon/
- Shannon, "A Mathematical Theory of Communication", *Bell System Technical Journal*, 1948: https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf
- Jimmy Soni and Rob Goodman, *A Mind at Play: How Claude Shannon Invented the Information Age* (2017)
