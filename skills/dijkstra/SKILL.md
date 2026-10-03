---
name: dijkstra
description: >
  Edsger Dijkstra's discipline for code that must be correct: reason about it before testing it,
  write down the invariant, keep each piece small enough to hold in your head, and avoid clever
  tricks. Use for algorithms, concurrency, money and inventory logic, state machines, loops with
  tricky bounds, and reviewing code where a bug would be expensive. Triggers: "think like
  Dijkstra", "prove it works", "is this correct", "invariant", "edge cases", "คิดแบบไดก์สตรา",
  "พิสูจน์ว่าถูก", "โค้ดนี้ถูกจริงไหม". Not for quick throwaway scripts.
license: MIT
metadata:
  mind: Edsger W. Dijkstra (1930–2002)
  living: "false"
---

# Think like Dijkstra

Turing Award winner (1972) behind shortest paths, semaphores and structured programming. He
argued that tests can show bugs are present but never that they are absent, so correctness has
to come from reasoning, and the program has to be simple enough to reason about.

## When to use

- Loops, indexes, ranges, off-by-one territory
- Anything with money, stock counts, permissions, or concurrent updates
- A test suite is green but you still don't trust the code
- Reviewing a clever piece of code

## Method

1. **State the contract.** Precondition (what must be true on entry), postcondition (what is true on exit), in terms of the data, not the code.
2. **Find the invariant** for every loop, retry, or long-lived state: what stays true at every step? Write it down as a sentence and, where cheap, as an assertion.
3. **Argue each step.** Show that the invariant holds initially, is preserved by each iteration or transition, and together with the exit condition implies the postcondition. Show termination (what decreases each step?).
4. **Hunt the boundaries:** empty input, one element, maximum size, duplicates, concurrent callers, the step after the last.
5. **Simplify until the argument is short.** If the reasoning needs a page, restructure the code: fewer special cases, smaller functions, one responsibility each. Remove clever tricks that make the argument longer.
6. **Then test**, aiming tests at the boundaries and the invariant, not at the happy path you already proved.

## Output

- `Contract:` pre and post in one line each
- `Invariant:` the sentence (and the assertion if added)
- `Argument:` init / preserve / exit / terminate, one line each
- `Boundaries checked:` list with result
- `Changes:` simplifications made so the argument fits, and tests added
- Write in the user's language.

## Anti-patterns

- "The tests pass" offered as proof of correctness
- Clever one-liners whose correctness nobody can explain
- Fixing an edge case with an extra `if` instead of finding the invariant it violates
- Concurrency handled by "it's unlikely"

## Example (illustration)

> **User:** Review this function that moves stock between warehouses.
>
> **Contract:** pre: `qty > 0`, source has ≥ qty. post: total stock unchanged; source −qty, target +qty.
>
> **Invariant:** sum of stock across warehouses is constant at every committed state.
>
> **Argument:** the code reads source stock, checks it, then writes two updates in separate transactions. Between the two writes the invariant is broken, and a crash leaves stock destroyed. Two concurrent moves can both pass the check (read-then-write race).
>
> **Changes:** one transaction; `UPDATE stock SET qty = qty - $1 WHERE id = $2 AND qty >= $1` and check the affected row count instead of reading first. The invariant now holds at every commit. Tests added: concurrent moves of the last unit, qty = 0, qty = available.

## Sources

- Dijkstra, "The Humble Programmer", Turing Award lecture, 1972 (EWD340): https://www.cs.utexas.edu/~EWD/transcriptions/EWD03xx/EWD340.html (source of "Program testing can be a very effective way to show the presence of bugs, but is hopelessly inadequate for showing their absence." and of the competent programmer who "avoids clever tricks like the plague")
- Dijkstra, *Notes on Structured Programming* (EWD249), 1970: https://www.cs.utexas.edu/~EWD/ewd02xx/EWD249.PDF
- Dijkstra, *A Discipline of Programming* (1976)
