<script setup>
import BaseSelect from "@/components/BaseSelect.vue"
import TimelineHour from "@/components/TimelineHour.vue"
import { isHourValid, isTimelineItemValid } from "@/components/validator.js"
import TimelineStopwatch from "@/components/TimelineStopwatch.vue"
import { inject } from "vue"

defineProps({
 timelineItem: {
  required: true,
  type: Object,
  validator: isTimelineItemValid
 }
})
const activitySelectOptions = inject("activitySelectOptions")
const setTimelineItemActivity = inject("setTimelineItemActivity")

const emit = defineEmits({
 scrollToHour: isHourValid
})
</script>

<template>
 <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
  <timeline-hour
   :hour="timelineItem.hour"
   @click.prevent="emit('scrollToHour', timelineItem.hour)"
  />
  <base-select
   :options="activitySelectOptions"
   placeholder="Rest"
   :selected="timelineItem.activityId"
   @select="setTimelineItemActivity(timelineItem, $event)"
  />
  <timeline-stopwatch :timeline-item="timelineItem" />
 </li>
</template>

<style scoped></style>
