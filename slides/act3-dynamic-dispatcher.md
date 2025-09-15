---
layout: center
class: text-center
---

# Act III

## The Dynamic Dispatcher

_Workers for Platforms - The Game Changer_

---

# The Netflix Problem

<div class="text-lg mb-8">**Story: How Netflix doesn't just have one recommendation engine - they have thousands**</div>

<div class="grid grid-cols-3 gap-6 mb-8">

<div v-click="1" class="p-4 bg-red-100 dark:bg-red-900 rounded-lg text-center">
<div class="text-2xl mb-2">🎬</div>
<div class="font-bold">Movie Buffs</div>
<div class="text-sm">Algorithm optimized for film critics</div>
</div>

<div v-click="2" class="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg text-center">
<div class="text-2xl mb-2">👨‍👩‍👧‍👦</div>
<div class="font-bold">Families</div>
<div class="text-sm">Kid-safe content prioritized</div>
</div>

<div v-click="3" class="p-4 bg-purple-100 dark:bg-purple-900 rounded-lg text-center">
<div class="text-2xl mb-2">📺</div>
<div class="font-bold">Binge Watchers</div>
<div class="text-sm">Series completion focused</div>
</div>

</div>

<v-click at="4">

**Applied to APIs: Different customers need different integrations**

</v-click>

---

# The Multi-Tenant Problem

<div class="mb-8">**Each customer needs their own adapter configuration**</div>

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

<div class="mt-4 text-red-600 font-bold">This doesn't scale!</div>

</div>

</div>

---

# Workers for Platforms - The Game Changer

<div class="mb-6">**Dynamic Worker dispatch based on customer configuration**</div>

````md magic-move {lines: true}
```typescript {*|1-14|16-25|all}
// Customer uploads their own adapter code
const customerAdapter = `
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
}`;

// Platform dynamically deploys it via API
await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.ACCOUNT_ID}/workers/dispatch/namespaces/${env.DISPATCH_NAMESPACE}/scripts/${customerId}`, {
  method: "PUT",
  headers: {
    "Authorization": `Bearer ${env.CF_API_TOKEN}`,
    "Content-Type": "application/javascript"
  },
  body: customerAdapter
});
```

```typescript {*|3-4|5-11|all}
// Main dispatcher routes to customer Workers
export default {
  async fetch(request, env) {
    const customerId = request.headers.get("x-customer-id");

    // Dispatch to customer's personal Worker
    const customerWorker = env.DISPATCHER.get(customerId);
    return customerWorker.fetch(request, {
      ...env,
      ...customerBindings[customerId],
    });
  },
};
```

```typescript {*|1-9|10-18|all}
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

// Platform scales automatically
// Each customer's code runs in isolation
// Global deployment, zero cold starts
// Customer writes adapter once, it scales globally
```
````

---

# The Holy Grail Moment

<div class="text-center">

<div v-click="1" class="text-3xl mb-8">Customer writes adapter once, it scales globally 🌍</div>

<div v-click="2" class="grid grid-cols-3 gap-6 mb-8">

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

<div class="p-6 bg-purple-100 dark:bg-purple-900 rounded-lg">
<div class="text-2xl mb-2">⚡</div>
<div class="font-bold">Scale Infinitely</div>
<div class="text-sm">Zero configuration needed</div>
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

## **Customer Platform Interface**

<div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mt-4">

```typescript
// Customer's simple config UI
{
  "name": "Slack to Notion",
  "trigger": "slack_webhook",
  "target": "notion_api",
  "mapping": {
    "slack.message": "notion.title",
    "slack.user": "notion.created_by",
    "slack.channel": "notion.workspace"
  },
  "retry_policy": {
    "max": 3,
    "backoff":
    "exponential"
  }
}
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

<div v-click="2" class="p-6 bg-red-100 dark:bg-red-900 rounded-lg">
<div class="text-3xl mb-2">🔴</div>
<div class="font-bold">Salesforce is down</div>
</div>

<div v-click="3" class="p-6 bg-yellow-100 dark:bg-yellow-600 rounded-lg">
<div class="text-3xl mb-2">⚠️</div>
<div class="font-bold">Slack is rate-limiting</div>
</div>

<div v-click="4" class="p-6 bg-rose-100 dark:bg-rose-700 rounded-lg">
<div class="text-3xl mb-2">💥</div>
<div class="font-bold">The internet has a bad day</div>
</div>

</div>

<v-click at="5">

<div class="mt-8 text-center text-xl">
Transition: <span class="font-bold">"What do you do when your integration needs to retry for 6 hours to finally succeed?"</span>
</div>

</v-click>

<!--
Sets up the durability problem that workflows solve
-->
