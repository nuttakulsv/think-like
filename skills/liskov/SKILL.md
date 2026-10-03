---
name: liskov
description: >
  Barbara Liskov's principles of data abstraction and substitutability: hide representation behind
  a clear abstraction, and make sure anything that claims to be a subtype or implementation can
  stand in for the original without surprising its callers. Use when designing interfaces,
  inheritance, plugins, adapters, repository or storage layers, API versions, or when a "drop-in
  replacement" keeps breaking callers. Triggers: "think like Liskov", "substitutability", "LSP",
  "interface design", "can I swap this", "คิดแบบลิสคอฟ", "ออกแบบ interface". Not for one-off scripts.
license: MIT
metadata:
  mind: Barbara Liskov (b. 1939)
  living: "true"
---

# Think like Liskov

Turing Award winner (2008) for foundations of data abstraction and distributed computing. With
Jeannette Wing she defined behavioral subtyping: a subtype is only a subtype if every program
written against the supertype still behaves correctly with it.

Not affiliated with or endorsed by Barbara Liskov. Built from her published papers listed below.

## When to use

- Adding a new implementation behind an existing interface (another payment provider, another storage backend)
- Inheritance hierarchies, base classes, overrides
- Changing an API that other code or other teams depend on
- Callers are full of `if (x instanceof Special)` checks

## Method

1. **Write the abstraction's contract from the caller's side:** what callers may assume about inputs, outputs, errors, side effects, ordering, performance class, and invariants. Representation details are not part of it.
2. **Check each implementation or subtype against the contract:**
   - Preconditions: may only be the same or weaker (accept at least what the parent accepts)
   - Postconditions: the same or stronger (promise at least what the parent promises)
   - Invariants of the parent: preserved
   - No new exceptions or side effects that callers don't expect
   - History: no state changes the parent's callers couldn't cause
3. **Look for leaks:** callers that type-check, cast, or branch on the concrete type are proof the abstraction is leaking or the hierarchy is wrong.
4. **Fix the model, not the callers:** split the interface, make the special behavior explicit in the contract, or use composition instead of inheritance.
5. **Make substitution testable:** one shared contract test suite that every implementation must pass.

## Output

- `Contract (caller's view):` short list
- `Implementation check:` table of implementation × rule → ok / violation with the concrete case
- `Leaks found:` caller locations that depend on the concrete type
- `Change:` the interface or hierarchy fix, plus the shared contract test
- Write in the user's language.

## Anti-patterns

- Overriding a method to throw "not supported"
- A subclass that tightens what it accepts (rejects inputs the parent took)
- Exposing the representation (raw rows, internal maps) through the abstraction
- "Drop-in replacement" claims with no shared tests

## Example (illustration)

> **User:** We added `S3Storage` next to `LocalStorage`. Some uploads now fail in production.
>
> **Contract (caller's view):** `put(key, bytes)` then `get(key)` returns the same bytes immediately; keys may contain `/`; `delete` of a missing key is a no-op.
>
> **Implementation check:** `S3Storage.delete` of a missing key throws (violation: new exception). Keys with a leading `/` create an empty path segment in S3 (violation: precondition got stricter).
>
> **Leaks found:** `if (storage instanceof S3Storage) key = key.slice(1)` in two controllers.
>
> **Change:** normalize keys inside `S3Storage`, make `delete` idempotent, remove the two `instanceof` checks, add `storage.contract.test.ts` run against both implementations.

## Sources

- Barbara Liskov and Jeannette Wing, "A Behavioral Notion of Subtyping", *ACM TOPLAS*, 1994: https://doi.org/10.1145/197320.197383
- Barbara Liskov, "Data Abstraction and Hierarchy", keynote address at OOPSLA '87: https://doi.org/10.1145/62139.62141
- ACM A.M. Turing Award citation, 2008: https://amturing.acm.org/award_winners/liskov_1108679.cfm
