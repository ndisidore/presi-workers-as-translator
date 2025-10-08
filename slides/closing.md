---
layout: center
class: text-center
---

# The Payoff

<!-- speaker:
Quick reset: we opened with two big, real-world failures. This is where we close the loop and show the concrete payoff of the approach we just walked through.
"Alright — let’s bring it home. Remember those two disasters we started with? Here’s how the stack we built would have changed the story."
-->

---
layout: center
class: text-center
---

# Remember the £330M API Meltdown?

<div class="absolute inset-0 bg-green-500/10 animate-pulse"></div>

<div class="mb-8">

<div v-click="1" class="text-xl mb-6 font-bold">The Original Problem:</div>

<div v-click="2" class="p-6 bg-rose-100 dark:bg-rose-600 rounded-lg mb-6">
"One schema mismatch. Millions of customers locked out. Hundreds of millions lost."
</div>

</div>

<div v-click="3" class="mb-8">

<div class="text-xl mb-6 font-bold">How this stack would have prevented it:</div>

</div>

<div class="grid grid-cols-3 gap-4">

<div v-click="4" class="p-4 bg-green-100 dark:bg-emerald-600 rounded-lg">
<div class="text-lg font-bold mb-2">🤖 AI Mapping</div>
<div class="text-sm">Detected schema drift and suggested mappings automatically</div>
</div>

<div v-click="5" class="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
<div class="text-lg font-bold mb-2">⚡ Edge Validation</div>
<div class="text-sm">Rejected malformed payloads at the edge before they touched core systems</div>
</div>

<div v-click="6" class="p-4 bg-purple-100 dark:bg-violet-500 rounded-lg">
<div class="text-lg font-bold mb-2">🔄 Workflow Recovery</div>
<div class="text-sm">Retried and reconciled state safely — no all-hands at 3AM</div>
</div>

</div>

<!-- speaker:
Walk through each box slowly.
AI Mapping: "Imagine onboarding a partner and the mapping code is 80% suggested by the model — you review and ship, not hand-code."
Edge Validation: "This is the gatekeeper. Bad data never reaches your ledger."
Workflow Recovery: "Durable retries + state means the system heals, not explodes."
Use a quiet, confident tone for the last line: "People sleep. Customers keep using the product. The bill doesn't hit the CFO."
-->

---
layout: center
class: text-center
---

# Remember the $1.1T Rally Outage?

<div class="absolute inset-0 bg-green-500/10 animate-pulse"></div>

<div class="mb-8">

<div v-click="1" class="text-xl mb-6 font-bold">The Original Problem:</div>

<div v-click="2" class="p-6 bg-rose-100 dark:bg-rose-600 rounded-lg mb-6">
"API overload. No throttling or fallback. Critical systems froze mid-surge."
</div>

</div>

<div v-click="3" class="mb-8">

<div class="text-xl mb-6 font-bold">How this stack would have prevented it:</div>

</div>

<div class="grid grid-cols-3 gap-4">

<div v-click="4" class="p-4 bg-emerald-100 dark:bg-emerald-600 rounded-lg">
<div class="text-lg font-bold mb-2">⚡ Workers as Buffers</div>
<div class="text-sm">Rate-limit and shape traffic at the edge so the core never floods</div>
</div>

<div v-click="5" class="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
<div class="text-lg font-bold mb-2">🔄 Workflows Queueing</div>
<div class="text-sm">Smooth backoff and durable queues for heavy spikes</div>
</div>

<div v-click="6" class="p-4 bg-purple-100 dark:bg-violet-500 rounded-lg">
<div class="text-lg font-bold mb-2">🤖 AI Awareness</div>
<div class="text-sm">Auto-generated fallback paths and user messaging to keep customers informed</div>
</div>

</div>

<!-- speaker:
Emphasize the flow: buffering at the edge, then graceful queuing, then smart fallbacks and messaging.
Point out how this preserves user trust during peak events — even when things are strained, the product behaves like it's working.
Mention: "You lose transactions when users can't complete flows. You lose trust when they see silence."
-->

---
layout: two-cols-header
layoutClass: gap-2
---

# The Payoff

::left::

<div class="p-6 bg-emerald-100 dark:bg-emerald-600 rounded-lg mb-8">
<div class="text-lg font-bold mb-2">💡 The Insight</div>
It's not about a single validation or heroic developer fix.<br />
It's about the <i>infrastructure taking on a more supportive role.</i>
</div>

<div class="text-lg mb-4">
When APIs stop being obstacles and start being allies, everything changes:
</div>

