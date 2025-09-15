---
layout: center
class: text-center
---

# Act I

## Adapt(er) and Overcome

_The story of in-application adapter patterns_

---

# The Classic Approach: In-Application Adapters

<div class="text-lg mb-8">**Story: Cloudflare's Alert Notification Service**</div>

```go {1-3|5-8|all}
type NotificationDeliverer interface {
    Send(ctx context.Context, recipient string, body string, metadata map[string]string) error
}

var _ NotificationDeliverer = (*Sendgrid)(nil)
var _ NotificationDeliverer = (*Slack)(nil)
var _ NotificationDeliverer = (*PagerDuty)(nil)
// ... and 47 more
```

<v-click at="1">

✅ **Clean abstraction** - One interface to rule them all

</v-click>

<v-click at="2">

✅ **Type safety** - Compile-time guarantees

</v-click>

<v-click at="3">

⛔ **But then reality hits...**

</v-click>

<!--
Start with the familiar - this is what most developers do first
-->

---

# Phase 2: Kafka and Queues, Oh My!

<div class="mb-8">**Fan out and improve durability via discrete consumers**</div>

<script setup>
const queueDiagram = `
webhook: {
  shape: hexagon
  style: {
    fill: '#4A90E2'
  }
}
router: {
  shape: diamond
  style: {
    fill: '#F5A623'
  }
}
slack_queue: {
  label: 'Slack Queue'
  shape: queue
}
sendgrid_queue: {
  label: 'SendGrid Queue'
  shape: queue
}
pagerduty_queue: {
  label: 'PagerDuty Queue'
  shape: queue
}
slack_consumer: {
  label: 'Slack Consumer'
  shape: rectangle
}
sendgrid_consumer: {
  label: 'SendGrid Consumer'
  shape: rectangle
}
pagerduty_consumer: {
  label: 'PagerDuty Consumer'
  shape: rectangle
}

webhook -> router
router -> slack_queue
router -> sendgrid_queue
router -> pagerduty_queue
slack_queue -> slack_consumer
sendgrid_queue -> sendgrid_consumer
pagerduty_queue -> pagerduty_consumer`
</script>

<D2Diagram
  :code="queueDiagram"
  max-height="400px"
  class="mx-auto"
  :scale="0.6"
/>

---

# The Infrastructure Tax

<div class="grid grid-cols-2 gap-8 mt-8">

<div>

## ✅ **Benefits**

- **Durability**: Messages survive failures
- **Scalability**: Independent consumer scaling
- **Isolation**: One failure doesn't break all

</div>

<div>

## ⛔ **Limitations**

- **Heavy**: Kafka clusters, consumer groups, monitoring
- **Complex**: Network partitions, rebalancing, offset management
- **Deploy Story**: Full infrastructure deployment for config changes

</div>

</div>

<v-click>

<div class="mt-12 p-6 bg-orange-100 dark:bg-orange-900 rounded-lg">
<div class="text-lg font-semibold mb-2">💡 The Realization</div>
"We built a Ferrari to deliver pizza. There has to be a better way."
</div>

</v-click>

<!--
Show the natural evolution and why it becomes over-engineered
-->
