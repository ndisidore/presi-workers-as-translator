---
layout: center
class: text-center
---

# Act II

## The Translator

_Single Worker Solutions_

---

# The "Rosetta Stone" Approach

<div class="text-lg mb-8">**Story: The day Slack, Stripe, and SendGrid walked into a bar (your application)**</div>

<div class="grid grid-cols-3 gap-4 mb-8">

<div v-click="1" class="p-4 bg-purple-100 dark:bg-purple-900 rounded-lg">
<div class="font-bold">Slack Webhook</div>
<div class="text-sm mt-2 font-mono">
```json
{
  "channel": "alerts",
  "text": "Payment failed",
  "user": "john@example.com"
}
```
</div>
</div>

<div v-click="2" class="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
<div class="font-bold">Stripe Webhook</div>
<div class="text-sm mt-2 font-mono">
```json
{
  "type": "payment.failed",
  "data": {
    "customer": "cus_123",
    "amount": 5000
  }
}
```
</div>
</div>

<div v-click="3" class="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
<div class="font-bold">SendGrid Webhook</div>
<div class="text-sm mt-2 font-mono">
```json
{
  "event": "bounce",
  "email": "user@domain.com",
  "reason": "Invalid"
}
```
</div>
</div>

</div>

<v-click at="4">

**Three different APIs, three different schemas, one confused application** 😵‍💫

</v-click>

---

# The Magic Moment: Universal Webhook Translator

```typescript {1-5|7-17|18-26|all}{maxHeight:'420px'}
// One Worker to translate them all
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const body = await request.json();
    const source = request.headers.get("x-webhook-source");

    // Normalize to common schema
    let normalized;
    switch (source) {
      case "slack":
        normalized = {
          type: "notification",
          recipient: body.user,
          message: body.text,
          channel: body.channel,
        };
        break;
      case "stripe":
        normalized = {
          type: "payment_event",
          event: body.type,
          customer: body.data.customer,
          amount: body.data.amount,
        };
        break;
      // ... handle SendGrid, GitHub, etc.
    }

    // Send to your application in consistent format
    return fetch(env.YOUR_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(normalized),
    });
  },
};
```

---
layout: center
class: text-center
---

# Wait, that's it?

## 20 lines of Worker code normalizes 3 different APIs

<div v-click class="mt-8 text-2xl">🤯</div>

---

# The Beautiful Benefits

<div class="grid grid-cols-2 gap-8 mt-8">

<div class="space-y-6">

<div v-click="1" class="flex items-start space-x-4">
<div class="text-2xl">🎯</div>
<div>
<div class="font-bold">Single Point of Truth</div>
<div class="text-sm opacity-75">Your app only needs to understand one schema</div>
</div>
</div>

<div v-click="2" class="flex items-start space-x-4">
<div class="text-2xl">🛡️</div>
<div>
<div class="font-bold">Consistent Error Handling</div>
<div class="text-sm opacity-75">Retry logic, rate limiting, all in one place</div>
</div>
</div>

<div v-click="3" class="flex items-start space-x-4">
<div class="text-2xl">⚡</div>
<div>
<div class="font-bold">Low Overhead</div>
<div class="text-sm opacity-75">No queues, no clusters, just code at the edge</div>
</div>
</div>

</div>

<div v-click="4">

<script setup>
const webhookDiagram = `
webhook1: {
  label: Slack Webhook
  style: { fill: '#4A154B' }
}
webhook2: {
  label: Stripe Webhook
  style: { fill: '#635BFF' }
}
webhook3: {
  label: SendGrid Webhook
  style: { fill: '#1A82E2' }
}
translator: {
  label: Worker Translator
  style: { fill: '#F48120' }
}
app: {
  label: Your App Happy and Simple
  style: { fill: '#10B981' }
}

webhook1 -> translator: Different Schemas
webhook2 -> translator
webhook3 -> translator
translator -> app: One Unified Schema`
</script>

<D2Diagram
  :code="webhookDiagram"
  max-height="300px"
/>

</div>

</div>

---

# But Plot Twist... 🎭

<v-click>

<div class="text-center text-2xl mb-8">
This works great... until your startup becomes a scale-up
</div>

</v-click>

<v-click>

<div class="grid grid-cols-3 gap-4 text-center">
<div class="p-6 bg-red-100 dark:bg-red-900 rounded-lg">
<div class="text-4xl mb-2">3</div>
<div class="text-sm">APIs at startup</div>
</div>

<div class="p-6 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
<div class="text-4xl mb-2">30</div>
<div class="text-sm">APIs at growth</div>
</div>

<div class="p-6 bg-orange-100 dark:bg-orange-900 rounded-lg">
<div class="text-4xl mb-2">300</div>
<div class="text-sm">APIs at scale</div>
</div>
</div>

</v-click>

<v-click>

<div class="mt-12 text-center text-xl">
<span class="font-bold">What happens when you need to handle not 3, but 300 integrations?</span>
</div>

</v-click>

<!--
Set up the next problem - scaling the pattern
-->
