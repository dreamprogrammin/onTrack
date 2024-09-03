<script setup>
import BaseButton from "@/components/BaseButton.vue"
import BaseSelect from "@/components/BaseSelect.vue"
import { TrashIcon } from "@heroicons/vue/24/outline/index.js"
import { BUTTON_TYPE_DANGER } from "@/constants.js"
import { isActivityValid } from "@/components/validator.js"
import ActivitySecondsToComplete from "@/components/ActivitySecondsToComplete.vue"
import { inject } from "vue"

defineProps({
 activity: { type: Object, required: true, validator: isActivityValid }
})

const periodSelectOptions = inject("periodSelectOptions")
const setActivitySecondToComplete = inject("setActivitySecondToComplete")
const deleteActivity = inject("deleteActivity")
</script>

<template>
 <li class="flex flex-col gap-2 p-4">
  <div class="flex items-center gap-2">
   <base-button :type="BUTTON_TYPE_DANGER" @click="deleteActivity(activity)">
    <TrashIcon class="h-8" />
   </base-button>
   <span class="truncate text-xl">{{ activity.name }}</span>
  </div>
  <div class="flex gap-2">
   <base-select
    class="flex-grow font-mono"
    placeholder="h:mm"
    :options="periodSelectOptions"
    :selected="activity.secondToComplete || null"
    @select="setActivitySecondToComplete(activity, $event || 0)"
   />
   <activity-seconds-to-complete v-if="activity.secondToComplete" :activity="activity" />
  </div>
 </li>
</template>

<style scoped></style>
