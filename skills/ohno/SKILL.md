---
name: ohno
description: >
  Taiichi Ohno's root-cause method from the Toyota Production System: go and see the real evidence,
  ask "why" until you reach a cause you can fix, then put in a countermeasure so it cannot happen
  again. Use for production incidents, recurring bugs, flaky tests, failed deploys, postmortems,
  and any "we fixed it but it came back" situation. Triggers: "think like Ohno", "5 whys",
  "root cause", "why did this happen", "postmortem", "คิดแบบโอโนะ", "หาต้นเหตุ", "ทำไมถึงพัง".
  Not for brainstorming new features.
license: MIT
metadata:
  mind: Taiichi Ohno (1912–1990)
  living: "false"
---

# Think like Ohno

Toyota engineer who built the Toyota Production System. He taught people to stand on the factory
floor and ask "why" five times, because the first answer is almost always a symptom. In software
the factory floor is the logs, the data and the code that actually ran.

## When to use

- An incident, outage, data corruption, or failed release
- The same bug, alert, or flaky test keeps coming back
- A fix is proposed before anyone has looked at the evidence

## Method

1. **Go and see (genchi genbutsu).** Before any theory, collect the evidence: exact error text, timestamps, the log lines, the request, the commit that was deployed, the data row. Quote them. If you cannot see the evidence, say what to fetch and stop guessing.
2. **State the problem as a fact**, not a cause: "Checkout returned 500 for 7% of requests between 10:02 and 10:31", not "the database was slow".
3. **Ask why, one level at a time.** Each answer must be supported by evidence from step 1, or marked as a hypothesis with the check that would confirm it. Usually 3–6 levels; five is a habit, not a rule.
4. **Stop at a cause you can act on** that, if removed, prevents this whole class of problem. If the chain ends at "human error", ask one more why: what made the error easy to make?
5. **Countermeasures at two levels:** contain (stop the bleeding now) and prevent (change the process, code, check or default so it cannot recur). Prefer a fix in the shared place every caller goes through.
6. **Make the problem visible next time:** an alert, a test, an assertion, or a CI check that would have caught it earlier.

## Output

- `Problem (fact):` one sentence with numbers and time
- `Evidence:` bullet list of what was looked at, with quotes
- `Why chain:` numbered whys, each marked **confirmed** or **hypothesis (check: …)**
- `Root cause:` one sentence
- `Countermeasures:` contain / prevent / detect, each with an owner if known
- Blameless wording throughout. Write in the user's language.

## Anti-patterns

- Stopping at the first why ("the server ran out of memory") and restarting the server
- A why chain built on guesses that nobody checked
- Ending at a person ("Somchai forgot") instead of the system that let it happen
- Ten action items with no owner; one real prevention beats ten reminders

## Example (illustration)

> **Problem (fact):** nightly invoice job sent 312 duplicate emails on 2 Oct, 01:00–01:12.
>
> **Why chain:**
> 1. Why duplicates? Two job instances ran at once (confirmed: two `job_start` logs, different hosts).
> 2. Why two instances? The deploy at 00:58 started a new pod while the old one kept running (confirmed: rollout logs).
> 3. Why did both run the job? The scheduler runs inside every app instance (confirmed: `cron` in `main.ts`).
> 4. Why is that unsafe? Sending is not idempotent: no record of "invoice X already emailed" (confirmed: schema).
>
> **Root cause:** a non-idempotent side effect triggered by a per-instance scheduler.
>
> **Countermeasures:** contain: disable the cron in all but one instance. Prevent: a unique `(invoice_id, kind)` row written before sending, and the scheduler moved to a single leader. Detect: alert when the same invoice is emailed twice.

## Sources

- Taiichi Ohno, *Toyota Production System: Beyond Large-Scale Production* (1978; English edition 1988): https://www.routledge.com/Toyota-Production-System-Beyond-Large-Scale-Production/Ohno/p/book/9780915299140 (the "ask why five times" example of a stopped machine)
- Toyota, Toyota Production System overview: https://global.toyota/en/company/vision-and-philosophy/production-system/
