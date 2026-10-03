---
name: hopper
description: >
  Grace Hopper's way of moving people and organizations: make abstract costs physical and visible
  (like her 11.8-inch "nanosecond" wires), build a working demo instead of arguing, and make
  technology usable by people who aren't specialists. Use when you need to convince stakeholders,
  explain a technical cost or risk to non-engineers, justify a refactor or performance work,
  write a proposal, or challenge a process kept only out of habit. Triggers: "think like Grace
  Hopper", "explain to management", "convince the team", "make it concrete", "demo it",
  "คิดแบบเกรซ ฮอปเปอร์", "อธิบายให้ผู้บริหารเข้าใจ", "โน้มน้าวทีม".
license: MIT
metadata:
  mind: Grace Hopper (1906–1992)
  living: "false"
---

# Think like Hopper

Computer pioneer and U.S. Navy rear admiral. Her team built A-0, one of the first compilers, and
Flow-Matic, the first language with English-like commands, which shaped COBOL. She was famous for
handing out pieces of wire about 30 cm (11.8 in) long: the distance electricity travels in a
nanosecond, so people could hold a delay in their hands.

## When to use

- A technical cost or risk must be explained to managers, product, or customers
- A proposal for a refactor, migration, or performance project
- People are debating whether something is possible
- A rule or process exists "because we've always done it"

## Method

1. **Find the decision the audience has to make** and what they care about (money, time, customers, risk). Speak to that, not to the technology.
2. **Make the cost physical.** Translate the abstract into something people can picture or count: hours of staff time per month, baht per year, customers lost per day, seconds a user waits, the length of a queue on screen.
3. **Show, don't argue.** If people doubt something is possible or worth it, build the smallest working demo, prototype, or before/after measurement and show it.
4. **Lower the barrier for users.** Ask who else could use this if it were easier: plain-language interfaces, defaults that work, error messages a non-engineer can act on.
5. **Question habits.** For each step in the process being discussed, ask what problem it solves today. Keep it if there's an answer; propose removing it if there isn't.

## Output

- `Audience and decision:` who decides, what they care about
- `The cost, made concrete:` one or two numbers or images anyone can grasp
- `Demo or evidence:` what to show (or what you built), and the result
- `Ask:` the specific decision requested, in one sentence
- Short, plain language, no jargon. Write in the user's language.

## Anti-patterns

- Slides of architecture diagrams for a business decision
- Arguing for weeks about something a one-day prototype could settle
- Talking in milliseconds and CPU to people who think in customers and baht
- Keeping a process nobody can explain

## Example (illustration)

> **User:** I need management to approve two sprints to fix our slow CI.
>
> **Audience and decision:** engineering manager and product lead; they care about release dates.
>
> **The cost, made concrete:** CI takes 38 minutes; 14 engineers wait for it about 5 times a day. That is roughly 44 engineer-hours a day, more than five full-time people doing nothing but waiting.
>
> **Demo or evidence:** a branch where test sharding and dependency caching bring one pipeline to 11 minutes, with screenshots of both runs.
>
> **Ask:** two sprints for the CI work, in exchange for getting back the equivalent of about five engineers' time from next month.

## Sources

- Computer History Museum, Fellow Award: Grace Murray Hopper: https://www.computerhistory.org/fellowawards/hall/grace-murray-hopper/
- Yale News, "Grace Murray Hopper (1906–1992): A legacy of innovation and service" (2017), on A-0, Flow-Matic and COBOL: https://news.yale.edu/2017/02/10/grace-murray-hopper-1906-1992-legacy-innovation-and-service
- Smithsonian National Museum of American History, "Nanoseconds Associated with Grace Hopper" (object 1985.3088.01): https://www.si.edu/object/nanoseconds-associated-grace-hopper:nmah_692464
