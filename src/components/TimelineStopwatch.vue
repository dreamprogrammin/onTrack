<script setup>
import BaseButton from "@/components/BaseButton.vue"
import { formatSeconds } from "@/function.js"
import { BUTTON_TYPE_DANGER, BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING } from "@/constants.js"
import { isTimelineItemValid } from "@/components/validator.js"
import BaseIcon from "@/BaseIcon.vue"
import { ICON_ARROW_PATCH, ICON_PAUSE, ICON_PLAY } from "@/icons.js"
import {
 resetTimelineItemTimer,
 startTimelineItemTimer,
 stopTimelineItemTimer
} from "@/timeline-item-timer.js"
import { now } from "@/time.js"
import { activeTimelineItems } from "@/timeline-items.js"

defineProps({
 timelineItem: {
  type: Object,
  required: true,
  validator: isTimelineItemValid
 }
})
</script>

<template>
 <div class="flex w-full gap-2">
  <BaseButton
   :type="BUTTON_TYPE_DANGER"
   :disabled="!timelineItem.activitySeconds"
   @click="resetTimelineItemTimer(timelineItem)"
  >
   <base-icon :name="ICON_ARROW_PATCH" />
  </BaseButton>
  <div class="flex flex-grow items-center rounded-sm bg-gray-100 px-2 font-mono text-3xl">
   {{ formatSeconds(timelineItem.activitySeconds) }}
  </div>
  <base-button
   v-if="timelineItem === activeTimelineItems"
   :type="BUTTON_TYPE_WARNING"
   @click="stopTimelineItemTimer"
  >
   <BaseIcon :name="ICON_PAUSE" />
  </base-button>
  <BaseButton
   v-else
   :type="BUTTON_TYPE_SUCCESS"
   :disabled="timelineItem.hour !== now.getHours()"
   @click="startTimelineItemTimer(timelineItem)"
  >
   <BaseIcon :name="ICON_PLAY" />
  </BaseButton>
 </div>
</template>

<style scoped></style>
