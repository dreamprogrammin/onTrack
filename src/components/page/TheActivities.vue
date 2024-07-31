<script setup>
import ActivityItems from "@/components/ActivityItems.vue"
import { isActivityValid, validateActivities } from "@/components/validator.js"
import TheActivityForm from "@/components/TheActivityForm.vue"

defineProps({ activities: { type: Array, required: true, validator: validateActivities } })

const emit = defineEmits({
 createActivity: isActivityValid,
 deleteActivity: isActivityValid
})
</script>

<template>
 <div>
  <ul class="divide-y">
   <activity-items
    v-for="activity in activities"
    :key="activity"
    :activity="activity"
    @delete="emit('deleteActivity', activity)"
   />
  </ul>
  <the-activity-form @submit="emit('createActivity', $event)" />
 </div>
</template>

<style scoped></style>
