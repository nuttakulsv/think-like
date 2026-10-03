---
name: polya
description: >
  George Pólya's "How to Solve It" method for problems you are stuck on: understand the problem,
  devise a plan, carry it out, look back. Use when a bug, algorithm, query, or puzzle-like task
  has resisted a first attempt, when the agent keeps trying random fixes, or when the user says
  they are stuck. Triggers: "think like Polya", "how to solve it", "I'm stuck", "we've tried
  everything", "solve this step by step", "คิดแบบโพลยา", "ติดอยู่", "แก้ไม่ออก". Not for simple
  tasks with an obvious solution.
license: MIT
metadata:
  mind: George Pólya (1887–1985)
  living: "false"
---

# Think like Pólya

Mathematician whose 1945 book *How to Solve It* turned problem solving into a teachable sequence
of questions. Its value for engineering work is that it stops the "try another fix" loop and
forces you to understand what is actually being asked first.

## When to use

- Two or more fixes have already failed
- The task is a real problem (algorithm, tricky query, concurrency bug), not routine work
- You notice yourself editing code without a hypothesis

## Method

1. **Understand the problem.** Write down: What is the unknown (what exactly must be true when we are done)? What are the data (inputs, constraints, environment)? What is the condition linking them? Is the condition sufficient, or contradictory? Draw a figure or a small table for the case at hand.
2. **Devise a plan.** Ask in this order and answer each in one line:
   - Have I seen the same unknown before? Is there a related, solved problem (in this codebase, in a library, in a known algorithm)?
   - Can I solve a simpler or special version first (one item, no concurrency, smaller input)?
   - Can I solve part of it (drop one condition and see what is left)?
   - Can I work backwards from the desired result?
   - Did I use all the data? If not, the unused data is probably the key.
3. **Carry out the plan**, checking each step. For code: one change at a time, each with a reason you can state and a check you run.
4. **Look back.** Verify the result against the original condition, not only against the test that failed. Ask: can the result be derived differently? Can this method solve other problems here (sibling bugs, shared helpers)?

## Output

- `Unknown / Data / Condition:` three short lines
- `Plan:` the chosen strategy and why (related problem, special case, working backwards, …)
- `Steps:` numbered, each with its check and result
- `Look back:` how the result was verified, and where else the same insight applies
- Write in the user's language.

## Anti-patterns

- Changing code before the unknown is written down
- Trying a third fix without explaining why the first two failed
- Ignoring a piece of data because it seems irrelevant
- Declaring victory when the reported symptom disappears

## Example (illustration)

> **User:** Pagination returns duplicate rows on page 2 sometimes. We added DISTINCT and it didn't help.
>
> **Unknown:** a page query that never repeats or skips a row. **Data:** `ORDER BY created_at LIMIT 20 OFFSET 20`; many rows share the same `created_at`. **Condition:** each row appears in exactly one page.
>
> **Plan:** special case first. Take 3 rows with the same timestamp and page size 2. Postgres may return tied rows in any order on each query, so the same row can land on both pages.
>
> **Steps:** reproduced with the 3-row case (duplicate appears) → add a unique tiebreaker `ORDER BY created_at, id` → 3-row case passes, then the full dataset passes.
>
> **Look back:** DISTINCT failed because the duplicate comes from two different queries, not one. Every other endpoint that sorts by a non-unique column has the same bug; two more found in `orders` and `audit_log`.

## Sources

- George Pólya, *How to Solve It: A New Aspect of Mathematical Method* (1945), Princeton University Press: https://press.princeton.edu/books/paperback/9780691164076/how-to-solve-it
- Pólya, *Mathematics and Plausible Reasoning* (1954)
