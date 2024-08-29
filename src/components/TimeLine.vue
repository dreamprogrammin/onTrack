<script setup>
import BaseSelect from "@/components/BaseSelect.vue"
import TimelineHour from "@/components/TimelineHour.vue"
import { isActivityValid, isHourValid, isTimelineItemValid } from "@/components/validator.js"
import { NULLABLE_ACTIVITY } from "@/constants.js"
import TimelineStopwatch from "@/components/TimelineStopwatch.vue"
import { inject } from "vue"

defineProps({
 timelineItem: {
  required: true,
  type: Object,
  validator: isTimelineItemValid
 }
})

const activities = inject("activities")
const activitiesSelectOptions = inject("activitiesSelectOptions")

const emit = defineEmits({
 selectActivity: isActivityValid,
 scrollToHour: isHourValid
})

function selectActivities(id) {
 emit("selectActivity", findActivityById(id))
}

function findActivityById(id) {
 return activities.find((activity) => activity.id === id) || NULLABLE_ACTIVITY
}
</script>

<template>
 <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
  <timeline-hour
   :hour="timelineItem.hour"
   @click.prevent="emit('scrollToHour', timelineItem.hour)"
  />
  <base-select
   :options="activitiesSelectOptions"
   placeholder="Rest"
   :selected="timelineItem.activityId"
   @select="selectActivities"
  />
  <timeline-stopwatch :timeline-item="timelineItem" />
 </li>
</template>

<style scoped></style>
