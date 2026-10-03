# Council: split the monolith?

> Illustration. The company, numbers and code are fictional.

**Prompt**

> /think-like:council Our NestJS monolith is 140k lines, 9 engineers, deploys twice a week. The CTO wants to split it into 6 microservices this quarter so teams stop blocking each other. Should we?

**Response**

## Council: split the monolith into 6 services this quarter?
Members: brooks, ousterhout, munger, carmack (chosen because the question mixes staffing, module design, an expensive hard-to-reverse bet, and a measurable pain)

Facts gathered: 9 engineers in 2 teams; 41% of PRs in the last 3 months touched both `orders/` and `billing/`; median PR waits 1.6 days for review; deploy takes 50 minutes and is blocked by a flaky e2e suite about one run in four; no service owns its own tables (shared `public` schema).

### Brooks
Angle: essential vs accidental difficulty, and people.
- The blocking is mostly accidental (flaky suite, slow deploy, review queue). Splitting services does not remove any of it and adds the essential difficulty of distributed transactions.
- 9 people, 6 services: most engineers would own more than one service. Communication paths don't shrink.
- A "split everything this quarter" plan is a second-system risk: every deferred cleanup will ride along.
Vote: no to 6 services this quarter.

### Ousterhout
Angle: module depth and leaked knowledge.
- `orders` and `billing` share tables and call each other's repositories directly in 23 places. That is information leakage; a network boundary would make it worse, not better.
- The real fix is deep modules inside the monolith: `billing` exposes one service interface, owns its tables, and hides its schema.
- Design it twice: (a) modules with enforced boundaries in one deployable, (b) extract `billing` only. Compare after (a).
Vote: modularize first.

### Munger
Angle: inversion and incentives.
- How would this fail? Half-migrated services sharing a database; on-call for 6 things with 9 people; the quarter ends with neither architecture working.
- Incentives: "we moved to microservices" is a visible achievement for leadership; the cost lands on on-call engineers later.
- Bias check: social proof ("big companies use microservices") and envy (a competitor's tech blog).
Vote: no; one reversible step at a time.

### Carmack
Angle: measure the actual pain.
- The 50-minute deploy and 25% flaky rate cost about 3 engineer-hours a day in waiting and reruns. Measured, not guessed: from CI logs.
- Fixing the flaky suite and parallelizing tests is a two-week job with a number you can check.
Vote: fix CI first, then re-measure blocking.

### Synthesis
Agree: the blocking is real; most of it is CI and review flow, not architecture. Shared tables make an immediate split unsafe.
Disagree: Ousterhout would still extract `billing` as a service eventually; Brooks and Munger doubt a 9-person team needs it at all. The difference is an assumption about growth: if the team doubles next year, separate deployables start to pay off.
What would settle it: after modularizing, measure how often PRs still need changes across module boundaries, and the hiring plan for next year.

### Recommendation
Decision: no 6-service split this quarter. Do (1) CI: fix flaky tests, parallelize, target deploy under 15 minutes; (2) enforce module boundaries inside the monolith, starting with `billing` owning its tables; (3) review the split decision next quarter with the cross-module PR rate.
Conditions / reverse if: cross-module PRs stay above 30% after boundaries are enforced, or the team grows past ~15 engineers.
First step: quarantine the four flakiest e2e tests and add CI timing to the weekly report.
