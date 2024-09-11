<script setup>
import { computed, ref, watchEffect } from "vue"
import {
 HUNDRED_PERCENT,
 SECONDS_IN_DAY,
 SECONDS_IN_MINUTES,
 MINUTES_IN_HOUR,
 MILLISECONDS_IN_SECONDS
} from "@/constants.js"

const indicatorRef = ref()
const secondsSinceMidnight = ref(calculateSecondsSinceMidnight())

setInterval(() => (secondsSinceMidnight.value += 5 * 60), MILLISECONDS_IN_SECONDS)

const topOffset = computed(() => {
 return (calculateSecondsSinceMidnightInPercentage.value * getTimelineHeight()) / HUNDRED_PERCENT
})
const calculateSecondsSinceMidnightInPercentage = computed(() => {
 return (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
})

function calculateSecondsSinceMidnight() {
 const now = new Date()

 return (
  SECONDS_IN_MINUTES * MINUTES_IN_HOUR * now.getHours() +
  SECONDS_IN_MINUTES * now.getMinutes() +
  now.getSeconds()
 )
}
function getTimelineHeight() {
 return indicatorRef.value?.parentNode.getBoundingClientRect().height
}

watchEffect(() => {
 if (secondsSinceMidnight.value > SECONDS_IN_DAY) {
  secondsSinceMidnight.value = 0
 }
})
</script>

<template>
 <hr
  ref="indicatorRef"
  class="pointer-events-none absolute z-10 w-full border-b-2 border-red-600"
  :style="{ top: `${topOffset}px` }"
 />
</template>
