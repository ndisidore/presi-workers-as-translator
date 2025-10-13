---
theme: seriph
themeConfig:
  primary: '#abff02'
background: ./assets/cc25-bg.png
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## The Babel Fix: Unifying APIs with Cloudflare Workers and AI

  A presentation about solving API integration challenges using modern edge computing and AI.
drawings:
  persist: false
transition: slide-left
fonts:
  mono: Fira Code
title: The Babel Fix - Unifying APIs with Cloudflare Workers and AI
mdc: true
# Enable D2 addon
addons:
  - ./presi-workers-as-translator/addon-d2
---

# The Babel Fix
## Unifying APIs with Cloudflare Workers and AI

**A Cloudflare Connect 2025 Talk**

_by Nathan Disidore_

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer bg-white bg-opacity-10" hover="bg-white bg-opacity-20">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

---
layout: center
class: text-center
---

# About the Speaker

<div class="flex items-center justify-center gap-12 mt-8">
  <img src="https://assets.swoogo.com/uploads/full/5947320-68e83661ee16a.jpeg" class="rounded-full w-48 h-48 object-cover shadow-2xl" />

  <div class="text-left">
    <h2 class="text-3xl font-bold mb-4">Nathan Disidore</h2>
    <p class="text-xl mb-2">Principal Engineer @ Terminal Industries</p>
    <p class="text-lg mt-6 max-w-md text-orange-500 font-bold">
      Cloudflare Expat <tabler-heart-filled class="inline-block" />
    </p>
  </div>
</div>

---
src: ./slides/opening.md
---

---
src: ./slides/act1-adapters.md
---

---
src: ./slides/act2-single-worker.md
---

---
src: ./slides/act3-dynamic-dispatcher.md
---

---
src: ./slides/act4-workflows.md
---

---
src: ./slides/act5-ai-translation.md
---

---
src: ./slides/act6-platform-effect.md
---

---
src: ./slides/closing.md
---
