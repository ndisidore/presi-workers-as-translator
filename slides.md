---
theme: seriph
themeConfig:
  primary: '#abff02'
background: ../assets/cc25-bg.png
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

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
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
