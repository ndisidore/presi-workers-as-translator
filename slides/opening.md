---
layout: center
class: text-center
---

# The £330M API Meltdown

<div class="text-6xl mb-8">💥</div>

**A single API contract change that broke an entire bank**

<v-click>

*"In 2018, TSB Bank pushed a system migration that broke API compatibility overnight — locking millions of customers out of their accounts and costing over £330 million."*

</v-click>

<div class="absolute inset-0 bg-red-500/25 animate-pulse"></div>

<!-- speaker:
“This… is the £330 million API meltdown.”
TSB Bank’s system migration in 2018 — they merged two backend systems, and an API schema mismatch brought the whole operation to its knees.
Customers were locked out for weeks, and the cost ballooned into the hundreds of millions.
Tone: a single mismatch in data contracts can cascade across an entire enterprise.
Transition: “But it’s not just banks…”
-->

---
layout: center
class: text-center
---

# The $1.1T Rally Outage

<div class="text-6xl mb-8">📉</div>

**When Robinhood’s backend failed during a $1.1 trillion market surge**

<v-click>

*"Millions of traders were locked out on one of the biggest trading days in history — all due to a backend integration failure."*

</v-click>

<div class="absolute inset-0 bg-red-500/25 animate-pulse"></div>

<!-- speaker:
“This one hurts a little more personally…”
In March 2020, Robinhood’s trading API dependencies and load balancers failed right as markets rallied after a historic drop — during what analysts called a $1.1 trillion recovery day.
Developers later cited a chain of overloaded services and integration points that weren’t ready for the surge.
Transition: “Different industry, same story — fragile glue holding everything together.”
-->

---
layout: center
class: text-center
---

# The Internet Is Held Together By Glue and Good Intentions

<v-click>

**Every integration, webhook, and “just one more endpoint” adds a new weak link.**

</v-click>

<v-click>

> “The modern Internet runs on invisible handshake agreements between APIs that rarely read the same dictionary.”

</v-click>

<!-- speaker:
Every major system we rely on — payments, logistics, social, authentication — is powered by inter-API cooperation.
-->

---
layout: two-cols-header
layoutClass: gap-8
---

# This Isn't Just Their Problem — It's Everyone's Problem

::left::

<div class="space-y-6">

<div v-click="1" class="flex items-start space-x-4">
<div class="text-4xl">👨‍💻</div>
<div>
<div class="font-bold text-lg">Developers</div>
<div class="text-sm opacity-75 mb-2">"You've written this adapter code 47 times"</div>
<div class="text-2xl font-bold text-amber-600 dark:text-amber-400">254</div>
<div class="text-xs opacity-60">Average APIs per company</div>
</div>
</div>

<div v-click="2" class="flex items-start space-x-4">
<div class="text-4xl">💼</div>
<div>
<div class="font-bold text-lg">Business Owners</div>
<div class="text-sm opacity-75 mb-2">"Each integration takes 3 weeks and costs $50K"</div>
<div class="text-2xl font-bold text-red-600 dark:text-red-400">$600B</div>
<div class="text-xs opacity-60">Annual cost of integration failures</div>
</div>
</div>

<div v-click="3" class="flex items-start space-x-4">
<div class="text-4xl">👥</div>
<div>
<div class="font-bold text-lg">Customers & Ops Teams</div>
<div class="text-sm opacity-75 mb-2">"Why is my Slack notification 30 seconds behind the email?"</div>
<div class="text-2xl font-bold text-purple-600 dark:text-purple-400">3 AM</div>
<div class="text-xs opacity-60">The wakeup call no one wants</div>
</div>
</div>

</div>

::right::

<div v-click="4" class="mt-8">

### The Integration Tax Is Real

<div class="mt-6 space-y-4 text-sm">

- **30%** of engineering time spent on "glue code"
- **$200K/year** per engineer on adapter maintenance
- **23%** customer churn cites "missing integrations"
- **6 months** average time to add a new major integration

