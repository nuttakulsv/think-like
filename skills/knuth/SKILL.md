---
name: knuth
description: >
  Donald Knuth's habits for algorithms and performance: analyze before optimizing, optimize only the
  critical part that measurement points to, and explain programs to humans as if they were
  literature. Use when choosing or analyzing an algorithm or data structure, estimating complexity,
  deciding whether an optimization is worth it, or writing code and docs that need to be read
  carefully. Triggers: "think like Knuth", "big O", "is this fast enough", "premature
  optimization", "analyze the algorithm", "literate", "คิดแบบคนุธ", "วิเคราะห์อัลกอริทึม",
  "ควร optimize ไหม".
license: MIT
metadata:
  mind: Donald Knuth (b. 1938)
  living: "true"
---

# Think like Knuth

Author of *The Art of Computer Programming*, creator of TeX, Turing Award winner (1974). His
famous line about premature optimization is usually quoted without its second half, which says
not to ignore the critical few percent where speed really matters.

Not affiliated with or endorsed by Donald Knuth. Built from his published writing listed below.

## When to use

- Picking an algorithm or data structure for real input sizes
- Someone proposes an optimization, or says "this will be slow"
- Code that must be read and trusted for years (core libraries, algorithms)

## Method

1. **Size the problem.** Expected n now and in two years, distribution of inputs, worst case that can actually happen.
2. **Analyze, then compare.** Count the dominant operations for each candidate (time and memory), including constants when n is small. Note which is better below and above which n.
3. **Locate the critical 3%.** Measure or reason about where time goes. Optimize only there; leave the rest written for clarity.
4. **When you optimize, keep the slow version** as a reference and test the fast one against it on random inputs.
5. **Explain the program for a human reader:** the idea first, then the code in the order that makes it understandable, with the invariants and the reason for each non-obvious choice.

## Output

- `Problem size:` n, distribution, worst case
- `Candidates:` table with time, memory, and the crossover point
- `Where time goes:` measured or estimated hot spot
- `Decision:` keep simple / optimize this part, with the check that guards it
- Write in the user's language.

## Anti-patterns

- Micro-optimizing code that runs once per request in a 200 ms request
- Choosing an O(n log n) structure for n = 20 because it sounds better
- "Premature optimization is the root of all evil" used to excuse a quadratic loop over a growing table
- Clever code with no explanation of why it is correct

## Example (illustration)

> **User:** Should we replace this array search with a hash map? It's inside the checkout loop.
>
> **Problem size:** cart items ≤ 50; called once per item → ≤ 2,500 comparisons per checkout.
>
> **Candidates:** array scan O(n²) total ≈ 2,500 ops; map O(n) ≈ 50 inserts + 50 lookups. Both well under a millisecond at this size.
>
> **Where time goes:** the checkout spends ~180 ms in three sequential HTTP calls to the payment and stock services.
>
> **Decision:** keep the array; run the HTTP calls in parallel instead. Revisit the loop only if carts above ~1,000 items become possible.

## Sources

- Donald Knuth, "Structured Programming with go to Statements", *ACM Computing Surveys*, 1974: https://doi.org/10.1145/356635.356640 (source of "We should forget about small efficiencies, say about 97% of the time: premature optimization is the root of all evil. Yet we should not pass up our opportunities in that critical 3%.")
- Donald Knuth, *Literate Programming* (1992), and his page on it: https://www-cs-faculty.stanford.edu/~knuth/lp.html
- Donald Knuth, *The Art of Computer Programming*: https://www-cs-faculty.stanford.edu/~knuth/taocp.html
