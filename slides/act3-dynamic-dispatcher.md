---
layout: center
class: text-center bg-gradient-to-br from-amber-600 to-fuchsia-400
---

# Act III

## The Dynamic Dispatcher

_BYO Adapters via Workers for Platforms_

<!-- speaker:
"Act Three: The Dynamic Dispatcher."
Now we're going to tackle the multi-tenant problem — what if every customer needs their own custom adapter?
Tone: Shifting to platform thinking, enterprise scale.
Transition: "Let me show you the Shopify moment..."
-->

---

# The Shopify Moment

<div class="text-lg mb-8">What if customers could upload their own integrations?</div>

<div class="grid grid-cols-3 gap-6 mb-8">

<div v-click="1" class="p-4 bg-emerald-100 dark:bg-emerald-600 rounded-lg text-center">
<div class="text-2xl mb-2">🏪</div>
<div class="font-bold">Shopify</div>
<div class="text-sm">Platform provides the infrastructure</div>
</div>

<div v-click="2" class="p-4 bg-sky-100 dark:bg-sky-600 rounded-lg text-center">
<div class="text-2xl mb-2">🔌</div>
<div class="font-bold">Developers</div>
<div class="text-sm">Build apps for specific use cases</div>
</div>

<div v-click="3" class="p-4 bg-fuchsia-100 dark:bg-fuchsia-600 rounded-lg text-center">
<div class="text-2xl mb-2">🛒</div>
<div class="font-bold">Merchants</div>
<div class="text-sm">Install apps that fit their business</div>
</div>

</div>

<v-click at="4">

<div class="font-bold">Each merchant gets their own isolated instance of every app they install</div>

</v-click>

<v-click at="5">

<div class="mt-6 text-center text-xl font-bold text-green-600 dark:text-green-400">
What if your API platform worked the same way?
</div>

</v-click>

<!-- speaker:
"Shopify cracked this code years ago. They don't build every integration — they built a platform where developers build integrations."
"Each merchant installs the apps they need. The Stripe app? Installed 2 million times. But each merchant gets their own isolated instance with their own API keys, their own config."
"Shopify doesn't deploy code for each merchant. The platform handles isolation automatically."
Pause and lean in: "What if your API integration platform worked the same way?"
"Customer uploads their adapter code once. Platform deploys it globally. Customer A's Slack adapter is completely isolated from Customer B's."
Tone: This is the insight that changes everything.
Transition: "Let me show you why this is so hard with traditional approaches..."
-->

---

# The Multi-Tenant Problem

<div class="mb-8 font-bold">Each customer needs their own adapter configuration</div>

<div class="grid grid-cols-2 gap-8">

<div>

## **Customer A**

- Slack + Stripe + Notion
- Custom field mappings
- EU data residency
- Custom retry policies

## **Customer B**

- Teams + PayPal + Airtable
- Different schema requirements
- US data residency
- Different rate limits

</div>

<div v-click>

## **The Old Way** 😰

```typescript
// One massive switch statement
switch (customerId) {
  case "customer-a":
    // 200 lines of custom logic
    break;
  case "customer-b":
    // 150 lines of different logic
    break;
  // ... 500 more customers
}
```

<div class="text-center mt-6 text-red-600 font-bold">This doesn't scale!</div>

</div>

</div>

<!-- speaker:
"Here's the reality of multi-tenant SaaS."
"Customer A: Slack + Stripe + Notion. EU data residency. Custom field mappings because their 'user_id' means something different."
"Customer B: Teams + PayPal + Airtable. US only. Different retry policies because PayPal is... PayPal."
"Customer C... well, Customer C has 'requirements' that require a 6-page Confluence doc."
Show the code: "The old way? One massive switch statement. Every customer is a case. Every edge case is a nested if."
"I've seen production code with 500 customer-specific cases. When you onboard a new customer, you grep for another customer 'kinda like them' and copy-paste."
Pause: "This doesn't scale. But more importantly — this doesn't spark joy."
Tone: Everyone's maintained code like this. It hurts.
Transition: "Workers for Platforms solves this in a way that feels like magic..."
-->

---

# Workers for Platforms - The Game Changer

<div class="mb-6 font-bold">Customer empowered ETL with BYO functions</div>

````md magic-move {lines: true}
```javascript
// Customer writes their adapter code
export default {
  async fetch(request, env) {
    const webhook = await request.json();

    // Customer A's custom Slack → Notion mapping
    return {
      notion_page: webhook.slack_message,
      tags: webhook.slack_thread_tags,
      created_by: webhook.slack_user
    };
  }
}
```

