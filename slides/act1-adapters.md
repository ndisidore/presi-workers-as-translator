---
layout: center
class: text-center bg-gradient-to-br from-amber-600 to-fuchsia-400
---

# Act I

## Adapt(er) and Overcome

_Local in-application adapter patterns_

<!-- speaker:
"Act One: Adapt(er) and Overcome."
We're going to look at how most teams start solving integration problems — with code inside their applications.
Tone: Educational, relatable — this is the familiar path most engineers take.
Transition: "Let's start with the classic approach..."
-->

---

# The Classic Approach: In-Application Adapters

<div class="text-lg mb-8 font-bold">Cloudflare's Alert Notification Service</div>

```go {all|1-3|5-8|all}
type NotificationDeliverer interface {
    Send(ctx context.Context, recipient string, body string, metadata map[string]string) error
}

var _ NotificationDeliverer = (*Sendgrid)(nil)
var _ NotificationDeliverer = (*Slack)(nil)
var _ NotificationDeliverer = (*PagerDuty)(nil)
// ... and 47 more
```

<v-click at="1">

<p><tabler-circle-check class="inline-block text-green-500" /> <span class="font-bold">Clean abstraction</span> - One interface to rule them all</p>

</v-click>

<v-click at="2">

<p><tabler-circle-check class="inline-block text-green-500" /> <span class="font-bold">Type safety</span> - Compile-time guarantees</p>

</v-click>

<v-click at="3">

<p><tabler-circle-x class="inline-block text-red-500" /> <span class="font-bold">But then reality hits...</span></p>

</v-click>

<!-- speaker:
"This is what every engineering team does first — and for good reason. It's clean, it's type-safe, it works."
"I actually took this from Cloudflare's real codebase. We have 47 different notification channels in our alert system."
"When you're at 3 integrations, this feels like the right abstraction. When you hit 10, you start to question it. At 47..."
Pause and smile: "But then reality hits..."
"Your binary size balloons. Every new integration requires a full redeploy. And you start carrying around dependencies you don't even use."
Tone: Empathy — we've all been here. This isn't wrong, it's just insufficient at scale.
Transition: "So naturally, you add infrastructure to scale it out..."
-->

---

# You get a queue, and you get a queue, and you...

<script setup>
const queueDiagram = `
dispatch: {
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
deliverer_x_queues: {
  style.multiple: true
  label: 'Deliverer X Queue'
  shape: queue
}
slack_consumer: {
  style.multiple: true
  label: 'Slack Consumer'
  shape: rectangle
}
sendgrid_consumer: {
  style.multiple: true
  label: 'SendGrid Consumer'
  shape: rectangle
}
pagerduty_consumer: {
  style.multiple: true
  label: 'PagerDuty Consumer'
  shape: rectangle
}
deliverer_x_consumers: {
  style.multiple: true
  label: 'Deliverer X Consumer'
  shape: rectangle
}

dispatch -> router
router -> slack_queue
router -> sendgrid_queue
router -> pagerduty_queue
router -> deliverer_x_queues
slack_queue -> slack_consumer
sendgrid_queue -> sendgrid_consumer
pagerduty_queue -> pagerduty_consumer
deliverer_x_queues -> deliverer_x_consumers

scenarios: {
  one_consumer: {
    slack_consumer.style.multiple: false
    sendgrid_consumer.style.multiple: false
    pagerduty_consumer.style.multiple: false
    deliverer_x_consumers.style.multiple: false
    (slack_queue -> slack_consumer)[0].style.stroke-width: 1
    (sendgrid_queue -> sendgrid_consumer)[0].style.stroke-width: 1
    (pagerduty_queue -> pagerduty_consumer)[0].style.stroke-width: 1
    (deliverer_x_queues -> deliverer_x_consumers)[0].style.stroke-width: 1
  }

  more_consumers: {
    slack_consumer.style: {
      multiple: true
      stroke-width: 2
    }
    sendgrid_consumer.style: {
      multiple: true
      stroke-width: 2
    }
    pagerduty_consumer.style: {
      multiple: true
      stroke-width: 2
    }
    deliverer_x_consumers.style: {
      multiple: true
      stroke-width: 2
    }
    (slack_queue -> slack_consumer)[0].style.stroke-width: 2
    (sendgrid_queue -> sendgrid_consumer)[0].style.stroke-width: 2
    (pagerduty_queue -> pagerduty_consumer)[0].style.stroke-width: 2
    (deliverer_x_queues -> deliverer_x_consumers)[0].style.stroke-width: 2
  }

  even_more: {
    slack_consumer.style: {
      multiple: true
      stroke-width: 3
    }
    sendgrid_consumer.style: {
      multiple: true
      stroke-width: 3
    }
    pagerduty_consumer.style: {
      multiple: true
      stroke-width: 3
    }
    deliverer_x_consumers.style: {
      multiple: true
      stroke-width: 3
    }
    (slack_queue -> slack_consumer)[0].style.stroke-width: 3
    (sendgrid_queue -> sendgrid_consumer)[0].style.stroke-width: 3
    (pagerduty_queue -> pagerduty_consumer)[0].style.stroke-width: 3
    (deliverer_x_queues -> deliverer_x_consumers)[0].style.stroke-width: 3
  }

  maximum_scale: {
    slack_consumer.style: {
      multiple: true
      stroke-width: 4
    }
    sendgrid_consumer.style: {
      multiple: true
      stroke-width: 4
    }
    pagerduty_consumer.style: {
      multiple: true
      stroke-width: 4
    }
    deliverer_x_consumers.style: {
      multiple: true
      stroke-width: 4
    }
    (slack_queue -> slack_consumer)[0].style.stroke-width: 4
    (sendgrid_queue -> sendgrid_consumer)[0].style.stroke-width: 4
    (pagerduty_queue -> pagerduty_consumer)[0].style.stroke-width: 4
    (deliverer_x_queues -> deliverer_x_consumers)[0].style.stroke-width: 4
    router.style: {
      fill: '#F59E0B'
      stroke: '#D97706'
      stroke-width: 3
    }
  }
}
`
</script>

