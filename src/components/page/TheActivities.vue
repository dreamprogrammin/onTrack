<script setup>
import ActivityItems from "@/components/ActivityItems.vue"
import {
 isActivityValid,
 validateActivities,
 isNumber,
 validateTimelineItems
} from "@/components/validator.js"
import TheActivityForm from "@/components/TheActivityForm.vue"
import TheActivitiesEmptyState from "@/components/TheActivitiesEmptyState.vue"

defineProps({
 activities: { type: Array, required: true, validator: validateActivities },
 timelineItems: {
  type: Array,
  required: true,
  validator: validateTimelineItems
 }
})

const emit = defineEmits({
 setActivitySecondToComplete(activity, secondToComplete) {
  return [isActivityValid(activity), isNumber(secondToComplete)].every(Boolean)
 },
 createActivity: isActivityValid,
 deleteActivity: isActivityValid
})

function setSecondToComplete(activity, secondToComplete) {
 emit("setActivitySecondToComplete", activity, secondToComplete)
}
</script>

<template>
 <div class="flex grow flex-col">
  <ul v-if="activities.length" class="grow divide-y">
   <activity-items
    v-for="activity in activities"
    :key="activity.id"
    :timeline-items="timelineItems"
    :activity="activity"
    @delete="emit('deleteActivity', activity)"
    @set-second-to-complete="setSecondToComplete(activity, $event)"
   />
  </ul>
  <the-activities-empty-state v-else />
  <the-activity-form @submit="emit('createActivity', $event)" />
 </div>
</template>

<style scoped></style>