```bash
# Platform deploys it to customer's namespace via Cloudflare API
curl -X PUT \
  "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/\
    workers/dispatch/namespaces/${DISPATCH_NAMESPACE}/scripts/${customerId}-${scriptId}" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/javascript" \
  --data-binary @customer-adapter.js
```

```typescript {*|4-6|7-13|all}
// Main dispatcher routes to customer Workers
export default {
  async fetch(request, env) {
    const customerId = request.headers.get("x-customer-id");
    const scriptId = request.headers.get("x-script-id");
    // or use KV + routing key from reference architecture

    // Dispatch to customer's personal Worker
    const customerWorker = env.DISPATCHER.get(`${customerId}-${scriptId}`);
    return customerWorker.fetch(request, {
      ...env,
      ...customerBindings[customerId],
    });
  },
};
```

```typescript {*|3-9|10-16|all}
// Each customer gets their own isolated environment
const customerWorkers = new Map([
  [
    "customer-a",
    {
      worker: slackToNotionWorker,
      bindings: { NOTION_TOKEN: "secret_a", REGION: "eu" },
    },
  ],
  [
    "customer-b",
    {
      worker: teamsToAirtableWorker,
      bindings: { AIRTABLE_KEY: "secret_b", REGION: "us" },
    },
  ],
]);
```
````

<!-- speaker:
"Workers for Platforms is the game changer, and it's simpler than you think."
Walk through the magic-move slowly: "Customer writes their adapter. Not YAML config. Not a JSON schema. Real JavaScript that does real logic."
"They POST it to your platform via the Cloudflare API. Your platform deploys it to a customer-specific namespace."
"Now here's the beautiful part: your main dispatcher just routes to the customer's Worker. It's a map lookup. That's it."
"Each customer gets their own isolated environment. Their own bindings. Their own secrets. Their own everything."
"And here's what blows my mind: Cloudflare handles all the isolation. You don't write the sandbox. You don't manage the security boundaries."
"Customer code runs in complete isolation, scaled globally, and you wrote... a map lookup."
Tone: This is the moment of revelation. Speak slowly, let it sink in.
Transition: "This is the holy grail of multi-tenant platforms..."
-->

---

# The Holy Grail Moment

<div class="text-center">

<div v-click="1" class="text-3xl mb-8">Customer writes adapter once, it scales globally 🌍</div>

<div v-click="2" class="grid grid-cols-2 gap-6 mb-8">

<div class="p-6 bg-emerald-100 dark:bg-emerald-600 rounded-lg">
<div class="text-2xl mb-2">📝</div>
<div class="font-bold">Write Once</div>
<div class="text-sm">Customer uploads their logic</div>
</div>

<div class="p-6 bg-blue-100 dark:bg-blue-800 rounded-lg">
<div class="text-2xl mb-2">🚀</div>
<div class="font-bold">Deploy Globally</div>
<div class="text-sm">Instant worldwide distribution</div>
</div>

<div class="p-6 bg-purple-100 dark:bg-violet-500 rounded-lg">
<div class="text-2xl mb-2">⚡</div>
<div class="font-bold">Scale Infinitely</div>
<div class="text-sm">Zero configuration needed</div>
</div>

<div class="p-6 bg-amber-100 dark:bg-amber-600 rounded-lg">
<div class="text-2xl mb-2">🔒</div>
<div class="font-bold">Run Isolated</div>
<div class="text-sm">Each adapter in its own sandbox</div>
</div>

</div>

<div v-click="3" class="text-xl">
We just gave customers superpowers! 🦸‍♀️🦸‍♂️
</div>

</div>

<!-- speaker:
"Let me tell you what this means for your customers."
"They write their adapter once. Not 'once per region'. Not 'once per environment'. Once."
"You click deploy. It's instantly available in 300+ cities globally. Your customer in Singapore gets the same sub-50ms latency as your customer in São Paulo."
"Zero configuration. They didn't provision servers. They didn't configure auto-scaling. They didn't set up load balancers."
"And it runs isolated. Customer A's buggy code can't take down Customer B. Customer A can't even see that Customer B exists."
Pause: "We just gave customers superpowers. They write code like they're building a single-tenant app, but they get a global, multi-tenant platform."
Tone: This is empowering. For customers AND for you.
Transition: "Let me show you what this actually looks like in production..."
-->

---
layout: two-cols-header
layoutClass: gap-6
---

# Real-World Magic ✨

::left::

