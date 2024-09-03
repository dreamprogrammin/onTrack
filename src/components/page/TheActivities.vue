<script setup>
import ActivityItems from "@/components/ActivityItems.vue"
import { validateActivities } from "@/components/validator.js"
import TheActivityForm from "@/components/TheActivityForm.vue"
import TheActivitiesEmptyState from "@/components/TheActivitiesEmptyState.vue"

defineProps({
 activities: { type: Array, required: true, validator: validateActivities }
})
</script>

<template>
 <div class="flex grow flex-col">
  <ul v-if="activities.length" class="grow divide-y">
   <activity-items v-for="activity in activities" :key="activity.id" :activity="activity" />
  </ul>
  <the-activities-empty-state v-else />
  <the-activity-form />
 </div>
</template>

<style scoped></style>
