# think-like

English | [ภาษาไทย](README.th.md)

Turn the working methods of 23 great minds into skills your coding agent actually follows. Ohno makes it collect evidence and ask why until it reaches a cause it can fix. Dijkstra makes it write the invariant before it trusts the code. Munger makes it ask how the plan fails. A council puts several of them on one decision and makes them disagree out loud.

![The 23 minds in the pack, grouped into understand and debug, correctness and design, build and ship, and decide](docs/roster.png)

```text
/plugin marketplace add nuttakulsv/think-like
/plugin install think-like@think-like
```

Then ask for a mind by name, or let the agent pick one up from the task:

```text
/think-like:feynman explain src/billing/retry.ts
think like Ohno: 37 customers were charged twice yesterday, write the postmortem
/think-like:council should we split the monolith this quarter?
```

## Why this exists

Persona skills are popular, and many of them only change the tone: the agent talks like a famous person and then does what it was going to do anyway. That's fun once.

Each skill here is a method. It tells the agent which steps to take, in which order, what to check, and what the answer must contain. The person's name is a handle for a way of working that is written down in their books, papers and talks, with links. You get the habit, not the impression.

The difference shows in the output. Ask a plain agent about duplicate payments and it usually proposes a fix. Ask with `ohno` and you get the evidence it looked at, a why-chain where every step is marked confirmed or hypothesis, a root cause, and countermeasures at three levels: contain, prevent, detect. See [examples/ohno-duplicate-charges.md](examples/ohno-duplicate-charges.md).

## The minds

| Mind | Changed the world with | Makes your agent | Reach for it when |
|---|---|---|---|
| **Understand and debug** | | | |
| [Richard Feynman](skills/feynman/SKILL.md) | Quantum electrodynamics, the Feynman Lectures | Explain in plain words, mark every gap, test one prediction | Code nobody can explain, a fix nobody understands |
| [George Pólya](skills/polya/SKILL.md) | *How to Solve It*, problem solving as a teachable method | Write down unknown, data and condition; solve a simpler case; look back | Two fixes have already failed |
| [Taiichi Ohno](skills/ohno/SKILL.md) | The Toyota Production System | Go and see the evidence, ask why until an actionable cause, add countermeasures | Incidents, bugs that keep coming back |
| [Claude Shannon](skills/shannon/SKILL.md) | Information theory | Transform the problem six ways; separate signal from noise | No obvious approach, noisy alerts |
| **Correctness and design** | | | |
| [Edsger W. Dijkstra](skills/dijkstra/SKILL.md) | Shortest paths, structured programming | State contracts and invariants, argue correctness before testing | Algorithms, money, concurrency |
| [Barbara Liskov](skills/liskov/SKILL.md) | Data abstraction, behavioral subtyping | Write the caller's contract, check every implementation can stand in | Interfaces, adapters, "drop-in" replacements |
| [John Ousterhout](skills/ousterhout/SKILL.md) | Tcl, Raft, *A Philosophy of Software Design* | Find shallow modules and leaked knowledge, design it twice | Module and API design |
| [Rich Hickey](skills/hickey/SKILL.md) | Clojure, Datomic, "Simple Made Easy" | Find concerns braided together, push effects to the edges | State, data models, tool choices |
| [Donald Knuth](skills/knuth/SKILL.md) | *The Art of Computer Programming*, TeX | Size the problem, compare algorithms, optimize only the critical part | "Is this fast enough?" |
| [Albert Einstein](skills/einstein/SKILL.md) | Relativity | List assumptions, run thought experiments at the limits with several observers | Distributed systems, time, scale |
| [Nikola Tesla](skills/tesla/SKILL.md) | AC motors and polyphase power | Build and run the whole system in its head, with faults, before coding | Features that cross many components, migrations |
| **Build and ship** | | | |
| [Kent Beck](skills/beck/SKILL.md) | Extreme Programming, test-driven development | Red, green, refactor in small steps; tidy first | Changing behavior safely |
| [Martin Fowler](skills/fowler/SKILL.md) | *Refactoring* and its catalog | Name the smells, apply named refactorings one small step at a time | Messy code before a new feature |
| [Linus Torvalds](skills/torvalds/SKILL.md) | Linux, Git | Read the diff first, remove special cases, never break existing users | Code review, public interfaces |
| [John Carmack](skills/carmack/SKILL.md) | Doom, Quake, real-time 3D | Set a budget, measure, remove work, re-measure | Performance |
| [Fred Brooks](skills/brooks/SKILL.md) | IBM System/360, *The Mythical Man-Month* | Separate essential from accidental difficulty, count communication paths | Estimates, staffing, rewrites |
| **Decide** | | | |
| [Elon Musk](skills/musk/SKILL.md) | Reusable rockets, mass-market electric cars | Give each requirement a named owner, delete, simplify, speed up, automate last | Bloated specs and processes |
| [Jeff Bezos](skills/bezos/SKILL.md) | Amazon, AWS | Write the press release first; sort one-way and two-way doors | Product bets, decisions stuck in meetings |
| [Charlie Munger](skills/munger/SKILL.md) | Berkshire Hathaway, the latticework of mental models | Invert, follow the incentives, run a bias checklist | Risky or expensive choices |
| [Daniel Kahneman](skills/kahneman/SKILL.md) | Behavioral economics, *Thinking, Fast and Slow* | Start from the outside view, run a pre-mortem, give ranges | Estimates, plans everyone is sure about |
| [Alan Turing](skills/turing/SKILL.md) | The foundations of computer science | Turn a vague question into a pass/fail procedure | Specs, acceptance criteria, AI evals |
| [Socrates](skills/socrates/SKILL.md) | The Socratic method | Ask the few questions that define the real requirement | Ambiguous requests |
| [Grace Hopper](skills/hopper/SKILL.md) | The first compilers, COBOL | Make costs concrete, demo instead of debate | Convincing managers and stakeholders |

