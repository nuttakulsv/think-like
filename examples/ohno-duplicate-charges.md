# Ohno: customers charged twice

> Illustration. The company, logs and code are fictional.

**Prompt**

> /think-like:ohno 37 customers were charged twice yesterday afternoon. Support refunded them. We think it was the payment provider. Can you write the postmortem?

**Response**

**Problem (fact):** on 2 Oct between 14:05 and 14:41, 37 orders had two successful charges each at the payment provider. Total over-charge 61,240 THB, all refunded by 3 Oct 10:00.

**Evidence:**
- Provider dashboard: 37 pairs of charges, each pair 2–9 seconds apart, both with status `succeeded`, different charge IDs.
- Our API logs: for each pair, two `POST /payments` requests with the same `orderId`, the second one sent by the mobile app after `timeout after 8000ms`.
- Deploy log: 13:58, release 4.12 lowered the mobile HTTP timeout from 20 s to 8 s ("faster error screen").
- Provider status page: elevated latency 14:00–14:45 (p95 ~11 s).
- Our code: `createPayment()` calls the provider without an idempotency key.

**Why chain:**
1. Why two charges? The app sent the payment request twice. **Confirmed** (two requests per order in our logs).
2. Why twice? The app timed out after 8 s and retried automatically, while the first request was still being processed. **Confirmed** (client log + timestamps).
3. Why did the first request take over 8 s? Provider latency was elevated. **Confirmed** (status page, our latency metrics). This is normal variation we must survive.
4. Why could a retry create a second charge? We don't send an idempotency key, so the provider treats each request as new. **Confirmed** (code).
5. Why was a retry without idempotency possible at all? Payment creation was never designed as retry-safe, and nothing tests that property; the timeout change made an old weakness visible. **Confirmed** (no test, no review checklist item).

**Root cause:** payment creation is not idempotent, so any retry (client, proxy, or user double-tap) can charge twice. Provider latency and the shorter timeout only triggered it.

**Countermeasures:**
| Level | Action | Owner |
|---|---|---|
| Contain | Restore 20 s timeout; disable automatic retry on `POST /payments` in the app | Mobile lead |
| Prevent | Send `Idempotency-Key: order-<id>-attempt-<n>` to the provider; unique constraint on `(order_id, status='succeeded')` in our `payments` table | Payments team |
| Prevent | Test: two concurrent `createPayment` calls for one order produce one charge | Payments team |
| Detect | Alert when one order has more than one successful charge within 10 minutes | Platform |

**What this is not:** a mistake by whoever changed the timeout. A shorter timeout is reasonable; the system should have been safe under retries.
