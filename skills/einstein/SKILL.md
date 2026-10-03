---
name: einstein
description: >
  Albert Einstein's thought experiments applied to systems: push a design to its limits in your
  head (infinite load, zero latency, clocks that disagree, two observers who see different
  things) and keep the basic assumptions as few and simple as the facts allow. Use when designing
  distributed systems, caches, time and ordering logic, scaling plans, or when a design rests on
  assumptions nobody has written down. Triggers: "think like Einstein", "thought experiment",
  "what if at scale", "edge of the system", "question assumptions", "คิดแบบไอน์สไตน์",
  "ทดลองทางความคิด", "ถ้าโหลดเพิ่มร้อยเท่า".
license: MIT
metadata:
  mind: Albert Einstein (1879–1955)
  living: "false"
---

# Think like Einstein

Physicist behind special and general relativity. Some of his most important results came from
thought experiments: imagining an observer chasing a beam of light, or standing in a falling
elevator, and asking what each observer would actually measure. Applied to software, the same
move exposes hidden assumptions about time, order, and scale.

## When to use

- Distributed systems: replication, queues, caches, clocks, retries
- A design that works on a laptop and has never been imagined at 100× load
- Any rule that depends on "now", "before", or "after"
- A design whose core assumptions are unstated

## Method

1. **Write down the axioms.** List the assumptions the design rests on (clocks agree, messages arrive once, the database is reachable, users act one at a time). Keep only the ones you truly need; every extra assumption is a place to break.
2. **Pick observers.** Name two or more points of view that can see the system differently: two regions, a client and a server, a user and a background job, a primary and a replica.
3. **Run thought experiments at the limits**, one variable at a time, and describe what each observer sees:
   - load → ×100, or → 0
   - latency → very large, or messages arriving out of order
   - clocks → skewed by minutes
   - failure → in the middle of every step
   - data → empty, enormous, duplicated
4. **Look for contradictions:** two observers who must agree but can't, an ordering that depends on whose clock you read, a result that changes with load.
5. **Fix the model, not the symptom:** change the assumption (use logical ordering instead of wall-clock time, idempotency instead of exactly-once), then rerun the experiments.

## Output

- `Axioms:` the minimal list of assumptions, marked needed / removable
- `Observers:` who sees the system and from where
- `Experiments:` table: limit → what observer A sees → what observer B sees → contradiction?
- `Model change:` the assumption replaced, and why it now holds at the limits
- Write in the user's language.

## Anti-patterns

- Testing only the middle of the range
- Using wall-clock timestamps to order events across machines
- "Exactly once" taken as a given
- Piling on assumptions to make one scenario work

## Example (illustration)

> **User:** Users get a coupon if they are the first 100 to check out after 12:00.
>
> **Axioms:** server clocks agree (removable); one checkout is processed at a time (wrong at scale).
>
> **Observers:** app servers in two regions; the coupon service.
>
> **Experiments:** clock skew 3 s → region B accepts checkouts "after 12:00" that region A sees as 11:59:58. 5,000 checkouts in the first second → all read count = 87 and all get a coupon.
>
> **Model change:** the coupon service is the only clock and counter: `UPDATE campaign SET used = used + 1 WHERE used < 100 RETURNING used`, started by the service at its own 12:00. Region clocks no longer matter, and the count cannot pass 100.

## Sources

- Albert Einstein, "On the Method of Theoretical Physics", Herbert Spencer Lecture, Oxford, 1933; published in *Philosophy of Science*, 1934: https://doi.org/10.1086/286316 (source of the idea that theory should make "the irreducible basic elements as simple and as few as possible without having to surrender the adequate representation of a single datum of experience". The shorter "as simple as possible, but not simpler" is a later paraphrase.)
- Albert Einstein, "Autobiographical Notes" (1949), in *Albert Einstein: Philosopher-Scientist*, ed. P. A. Schilpp, with the light-beam thought experiment
- Stanford Encyclopedia of Philosophy, "Thought Experiments": https://plato.stanford.edu/entries/thought-experiment/
- The Collected Papers of Albert Einstein (Digital Einstein Papers): https://einsteinpapers.press.princeton.edu/
