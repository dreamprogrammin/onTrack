<script setup>
import BaseButton from "@/components/BaseButton.vue"
import BaseSelect from "@/components/BaseSelect.vue"
import { BUTTON_TYPE_DANGER, PERIOD_SELECT_OPTIONS } from "@/constants.js"
import { isActivityValid } from "@/components/validator.js"
import RemainingActivitySeconds from "@/components/RemainingActivitySeconds.vue"
import { deleteActivity, updateActivity } from "@/activities.js"
import { resetTimelineItemActivities } from "@/timeline-items.js"
import BaseIcon from "@/BaseIcon.vue"
import { ICON_TRASH } from "@/icons.js"

defineProps({
 activity: { type: Object, required: true, validator: isActivityValid }
})

function resetAndDeleteActivity(activity) {
 resetTimelineItemActivities(activity)
 deleteActivity(activity)
}
</script>

<template>
 <li class="flex flex-col gap-2 p-4">
  <div class="flex items-center gap-2">
   <base-button :type="BUTTON_TYPE_DANGER" @click="resetAndDeleteActivity(activity)">
    <base-icon :name="ICON_TRASH" />
   </base-button>
   <span class="truncate text-xl">{{ activity.name }}</span>
  </div>
  <div class="flex gap-2">
   <base-select
    class="flex-grow font-mono"
    placeholder="h:mm"
    :options="PERIOD_SELECT_OPTIONS"
    :selected="activity.secondToComplete || null"
    @select="updateActivity(activity, { secondToComplete: $event || 0 })"
   />
   <RemainingActivitySeconds v-if="activity.secondToComplete" :activity="activity" />
  </div>
 </li>
</template>

<style scoped></style>
