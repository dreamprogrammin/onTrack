<script setup>
import BaseButton from "@/components/BaseButton.vue"
import { ArrowPathIcon, PauseIcon, PlayIcon } from "@heroicons/vue/24/outline/index.js"
import { formatSeconds } from "@/function.js"
import {
 MILLISECONDS_IN_SECONDS,
 BUTTON_TYPE_DANGER,
 BUTTON_TYPE_SUCCESS,
 BUTTON_TYPE_WARNING
} from "@/constants.js"
import { isTimelineItemValid } from "@/components/validator.js"
import { inject, ref } from "vue"

const props = defineProps({
 timelineItem: {
  type: Object,
  required: true,
  validator: isTimelineItemValid
 }
})

const updateTimelineItemActivitySeconds = inject("updateTimelineItemActivitySeconds")

const isStartButtonDisabled = props.timelineItem.hour !== new Date().getHours()

const seconds = ref(props.timelineItem.activitySeconds)
const isRunning = ref(false)

function start() {
 isRunning.value = setInterval(() => {
  updateTimelineItemActivitySeconds(props.timelineItem, 1)
  seconds.value++
 }, MILLISECONDS_IN_SECONDS)
}
function stop() {
 clearInterval(isRunning.value)

 isRunning.value = false
}
function reset() {
 updateTimelineItemActivitySeconds(props.timelineItem, -seconds.value)
 stop()

 seconds.value = 0
}
</script>

<template>
 <div class="flex w-full gap-2">
  <base-button :type="BUTTON_TYPE_DANGER" :disabled="!seconds" @click="reset">
   <ArrowPathIcon class="h-8" />
  </base-button>
  <div class="flex flex-grow items-center rounded-sm bg-gray-100 px-2 font-mono text-3xl">
   {{ formatSeconds(seconds) }}
  </div>
  <base-button v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
   <PauseIcon class="h-8" />
  </base-button>
  <base-button v-else :type="BUTTON_TYPE_SUCCESS" :disabled="isStartButtonDisabled" @click="start">
   <PlayIcon class="h-8" />
  </base-button>
 </div>
</template>

<style scoped></style>
