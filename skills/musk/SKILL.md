---
name: musk
description: >
  The five-step engineering "algorithm" Elon Musk has described publicly, plus first-principles
  reasoning: make every requirement less dumb and give it a named owner, delete parts and steps,
  simplify, then speed up, and automate last. Use when a feature, spec, process, pipeline, or
  architecture feels over-specified or bloated; when estimating cost from scratch; or before
  automating anything. Triggers: "think like Musk", "first principles", "the algorithm",
  "delete the part", "question the requirement", "this spec is too much", "คิดแบบอีลอน มัสก์",
  "คิดแบบ first principles", "ตัด requirement".
license: MIT
metadata:
  mind: Elon Musk (b. 1971)
  living: "true"
---

# Think like Musk (the algorithm)

Engineer and CEO of SpaceX and Tesla. In a 2021 factory tour he laid out a five-step process for
engineering work and stressed the order: most teams start at step 5 (automate) and end up
automating something that should not exist. This skill uses that process and his first-principles
cost reasoning, nothing else.

Not affiliated with or endorsed by Elon Musk. Built from the public sources listed below.

## When to use

- A spec or ticket with many requirements nobody can trace to a person
- A slow build, deploy, review, or approval process
- Someone wants to automate a manual workflow
- Cost or effort estimates based on "that's what it usually costs"

## Method

Do the steps in order. Do not skip ahead.

1. **Make the requirements less dumb.** List every requirement. Each one needs a named person (not a department) who asked for it and the reason. Requirements from smart people are the most dangerous because nobody questions them. Challenge each one.
2. **Delete the part or process step.** Remove requirements, features, fields, services, steps, approvals that don't survive step 1. If you never have to add anything back, you did not delete enough (Isaacson's account of the rule puts the add-back rate at around 10%).
3. **Simplify and optimize** what is left. Not before: the most common mistake is optimizing something that should not exist.
4. **Accelerate cycle time.** Make the remaining loop faster (build, test, deploy, review, feedback).
5. **Automate** only now, and only what survived.

**First principles for costs and limits:** break the thing into its basic inputs (compute, storage, people-hours, API calls) and price those directly. Compare to the quoted price. A large gap means the cost is mostly convention, not physics.

## Output

- `Requirements:` table with requirement → owner (name) → reason → keep / question / delete
- `Deleted:` what goes, and what to watch for in case something must come back
- `Simplified:` what changed in what remains
- `Faster:` the cycle-time change
- `Automate:` only what survived, or "nothing yet"
- `First-principles check:` (if costs are involved) bottom-up cost vs quoted cost
- Write in the user's language.

## Anti-patterns

- Automating or optimizing first
- Requirements owned by "the business", "legal", or "the team"
- Keeping something because it might be needed later
- Treating the person as the method: this skill uses the process, not the persona

## Example (illustration)

> **User:** Spec for an admin export: CSV, Excel, PDF, scheduled email, 14 filters, column chooser, audit log. Estimate?
>
> **Requirements:** CSV (Nok, finance, monthly reconciliation) keep; Excel (nobody named) question; PDF (sales, "looks nicer") question; scheduled email (Nok, monthly) keep; 14 filters (copied from the old screen) question: finance uses 3; column chooser (nobody) delete; audit log (security, PDPA) keep.
>
> **Deleted:** Excel (CSV opens in Excel), PDF, column chooser, 11 filters. Watch for: sales asking for PDF.
>
> **Simplified:** one export endpoint with 3 filters, streaming CSV.
>
> **Automate:** the monthly email, using the same endpoint. Estimate drops from 3 weeks to 4 days.

## Sources

- Everyday Astronaut, "Starbase Tour with Elon Musk [PART 1 // Summer 2021]" (the five-step process is explained in the tour): https://www.youtube.com/watch?v=t705r8ICkRw
- Walter Isaacson, *Elon Musk* (2023), which describes "the algorithm" as used inside SpaceX and Tesla