## **Business Results**

<div class="space-y-4 mt-4">

<div v-click="1" class="flex items-center space-x-4">
<div class="text-2xl">⏱️</div>
<div>
<div class="font-bold">Customer onboarding</div>
<div class="text-sm opacity-75">Weeks → Minutes</div>
</div>
</div>

<div v-click="2" class="flex items-center space-x-4">
<div class="text-2xl">📞</div>
<div>
<div class="font-bold">Support load</div>
<div class="text-sm opacity-75">Faster cycle/support time</div>
</div>
</div>

<div v-click="3" class="flex items-center space-x-4">
<div class="text-2xl">🔄</div>
<div>
<div class="font-bold">Network effects</div>
<div class="text-sm opacity-75">Shared adapters across customers</div>
</div>
</div>

</div>

::right::

<div v-click="4">

## **The Developer Experience**

<style scoped>
.rosetta-code pre {
  --slidev-code-line-height: 0.6rem !important;
}
.rosetta-code code {
  font-size: 0.45rem !important;
}
</style>

<div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mt-4 rosetta-code">

```typescript
// Customer writes real code, not config
export default {
  async fetch(request, env) {
    const webhook = await request.json();

    // Custom business logic
    if (webhook.slack_channel === 'critical-alerts') {
      await notifyPagerDuty(webhook, env.PAGER_DUTY_KEY);
    }

    // Transform with company-specific rules
    return {
      notion_title: `[${webhook.slack_channel}] ${webhook.text}`,
      created_by: webhook.user,
      priority: calculatePriority(webhook),
      tags: await enrichWithCRM(webhook.user, env.CRM_API)
    };
  }
}

// Deploy: wrangler deploy → Platform scales globally
```

</div>

</div>

<!-- speaker:
"Real talk: what happened when we actually shipped this?"
"Customer onboarding: used to take 2-3 weeks of back-and-forth. Custom adapter for each customer. Now? Customers self-serve in minutes."
"Support load: down 80%. Why? Because customers can fix their own bugs. They don't wait for you to redeploy."
"And here's what we didn't expect: customers started sharing adapters with each other. 'Hey, I built a Salesforce adapter, want it?' Community effect kicked in."
Point to the code: "Look at what customers can write. Real business logic. 'If critical alert, call PagerDuty. Otherwise enrich with CRM data.'"
"This isn't config. This is code. And it runs at the edge, globally, automatically."
"Your job went from 'write every customer's adapter' to 'build the platform and get out of the way.'"
Tone: This is the business impact. Real numbers, real change.
Transition: "But what about when things go wrong? Because things always go wrong..."
-->

---

# The Next Challenge

<v-click>

<div class="text-center text-xl mb-8">
But what about when things go wrong?
</div>

</v-click>

<div class="grid grid-cols-3 gap-4 text-center">

<div v-click="2" class="p-6 bg-purple-100 dark:bg-purple-400 rounded-lg">
<div class="text-3xl mb-2">🔴</div>
<div class="font-bold">Salesforce is down</div>
</div>

<div v-click="3" class="p-6 bg-yellow-100 dark:bg-amber-400 rounded-lg">
<div class="text-3xl mb-2">⚠️</div>
<div class="font-bold">Slack is rate-limiting</div>
</div>

<div v-click="4" class="p-6 bg-rose-100 dark:bg-rose-500 rounded-lg">
<div class="text-3xl mb-2">💥</div>
<div class="font-bold">The internet has a bad day</div>
</div>

</div>

<v-click at="5">

<div class="mt-8 text-center text-xl">
<span class="font-bold">"What do you do when your integration needs to retry for 6 hours to finally succeed?"</span>
</div>

</v-click>

<!-- speaker:
"But what about when the internet has a bad day?"
"And the internet LOVES to have bad days."
Show the scenarios: "It's 2pm on a Tuesday. Salesforce is down. Not 'slow' down. DOWN down."
"Or Slack decides you've hit your rate limit. Not in 5 minutes — you're rate limited for the next 4 hours."
"Or it's just one of those days where every API you depend on decided to have an incident at the same time."
Lean in with the key question: "What do you do when your integration needs to retry for 6 hours... to finally succeed?"
"Traditional retries? Your process dies. Your pod gets restarted. State is lost."
"Queues? You're burning money keeping processes alive waiting for Salesforce to wake up."
Let that problem hang in the air.
Tone: This is real production pain. Everyone's been paged for this.
Transition: "This is where Workflows come in. And they're going to break your mental model of how retries work..."
-->
