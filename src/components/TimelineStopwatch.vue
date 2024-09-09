<script setup>
import BaseButton from "@/components/BaseButton.vue"
import { currentHour, formatSeconds } from "@/function.js"
import {
 MILLISECONDS_IN_SECONDS,
 BUTTON_TYPE_DANGER,
 BUTTON_TYPE_SUCCESS,
 BUTTON_TYPE_WARNING
} from "@/constants.js"
import { isTimelineItemValid } from "@/components/validator.js"
import { ref, watch } from "vue"
import { updateTimelineItems } from "@/timeline-items.js"
import BaseIcon from "@/BaseIcon.vue"
import { ICON_ARROW_PATCH, ICON_PAUSE, ICON_PLAY } from "@/icons.js"

const props = defineProps({
 timelineItem: {
  type: Object,
  required: true,
  validator: isTimelineItemValid
 }
})

const isStartButtonDisabled = props.timelineItem.hour !== currentHour()

const seconds = ref(props.timelineItem.activitySeconds)
const isRunning = ref(false)
const temp = 120

function start() {
 isRunning.value = setInterval(() => {
  updateTimelineItems(props.timelineItem, {
   activitySeconds: props.timelineItem.activitySeconds + temp
  })
  seconds.value += temp
 }, MILLISECONDS_IN_SECONDS)
}
function stop() {
 clearInterval(isRunning.value)

 isRunning.value = false
}
function reset() {
 updateTimelineItems(props.timelineItem, {
  activitySeconds: props.timelineItem.activitySeconds - seconds.value
 })
 stop()

 seconds.value = 0
}

watch(
 () => props.timelineItem.activityId,
 () => updateTimelineItems(props.timelineItem, { activitySeconds: seconds.value })
)
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
  <base-button v-else :type="BUTTON_TYPE_SUCCESS" :disabled="isStartButtonDisabled" @click="start">
   <base-icon :name="ICON_PLAY" />
  </base-button>
 </div>
</template>

<style scoped></style>