</div>

<div class="mt-8 p-4 bg-red-100 dark:bg-rose-600 rounded-lg">
<div class="font-bold">The Hidden Cost:</div>
<div class="text-sm">Every hour spent writing adapters is an hour NOT building your core product.</div>
</div>

</div>

<!-- speaker:
"Let's talk about why this isn't just TSB's problem or Robinhood's problem. This is YOUR problem. This is everyone's problem."
"Developers: You've written this adapter code 47 times. You know the drill. Read the docs, map the fields, handle the edge cases, write the tests, maintain it forever."
"And the scale is insane: the average company now integrates with 254 different APIs. That's not a typo. Two hundred and fifty-four."
"Business owners: Each integration takes 3 weeks minimum. Often longer. And the annual cost of integration failures globally? $600 billion. That's more than the GDP of Sweden."
"Customers and ops teams: 'Why is Slack behind email?' Because there are 6 API hops between the event and the notification. And when things break? 3 AM. The wakeup call no one wants."
Pause: "The integration tax is real."
"30% of your engineering time. $200K per engineer per year. 23% customer churn. 6 months to add a major integration."
"The hidden cost? Every hour spent writing adapters is an hour NOT building your actual product. The thing that differentiates you. The thing customers pay you for."
Tone: Make this visceral and personal. This should hurt a little.
Transition: "So naturally, smart people have tried to solve this..."
-->

---

# Solution #1: Standards (Protobuf, OpenAPI, JSON Schema)

<div class="grid grid-cols-2 gap-8 mt-8">

<div>

## The Promise

<div class="text-4xl mb-4">📐</div>

**"One schema to rule them all"**

<div class="mt-6 space-y-3 text-sm">

- Define your data structures once
- Generate client/server code automatically
- Strong typing across the stack
- Language-agnostic serialization

</div>

<div class="mt-6 p-4 bg-emerald-100 dark:bg-emerald-600 rounded-lg text-sm">
✅ Works great WITHIN your organization
</div>

</div>

<div v-click>

## Why It Fails

<div class="text-4xl mb-4">💔</div>

<div class="space-y-4 text-sm">

<div class="p-3 bg-rose-100 dark:bg-rose-600 rounded">
<div class="font-bold">Requires Universal Buy-In</div>
<div class="text-xs mt-1">Good luck getting Salesforce, Stripe, and Slack to adopt YOUR schema standard</div>
</div>

<div class="p-3 bg-amber-100 dark:bg-amber-600 rounded">
<div class="font-bold">Version Migration Nightmares</div>
<div class="text-xs mt-1">Protobuf 2 → 3 broke the world. Now imagine that across 254 APIs</div>
</div>

<div class="p-3 bg-violet-100 dark:bg-violet-600 rounded">
<div class="font-bold">Doesn't Solve Last-Mile Problem</div>
<div class="text-xs mt-1">Still need adapters at every external API boundary</div>
</div>

</div>

<div class="mt-6 text-xs italic opacity-75">
xkcd 927: "Standards are great! That's why we have 14 of them."
</div>

</div>

</div>

<!-- speaker:
"So naturally, smart people tried to solve this. Solution #1: Standards."
"Protobuf, OpenAPI, JSON Schema. The promise is beautiful: define your data structures once, generate everything automatically, strong typing, language-agnostic."
"And within your organization? This works great. Your microservices all speak Protobuf? Amazing. Your team uses OpenAPI for all internal APIs? Chef's kiss."
Click to reveal: "But here's why it fails in the real world."
"Requires universal buy-in. You need Salesforce to adopt your standard. And Stripe. And Slack. And the 251 other APIs you integrate with."
"Salesforce's response? 'We have our own standard, thanks.' And they're not wrong—they have millions of customers. Why would they change for you?"
"Version migration nightmares. Remember Protobuf 2 to 3? Broke half the internet. Now imagine coordinating that migration across 254 different API providers who all upgrade on different schedules."
"And it doesn't solve the last-mile problem. Even if YOU use Protobuf internally, you still need adapters at every external boundary. You just moved the problem."
Quote the xkcd: "Standards are great! That's why we have 14 of them."
Tone: Empathetic—standards aren't bad, they're just insufficient for the real problem.
Transition: "Okay, what about query layers?"
-->

