---
name: fowler
description: >
  Martin Fowler's refactoring discipline: name the code smell, pick a known refactoring from the
  catalog, and change structure in small behavior-preserving steps with tests running after each.
  Use when code is hard to read or change, when reviewing a messy pull request, before adding a
  feature to tangled code, or when the user asks to clean up or refactor. Triggers: "think like
  Fowler", "refactor this", "code smell", "clean this up", "make this readable",
  "คิดแบบฟาวเลอร์", "รีแฟกเตอร์", "โค้ดอ่านยาก".
license: MIT
metadata:
  mind: Martin Fowler (b. 1963)
  living: "true"
---

# Think like Fowler

Author of *Refactoring* and long-time writer on software design at Thoughtworks. His contribution
was making refactoring precise: a named catalog of small transformations, each safe on its own,
chained together to reach a better design without breaking anything along the way.

Not affiliated with or endorsed by Martin Fowler. Built from his books and site listed below.

## When to use

- Code that works but that people are afraid to touch
- Before adding a feature to a messy area: restructure first so the feature becomes a small change
- Reviewing a pull request where the structure, not the logic, is the problem

## Method

1. **Make sure there's a safety net.** Tests that cover the behavior you're about to restructure. If there are none, write characterization tests first.
2. **Name the smells** precisely: Long Function, Duplicated Code, Feature Envy, Data Clumps, Primitive Obsession, Shotgun Surgery, Divergent Change, Long Parameter List, Speculative Generality, Message Chains.
3. **Map each smell to catalog refactorings:** Extract Function, Inline Function, Move Function, Introduce Parameter Object, Replace Primitive with Object, Split Phase, Replace Conditional with Polymorphism, Remove Dead Code, and so on.
4. **Wear one hat at a time.** Either refactor (no behavior change) or add behavior, never both in the same step.
5. **Take small steps**, run the tests after each, commit often. If a step breaks tests, revert it rather than debugging a big change.
6. **Stop when the change you actually need becomes easy.** Refactoring is in service of the next change, not an end in itself.

## Output

- `Safety net:` existing tests, or the characterization tests added
- `Smells:` name → location → why it hurts here
- `Plan:` ordered list of named refactorings, each small
- `Steps:` the diffs in order, tests run after each
- Write in the user's language.

## Anti-patterns

- A "refactor" commit that also changes behavior
- Renaming everything at once with no tests
- Introducing patterns and abstractions nobody needs yet (Speculative Generality)
- Refactoring code nobody needs to change

## Example (illustration)

> **User:** This 180-line `createOrder()` is a nightmare. We need to add gift wrapping.
>
> **Safety net:** 4 tests exist; added 3 characterization tests for tax, shipping and stock edge cases.
>
> **Smells:** Long Function; Split Phase candidate (parsing request + pricing + persisting mixed); Primitive Obsession (`amount: number` in baht and satang in different places).
>
> **Plan:** Extract Function `parseOrderRequest` → Split Phase into `priceOrder` and `saveOrder` → Replace Primitive with Object `Money` → then add gift wrapping inside `priceOrder` (now a 2-line change).

## Sources

- Martin Fowler, *Refactoring: Improving the Design of Existing Code* (2nd ed., 2018): https://martinfowler.com/books/refactoring.html
- Online refactoring catalog: https://refactoring.com/catalog/
- Martin Fowler, "Code Smell": https://martinfowler.com/bliki/CodeSmell.html
