---
name: minds
description: >
  Index of the think-like pack: lists every great mind available, what each one makes the agent
  do, and which to pick for a given problem. Use when the user asks which mind to use, what minds
  are available, for help with think-like, or describes a problem and wants a recommendation.
  Triggers: "think-like help", "which mind", "list minds", "who should I ask", "what minds are
  there", "/minds", "มีใครบ้าง", "ควรใช้ใครดี", "รายชื่ออัจฉริยะ".
license: MIT
---

# think-like: the minds

Each mind is a skill that changes how the agent works: what it checks, in what order, and what it
must produce. Invoke one by name ("think like Ohno", `/think-like:ohno`) or let the agent pick it
up from the task. For important decisions use several at once with `/think-like:council`.

When the user describes a problem, recommend one to three minds from the table and say why in one
line each. Answer in the user's language.

## Understand and debug

| Mind | Makes the agent… | Use for |
|---|---|---|
| feynman | explain in plain words, find the gap in understanding, test a prediction | confusing code, unexplained fixes |
| polya | write down unknown, data and condition; solve a simpler case; look back | being stuck after failed fixes |
| ohno | collect evidence, ask why until an actionable cause, add a countermeasure | incidents, bugs that come back |
| shannon | transform the problem six ways to find a new approach; separate signal from noise | no obvious approach, noisy alerts |

## Correctness and design

| Mind | Makes the agent… | Use for |
|---|---|---|
| dijkstra | state contracts and invariants, argue correctness before testing | algorithms, money, concurrency |
| liskov | write the caller's contract, check every implementation can substitute | interfaces, inheritance, adapters |
| ousterhout | find shallow modules and leaked knowledge, design it twice | module and API design |
| hickey | find complected concerns, push effects to the edges, prefer values | state, data models, tool choices |
| knuth | size the problem, analyze candidates, optimize only the critical part | algorithms, "is this fast enough" |
| einstein | list assumptions, run thought experiments at the limits | distributed systems, time, scale |
| tesla | build and run the whole system in the head before coding | multi-part features, migrations |

## Build and ship

| Mind | Makes the agent… | Use for |
|---|---|---|
| beck | work in red, green, refactor steps; tidy first | implementing behavior safely |
| fowler | name the smells, apply catalog refactorings in small steps | messy code, cleanup |
| torvalds | read the diff, remove special cases, never break existing users | code review, public interfaces |
| carmack | set a budget, measure, remove work, re-measure | performance |
| brooks | separate essential from accidental, count communication paths | estimates, staffing, rewrites |

## Decide

| Mind | Makes the agent… | Use for |
|---|---|---|
| musk | question each requirement's owner, delete, simplify, speed up, then automate | bloated specs and processes |
| bezos | write the press release first, sort one-way and two-way doors | product decisions, slow decisions |
| munger | invert, follow incentives, run a bias checklist | risky or expensive choices |
| kahneman | start from the outside view, run a pre-mortem, give ranges | estimates, confident plans |
| turing | turn a vague question into a pass/fail procedure | specs, acceptance criteria, evals |
| socrates | ask the few questions that define the real requirement | ambiguous requests |
| hopper | make costs concrete, demo instead of debate | convincing stakeholders |

## Tools

| Skill | What it does |
|---|---|
| council | 3–5 minds review one decision and a synthesis names the trade-offs |
| mind-maker | build a new mind skill from sources you provide |
