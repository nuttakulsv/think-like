---
name: turing
description: >
  Alan Turing's move of replacing a vague question with a precise, mechanical one that can be
  checked: turn fuzzy requirements ("fast", "secure", "user-friendly", "works correctly") into an
  exact procedure or test that decides yes or no. Use when acceptance criteria are vague, when
  writing specs, tests, SLOs, or evaluation suites, when people argue about whether something is
  "done", or when evaluating AI or heuristic features. Triggers: "think like Turing", "define
  done", "make it testable", "acceptance criteria", "how do we measure this", "คิดแบบทัวริง",
  "นิยามให้ชัด", "ทำให้วัดผลได้".
license: MIT
metadata:
  mind: Alan Turing (1912–1954)
  living: "false"
---

# Think like Turing

Mathematician who founded computer science by making "what can be computed?" precise with a
simple imaginary machine. In 1950 he faced the question "Can machines think?", called it too
meaningless to discuss, and replaced it with a game whose result anyone could check.

## When to use

- A requirement uses words like fast, scalable, secure, intuitive, robust, smart
- A feature has no clear definition of done
- Evaluating a model, ranking, search, or recommendation feature
- Two people argue about whether something works

## Method

1. **Quote the vague question** exactly as stated.
2. **Say why it can't be decided** as is: which words have no agreed meaning or measurement?
3. **Replace it with a procedure.** Write a mechanical test that a person or script could run without judgment: inputs, steps, what is observed, and the pass/fail rule. Prefer numbers with thresholds and conditions ("p95 under 300 ms at 200 requests/s on the staging dataset").
4. **Check the replacement captures what people meant:** list one case that should pass and one that should fail, and confirm the procedure classifies them correctly. If not, refine.
5. **Make it executable:** an automated test, a benchmark script, an evaluation set, or a checklist with exact steps. Note what the procedure deliberately does not cover.

## Output

- `Vague question:` quoted
- `Why undecidable as stated:` the fuzzy words
- `Procedure:` inputs → steps → observation → pass/fail rule
- `Sanity cases:` one pass, one fail, and the result
- `Executable form:` test, script, or eval set to add
- Write in the user's language.

## Anti-patterns

- "It should be fast" accepted as a requirement
- Definitions of done that depend on who is looking
- Evaluating an AI feature by trying a few prompts by hand
- Metrics with no threshold or no conditions

## Example (illustration)

> **User:** The search should return relevant results.
>
> **Why undecidable:** "relevant" has no measurement; nobody can say if a change made it better.
>
> **Procedure:** a fixed set of 50 real queries (from logs), each with 1–3 products a support agent marked as correct. Run search; pass if a correct product is in the top 3 for at least 45 of 50 queries (90%), and no query takes over 200 ms.
>
> **Sanity cases:** "iphone 15 case" → correct product at rank 1 (pass). Misspelled "samsng charger" → no correct product in top 3 (fail), which matches the complaint that started this.
>
> **Executable form:** `npm run eval:search` in CI, failing the build if the score drops.

## Sources

- A. M. Turing, "Computing Machinery and Intelligence", *Mind*, 1950: https://doi.org/10.1093/mind/LIX.236.433 (opens with "I propose to consider the question, 'Can machines think?'" and replaces it with the imitation game)
- A. M. Turing, "On Computable Numbers, with an Application to the Entscheidungsproblem", *Proceedings of the London Mathematical Society*, 1937: https://doi.org/10.1112/plms/s2-42.1.230
- Andrew Hodges, *Alan Turing: The Enigma* (1983)
