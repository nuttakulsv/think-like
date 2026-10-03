---
name: bezos
description: >
  Decision and product habits Jeff Bezos described in Amazon's shareholder letters and that former
  Amazon leaders documented: work backwards from the customer (press release and FAQ before code),
  sort decisions into one-way and two-way doors, and disagree and commit. Use when deciding whether
  to build a feature, writing a product proposal or RFC, choosing how much process a decision
  needs, or when a team is stuck debating. Triggers: "think like Bezos", "working backwards",
  "PR/FAQ", "one-way door", "two-way door", "disagree and commit", "คิดแบบเบซอส",
  "ตัดสินใจเร็ว", "เริ่มจากลูกค้า".
license: MIT
metadata:
  mind: Jeff Bezos (b. 1964)
  living: "true"
---

# Think like Bezos

Founder of Amazon. His annual letters to shareholders spelled out how Amazon tried to stay fast as
it grew: most decisions are reversible and should be made quickly by small groups, and new
products start from the customer announcement, not from the technology.

Not affiliated with or endorsed by Jeff Bezos or Amazon. Built from the public sources listed below.

## When to use

- Deciding whether a feature or product is worth building
- Writing an RFC or proposal for something new
- A decision has been in meetings for weeks
- Choosing how much review and sign-off a change needs

## Method

1. **Working backwards.** Before designing, write the announcement a customer would read on launch day: headline, who it's for, the problem, how they use it, a customer quote describing the benefit. Then an FAQ: external questions (price, limits, how it differs) and internal ones (cost, risks, dependencies, what we won't do). If the press release is not exciting or the FAQ has no good answers, stop here.
2. **Classify the decision.** Type 1 (one-way door): consequential and hard or impossible to reverse, such as data deletion, public API contracts, vendor lock-in, pricing promises. Type 2 (two-way door): reversible, such as UI changes, feature flags, internal tooling. Use slow, careful process only for Type 1. Make Type 2 decisions quickly with a small group, and make them reversible on purpose (flags, migrations with rollback).
3. **Decide with about 70% of the information** you wish you had for Type 2 decisions; waiting for 90% is usually too slow. Be explicit about what would make you reverse.
4. **Disagree and commit.** When people disagree but the decision is made, state the disagreement in writing, then everyone commits fully. Record what evidence would reopen it.

## Output

- `Press release:` 5–8 lines, customer language
- `FAQ:` 3–5 external, 3–5 internal questions with answers
- `Decision type:` one-way or two-way door, and why
- `Decision:` what, by whom, by when; what would make us reverse
- `Disagreements:` recorded, with the commitment
- Write in the user's language.

## Anti-patterns

- Starting from "we have this cool tech, what can we do with it?"
- Heavy review for reversible changes; casual handling of irreversible ones
- Decisions that stay "open" because one person isn't fully convinced
- A press release full of internal jargon and features instead of customer benefit

## Example (illustration)

> **User:** Should we build "pay later" for our Thai e-commerce checkout?
>
> **Press release (draft):** "Shoppers can now split purchases over 2,000 baht into three interest-free monthly payments at checkout…"
>
> **FAQ (internal):** Who carries default risk? (Partner, not us.) Cost per transaction? (2.5–4% fee.) What do we not do? (No in-house credit scoring.)
>
> **Decision type:** integrating a partner behind a flag is a two-way door. Signing a 3-year exclusive contract is a one-way door: that part gets legal review and a second option.
>
> **Decision:** pilot with one partner for 5% of users for 6 weeks; reverse if conversion lift is under 2%.

## Sources

- Jeff Bezos, 2015 Letter to Shareholders (Type 1 and Type 2 decisions): https://ir.aboutamazon.com/files/doc_financials/annual/2015-Letter-to-Shareholders.PDF
- Jeff Bezos, 2016 Letter to Shareholders ("Day 1", decision making with about 70% of the information, "disagree and commit"): https://ir.aboutamazon.com/files/doc_financials/annual/2016-Letter-to-Shareholders.pdf
- Colin Bryar and Bill Carr, *Working Backwards: Insights, Stories, and Secrets from Inside Amazon* (2021): https://www.workingbackwards.com/
