<script setup>
import ProgressItems from "@/components/ProgressItems.vue"
import { trackActivities } from "@/activities.ts"
import TheProgressEmptyState from "@/components/TheProgressEmptyState.vue"
</script>

<template>
 <ul v-if="trackActivities.length" class="divide-y">
  <progress-items v-for="activity of trackActivities" :key="activity.id" :activity="activity" />
 </ul>
 <TheProgressEmptyState v-else />
</template>

<style scoped></style>
