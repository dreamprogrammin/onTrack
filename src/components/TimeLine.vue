<script setup>
import BaseSelect from "@/components/BaseSelect.vue"
import TimelineHour from "@/components/TimelineHour.vue"
import BaseButton from "@/components/BaseButton.vue"
import { ArrowPathIcon, PauseIcon, PlayIcon } from "@heroicons/vue/24/outline/index.js"
import {
 isActivityValid,
 isTimelineItemValid,
 validateActivities,
 validateSelectOptions
} from "@/components/validator.js"
import {
 BUTTON_TYPE_DANGER,
 BUTTON_TYPE_SUCCESS,
 BUTTON_TYPE_WARNING,
 NULLABLE_ACTIVITY
} from "@/constants.js"

const props = defineProps({
 timelineItem: {
  required: true,
  type: Object,
  validator: isTimelineItemValid
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
 }
})

const emit = defineEmits({
 selectActivity: isActivityValid
})

function selectActivities(id) {
 emit("selectActivity", findActivityById(id))
}

function findActivityById(id) {
 return props.activities.find((activity) => activity.id === id) || NULLABLE_ACTIVITY
}
</script>

<template>
 <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
  <timeline-hour :hour="timelineItem.hour" />
  <base-select
   :options="activitiesSelectOptions"
   placeholder="Rest"
   :selected="timelineItem.activityId"
   @select="selectActivities"
  />
  <div class="flex w-full gap-2">
   <base-button :type="BUTTON_TYPE_DANGER">
    <ArrowPathIcon class="h-8" />
   </base-button>
   <div class="flex flex-grow items-center rounded-sm bg-gray-100 px-2 font-mono text-3xl">
    00:00:00
   </div>
   <base-button :type="BUTTON_TYPE_WARNING">
    <PauseIcon class="h-8" />
   </base-button>
   <base-button :type="BUTTON_TYPE_SUCCESS">
    <PlayIcon class="h-8" />
   </base-button>
  </div>
 </li>
</template>

<style scoped></style>
