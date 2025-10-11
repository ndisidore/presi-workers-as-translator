---
layout: center
class: text-center bg-gradient-to-br from-amber-600 to-fuchsia-400
---

# Act V

## The Mind Reader

_AI-Powered Schema Translation_

<!-- speaker:
"Act Five: The Mind Reader."
Now we're going to see how AI can write these adapters for us automatically.
Tone: Excitement about AI augmentation.
Transition: "Remember carrying 47 adapters? What if one could reshape itself..."
-->

---

# The Universal Translator Dream

<div class="mb-8 font-bold">Remember carrying 47 different power adapters in your backpack? What if one adapter could automatically reshape itself to fit any outlet?</div>

<div class="grid grid-cols-3 gap-6 mb-8">

<div v-click="1" class="p-4 bg-red-100 dark:bg-rose-500 rounded-lg text-center">
<tabler-book-2 class="text-2xl mb-2" />
<div class="font-bold">Challenge 1</div>
<div class="text-sm">Every API has its own OpenAPI spec</div>
</div>

<div v-click="2" class="p-4 bg-indigo-100 dark:bg-indigo-500 rounded-lg text-center">
<tabler-mood-smile class="text-2xl mb-2" />
<div class="font-bold">Challenge 2</div>
<div class="text-sm">APIs have quirks and behaviors</div>
</div>

<div v-click="3" class="p-4 bg-violet-100 dark:bg-violet-500 rounded-lg text-center">
<tabler-help-circle class="text-2xl mb-2" />
<div class="font-bold">Challenge 3</div>
<div class="text-sm">Undocumented edge cases</div>
</div>

</div>

<v-click at="4">

<div class="text-center text-xl">
Enter: <span class="font-bold text-2xl">Text Generation Models - The Schema Whisperers</span> <tabler-sparkles class="inline-block" />
</div>

</v-click>

<!-- speaker:
"Remember traveling internationally with 47 different power adapters? You're standing in a Tokyo hotel room at 2am, desperately trying to find the right adapter so you can charge your laptop for tomorrow's presentation."
"That's what writing API integrations feels like. Every API is a different country with a different outlet shape."
Walk through the three challenges: "Challenge 1: Every API has its own OpenAPI spec — sometimes 500 pages long. Challenge 2: APIs have quirks. Slack's 'blocks' API is completely different from their 'attachments' API, which is deprecated but still widely used. Challenge 3: Undocumented edge cases. Like when Salesforce silently truncates field names to 40 characters, but only in production, not in their sandbox."
"I've spent weeks of my career just reading API documentation. Weeks."
Pause: "Enter: Text Generation Models — The Schema Whisperers."
"And I want to be clear — this isn't hype. This is where AI stops being a buzzword and starts being incredibly useful."
Tone: Setting up AI as the practical solution to a real problem.
Transition: "Let me show you how simple this actually is..."
-->

---

# A Little Prompt Engineering

<div class="ai-codegen">

````md magic-move {lines: true}{maxHeight:'400px'}
```text {*}
You are an expert in API integrations and Cloudflare Workers.

Task:
- Generate a Cloudflare Worker in JavaScript
- Input: JSON payload in our "internal notification schema" (defined below)
- Output: A properly formatted API request for the target service (see docs link below)
- The Worker should:
  1. Accept POSTed JSON in the internal schema
  2. Validate required fields (e.g. user.name, content.text)
  3. Transform the payload into the target API's expected format
  4. If an env.TARGET_API_KEY or env.TARGET_WEBHOOK_URL is provided, call the target API
  5. Otherwise, just return the transformed payload (for preview/testing)
  6. Handle optional fields gracefully

Internal schema:
{
  "event_id": "evt_12345",
  "event_type": "USER_MENTION",
  "user": { "id": "user_789", "name": "Alice" },
  "content": {
    "text": "Alice mentioned you in a comment",
    "link": "https://example.com/comments/456"
  },
  "timestamp": "2025-09-09T12:34:56Z"
}

Target API docs: [INSERT DOCS URL HERE]

Goal:
Produce a working Cloudflare Worker that can reliably transform and deliver notifications from our schema into the target service's API.
```

