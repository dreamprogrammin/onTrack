<script setup>
import BaseButton from "@/components/BaseButton.vue"
import { currentHour, formatSeconds } from "@/function.js"
import { BUTTON_TYPE_DANGER, BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING } from "@/constants.js"
import { isTimelineItemValid } from "@/components/validator.js"
import BaseIcon from "@/BaseIcon.vue"
import { ICON_ARROW_PATCH, ICON_PAUSE, ICON_PLAY } from "@/icons.js"
import { useStopwatch } from "@/composables/stopwatch.js"

const props = defineProps({
 timelineItem: {
  type: Object,
  required: true,
  validator: isTimelineItemValid
 }
})

const { start, stop, reset, seconds, isRunning } = useStopwatch(props.timelineItem)
</script>

<template>
 <div class="flex w-full gap-2">
  <base-button :type="BUTTON_TYPE_DANGER" :disabled="!seconds" @click="reset">
   <base-icon :name="ICON_ARROW_PATCH" />
  </base-button>
  <div class="flex flex-grow items-center rounded-sm bg-gray-100 px-2 font-mono text-3xl">
   {{ formatSeconds(seconds) }}
  </div>
  <base-button v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
   <BaseIcon :name="ICON_PAUSE" />
  </base-button>
  <base-button
   v-else
   :type="BUTTON_TYPE_SUCCESS"
   :disabled="timelineItem.hour !== currentHour()"
   @click="start"
  >
   <base-icon :name="ICON_PLAY" />
  </base-button>
 </div>
</template>

<style scoped></style>
