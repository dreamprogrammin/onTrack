<script setup lang="ts">
import TimeLine from "@/components/TimeLine.vue"
import { timelineItems, timelineItemsRefs, scrollToCurrentHour } from "@/timeline-items"
import { onActivated } from "vue"
import TheTimelineIndicator from "@/components/TheTimelineIndicator.vue"

onActivated(scrollToCurrentHour)
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
