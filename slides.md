---
theme: seriph
themeConfig:
  primary: '#abff02'
background: https://images.unsplash.com/photo-1620837953336-8274c0623a3c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## The Babel Fix: Unifying APIs with Cloudflare Workers and AI

  A presentation about solving API integration challenges using modern edge computing and AI.
drawings:
  persist: false
transition: slide-left
title: The Babel Fix - Unifying APIs with Cloudflare Workers and AI
mdc: true
# Enable D2 addon
addons:
  - ./presi-workers-as-translator/addon-d2
---

# The Babel Fix
## Unifying APIs with Cloudflare Workers and AI

**A Cloudflare Connect 2025 Talk**

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

---
src: ./slides/opening-hook.md
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
src: ./slides/closing.md
---
