<script setup>
import TimeLine from "@/components/TimeLine.vue"
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from "@/constants.js"
import { timelineItems } from "@/timeline-items.js"
import { nextTick, ref, watchPostEffect } from "vue"
import { currentPage } from "@/router.js"
import { currentHour } from "@/function.js"

defineExpose({ scrollToHour })

const timelineItemRefs = ref([])

watchPostEffect(async () => {
 if (currentPage.value === PAGE_TIMELINE) {
  await nextTick()

  scrollToHour(null, false)
 }
})

function scrollToHour(hour = null, isSmooth = true) {
 hour ??= currentHour()

 const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el

 el.scrollIntoView({ behavior: isSmooth ? "smooth" : "instant" })
}
</script>

<template>
 <div class="mt-7">
  <ul>
   <time-line
    v-for="timelineItem in timelineItems"
    :key="timelineItem.hour"
    :timeline-item="timelineItem"
    ref="timelineItemRefs"
    @scroll-to-hour="scrollToHour(timelineItem.hour)"
   />
  </ul>
 </div>
</template>

<style scoped></style>
