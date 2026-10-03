---
name: socrates
description: >
  Socratic questioning before building: ask short, pointed questions that expose undefined terms,
  hidden assumptions, and contradictions in a request, until the real goal is clear. Use when a
  request is ambiguous, when requirements conflict, when the agent is about to guess at what the
  user means, during requirement gathering, or to help someone reason through their own design
  without handing them the answer (mentoring, interviews). Triggers: "think like Socrates",
  "ask me questions first", "clarify requirements", "Socratic", "help me think it through",
  "คิดแบบโสเครตีส", "ถามก่อนทำ", "ช่วยตั้งคำถาม".
license: MIT
metadata:
  mind: Socrates (c. 470–399 BCE)
  living: "false"
---

# Think like Socrates

Athenian philosopher known only through others' writing, mostly Plato's dialogues. His method was
to ask someone to define what they claimed to know, then ask further questions until the
definition either held up or showed its contradictions. Applied to software, it finds the
requirement behind the request before any code is written.

## When to use

- A request has words that could mean several things ("admin", "real-time", "user", "report")
- Requirements from different people contradict each other
- The agent is about to fill gaps with guesses
- Mentoring: helping someone find the flaw in their design themselves

## Method

1. **Find the key terms** in the request and ask for a definition of each that matters: "When you say *user*, do you mean a customer, a staff member, or both?"
2. **Ask for examples and counter-examples:** "Give me one case this must handle, and one it must not."
3. **Test the definition** against a case that pushes on it: "If a staff member buys something, are they a user here?" Contradictions mean the definition needs work.
4. **Surface the purpose:** "What will you do with the result?" The answer often changes what should be built.
5. **Ask few questions, in order of impact.** At most 3–5 at a time, each one answerable in a sentence, the most decision-changing first. Offer a default for each so the user can just confirm.
6. **Summarize the agreed definitions** before building, and keep them in the spec or code comments.

In mentoring mode, don't give the answer; ask the next question that leads the person to it.

## Output

- `Questions:` numbered, highest impact first, each with a proposed default
- After answers: `Agreed definitions:` term → meaning, and `Out of scope:` what was ruled out
- Write in the user's language. Keep questions short.

## Anti-patterns

- A list of 15 questions before doing anything
- Questions that could be answered by reading the code or docs (look first)
- Guessing silently instead of asking about a decision that changes the design
- Leading questions that hide an opinion

## Example (illustration)

> **User:** Add a real-time sales report for admins.
>
> **Questions:**
> 1. "Real-time": within seconds, or is every 5 minutes fine? (Default: 5 minutes, which avoids a streaming setup.)
> 2. "Admins": store managers per branch, or head office only? (Default: per branch, seeing only their branch.)
> 3. What decision will they make from it during the day? (Default: restock, so per-product quantities matter more than revenue.)
>
> **Agreed definitions (after answers):** refresh every 5 min; branch managers see their branch, head office sees all; show quantity sold and stock left per product. **Out of scope:** revenue charts.

## Sources

- Plato, *Meno* (Project Gutenberg): https://www.gutenberg.org/ebooks/1643
- Plato, *Euthyphro* (Project Gutenberg): https://www.gutenberg.org/ebooks/1642
- Stanford Encyclopedia of Philosophy, "Socrates": https://plato.stanford.edu/entries/socrates/
