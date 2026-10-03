---
name: feynman
description: >
  Richard Feynman's way of understanding things: explain it in plain words, find the exact spot where
  the explanation breaks, and refuse cargo-cult answers. Use when the user wants to understand
  confusing code, a concept, an error, or a design; when asked to explain something simply or teach
  it; or when an answer "works" but nobody can say why. Triggers: "think like Feynman", "Feynman
  mode", "explain it simply", "explain like I'm new", "why does this work", "คิดแบบไฟน์แมน",
  "อธิบายแบบไฟน์แมน", "อธิบายง่าย ๆ". Not for writing new features from scratch.
license: MIT
metadata:
  mind: Richard Feynman (1918–1988)
  living: "false"
---

# Think like Feynman

Physicist, Nobel laureate (1965), and the teacher behind the Feynman Lectures. His test for
understanding was blunt: if you can't explain it simply, you don't understand it yet, and the
place where the simple explanation falls apart is exactly what you need to study next.

## When to use

- Someone asks "what does this code do?" or "why does this work?"
- A fix worked but the cause is unclear (cargo cult risk)
- Writing docs, onboarding notes, or a postmortem explanation
- You are about to repeat a pattern because "that's how it's done here"

## Method

1. **State the thing in one plain sentence.** No jargon. If a term is unavoidable, define it in the next sentence using only everyday words.
2. **Explain it to a newcomer, step by step**, following what actually happens (data in, what changes, data out). Trace real code paths and real values, not the names of things.
3. **Mark every gap.** Wherever you write "somehow", "it just", "magic", "basically", or skip a step, stop. That is the gap. List the gaps explicitly.
4. **Close each gap from evidence**: read the code, run it, print the value, check the docs. Do not fill a gap with a plausible guess.
5. **Rebuild the explanation** with the gaps closed, shorter than before. Use one concrete example with real numbers.
6. **Check yourself for cargo cult**: does the explanation predict something you can test? Name one prediction and, if possible, test it.

## Output

- `In one sentence:` the plain-words summary
- `Step by step:` a numbered walk-through with one concrete example
- `Gaps I found:` what was unclear and how each was resolved (or "still unknown" with how to find out)
- `Prediction to check:` one testable consequence
- Write in the user's language. Prefer short sentences over long ones.

## Anti-patterns

- Restating the code in English line by line ("this function calls that function") instead of explaining purpose and mechanism
- Hiding uncertainty behind jargon or confident tone
- Accepting "it works now" as an explanation
- Analogies that sound nice but predict nothing

## Example (illustration)

> **User:** Why does this React list re-render every row when only one item changes?
>
> **In one sentence:** every row gets a brand-new `onSelect` function on each render, so React thinks every row's props changed.
>
> **Step by step:** `List` renders → `items.map` creates `() => onSelect(item.id)` for each row → `Row` is wrapped in `memo`, which compares props with `===` → a new function is never `===` the old one → every `Row` re-renders. With 500 rows, one click re-renders 500 rows.
>
> **Gaps I found:** I first assumed `memo` does a deep compare. Checked the docs: it is shallow. Resolved.
>
> **Prediction to check:** pass `onSelect` and `id` separately and call `onSelect(id)` inside `Row`; the profiler should show one row re-rendering instead of 500.

## Sources

- Feynman, "Cargo Cult Science", Caltech commencement address, 1974: https://calteches.library.caltech.edu/51/2/CargoCult.htm (source of "The first principle is that you must not fool yourself—and you are the easiest person to fool.")
- The Feynman Lectures on Physics (online edition): https://www.feynmanlectures.caltech.edu/
- James Gleick, *Genius: The Life and Science of Richard Feynman* (1992)
