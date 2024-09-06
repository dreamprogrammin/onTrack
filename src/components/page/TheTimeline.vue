<script setup>
import TimeLine from "@/components/TimeLine.vue"
import { PAGE_TIMELINE } from "@/constants.js"
import {
 timelineItems,
 timelineItemsRefs,
 scrollToCurrentHour,
 scrollToHour
} from "@/timeline-items.js"
import { nextTick, watchPostEffect } from "vue"
import { currentPage } from "@/router.js"

watchPostEffect(async () => {
 if (currentPage.value === PAGE_TIMELINE) {
  await nextTick()

  scrollToCurrentHour(false)
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
    ref="timelineItemsRefs"
    @scroll-to-hour="scrollToHour(timelineItem.hour)"
   />
  </ul>
 </div>
</template>

<style scoped></style>