<div class="mt-6 space-y-3">

<D2Diagram
  :code="queueDiagram"
  class="mx-auto"
  :scale="0.6"
  :target="'*'"
  :animateInterval="2500"
/>
<div class="mt-2 font-mono text-center text-xs"><span class="text-amber-200">Distributed system:</span> fan out and improve durability via discrete consumers</div>

</div>

<!-- speaker:
"Phase 2 is the distributed systems phase. You add Kafka because someone read a blog post about how Netflix does it."
Point to diagram: "Now you've got discrete consumers, independent scaling, proper failure isolation."
"And it works! You can scale each integration independently. Slack is getting hammered? Spin up more Slack consumers."
"But here's what the blog post didn't tell you..."
Tone: Building complexity, hinting at the cost that's coming.
Transition: "Let me show you the infrastructure tax..."
-->

---

# The Infrastructure Tax

<div class="grid grid-cols-2 gap-8 mt-8">

<div class="p-6 bg-slate-100 dark:bg-slate-700 rounded-lg">

## <tabler-circle-check class="inline-block text-green-500" /> **Benefits**

- **Durability**: Messages survive failures
- **Scalability**: Independent consumer scaling
- **Isolation**: One failure doesn't break all

</div>

<div class="p-6 bg-neutral-100 dark:bg-neutral-700 rounded-lg">

## <tabler-circle-x class="inline-block text-red-500" /> **Limitations**

- **Heavy**: Kafka clusters, consumer groups, monitoring
- **Complex**: Network partitions, rebalancing, offset management
- **Deployment**: Any changes = re-rollout

</div>

</div>

<v-click>

<div class="text-center mt-8">
<div class="text-lg font-semibold mb-2"><tabler-bulb class="inline-block text-amber-500" /> The Realization</div>
"We built a Ferrari to deliver pizza."
</div>

</v-click>

<!-- speaker:
"On the left, you've got all the benefits. Durability, scalability, isolation. This is what the architecture review approved."
"On the right... this is what your ops team actually has to manage."
"You've got 3 engineers just keeping Kafka healthy. Consumer group rebalancing becomes a Friday afternoon incident. And when you need to change ONE adapter? Full redeployment of the consumer fleet."
Read the realization slowly: "We built a Ferrari... to deliver pizza."
Wait for the recognition to hit. "The infrastructure cost more than the problem it solved."
Tone: Rueful humor — we've all over-engineered something.
Transition: "There has to be a simpler way. What if the adapter logic didn't live in your application at all?"
-->
