---
name: beck
description: >
  Kent Beck's test-driven, small-steps way of building: write a failing test, make it pass in the
  simplest way, then clean up; make it work, then make it right, then make it fast; tidy before
  you change. Use when implementing a feature or fixing a bug where behavior matters, when changes
  feel risky, or when the agent is about to write a large change in one go. Triggers: "think like
  Kent Beck", "TDD", "test first", "small steps", "tidy first", "red green refactor",
  "คิดแบบเคนต์ เบ็ก", "เขียนเทสต์ก่อน", "ทำทีละนิด".
license: MIT
metadata:
  mind: Kent Beck (b. 1961)
  living: "true"
---

# Think like Kent Beck

Creator of Extreme Programming and test-driven development, co-author of the Agile Manifesto.
His method trades big confident leaps for a rhythm of tiny, verified steps, so you always know
the last thing that worked.

Not affiliated with or endorsed by Kent Beck. Built from his books and writing listed below.

## When to use

- Any change to behavior that users or other code depend on
- A bug fix (write the test that reproduces it first)
- The planned change is large, or the code is hard to change safely

## Method

1. **List the behaviors** you need as a short test list. Pick the simplest one.
2. **Red:** write one failing test for it. Run it and see it fail for the right reason.
3. **Green:** make it pass with the simplest code that could work, even if it's obviously temporary.
4. **Refactor:** with tests green, remove duplication and make the intent clear. Apply the simple design rules in priority order: passes the tests, reveals intention, no duplication, fewest elements.
5. **Repeat** with the next item on the list. Add new cases to the list as you discover them instead of chasing them immediately.
6. **Tidy first** when the code is hard to change: make small structural changes (rename, extract, reorder) in a separate step before the behavior change, so each diff does one kind of thing.
7. **Order of concerns:** make it work, make it right, then make it fast, and only if measurement says it is slow.

## Output

- `Test list:` the behaviors, with the current one marked
- For each step: `Red` (test + failure message), `Green` (minimal change), `Refactor` (what was cleaned)
- `Tidyings:` structural changes kept separate from behavior changes
- Keep each diff small enough to review in a minute. Write in the user's language.

## Anti-patterns

- Writing all the tests up front, or all the code before any test
- A test that never failed (it may not test anything)
- Mixing a refactor and a behavior change in one commit
- Optimizing before the behavior is correct and covered

## Example (illustration)

> **User:** Add VAT calculation to invoices: 7%, rounded to satang, some items exempt.
>
> **Test list:** single item → exempt item → mixed cart → rounding at 0.005 → empty invoice.
>
> **Red:** `vatFor([{ price: 100 }])` expected 7, got `undefined`.
>
> **Green:** `return 7` (yes, really). Next test (`price: 200` → 14) forces `price * 0.07`.
>
> **Refactor:** move rate to a named constant; compute in satang integers to avoid float error found by the rounding test.
>
> **Tidyings:** first commit renames `calc()` to `lineTotal()` with no behavior change; second commit adds VAT.

## Sources

- Kent Beck, *Test-Driven Development: By Example* (2002)
- Kent Beck, *Tidy First? A Personal Exercise in Empirical Software Design* (2023), and his newsletter: https://tidyfirst.substack.com/
- Martin Fowler, "Beck Design Rules" (the four rules of simple design): https://martinfowler.com/bliki/BeckDesignRules.html
- Kent Beck's site: https://kentbeck.com/
