<script setup>
import BaseSelect from "@/components/BaseSelect.vue"
import { ref } from "vue"
import TimelineHour from "@/components/TimelineHour.vue"
import { isTimelineItemValid, validateSelectOptions } from "@/components/validator.js"

defineProps({
 timelineItem: {
  required: true,
  type: Object,
  validator: isTimelineItemValid
 },
 activitiesSelectOptions: {
  type: Array,
  required: true,
  validator: validateSelectOptions
 }
})

const selectedActivityId = ref(null)
</script>

<template>
 <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
  <timeline-hour :hour="timelineItem.hour" />
  <base-select
   :options="activitiesSelectOptions"
   placeholder="Rest"
   :selected="selectedActivityId"
   @select="selectedActivityId = $event"
  />
 </li>
</template>

<style scoped></style>
