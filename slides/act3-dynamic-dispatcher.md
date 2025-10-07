---
layout: center
class: text-center bg-gradient-to-br from-amber-600 to-fuchsia-400
---

# Act III

## The Dynamic Dispatcher

_BYO Adapters via Workers for Platforms_

---

# The Shopify Moment

<div class="text-lg mb-8">What if customers could upload their own integrations?</div>

<div class="grid grid-cols-3 gap-6 mb-8">

<div v-click="1" class="p-4 bg-green-100 dark:bg-green-900 rounded-lg text-center">
<div class="text-2xl mb-2">🏪</div>
<div class="font-bold">Shopify</div>
<div class="text-sm">Platform provides the infrastructure</div>
</div>

<div v-click="2" class="p-4 bg-blue-100 dark:bg-sky-700 rounded-lg text-center">
<div class="text-2xl mb-2">🔌</div>
<div class="font-bold">Developers</div>
<div class="text-sm">Build apps for specific use cases</div>
</div>

<div v-click="3" class="p-4 bg-purple-100 dark:bg-fuchsia-700 rounded-lg text-center">
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

---

# The Holy Grail Moment

<div class="text-center">

<div v-click="1" class="text-3xl mb-8">Customer writes adapter once, it scales globally 🌍</div>

<div v-click="2" class="grid grid-cols-2 gap-6 mb-8">

<div class="p-6 bg-green-100 dark:bg-green-900 rounded-lg">
<div class="text-2xl mb-2">📝</div>
<div class="font-bold">Write Once</div>
<div class="text-sm">Customer uploads their logic</div>
</div>

<div class="p-6 bg-blue-100 dark:bg-blue-900 rounded-lg">
<div class="text-2xl mb-2">🚀</div>
<div class="font-bold">Deploy Globally</div>
<div class="text-sm">Instant worldwide distribution</div>
</div>

<div class="p-6 bg-purple-100 dark:bg-violet-500 rounded-lg">
<div class="text-2xl mb-2">⚡</div>
<div class="font-bold">Scale Infinitely</div>
<div class="text-sm">Zero configuration needed</div>
</div>

<div class="p-6 bg-amber-100 dark:bg-amber-700 rounded-lg">
<div class="text-2xl mb-2">🔒</div>
<div class="font-bold">Run Isolated</div>
<div class="text-sm">Each adapter in its own sandbox</div>
</div>

</div>

<div v-click="3" class="text-xl">
We just gave customers superpowers! 🦸‍♀️🦸‍♂️
</div>

</div>

---

# Real-World Magic ✨

<div class="grid grid-cols-2 gap-8 mt-8">

<div>

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
<div class="text-sm opacity-75">-80% integration tickets</div>
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

</div>

<div v-click="4">

## **The Developer Experience**

<div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mt-4">

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

</div>

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

<!--
Sets up the durability problem that workflows solve
-->
