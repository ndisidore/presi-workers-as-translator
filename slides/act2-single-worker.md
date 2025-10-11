---
layout: center
class: text-center bg-gradient-to-br from-amber-600 to-fuchsia-400
---

# Act II

## The Translator

_Single Worker Solutions_

<!-- speaker:
"Act Two: The Translator."
Now we're going to see how moving integration logic to the edge simplifies everything.
Tone: Excitement building — this is where things get interesting.
Transition: "Let me show you what happens when Slack, Teams, and SendGrid walk into your application..."
-->

---

# The "Rosetta Stone" Approach

<style scoped>
.rosetta-code code {
  font-size: 0.55rem !important;
}
</style>

<div class="text-lg mb-8 font-bold">The day Slack, Teams, and SendGrid walked into <s>a bar</s> your application</div>

<div class="grid grid-cols-3 gap-4 mb-8 rosetta-code">

<div v-click="1" class="p-4 bg-purple-100 dark:bg-violet-500 rounded-lg">
<div class="font-bold"><logos-slack-icon class="inline-block" /> Slack Webhook</div>
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

<div v-click="2" class="p-4 bg-sky-100 dark:bg-sky-600 rounded-lg">
<div class="font-bold"><logos-microsoft class="inline-block" /> Teams Webhook</div>
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

<div v-click="3" class="p-4 bg-emerald-100 dark:bg-emerald-600 rounded-lg">
<div class="font-bold"><logos-sendgrid-icon class="inline-block" /> SendGrid Webhook</div>
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

**Three different APIs, three different schemas, one confused application** <tabler-mood-confuzed class="inline-block" />

</v-click>

<!-- speaker:
"Look at these three webhooks. Same event — someone crossed a billing threshold."
"Slack wants channel and user. Teams nests everything in a recipient object. SendGrid? Completely different world with 'event' and 'subject'."
"This is the daily reality of API integration. You're not building features — you're building a museum of other people's design decisions."
"Your application becomes a tour guide: 'Over here we have the Slack format from 2019, and this one is Teams 2.0 schema...'"
Pause for laughs: "Three different APIs, three different schemas, one very confused application."
Tone: Shared pain — everyone's written this adapter code.
Transition: "But watch what happens when we put one Worker in front of all this chaos..."
-->

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

<!-- speaker:
"One Worker to translate them all. Lord of the Rings reference intentional."
"Here's the magic: we read the webhook source from a header, switch on it, and normalize everything to one schema."
"Slack says 'user'? We call it 'recipient'. Teams has nested objects? Flatten them. SendGrid's weird 'event' field? Convert it."
"And here's the kicker..." Pause: "20 lines of code. That's it."
"No Kafka. No consumer groups. No 3-engineer ops team. Just code running at the edge."
"The Worker sits between chaos and your application, and your application just sees one clean schema."
Tone: This is the 'aha' moment. Let it land.
Transition: "I know what you're thinking: 'Wait, that's really it?' Let me show you why this works..."
-->

---
layout: center
class: text-center
---

# Wait, that's it?

## 20 lines of Worker code normalizes 3 different APIs

<div v-click class="mt-8 text-2xl"><tabler-mood-crazy-happy class="inline-block text-sky-500" /></div>

<!-- speaker:
"Wait, that's it?"
Let the audience react. "Yes. 20 lines of Worker code normalizes 3 different APIs."
Pause for effect. Show the mind-blown emoji.
Tone: Playful, letting the simplicity sink in.
Transition: "Let me show you why this is so powerful..."
-->

---

# The Beautiful Benefits

<div class="grid grid-cols-2 gap-8 mt-8">

<div class="space-y-6">

<div v-click="1" class="flex items-start space-x-4">
<tabler-target class="text-2xl" />
<div>
<div class="font-bold">Single Point of Truth</div>
<div class="text-sm opacity-75">Your app only needs to understand one schema</div>
</div>
</div>

<div v-click="2" class="flex items-start space-x-4">
<tabler-shield-check class="text-2xl" />
<div>
<div class="font-bold">Consistent Error Handling</div>
<div class="text-sm opacity-75">Retry logic, rate limiting, all in one place</div>
</div>
</div>

<div v-click="3" class="flex items-start space-x-4">
<tabler-bolt class="text-2xl" />
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
  style: { fill: '#cc85aa' }
}
webhook2: {
  label: Teams Webhook
  style: { fill: '#a691d5' }
}
webhook3: {
  label: SendGrid Webhook
  style: { fill: '#8a9add' }
}
translator: {
  label: Worker Translator
  style: { fill: '#F48120' }
}
app: {
  label: Your App Happy and Simple
  style: { fill: '#5db28e' }
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

<!-- speaker:
"Single point of truth. Your application wakes up one day and only knows one schema. It doesn't care if Slack changes their API version."
"Consistent error handling. Rate limits? Retries? Circuit breakers? All in one place, not scattered across 47 adapters."
"Low overhead. Remember those 3 engineers keeping Kafka alive? They're building features now."
Point to diagram: "All these webhooks hit the Worker. The Worker speaks to your app in one language. Your app is blissfully ignorant of the chaos."
"This is the beauty of edge translation — the complexity lives where it belongs, not in your core application."
Tone: Building conviction — this is the right pattern.
Transition: "But here's where the story gets interesting. This works great... until it doesn't."
-->

---

# But Plot Twist... <tabler-masks-theater class="inline-block" />

<v-click>

<div class="text-center text-2xl mb-8">
This works great... until your startup becomes a scale-up
</div>

</v-click>

<v-click>

<div class="grid grid-cols-3 gap-4 text-center">
<div class="p-6 bg-sky-100 dark:bg-sky-600 rounded-lg">
<div class="text-4xl mb-2">3</div>
<div class="text-sm">APIs at startup</div>
</div>

<div class="p-6 bg-amber-100 dark:bg-amber-500 rounded-lg">
<div class="text-4xl mb-2">30</div>
<div class="text-sm">APIs at growth</div>
</div>

<div class="p-6 bg-rose-100 dark:bg-rose-600 rounded-lg">
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

<!-- speaker:
"Plot twist time."
"This works beautifully when you're a startup with 3 APIs. Seed round closes, you're at 30. Series B hits, suddenly you're at 300."
"And here's the real problem: it's not just 300 APIs. It's 300 APIs times N customers, and every customer wants it configured differently."
"Customer A wants Slack messages to go to #engineering. Customer B wants them in #ops. Customer C wants them filtered by severity first."
Let that sink in: "What happens when you need to handle not 3, but 300 integrations, times thousands of customers?"
"That switch statement? It's now 50,000 lines long and nobody wants to touch it."
Tone: The stakes just got real.
Transition: "That's where we need to talk about Workers for Platforms and what Shopify figured out..."
-->
