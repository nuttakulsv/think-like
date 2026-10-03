---
name: munger
description: >
  Charlie Munger's decision checklist: invert the problem (how would this fail?), follow the
  incentives, check for the classic misjudgment biases, and stay inside your circle of competence.
  Use for risky or expensive decisions: vendor and architecture choices, build vs buy, pricing,
  hiring, security trade-offs, migrations, or any plan everyone in the room already agrees with.
  Triggers: "think like Munger", "invert", "what could go wrong", "incentives", "mental models",
  "devil's advocate", "คิดแบบมังเกอร์", "คิดกลับด้าน", "มองหาความเสี่ยง".
license: MIT
metadata:
  mind: Charlie Munger (1924–2023)
  living: "false"
---

# Think like Munger

Vice chairman of Berkshire Hathaway for decades. He collected models from many fields into a
"latticework" and leaned on a few habits: invert hard problems, never underestimate incentives,
and use checklists of predictable human misjudgments before deciding.

## When to use

- A decision that is expensive, slow to reverse, or affects many people
- A plan with no visible opposition (suspicious)
- Choosing vendors, tools, or partners whose incentives differ from yours
- Anything where your team is outside its usual expertise

## Method

1. **Invert.** Instead of "how do we make this succeed?", ask "what would guarantee this fails?" List the ways, then check the plan against each.
2. **Follow the incentives.** For every party (vendor, team, manager, user, you): what are they rewarded for? Where do their incentives point away from the outcome you want? Expect behavior to follow incentives, not promises.
3. **Run a bias checklist** against the reasoning so far:
   - Consistency and commitment (defending an earlier choice)
   - Social proof ("everyone uses it")
   - Authority (a senior person said so)
   - Availability (the last incident dominates thinking)
   - Sunk cost (we already spent three months)
   - Overconfidence and excessive optimism
   - Envy or fear of missing out (competitors did it)
4. **Circle of competence.** Do we actually understand this domain well enough to judge? If not, either learn the key parts, get someone who does, or choose the option that needs less expertise.
5. **Margin of safety.** Prefer options that still work if your estimates are wrong by a lot.

## Output

- `Inversion:` ways this fails, each with "covered / not covered by the plan"
- `Incentives:` party → what they're rewarded for → risk to us
- `Biases spotted:` which ones, and where they show up in the reasoning
- `Competence:` inside or outside the circle, and what to do about it
- `Decision:` recommended option with its margin of safety
- Write in the user's language.

## Anti-patterns

- Only asking how to succeed
- Trusting a vendor's roadmap over its pricing model
- Treating "we already invested" as a reason
- Deciding outside your expertise without saying so

## Example (illustration)

> **User:** Should we move our whole backend to a new serverless platform? Their sales team offered a big discount for a 3-year deal.
>
> **Inversion:** fails if cold starts break our 300 ms SLA (not covered), if the vendor raises prices after year 3 (not covered), if our team can't debug it at 2 a.m. (not covered).
>
> **Incentives:** the sales rep is paid on contract length; the discount rewards lock-in. Our platform team lead is excited to learn it (career incentive).
>
> **Biases spotted:** social proof ("big companies use it"), envy (a competitor announced their migration).
>
> **Decision:** pilot one non-critical service for 3 months, monthly billing, measure p95 and on-call pain. No 3-year contract until then.

## Sources

- Charlie Munger, *Poor Charlie's Almanack* (Stripe Press edition, 2023), including "The Psychology of Human Misjudgment" and the 1986 Harvard School commencement speech on inversion: https://www.stripe.press/poor-charlies-almanack
- Berkshire Hathaway shareholder letters and annual meetings: https://www.berkshirehathaway.com/letters/letters.html
