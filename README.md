# Slidev + Cloudflare Workers Template

A template for creating [Slidev](https://github.com/slidevjs/slidev) presentations deployed on [Cloudflare Workers](https://workers.cloudflare.com/) using [Workers Assets](https://developers.cloudflare.com/workers/static-assets/).

## Features

- ✨ **Slidev** - Presentation slides for developers
- ⚡ **Cloudflare Workers** - Edge deployment with global CDN
- 📦 **Workers Assets** - Efficient static asset serving
- 🎨 **TypeScript** - Type-safe Worker configuration
- 🚀 **Fast Development** - Local development with `wrangler dev`
- 📊 **D2 Diagrams** - Beautiful technical diagrams with D2 syntax

## Development

### Local Slidev Development

To start the Slidev development server:

```bash
npm install
npm run dev
```

Visit <http://localhost:3030> to see your presentation.

### Local Workers Development

To test the Workers deployment locally:

```bash
npm run build              # Build Slidev presentation
npm run wrangler:dev       # Start local Workers server
```

### Deployment

Deploy to Cloudflare Workers:

```bash
npm run wrangler:deploy
```

## Project Structure

- `slides.md` - Your presentation content
- `src/index.ts` - Cloudflare Worker script
- `wrangler.jsonc` - Workers configuration
- `dist/` - Built static assets (generated)

## Customization

Edit the [slides.md](./slides.md) to customize your presentation content.

### Using D2 Diagrams

This template includes a custom D2 addon for creating technical diagrams. Use the `<D2Diagram>` component in your slides:

```vue
<script setup>
const myDiagram = `
users -> posts: creates
posts -> comments: has many
`
</script>

<D2Diagram
  :code="myDiagram"
  :scale="0.8"
  max-height="400px"
/>
```

**Available Props:**
- `code` (required) - D2 diagram syntax
- `theme` - D2 theme (default: 'default')
- `sketch` - Enable sketch mode (default: false)
- `scale` - Scale factor (default: 1)
- `width` - Fixed width (string or number)
- `height` - Fixed height (string or number)
- `maxWidth` - Maximum width (default: '100%')
- `maxHeight` - Maximum height (default: '500px')

Learn more about Slidev at the [documentation](https://sli.dev/).
Learn more about D2 syntax at the [D2 documentation](https://d2lang.com/).