---

# Solution #2: GraphQL & API Gateways

<div class="grid grid-cols-2 gap-8 mt-8">

<div>

## The Promise

<div class="text-4xl mb-4">🔀</div>

**"Unified query layer over everything"**

<div class="mt-6 space-y-3 text-sm">

- Query exactly what you need
- Single endpoint for all data
- Aggregation and batching
- Strongly typed schema

</div>

<div class="mt-6 p-4 bg-emerald-100 dark:bg-emerald-600 rounded-lg text-sm">
✅ Excellent for YOUR APIs serving YOUR clients
</div>

</div>

<div v-click>

## Why It Falls Short

<div class="text-4xl mb-4">🤔</div>

<div class="space-y-4 text-sm">

<div class="p-3 bg-rose-100 dark:bg-rose-600 rounded">
<div class="font-bold">You Just Moved The Adapter Code</div>
<div class="text-xs mt-1">Every backend API still needs a resolver. That's... an adapter.</div>
</div>

<div class="p-3 bg-sky-100 dark:bg-sky-700 rounded">
<div class="font-bold">Doesn't Handle Webhooks, Retries, Durability</div>
<div class="text-xs mt-1">GraphQL is request/response. What about async events and long-running workflows?</div>
</div>

<div class="p-3 bg-slate-100 dark:bg-slate-600 rounded">
<div class="font-bold">Performance Overhead</div>
<div class="text-xs mt-1">Query parsing, resolution, N+1 problems. Great for flexibility, expensive at scale.</div>
</div>

<div class="p-3 bg-violet-100 dark:bg-violet-600 rounded">
<div class="font-bold">Great For YOUR APIs, Useless For THEIR APIs</div>
<div class="text-xs mt-1">Stripe isn't exposing a GraphQL endpoint just for you</div>
</div>

</div>

</div>

</div>

<!-- speaker:
"Solution #2: GraphQL and API Gateways. The promise: unified query layer over everything."
"You write one query, it fetches from 5 different backends, aggregates the results, returns exactly what you need. Strongly typed. Beautiful."
"And for YOUR APIs serving YOUR clients? This is excellent. GitHub's GraphQL API is legitimately great."
Click: "But here's why it falls short for integration problems."
"You just moved the adapter code. Every backend API still needs a resolver. And what does that resolver do? Maps fields. Handles errors. Transforms data. Congratulations, you wrote an adapter. You just called it a 'resolver.'"
"It doesn't handle webhooks, retries, or durability. GraphQL is request/response. What happens when Slack sends you a webhook? Or when an API call needs to retry for 6 hours? GraphQL doesn't solve that."
"Performance overhead. Query parsing, resolution logic, N+1 problems. This flexibility costs CPU. At scale, it costs money."
"And the real killer: it's great for YOUR APIs, but useless for THEIR APIs. Stripe isn't going to expose a GraphQL endpoint just because you asked nicely."
Tone: GraphQL is good technology for the wrong problem.
Transition: "Alright, what about no-code?"
-->

---

# Solution #3: iPaaS (Zapier, Workato, Tray.io)

<div class="grid grid-cols-2 gap-8 mt-8">

<div>

## The Promise

<div class="text-4xl mb-4">🎨</div>

**"No-code integrations for everyone"**

<div class="mt-6 space-y-3 text-sm">

- Visual workflow builder
- Pre-built connectors
- No engineering required
- Fast time-to-value

</div>

<div class="mt-6 p-4 bg-emerald-100 dark:bg-emerald-600 rounded-lg text-sm">
✅ Perfect for simple automations (100 events/day)
</div>

