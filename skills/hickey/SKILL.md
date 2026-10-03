---
name: hickey
description: >
  Rich Hickey's distinction between simple (not intertwined) and easy (familiar, near at hand):
  find where concerns are complected together and pull them apart, prefer plain data and values
  over hidden state. Use when choosing libraries or frameworks, designing data models and state
  management, reviewing code that mixes concerns (time, state, identity, I/O, logic), or when
  something "convenient" keeps causing bugs. Triggers: "think like Hickey", "simple made easy",
  "decomplect", "too coupled", "state is a mess", "คิดแบบฮิกกี", "แยก concern", "ง่ายกับซับซ้อน".
license: MIT
metadata:
  mind: Rich Hickey
  living: "true"
---

# Think like Hickey

Creator of the Clojure language and the Datomic database. His 2011 talk "Simple Made Easy"
separated two words people use interchangeably: simple is about how many things are twisted
together; easy is about how familiar or close at hand something is. Easy choices often make
systems that are not simple.

Not affiliated with or endorsed by Rich Hickey. Built from his talks listed below.

## When to use

- Choosing between a familiar tool and a less familiar but cleaner one
- State management, caching, and data model design
- A function or class that does logic, I/O, formatting and state updates at once
- Bugs that come from "who changed this and when"

## Method

1. **List the concerns** in the code under review: what (logic), how (mechanism), when (time/ordering), where (location/I/O), who (identity), state.
2. **Find complecting:** places where two or more concerns are braided so you can't change or test one without the other. Typical suspects: objects mixing state and identity, ORMs mixing query and domain logic, functions doing I/O inside business rules, inheritance mixing types and implementation.
3. **Prefer values over places.** Can mutable state become an immutable value passed in and returned? Can "update in place" become "compute new value, then store"?
4. **Prefer plain data over custom types** at boundaries: maps, records, rows that any tool can read.
5. **Separate the parts:** pure logic in the middle, effects (database, network, clock) at the edges. Pass time and randomness in as arguments.
6. **Judge tools by the complexity they create in your system**, not by how quickly the first example ran.

## Output

- `Concerns found:` the list
- `Complected:` pairs of concerns braided together, with code locations
- `Decomplected design:` what moves where; the pure core and the effectful edges
- `Easy vs simple:` for any tool choice, one line on each
- Write in the user's language.

## Anti-patterns

- Picking a tool because the tutorial was short
- Hidden mutable state shared across modules
- Business rules that can only be tested with a database running
- Clever DSLs where plain data would do

## Example (illustration)

> **User:** Our discount code is impossible to test.
>
> **Concerns found:** pricing rules, current time, database reads, logging.
>
> **Complected:** `applyDiscount()` reads `Date.now()`, queries the promo table and mutates `order.total` in place.
>
> **Decomplected design:** `priceOrder(order, promos, now) → { total, appliedPromos }`, a pure function. The controller loads promos, passes `now`, and saves the returned value. The rules now have plain unit tests with fixed dates.
>
> **Easy vs simple:** a rules-engine library was suggested. Easy to start, but it adds its own state model and a second language for rules. Not simpler than one pure function.

## Sources

- Rich Hickey, "Simple Made Easy", Strange Loop, 2011: https://www.infoq.com/presentations/Simple-Made-Easy/
- Rich Hickey, "The Value of Values", 2012: https://www.infoq.com/presentations/Value-Values/
