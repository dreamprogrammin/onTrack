<script setup>
import TimeLine from "@/components/TimeLine.vue"
import {
 timelineItems,
 timelineItemsRefs,
 scrollToCurrentHour,
 scrollToHour
} from "@/timeline-items.js"
import { onActivated } from "vue"

onActivated(scrollToCurrentHour)
</script>

<template>
 <div class="mt-7">
  <ul>
   <time-line
    v-for="timelineItem in timelineItems"
    :key="timelineItem.hour"
    :timeline-item="timelineItem"
    ref="timelineItemsRefs"
    @scroll-to-hour="scrollToHour(timelineItem.hour)"
   />
  </ul>
 </div>
</template>

<style scoped></style>
