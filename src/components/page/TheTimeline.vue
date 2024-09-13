<script setup>
import TimeLine from "@/components/TimeLine.vue"
import {
 timelineItems,
 timelineItemsRefs,
 scrollToCurrentHour,
 stopTimelineItemsTimer
} from "@/timeline-items.js"
import { onActivated, onDeactivated } from "vue"
import TheTimelineIndicator from "@/components/TheTimelineIndicator.vue"
import { startCurrentDateTimer, stopCurrentDateTimer } from "@/time.js"

stopTimelineItemsTimer()

onActivated(() => {
 scrollToCurrentHour()
 startCurrentDateTimer()
})

onDeactivated(stopCurrentDateTimer)
</script>

<template>
 <div class="relative mt-7">
  <TheTimelineIndicator />
  <ul>
   <time-line
    v-for="timelineItem in timelineItems"
    :key="timelineItem.hour"
    :timeline-item="timelineItem"
    ref="timelineItemsRefs"
   />
  </ul>
 </div>
</template>

<style scoped></style>
