# Musk's algorithm: a 19-requirement notification spec

> Illustration. The company, people and spec are fictional.

**Prompt**

> /think-like:musk Here's the spec for in-app notifications (19 requirements). Estimate is 7 weeks. Can we do better?

**Response**

**Step 1: make the requirements less dumb**

| # | Requirement | Owner | Reason | Verdict |
|---|---|---|---|---|
| 1 | Notify on order shipped | Ploy (CX) | Top support question "where is my order" | keep |
| 2 | Notify on order delivered | Ploy (CX) | Same | keep |
| 3 | Notify on price drop for wishlist | Ton (growth) | Re-engagement experiment | keep, as an experiment |
| 4 | Real-time via WebSocket | nobody named | "feels modern" | question |
| 5 | Read/unread state synced across devices | nobody named | | question |
| 6 | Notification center with infinite scroll | design mock | | question |
| 7 | Categories and filters (6 types) | design mock | | question |
| 8 | Per-category mute settings | legal? | "PDPA" | question: checked with legal: marketing opt-out is required, per-category isn't |
| 9 | Email fallback | nobody named | | delete |
| 10 | SMS fallback | nobody named | | delete |
| 11–19 | Rich media, reactions, snooze, digest mode, admin broadcast tool, A/B testing hooks, analytics dashboard, translation, scheduling | various "nice to have" | | delete |

**Step 2: delete**
Deleted: 9–19, and 5 (no one asked; mobile users mostly use one device). Kept marketing opt-out (from 8) because legal requires it. Watch for: CX asking for delivery emails, which are already sent by the existing email service.

**Step 3: simplify**
- WebSocket (4) → poll on app open and push notifications via the existing FCM setup. Users see shipped/delivered within minutes; nobody needs millisecond delivery for a parcel.
- Notification center (6, 7) → a simple list of the last 30 notifications, no filters.
- One `notifications` table, one endpoint `GET /me/notifications`.

**Step 4: accelerate**
Ship 1 and 2 first behind a flag to 10% of users; measure "where is my order" tickets for two weeks before building 3.

**Step 5: automate**
Only the shipped/delivered triggers from the order status change. No admin tooling yet.

**Result:** 7 weeks → about 8 working days for 1, 2 and the opt-out; requirement 3 as a separate one-week experiment if the first release cuts support tickets.
