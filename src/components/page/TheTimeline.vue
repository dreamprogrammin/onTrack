<script setup>
import TimeLine from "@/components/TimeLine.vue"
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from "@/constants.js"
import {
 validateActivities,
 validateSelectOptions,
 validateTimelineItems,
 isTimelineItemValid,
 isActivityValid,
 isPageValid
} from "@/components/validator.js"
import { nextTick, ref, watchPostEffect } from "vue"

const props = defineProps({
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
 },
 currentPage: {
  type: String,
  required: true,
  validator: isPageValid
 }
})

const emit = defineEmits({
 setTimelineItemActivity(timelineItem, activity) {
  return [isTimelineItemValid(timelineItem), isActivityValid(activity)].every(Boolean)
 }
})

const timelineItemRefs = ref([])

watchPostEffect(async () => {
 if (props.currentPage === PAGE_TIMELINE) {
  await nextTick()

  scrollToCurrentTimelineItems()
 }
})

function scrollToCurrentTimelineItems() {
 const currentHours = new Date().getHours()

 if (currentHours === MIDNIGHT_HOUR) {
  document.body.scrollIntoView()
 } else {
  timelineItemRefs.value[currentHours - 1].$el.scrollIntoView()
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
    :activities="activities"
    :activities-select-options="activitiesSelectOptions"
    @select-activity="emit('setTimelineItemActivity', timelineItem, $event)"
    ref="timelineItemRefs"
   />
  </ul>
 </div>
</template>

<style scoped></style>
