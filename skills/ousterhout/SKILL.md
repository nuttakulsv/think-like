---
name: ousterhout
description: >
  John Ousterhout's "A Philosophy of Software Design": fight complexity with deep modules (simple
  interface, lots of functionality behind it), information hiding, and strategic rather than
  tactical programming. Use when designing or reviewing modules, classes, APIs, services, or
  refactors; when a change touches too many files; or when code is full of shallow pass-through
  layers. Triggers: "think like Ousterhout", "deep module", "philosophy of software design",
  "too many layers", "design review", "คิดแบบเอาสเตอร์เฮาต์", "ลดความซับซ้อน", "ออกแบบ module".
license: MIT
metadata:
  mind: John Ousterhout (b. 1954)
  living: "true"
---

# Think like Ousterhout

Stanford professor, creator of Tcl and co-designer of the Raft consensus algorithm. His book
defines complexity by its symptoms (change amplification, cognitive load, unknown unknowns) and
argues the main weapon against it is modules whose interfaces are much simpler than what they do.

Not affiliated with or endorsed by John Ousterhout. Built from his book and talks listed below.

## When to use

- Designing a new module, service boundary, class, or public API
- A small feature required edits in many files
- Code review where layers mostly forward calls to the next layer
- Error handling is spread across every caller

## Method

1. **Name the symptoms** you see: change amplification (one change → many edits), cognitive load (how much a developer must know to use it), unknown unknowns (what you'd only find out by breaking it).
2. **Measure depth.** For each module: how much does the interface ask callers to know, versus how much functionality does it provide? Shallow modules (big interface, little behavior) are the target.
3. **Look for information leakage:** the same knowledge (a file format, an ordering rule, a retry policy) encoded in two places. Pull it into one module.
4. **Pull complexity downward.** If either the module or its callers must handle something, make the module do it, so it's done once.
5. **Define errors out of existence** where possible: change semantics so the error case can't happen or becomes a normal case (delete of a missing key succeeds; substring past the end returns empty).
6. **Design it twice.** Sketch at least two different interfaces for anything important, compare, then choose.
7. **Write the interface comment first.** If it's hard to describe simply, the design is wrong.

## Output

- `Symptoms:` which of the three, with concrete examples from the code
- `Depth table:` module → interface size → functionality hidden → shallow/deep
- `Leakage:` knowledge duplicated across modules
- `Proposal:` the deeper design (two alternatives compared briefly), and errors defined away
- Write in the user's language.

## Anti-patterns

- Pass-through methods and classes that add a layer but no abstraction
- "Classitis": many tiny classes each needing to be understood
- Exposing configuration knobs instead of picking good defaults
- Tactical patches that make today's ticket easy and tomorrow's harder

## Example (illustration)

> **User:** Review our file upload code: `UploadController → UploadService → FileManager → StorageAdapter → S3Client`.
>
> **Symptoms:** adding a size limit took edits in four classes (change amplification).
>
> **Depth table:** `UploadService` and `FileManager` forward every call with renamed parameters (shallow). `StorageAdapter` hides S3 details well (deep).
>
> **Leakage:** allowed MIME types are listed in the controller and again in `FileManager`.
>
> **Proposal:** merge `UploadService` and `FileManager` into one `Uploads` module with one method, `store(stream, profile)`, owning limits, type checks and naming. Alternative B (validation in controller) compared and rejected: every new endpoint would repeat it. Missing-file deletes become no-ops, which removes four try/catch blocks in callers.

## Sources

- John Ousterhout, *A Philosophy of Software Design* (2nd ed., 2021): https://web.stanford.edu/~ouster/cgi-bin/book.php
- John Ousterhout, "A Philosophy of Software Design", talk at Google, 2018: https://www.youtube.com/watch?v=bmSAYlu0NcY
