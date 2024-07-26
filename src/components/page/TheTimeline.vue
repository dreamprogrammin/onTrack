<script setup>
import TimeLine from "@/components/TimeLine.vue"
import { validateTimelineItems } from "@/components/validator.js"

defineProps({
 timelineItems: {
  type: Array,
  required: true,
  validator: validateTimelineItems
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
   />
  </ul>
 </div>
</template>

<style scoped></style>
