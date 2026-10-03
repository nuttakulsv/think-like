---
name: tesla
description: >
  Nikola Tesla's habit of building and running a machine completely in his head before touching
  material: walk through the whole system end to end, change the construction, and fix flaws on
  paper before any code is written. Use before implementing a feature or service that spans
  several components, for design reviews, migration plans, and onboarding flows, or when the
  agent is about to start coding without a full picture. Triggers: "think like Tesla",
  "walk through the whole flow", "simulate it first", "design before code", "end to end",
  "คิดแบบเทสลา", "จำลองทั้งระบบก่อน", "ไล่ flow ทั้งหมด".
license: MIT
metadata:
  mind: Nikola Tesla (1856–1943)
  living: "false"
---

# Think like Tesla

Inventor of the AC induction motor and the polyphase system. In his autobiography he wrote that
he did not rush into actual work: he built each invention in his imagination, changed its
construction, and ran it in his mind until it worked, before building anything physical.

## When to use

- A feature that crosses UI, API, queue, database, and a third party
- A migration or rollout with several steps
- Before writing code for anything you can't easily undo
- The agent (or a person) wants to "just start coding and see"

## Method

1. **Draw the whole machine.** List every component the flow touches, in order, with what each one receives and produces. Include the parts you don't own (payment provider, email service, cron).
2. **Run it in your head with real data.** Take one concrete case (a specific user, amount, file) and trace it step by step: what's stored where, what's sent, what the user sees at each moment.
3. **Run it again with trouble:** a slow dependency, a retry, a duplicate request, a crash between steps, a user who closes the tab. Note where the machine jams.
4. **Change the construction** and rerun until every run, normal and troubled, ends in a correct state. Only now decide the order of implementation.
5. **Build in the order that lets you test the real machine early:** a thin end-to-end path first, then fill in.

## Output

- `Machine:` numbered list of components and the data passed between them
- `Normal run:` the trace with one concrete example
- `Troubled runs:` each fault → where it jams → change made
- `Build order:` thin end-to-end slice first, then the rest
- Write in the user's language.

## Anti-patterns

- Building components in isolation and meeting at integration time
- Designing only the happy path
- Starting with the most interesting component instead of the riskiest connection
- A diagram with boxes but no data on the arrows

## Example (illustration)

> **User:** Add "export my data" for PDPA requests.
>
> **Machine:** settings page → API `POST /exports` → job queue → worker collects from 6 tables + S3 files → zip to private bucket → signed link → email.
>
> **Normal run:** user 4512 with 3,200 orders and 41 photos → zip of 180 MB → link valid 24 h.
>
> **Troubled runs:** worker restarts halfway (jam: half a zip in the bucket → write to a temp key, rename at the end); user clicks twice (jam: two jobs → one active export per user); link forwarded to someone else (jam: data leak → link requires login as the same user).
>
> **Build order:** end-to-end with one table and no email first; then the other tables; then email.

## Sources

- Nikola Tesla, *My Inventions* (1919), first published in *Electrical Experimenter*, full text on Wikisource: https://en.wikisource.org/wiki/My_Inventions (source of "I do not rush into actual work. When I get an idea I start at once building it up in my imagination. I change the construction, make improvements and operate the device in my mind.")