```typescript {all}
// AI-Generated Output
export function internalToSlack(internalEvent: any) {
  return {
    channel: "#notifications",
    username: "Integration Bot",
    icon_emoji: ":bell:",
    text: `*${internalEvent.event_type}*: ${internalEvent.content.text}`,
    attachments: [
      {
        color: "#36a64f",
        fields: [
          { title: "User",  value: internalEvent.user.name, short: true  },
          { title: "Time", value: new Date(internalEvent.timestamp).toLocaleString(), short: true }
        ],
        footer: `Event ID: ${internalEvent.event_id}`,
        actions: [
          { type: "button", text: "View Details", url: internalEvent.content.link }
        ]
      }
    ]
  };
}

// Bonus: Transforms internal schema to Slack's webhook format with attachments!
```
````

</div>

<!-- speaker:
"A little prompt engineering. And I do mean 'little'."
Read the prompt slowly: "You are an expert in API integrations and Cloudflare Workers. Task: Generate a Worker that transforms from our internal schema to the target API's format."
"That's it. No complex prompt. No chain-of-thought reasoning. Just: here's my schema, here's their docs, write the code."
Point to the internal schema: "This is what our app produces. Simple notification format. User, content, timestamp."
"And we give the AI a link to Slack's documentation. That 500-page documentation we talked about? The AI reads it. All of it. In seconds."
Show the generated output: "And look what it produces. Perfect Slack webhook format. Attachments with color coding. Fields for user and time. Footer with the event ID. Even includes action buttons."
"But here's what blows my mind..." Pause for effect: "I didn't ask it to include attachments. I didn't ask for color coding. I didn't specify action buttons."
"The AI read Slack's docs, understood the best practices, and generated code that follows them. It's not just translating fields — it's understanding intent."
Tone: This is legitimately impressive, not hype.
Transition: "Let's talk about what this actually means in practice..."
-->

---

# The "Clarke's Third Law" Moment

<div class="text-center mb-8">

<div class="text-2xl mb-6 font-bold">Before/After: Manual vs AI</div>

</div>

<div class="grid grid-cols-2 gap-8">

<div class="p-6 bg-rose-100 dark:bg-rose-600 rounded-lg">

### **Manual Mapping** <tabler-mood-sad class="inline-block" />

<div class="space-y-3 mt-4 text-sm">
<div><tabler-book-2 class="inline-block" /> Read 10-page API documentation</div>
<div><tabler-search class="inline-block" /> Understand nested object structures</div>
<div><tabler-pencil class="inline-block" /> Write transformation code</div>
<div><tabler-bug class="inline-block" /> Debug edge cases</div>
<div><tabler-flask class="inline-block" /> Test with sample data</div>
<div><tabler-refresh class="inline-block" /> Handle API version changes</div>
<div><tabler-clock class="inline-block" /> <span class="font-bold">Total time:</span> 3 days</div>
</div>

</div>

<div class="p-6 bg-green-100 dark:bg-emerald-600 rounded-lg">

### **AI Generation** <tabler-sparkles class="inline-block" />

<div class="space-y-3 mt-4 text-sm">
<div><tabler-robot class="inline-block" /> Paste/Link OpenAPI spec</div>
<div><tabler-clipboard class="inline-block" /> Paste/Link your schema</div>
<div><tabler-bolt class="inline-block" /> AI reads and understands</div>
<div><tabler-target class="inline-block" /> Generates working code</div>
<div><tabler-shield class="inline-block" /> Includes error handling</div>
<div><tabler-crystal-ball class="inline-block" /> Handles common edge cases</div>
<div><tabler-clock class="inline-block" /> <span class="font-bold">Total time:</span> 30 seconds</div>
</div>

</div>

</div>

<v-click>

