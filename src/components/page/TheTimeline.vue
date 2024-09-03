<script setup>
import TimeLine from "@/components/TimeLine.vue"
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from "@/constants.js"
import { validateTimelineItems, isPageValid } from "@/components/validator.js"
import { nextTick, ref, watchPostEffect } from "vue"

const props = defineProps({
 timelineItems: {
  type: Array,
  required: true,
  validator: validateTimelineItems
 },
 currentPage: {
  type: String,
  required: true,
  validator: isPageValid
 }
})

defineExpose({ scrollToHour })

const timelineItemRefs = ref([])

watchPostEffect(async () => {
 if (props.currentPage === PAGE_TIMELINE) {
  await nextTick()

  scrollToHour(null, false)
 }
})

function scrollToHour(hour = null, isSmooth = true) {
 const options = { behavior: isSmooth ? "smooth" : "instant" }
 hour ??= new Date().getHours()
 if (hour === MIDNIGHT_HOUR) {
  document.body.scrollIntoView(options)
 } else {
  timelineItemRefs.value[hour - 1].$el.scrollIntoView(options)
 }
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
