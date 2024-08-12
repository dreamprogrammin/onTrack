<script setup>
import TimeLine from "@/components/TimeLine.vue"
import {
 validateActivities,
 validateSelectOptions,
 validateTimelineItems,
 isTimelineItemValid,
 isActivityValid,
 isNull
} from "@/components/validator.js"

defineProps({
 timelineItems: {
  type: Array,
  required: true,
  validator: validateTimelineItems
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
 setTimelineItemActivity({ timelineItem, activity }) {
  return [isTimelineItemValid(timelineItem), isNull(activity), isActivityValid(activity)].every(
   Boolean
  )
 }
})
</script>

<template>
 <div class="mt-7">
  <ul>
   <time-line
    v-for="timelineItem in timelineItems"
    :key="timelineItem.hour"
    :timeline-item="timelineItem"
    :activities="activities"
    :activities-select-options="activitiesSelectOptions"
    @select-activity="emit('setTimelineItemActivity', { timelineItem, activity: $event })"
   />
  </ul>
 </div>
</template>

<style scoped></style>
