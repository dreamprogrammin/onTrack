<script setup>
import ActivityItems from "@/components/ActivityItems.vue"
import { isActivityValid, validateActivities } from "@/components/validator.js"
import TheActivityForm from "@/components/TheActivityForm.vue"
import TheActivitiesEmptyState from "@/components/TheActivitiesEmptyState.vue"

defineProps({ activities: { type: Array, required: true, validator: validateActivities } })

const emit = defineEmits({
 createActivity: isActivityValid,
 deleteActivity: isActivityValid
})
</script>

<template>
 <div class="flex grow flex-col">
  <ul v-if="activities.length" class="grow divide-y">
   <activity-items
    v-for="activity in activities"
    :key="activity.id"
    :activity="activity"
    @delete="emit('deleteActivity', activity)"
   />
  </ul>
  <the-activities-empty-state v-else />
  <the-activity-form @submit="emit('createActivity', $event)" />
 </div>
</template>

<style scoped></style>
