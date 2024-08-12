<script setup>
import ActivityItems from "@/components/ActivityItems.vue"
import { isActivityValid, validateActivities, isNumber } from "@/components/validator.js"
import TheActivityForm from "@/components/TheActivityForm.vue"
import TheActivitiesEmptyState from "@/components/TheActivitiesEmptyState.vue"

defineProps({ activities: { type: Array, required: true, validator: validateActivities } })

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
