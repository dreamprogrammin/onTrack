<script setup>
import TimeLine from "@/components/TimeLine.vue"
import { validateSelectOptions, validateTimelineItems } from "@/components/validator.js"

defineProps({
 timelineItems: {
  type: Array,
  required: true,
  validator: validateTimelineItems
 },

 activitiesSelectOptions: {
  type: Array,
  required: true,
  validator: validateSelectOptions
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
    :activities-select-options="activitiesSelectOptions"
   />
  </ul>
 </div>
</template>

<style scoped></style>