Not sure who to ask? `/think-like:minds` lists them with suggestions, or describe the problem and ask which mind fits.

## The council

```text
/think-like:council should we move to a serverless platform with a 3-year contract?
/think-like:council with Brooks, Kahneman and Bezos: is a 6-week estimate for the mobile rewrite realistic?
```

The council picks 3 to 5 minds whose methods fit the question (or uses the ones you name), always including at least one likely to argue against where you seem to be heading. Every member works from the same facts, gives its angle, findings and vote in a few lines, and then a synthesis lists where they agree, where they disagree and why, what would settle it, and one recommended decision with conditions for reversing it. The full example is [examples/council-split-the-monolith.md](examples/council-split-the-monolith.md).

## Make your own mind

```text
/think-like:mind-maker my old tech lead, from these three blog posts and her design doc template
```

`mind-maker` walks through a consent check, reads the sources you give it, fills an extraction table (distinct job, method, output, anti-patterns, triggers, sourced quotes) and writes a `SKILL.md` in the same shape as the rest of the pack. For living people it only uses what they published, and for private people or creators it asks whether you have their permission first.

## Using it outside the plugin

- Claude Code without the marketplace: copy the folders you want into your personal skills directory, for example `cp -r think-like/skills/feynman ~/.claude/skills/`. They are then available as `/feynman` and so on, without the `think-like:` prefix.
- claude.ai: zip a single skill folder (for example `skills/ohno`) and upload it as a custom skill in the app's settings. The mind skills only use frontmatter fields from the [Agent Skills](https://agentskills.io) format; `council` and `mind-maker` also have `argument-hint`, which only Claude Code uses.
- Other agents that read Agent Skills folders can load `skills/<name>/SKILL.md` directly. Where they look for skills differs per agent, so check its docs.

## How the pack is built

- **Methods, not voices.** Every skill has the same sections: when to use, method, output, anti-patterns, a worked example labelled as an illustration, and sources.
- **Sourced.** Each mind lists its books, papers, talks or letters. A sentence in quotation marks appears only with a link to where it was said; everything else is paraphrased.
- **Living people get their principles only.** No imitation of voice or personality, and each such skill says it is not affiliated with or endorsed by the person.
- **Cheap to keep installed.** Only the names and descriptions sit in the agent's skill list, about 14,700 characters for all 26 skills. A skill's full text loads when it is used.
- **Your language.** Every skill answers in the language you write in, and the descriptions include Thai trigger phrases.
- **Checked in CI.** `node scripts/validate.mjs` checks frontmatter, section order, sources, the not-affiliated line for living people, that the index and the council map list every mind, and every link in the repo.

## FAQ

**Does the agent pretend to be these people?** No. It follows their method and produces the output that method calls for. Historical figures get at most a light touch of voice; living people get none.

**Can I use several at once?** Yes. Mention more than one ("think like Dijkstra and Torvalds on this PR") or use the council.

**Why these 23?** Each one has a job the others don't do, and a method that changes what an agent does with code, data or a decision. People known mainly for being famous, or whose methods overlapped heavily with someone already in the pack, were left out.

**Why are there no Thai people in the pack?** Including a living creator or engineer without their permission would put words in their mouth. `mind-maker` is there for anyone who has that permission.

**Are the methods summaries correct?** They are short summaries written for working engineers. The sources are listed in every skill; read them before relying on a method for something important.

## Contributing

New minds, better sources, and corrections are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) first: a new mind needs a distinct job, primary sources, and a passing `node scripts/validate.mjs`. The quickest way to draft one is `/think-like:mind-maker`.

## Acknowledgements

The idea of packaging a person's way of working as an agent skill was made popular by [andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills), [ponytail](https://github.com/DietrichGebert/ponytail) and [nuwa-skill](https://github.com/alchaincyf/nuwa-skill). This pack takes a different route (many minds, methods with required outputs, sources on everything) and shares no text with them.

## Disclaimer

think-like is not affiliated with, endorsed by, or sponsored by any of the people named in it, their estates, or the organizations they are associated with. Names are used only to identify the published ideas each skill is based on.

## License

[MIT](LICENSE)