</div>

<div v-click>

## Why It's Limited

<div class="text-4xl mb-4">🚧</div>

<div class="space-y-4 text-sm">

<div class="p-3 bg-rose-100 dark:bg-rose-600 rounded">
<div class="font-bold">Black Box Execution</div>
<div class="text-xs mt-1">When it breaks, you have zero visibility. "Contact support."</div>
</div>

<div class="p-3 bg-sky-100 dark:bg-sky-600 rounded">
<div class="font-bold">Vendor Lock-In</div>
<div class="text-xs mt-1">Your integrations live in THEIR infrastructure. Good luck migrating.</div>
</div>

<div class="p-3 bg-slate-100 dark:bg-slate-600 rounded">
<div class="font-bold">Can't Handle Complex Logic</div>
<div class="text-xs mt-1">If/then/else only goes so far. Need real code for real business logic.</div>
</div>

<div class="p-3 bg-violet-100 dark:bg-violet-500 rounded">
<div class="font-bold">Cost Scales Linearly With Volume</div>
<div class="text-xs mt-1">$19/month for 100 tasks. $599/month for 10K. $5K/month for 100K. Ouch.</div>
</div>

</div>

<div class="mt-4 text-xs font-bold">Works for simple flows. Breaks at enterprise scale.</div>

</div>

</div>

<!-- speaker:
"Solution #3: iPaaS platforms. Zapier, Workato, Tray.io. The promise: no-code integrations for everyone."
"Visual workflow builder. Pre-built connectors for everything. Your marketing team can build integrations without bugging engineering. Fast time-to-value."
"And for simple automations? 'When form submitted, send Slack message, add to Google Sheets'? This is perfect. 100 events a day? Great fit."
Click: "But here's why it's limited at scale."
"Black box execution. When it breaks—and it will—you have zero visibility. You file a support ticket. You wait. You pray. You can't debug it yourself because you don't control the code."
"Vendor lock-in. Your integrations live in THEIR infrastructure. You want to migrate off? Good luck. You're rewriting everything from scratch."
"Can't handle complex logic. If/then/else only goes so far. What about 'fetch user from CRM, enrich with historical data, apply business rules, transform for three different downstream systems'? You need real code for real business logic."
"And the cost scales linearly with volume. $19/month for 100 tasks. $599 for 10K. $5,000 for 100K tasks. When you're processing millions of events? Do the math. It's unsustainable."
Pause: "Works for simple flows. Breaks at enterprise scale."
Tone: iPaaS platforms aren't bad—they're just not built for what we need.
Transition: "So if standards don't work, query layers don't work, and no-code doesn't scale... what DO we need?"
-->

---
layout: two-cols-header
layoutClass: gap-8
---

# Functional Requirements

::left::

## In Scope ✅

<div class="space-y-2 text-sm mt-4">

- **Multi-protocol translation** (REST, SOAP, GraphQL, webhooks)
- **Schema mapping and transformation** (field-level control)
- **Durable, long-running workflows** (retries that survive failures)
- **Multi-tenant customer adapters** (isolated, scalable)
- **AI-assisted adapter generation** (from docs to code)

</div>

## Out of Scope ⛔

<div class="space-y-2 text-sm mt-4">

- Replacing your database
- Auth/authz systems
- Observability platforms
- Forcing API providers to change

</div>

::right::

<div class="mt-6 mb-6 p-4 bg-sky-100 dark:bg-sky-700 rounded-lg text-sm">
<div class="font-bold">Clear expectations:</div>
This is about the GLUE between systems, not the systems themselves.
</div>

<div v-click="1">

## You Have This Problem (Even If You Don't Know It)

<div class="mt-6 space-y-6">


<div class="p-4 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-700 dark:to-teal-900 rounded-lg">
<div class="text-sm font-bold mb-2">You're Not Behind</div>
<div class="text-xs">The problem is genuinely hard. Every company reinvents this wheel. And it's about to get way easier.</div>
</div>

