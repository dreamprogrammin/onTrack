<script setup>
import BaseSelect from "@/components/BaseSelect.vue"
import { ref } from "vue"
import TimelineHour from "@/components/TimelineHour.vue"
import { isTimelineItemValid } from "@/components/validator.js"

defineProps({ timelineItem: { required: true, type: Object, validator: isTimelineItemValid } })

const options = [
 { value: 1, label: "Coding" },
 { value: 2, label: "Reading" },
 { value: 3, label: "Training" }
]

const selectedActivityId = ref(1)
</script>

<template>
 <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
  <timeline-hour :hour="timelineItem.hour" />
  <base-select
   :options="options"
   placeholder="Rest"
   :selected="selectedActivityId"
   @select="selectedActivityId = $event"
  />
 </li>
</template>

<style scoped></style>
