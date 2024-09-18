<script setup lang="ts">
import ActivityItems from "@/components/ActivityItems.vue"
import { activities } from "@/activities"
import TheActivityForm from "@/components/TheActivityForm.vue"
import TheActivitiesEmptyState from "@/components/TheActivitiesEmptyState.vue"
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
