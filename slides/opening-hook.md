---
layout: center
class: text-center
---

# The $47 Million Typo

<div class="text-6xl mb-8">💸</div>

**A single API integration mishap that cost a company millions**

<v-click>

*"By the end of this talk, you'll see how three lines of code could have prevented this disaster"*

</v-click>

<!--
Start with a hook - real impact, real money. Set up the mystery early.
-->

---
layout: statement
---

# "Every API speaks its own dialect of crazy"

*Your app is the confused tourist trying to order coffee in 47 different languages simultaneously*

<!--
Relatable metaphor - everyone has felt this pain
-->

---
layout: two-cols
layoutClass: gap-16
---

# The Stakes

<div class="space-y-6">
  <div v-click="1" class="flex items-center space-x-4">
    <div class="text-4xl">254+</div>
    <div class="text-sm opacity-75">Average APIs per company</div>
  </div>

  <div v-click="2" class="flex items-center space-x-4">
    <div class="text-4xl">$600B</div>
    <div class="text-sm opacity-75">Annual cost of integration failures</div>
  </div>

  <div v-click="3" class="flex items-center space-x-4">
    <div class="text-4xl">3 AM</div>
    <div class="text-sm opacity-75">When your integrations fail</div>
  </div>
</div>

::right::

<div v-click="4" class="mt-8">

```mermaid {theme: 'dark', scale: 0.8}
graph LR
    A[Your App] --> B[API 1]
    A --> C[API 2]
    A --> D[API 3]
    A --> E[...]
    A --> F[API 47]

    B -.->|💥| G[Downtime]
    C -.->|⚠️| H[Errors]
    D -.->|🐌| I[Timeouts]
    E -.->|🔥| J[Failures]
    F -.->|💰| K[$$$]
```

</div>

<!--
Hard data to establish the problem scope. Visual shows the complexity.
-->

---
layout: center
class: text-center
---

# The Curiosity Gap

<v-click>

## What if I told you there's a way to make every API speak the same language to your application...

</v-click>

<v-click>

## ...without changing a single line in those APIs?

</v-click>

<div v-click class="mt-12 text-xl opacity-75">
Let me show you how.
</div>

<!--
Set up the promise - this is what we're going to solve
-->