<div class="text-center mt-8 text-2xl">
<span class="font-bold">"Any sufficiently advanced technology is indistinguishable from magic"</span> <tabler-wand class="inline-block" />
</div>

</v-click>

<!-- speaker:
"Before/After: Manual vs AI. Let's be honest about what the old way actually looked like."
Manual: "Day 1: Read the 10-page API documentation. Day 2: Realize there's a 40-page 'Advanced Concepts' guide you also need. Day 3: Actually write the code. Day 4: Debug why nested objects aren't serializing correctly. Day 5: Discover that their example in the docs has a typo and has been wrong for 2 years."
"I'm not exaggerating. I've had this exact experience with a major payment provider. Their docs had a typo in the authentication example. For 2 years. Thousands of developers copy-pasted broken code."
AI: "30 seconds. Paste the OpenAPI spec. Paste your schema. Hit generate. Working code. With error handling. With edge cases covered."
"And here's the kicker: the AI doesn't copy-paste the typo. It understands what the code is trying to do and generates the correct version."
Read Clarke's Third Law slowly: "Any sufficiently advanced technology is indistinguishable from magic."
"I want to be clear — I'm not saying AI is perfect. But for this specific task? Reading documentation and generating adapter code? It's transformative."
"The time savings are real. 3 days to 30 seconds—that's hundreds of times faster for straightforward field mapping and basic transforms. Now, complex business logic with edge cases? That still needs human review and testing. But for the 80% of adapters that are just 'map field A to field B, handle nulls, format dates'? This is a fundamental shift in how we work."
Tone: Genuine awe, but grounded in practical experience and honest about limitations.
Transition: "And speaking of real tools that make this possible..."
-->

---
layout: two-cols-header
layoutClass: gap-8
---

# Cloudflare VibeSDK: AI-Powered Integration Builder
### Open-source AI webapp generator built entirely on Cloudflare's stack

::left::

<div class="space-y-4">

<v-click at="1">

### Perfect for Integration Building

- Describe integrations in natural language
- Generates React + TypeScript Workers
- Live preview in sandboxed containers
- One-click deploy to Cloudflare Workers

</v-click>

<v-click at="2">

### Yoinked Strait from the README


> Let your customers extend your product's functionality without learning your API or writing code. They can describe custom integrations, build specialized workflows...

</v-click>

</div>

::right::

<div class="flex flex-col items-center justify-center h-full">
<img src="https://opengraph.githubassets.com/1/cloudflare/vibesdk" alt="VibeSDK" class="rounded-lg shadow-lg max-w-full" />
<div class="mt-4 text-center">
<a href="https://github.com/cloudflare/vibesdk" target="_blank" class="font-mono text-sm opacity-75 hover:opacity-100">
github.com/cloudflare/vibesdk
</a>
</div>
</div>

<!-- speaker:
"And speaking of real tools that make this possible... Cloudflare just released VibeSDK."
"It's an open-source AI webapp generator built entirely on the Cloudflare stack. And they specifically call out integration building as a core use case."
"Here's what makes it powerful: You describe what you want in natural language. 'Build me an integration that transforms Stripe webhooks into Slack notifications.' It generates the code. Shows you a live preview. One-click deploy."
"And under the hood? It's using Durable Objects to run stateful AI agents. It goes through iterative phases: planning, foundation, components, integration, optimization."
"Notice that integration is a first-class phase. They're not treating adapters as an afterthought. They're baking them into the development workflow."
"And this isn't just our idea—Cloudflare is betting on this approach. When major infrastructure providers ship tools specifically designed for AI-generated integrations, that's validation. This approach isn't experimentation anymore. It's becoming infrastructure."
"VibeSDK is open-source. You can use it today. The patterns we've discussed? They're being productized and made accessible to everyone."
Tone: This is validation that the approach is industry-standard, not fringe.
Transition: "But the real magic isn't just speed. It's the network effects that happen when everyone can generate adapters..."
-->