<div class="space-y-4 mt-6 mb-6">
  <div v-click="1" class="flex items-center space-x-3">
    <div class="text-green-600 font-bold">Weeks → Minutes</div>
    <div class="text-sm opacity-75">Onboarding & mappings</div>
  </div>

  <div v-click="2" class="flex items-center space-x-3">
    <div class="text-green-600 font-bold">Manual → Automated</div>
    <div class="text-sm opacity-75">Error handling & retries</div>
  </div>

  <div v-click="3" class="flex items-center space-x-3">
    <div class="text-green-600 font-bold">Fragile → Durable</div>
    <div class="text-sm opacity-75">Infrastructure-level resilience</div>
  </div>
</div>

::right::

<div class="space-y-8">

<div v-click="4" class="p-6 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-indigo-900 rounded-xl shadow-lg">
<div class="text-xl font-bold mb-4">💰 Business Impact</div>

<div class="space-y-3 text-sm">
  <div><span class="font-bold text-blue-300">99.9% → 99.99%</span> uptime across integrations</div>
  <div><span class="font-bold text-blue-300">Fewer escalations, faster recovery</span></div>
  <div><span class="font-bold text-blue-300">Technical debt → Technical leverage</span></div>
</div>
</div>

<div v-click="5" class="p-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-xl shadow-lg">
<div class="text-xl font-bold mb-4">🎯 Innovation Focus</div>

<div class="space-y-2 text-sm">
  <div>✨ Turn legacy APIs into modern products</div>
  <div>🚀 Launch partnerships faster</div>
  <div>🧠 Solve real business problems</div>
  <div>💡 Focus on innovation, not plumbing</div>
</div>
</div>

</div>

<!-- speaker:
Start by tying back to the earlier disasters — “These companies didn’t fail because they couldn’t code. They failed because their systems weren’t adaptive.”
Then reveal: the insight isn’t about the code, it’s about building infrastructure that turns chaos into order.
Use the left column to highlight developer and operational wins — time, automation, reliability.
Then shift to the right column: the bigger picture. Business continuity, resilience, and the ability to innovate again.
End with a small pause before transitioning to ‘The Challenge’: “So what happens when *you* become the universal adapter?”
-->

---
layout: center
class: text-center
---

# The Challenge

<div class="text-3xl mb-8">
Every API speaks its own dialect...
</div>

<div v-click class="text-2xl mb-12">
…but with Cloudflare Workers, <span class="font-bold">you can become the universal adapter.</span>
</div>

<div v-click class="space-y-6 text-left">

<div class="text-xl"><span class="font-bold">🛠️ Adapt at the Edge</span> — translate, normalize, and secure APIs before they reach your core</div>
<div class="text-xl"><span class="font-bold">🤖 Augment with AI</span> — generate mappings, detect schema drift, and learn partner quirks</div>
<div class="text-xl"><span class="font-bold">🔄 Orchestrate with Workflows</span> — make complex exchanges reliable and stateful</div>
<div class="text-xl"><span class="font-bold">🌍 Scale Globally</span> — deploy instantly to every region, latency-free</div>

</div>

<!-- speaker:
“We can’t change how every API behaves — but we *can* adapt to them effortlessly.”
Tie back to the travel metaphor: “Instead of fighting the sockets, you carry a universal adapter — and everything just works.”
Let that pause land before the call to action.
Tone: Empowering
-->

---
layout: center
class: text-center
---

# Thank You

<div class="text-lg opacity-75 mb-8">
From chaos to clarity: Translating the Internet’s APIs with edge glue and AI
</div>

<div class="grid grid-cols-2 gap-8 text-left max-w-2xl mx-auto">

<div>

### **References**

- [Postman: State of APIs 2024](https://www.postman.com/state-of-api/2024/)
- [BBC: TSB IT meltdown cost £330m](https://www.bbc.com/news/business-47425233)
- [Forbes: Robinhood’s $1.1 Trillion Outage](https://www.forbes.com/sites/billybambrough/2020/03/06/robinhoods-1-trillion-tech-outage/)
- [Learning from Integration Failures](https://www.1985.co.in/blog/learning-from-integration-failures/)

</div>

<div>

### **Get Started**

- [Cloudflare Workers](https://workers.cloudflare.com)
- [Cloudflare Workflows](https://developers.cloudflare.com/workflows)
- [Workers AI](https://developers.cloudflare.com/workers-ai)

</div>

</div>

<div class="mt-8 text-sm opacity-50">
Slides built with Slidev, deployed on Cloudflare Workers (naturally)
</div>

<!-- speaker:
Thank the audience warmly.
Offer a short next step: "I’ll be hanging out after the talk for questions and demos — or you can ping me on X/LinkedIn."
If you have a follow-up demo or repo, mention where to find it here or during the Q&A.
End with one final line: "Go teach those APIs to be friends." (light smile)
-->

---
layout: image
image: ./assets/cc25-thank-you.png
---
