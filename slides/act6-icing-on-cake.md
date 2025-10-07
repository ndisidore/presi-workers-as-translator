---
layout: center
class: text-center bg-gradient-to-br from-amber-600 to-fuchsia-400
---

# Act VI

## Icing on the Cake

_Future Possibilities_

---

# The Integration Marketplace

<div class="grid grid-cols-2 gap-8">

<div>

## **Community Catalog** 🏪

<div class="text-sm mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">

- **Filterable**: by source/target API (Stripe, Slack, GitHub...)
- **Sortable**: by popularity, reliability, last updated
- **Ratings & Reviews**: Community-vetted quality
- **Template Tags**: `#webhook`, `#base-class`, `#complete`
- **Compatibility**: Works with Workflows, AI-enhanced

</div>

<div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mt-4 text-sm font-bold">
💡 Browse → Fork → Customize → Deploy
</div>

</div>

<div>

## **Extensible Patterns** 🧩

<div class="mt-8">

````md magic-move {lines: true}
```typescript
// Extend popular base classes
import { SlackBaseAdapter } from '@marketplace/slack-base';

export class MySlackAdapter extends SlackBaseAdapter {
  async transform(webhook) {
    const base = await super.transform(webhook);

    // Add your company-specific logic
    return {
      ...base,
      priority: this.calculatePriority(webhook),
      tags: await this.enrichWithCRM(webhook.user)
    };
  }
}
```

```typescript
// Mix and match capabilities
import {
  SlackTransformer,
  NotionPublisher,
  RetryMixin
} from '@marketplace/common-patterns';

export default compose(
  SlackTransformer,
  NotionPublisher,
  RetryMixin({ maxAttempts: 5 })
);
```

```typescript
// Popular marketplace templates
const trending = [
  // Write to Database
  '@marketplace/webhook-to-database',
  // Slack/Teams → Jira
  '@marketplace/chat-to-ticketing',
  // Stripe → everywhere
  '@marketplace/payment-notifications',
  // GitHub → Slack/Teams
  '@marketplace/ci-cd-alerts'
];

// One-click deploy + customize
```
````

</div>

</div>

</div>

<v-click at="2">

<div class="mt-8 text-center text-xl font-bold">
Community code + custom business logic = ❤️
</div>

</v-click>



---

# Persistent State with D1 - TODO: Level Up - Sharing state (workflows and/or D1)

<div class="mb-6">**Store response data, re-use in subsequent runs**</div>

<div class="grid grid-cols-2 gap-8">

<div>

## **State Storage** 💾

```sql
-- Store API responses for reuse
CREATE TABLE api_responses (
  id TEXT PRIMARY KEY,
  customer_id TEXT,
  source_api TEXT,
  resource_id TEXT,
  response_data JSON,
  created_at TIMESTAMP,
  expires_at TIMESTAMP
);

-- Fetch cached user data in next run
SELECT response_data
FROM api_responses
WHERE customer_id = ?
  AND source_api = 'slack'
  AND resource_id = 'user_12345'
  AND expires_at > datetime('now');
```

</div>

<div v-click>

## **Subsequent Run Benefits** 🔄

<div class="space-y-4 mt-4">

<div class="p-3 bg-blue-100 dark:bg-blue-900 rounded">
**User Profiles**: Slack user → stored in D1 → skip fetch next time
</div>

<div class="p-3 bg-green-100 dark:bg-green-900 rounded">
**Project Metadata**: GitHub repo info → cached → enriches future webhooks
</div>

<div class="p-3 bg-purple-100 dark:bg-purple-900 rounded">
**Customer Data**: Stripe customer → persisted → available immediately
</div>

<div class="p-3 bg-amber-100 dark:bg-amber-700 rounded">
**Smart Caching**: "Already fetched this user 2 minutes ago, skip API call"
</div>

</div>

</div>

</div>

---

# The No-Code Bridge

<div class="grid grid-cols-2 gap-8">

<div>

## **Visual Field Mapper** 🎨

<div class="p-4 mt-8 bg-gray-100 dark:bg-gray-800 rounded-lg">

```text
┌─────────────────┐    ┌─────────────────┐
│   Slack Event   │    │   Notion Page   │
├─────────────────┤    ├─────────────────┤
│ • user          │────│ • created_by    │
│ • text          │────│ • title         │
│ • channel       │────│ • workspace     │
│ • timestamp     │────│ • created_at    │
└─────────────────┘    └─────────────────┘

[Custom Transform] → Add prefix "[ALERT]"
[Validation] → Require non-empty title
[Enrichment] → Look up user in CRM
```

</div>

</div>

<div v-click>

## **Progressive Complexity** 🚀

<div class="space-y-4 mt-4 mt-8 text-sm">

<div class="p-3 bg-green-100 dark:bg-green-900 rounded">
<span class="font-bold">Level 1</span>: Drag & drop field mapping
</div>

<div class="p-3 bg-blue-100 dark:bg-blue-900 rounded">
<span class="font-bold">Level 2</span>: Add simple transforms (prefix, format, filter)
</div>

<div class="p-3 bg-purple-100 dark:bg-purple-900 rounded">
<span class="font-bold">Level 3</span>: Insert custom JavaScript snippets
</div>

<div class="p-3 bg-orange-100 dark:bg-orange-700 rounded">
<span class="font-bold">Level 4</span>: Export to full Worker code for advanced customization
</div>

</div>

<div class="mt-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-lg">
<div class="font-bold">The sauce:</div>
<div class="text-sm">Visual mapper generates Worker code behind the scenes</div>
</div>

</div>

</div>
