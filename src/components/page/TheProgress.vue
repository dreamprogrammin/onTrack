<script setup>
import ProgressItems from "@/components/ProgressItems.vue"
import { trackActivities } from "@/activities.js"
</script>

<template>
 <ul class="divide-y">
  <progress-items
   v-for="(activity, index) of trackActivities"
   :key="activity.id"
   :index="index"
   :activity="activity"
  />
 </ul>
</template>

<style scoped></style>
