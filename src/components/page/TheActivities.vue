<script setup>
import ActivityItems from "@/components/ActivityItems.vue"
import { validateActivities } from "@/components/validator.js"

defineProps({ activities: { type: Array, required: true, validator: validateActivities } })
</script>

<template>
 <div>
  <ul class="divide-y">
   <activity-items v-for="activity in activities" :key="activity" :activity="activity" />
  </ul>
 </div>
</template>

<style scoped></style>
