---
layout: center
class: text-center bg-gradient-to-br from-amber-600 to-fuchsia-400
---

# Act II

## The Translator

_Single Worker Solutions_

---

# The "Rosetta Stone" Approach

<style scoped>
.rosetta-code code {
  font-size: 0.58rem !important;
}
</style>

<div class="text-lg mb-8 font-bold">The day Slack, Teams, and SendGrid walked into <s>a bar</s> your application</div>

<div class="grid grid-cols-3 gap-4 mb-8 rosetta-code">

<div v-click="1" class="p-4 bg-purple-100 dark:bg-purple-900 rounded-lg">
<div class="font-bold">Slack Webhook</div>
<div class="mt-2 font-mono">
```json
{
  "channel": "alerts",
  "text": "Billing threshold exceeded",
  "user": "admin@example.com"
}
```
</div>
</div>

<div v-click="2" class="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
<div class="font-bold">Teams Webhook</div>
<div class="mt-2 font-mono">
```json
{
  "type": "message",
  "text": "Billing threshold exceeded",
  "recipient": {
    "id": "admin_456",
    "email": "admin@example.com"
  }
}
```
</div>
</div>

<div v-click="3" class="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
<div class="font-bold">SendGrid Webhook</div>
<div class="mt-2 font-mono">
```json
{
  "event": "sent",
  "email": "admin@example.com",
  "subject": "Billing threshold exceeded"
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

```typescript {1-5|7-17|18-26|all}{maxHeight:'400px'}
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
      case "teams":
        normalized = {
          type: "notification",
          recipient: body.recipient.email,
          message: body.text,
          channel: "teams",
          userId: body.recipient.id,
        };
        break;
      // ... handle SendGrid, etc.
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
  label: Teams Webhook
  style: { fill: '#5B5FC7' }
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

app -> translator: One Unified Schema
translator -> webhook1: Different Schemas
translator -> webhook2: Different Schemas
translator -> webhook3: Different Schemas`
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
<div class="p-6 bg-sky-100 dark:bg-sky-800 rounded-lg">
<div class="text-4xl mb-2">3</div>
<div class="text-sm">APIs at startup</div>
</div>

<div class="p-6 bg-yellow-100 dark:bg-yellow-700 rounded-lg">
<div class="text-4xl mb-2">30</div>
<div class="text-sm">APIs at growth</div>
</div>

<div class="p-6 bg-orange-100 dark:bg-orange-700 rounded-lg">
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
