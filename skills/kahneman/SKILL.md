---
name: kahneman
description: >
  Daniel Kahneman's tools against predictable errors in judgment: take the outside view
  (reference-class forecasting) before trusting your own estimate, run a pre-mortem (with Gary
  Klein's method) before committing, and separate fast intuition from slow checking. Use for
  estimates, deadlines, roadmaps, launch plans, hiring decisions, and any plan the team feels very
  confident about. Triggers: "think like Kahneman", "pre-mortem", "how long will this really
  take", "estimate", "planning fallacy", "are we overconfident", "คิดแบบคาห์เนมัน",
  "ประเมินเวลา", "pre-mortem".
license: MIT
metadata:
  mind: Daniel Kahneman (1934–2024)
  living: "false"
---

# Think like Kahneman

Psychologist and Nobel laureate in economics (2002), author of *Thinking, Fast and Slow*. His work
with Amos Tversky showed that human judgment fails in consistent ways, which means the failures
can be anticipated and partly corrected with simple procedures.

## When to use

- Any estimate of time, cost, or effort
- A plan or launch that the team is very confident about
- Choosing between candidates, vendors, or designs based on impressions

## Method

1. **Outside view first.** Before estimating from the details of this project (the inside view), find the reference class: similar past projects, tickets, or migrations. What did they actually take? Use their distribution as the starting point.
2. **Then adjust** for real, specific differences, and keep the adjustment modest. If your estimate is far better than the reference class, write down why this case is truly different.
3. **Pre-mortem** (Gary Klein's method): ask everyone to imagine the project has already failed badly, some months from now, and to write down every reason why. Collect the reasons independently before discussing. Turn the top risks into plan changes, not just a risk list.
4. **Check for the planning fallacy:** plans that assume best-case progress, no sick days, no review cycles, no integration surprises.
5. **Slow down the fast system** for important judgments: score options on a few predefined criteria independently before discussing, so the first opinion or the most confident voice doesn't anchor everyone.

## Output

- `Reference class:` similar past work and how long it really took (range)
- `Estimate:` outside-view baseline → adjustments → final range (e.g. P50 and P90), not a single date
- `Pre-mortem:` top failure reasons → plan changes
- `Bias check:` anchoring, overconfidence, planning fallacy, where seen
- Write in the user's language.

## Anti-patterns

- A single-date estimate with no range
- Estimating only from the task breakdown (inside view)
- Pre-mortems that turn into a list nobody acts on
- Discussing options before people form independent judgments

## Example (illustration)

> **User:** How long to migrate our auth from sessions to JWT? The team says 2 weeks.
>
> **Reference class:** last 4 auth or identity changes in this company took 3, 5, 6 and 9 weeks; industry write-ups of similar migrations commonly mention long tails from mobile clients.
>
> **Estimate:** baseline 5–6 weeks; one adjustment: no mobile app this time (−1 week). P50 4.5 weeks, P90 7 weeks.
>
> **Pre-mortem:** "It failed because…" refresh token storage was insecure; third-party SSO broke; old sessions couldn't be revoked during rollout. Plan changes: security review in week 1, SSO test environment set up first, dual-mode auth for two weeks.

## Sources

- Daniel Kahneman, *Thinking, Fast and Slow* (2011)
- Gary Klein, "Performing a Project Premortem", *Harvard Business Review*, September 2007: https://hbr.org/2007/09/performing-a-project-premortem
- Dan Lovallo and Daniel Kahneman, "Delusions of Success: How Optimism Undermines Executives' Decisions", *Harvard Business Review*, July 2003: https://hbr.org/2003/07/delusions-of-success-how-optimism-undermines-executives-decisions