</div>

</div>

<!-- speaker:
"So what ARE we actually solving? Let me be crystal clear about scope."
"In scope: Multi-protocol translation—REST, SOAP, GraphQL, webhooks, all of them. Schema mapping with field-level control. Durable workflows that can retry for hours or days without losing state. Multi-tenant customer adapters that are isolated and scalable. And AI-assisted generation—from API docs to working code."
"Out of scope: We're not replacing your database. We're not building an auth system. We're not competing with Datadog. And we're definitely not going to force Salesforce to change their API."
"Clear expectations: This is about the GLUE between systems. Not the systems themselves."
Right side, click: "And here's why you have this problem, even if you don't realize it yet."
"Interactive moment. Raise your hand if you have more than 5 external API integrations."
Look around: "Most of you. Keep it up if you've spent more than a week debugging what should have been a 'simple' webhook integration."
"Still a lot of hands. Keep it up if 'we'll build that integration next quarter' has been said for 3 or more quarters."
Laugh with them: "Yeah. We've all been there."
Pause: "You're not behind. You're not slow. The problem is genuinely hard. Every company reinvents this wheel. Badly. Expensively."
"And it's about to get way easier."
Tone: Recognition and reassurance. Make them feel understood.
Transition: "Let me show you why this problem exists in the first place..."
-->

---
layout: statement
---

# APIs Are Like Power Outlets


*They all deliver electricity — but every country has its own plug shape, voltage, and socket standard.*

<section class="hero container max-w-screen-lg mx-auto pb-10 flex justify-center">
<img src="../assets/electric-plug-types.avif" alt="drawing" width="600"/>
</section>

---
layout: two-cols-header
layoutClass: gap-16
---

# Crossing Borders, Crossing APIs

::left::

<div class="space-y-6">

<div v-click="1" class="flex items-start space-x-4">
<div class="text-2xl">🌍</div>
<div>
<div class="font-bold">Every partner speaks a different protocol</div>
<div class="text-sm opacity-75">REST, SOAP, MQTT, GraphQL, XML-RPC...</div>
</div>
</div>

<div v-click="2" class="flex items-start space-x-4">
<div class="text-2xl">⚙️</div>
<div>
<div class="font-bold">Every schema tells a different story</div>
<div class="text-sm opacity-75">What's `orderId` here might be `shipment_ref` there</div>
</div>
</div>

<div v-click="3" class="flex items-start space-x-4">
<div class="text-2xl">🔌</div>
<div>
<div class="font-bold">Every integration needs an adapter</div>
<div class="text-sm opacity-75">Mapping, transformation, and retries</div>
</div>
</div>

<div v-click="4" class="flex items-start space-x-4">
<div class="text-2xl">🧩</div>
<div>
<div class="font-bold">That's where Cloudflare Workers come in</div>
</div>
</div>

</div>

::right::

<script setup>
const apiAdaptersDiagram = `
Your App -> REST
Your App -> SOAP
Your App -> MQTT
Your App -> XML-RPC
Your App -> GraphQL

REST -> Adapter 1: 🔌 {style.stroke-dash: 3}
SOAP -> Adapter 2: 🔌 {style.stroke-dash: 3}
MQTT -> Adapter 3: 🔌 {style.stroke-dash: 3}
`
</script>

<div>

<D2Diagram
  :code="apiAdaptersDiagram"
  :scale="0.9"
/>

</div>

<!--
Visual metaphor of “outlets and adapters” leading naturally into your solution layer.
-->

---
layout: center
class: text-center
---

# What if every API spoke the same language?

<v-click>

## …and your app didn’t need to carry 47 adapters in its backpack?

</v-click>

<v-click>

<div class="mt-12 text-xl opacity-75">
Let’s talk about how Cloudflare Workers can make that happen.
</div>

</v-click>

<!--
Bridges cleanly into the technical story (single Worker translator).
-->
