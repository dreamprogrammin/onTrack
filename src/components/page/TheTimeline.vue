<script setup>
import TimeLine from "@/components/TimeLine.vue"
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from "@/constants.js"
import { validateTimelineItems } from "@/components/validator.js"
import { nextTick, ref, watchPostEffect } from "vue"
import { currentPage } from "@/router.js"

defineProps({
 timelineItems: {
  type: Array,
  required: true,
  validator: validateTimelineItems
 }
})

defineExpose({ scrollToHour })

const timelineItemRefs = ref([])

watchPostEffect(async () => {
 if (currentPage.value === PAGE_TIMELINE) {
  await nextTick()

  scrollToHour(null, false)
 }
})

function scrollToHour(hour = null, isSmooth = true) {
 hour ??= new Date().getHours()

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
    @scroll-to-hour="scrollToHour"
   />
  </ul>
 </div>
</template>

<style scoped></style>
