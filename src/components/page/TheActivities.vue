<script setup>
import ActivityItems from "@/components/ActivityItems.vue"
import { PlusIcon } from "@heroicons/vue/24/outline/index.js"
import BaseButton from "@/components/BaseButton.vue"
import { isActivityValid, validateActivities } from "@/components/validator.js"

defineProps({ activities: { type: Array, required: true, validator: validateActivities } })

const emit = defineEmits({
 createActivity: isActivityValid,
 deleteActivity: isActivityValid
})

let newActivity = ""
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
  <form
   @submit.prevent="emit('createActivity', newActivity)"
   class="sticky bottom-[57px] flex gap-2 border-t p-4"
  >
   <input
    class="w-full rounded border px-4 text-xl"
    v-model="newActivity"
    placeholder="Activity name"
    type="text"
   />
   <base-button>
    <PlusIcon class="h-8" />
   </base-button>
  </form>
 </div>
</template>

<style scoped></style>
