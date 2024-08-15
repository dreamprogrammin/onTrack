<script setup>
import BaseSelect from "@/components/BaseSelect.vue"
import TimelineHour from "@/components/TimelineHour.vue"
import {
 isActivityValid,
 isTimelineItemValid,
 validateActivities,
 validateSelectOptions
} from "@/components/validator.js"
import { NULLABLE_ACTIVITY } from "@/constants.js"
import TimelineStopwatch from "@/components/TimelineStopwatch.vue"

const props = defineProps({
 timelineItem: {
  required: true,
  type: Object,
  validator: isTimelineItemValid
 },
 activities: {
  type: Array,
  required: true,
  validator: validateActivities
 },
 activitiesSelectOptions: {
  type: Array,
  required: true,
  validator: validateSelectOptions
 }
})

const emit = defineEmits({
 selectActivity: isActivityValid
})

function selectActivities(id) {
 emit("selectActivity", findActivityById(id))
}

function findActivityById(id) {
 return props.activities.find((activity) => activity.id === id) || NULLABLE_ACTIVITY
}
</script>

<template>
 <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
  <timeline-hour :hour="timelineItem.hour" />
  <base-select
   :options="activitiesSelectOptions"
   placeholder="Rest"
   :selected="timelineItem.activityId"
   @select="selectActivities"
  />
  <timeline-stopwatch :seconds="timelineItem.activitySeconds" />
 </li>
</template>

<style scoped></style>
