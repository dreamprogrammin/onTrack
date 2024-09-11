import { computed, ref, watchEffect } from "vue"
import {
 HUNDRED_PERCENT,
 MILLISECONDS_IN_SECONDS,
 MINUTES_IN_HOUR,
 SECONDS_IN_DAY,
 SECONDS_IN_MINUTES
} from "@/constants.js"

function calculateSecondsSinceMidnight() {
 const now = new Date()

 return (
  SECONDS_IN_MINUTES * MINUTES_IN_HOUR * now.getHours() +
  SECONDS_IN_MINUTES * now.getMinutes() +
  now.getSeconds()
 )
}

const secondsSinceMidnight = ref(calculateSecondsSinceMidnight())

export const secondsSinceMidnightInPercentage = computed(() => {
 return (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
})
let timer = null

export function startTimer() {
 secondsSinceMidnight.value = calculateSecondsSinceMidnight()
 timer = setInterval(() => (secondsSinceMidnight.value += 5 * 60), MILLISECONDS_IN_SECONDS)
}

export function stopTimer() {
 clearInterval(timer)
}

watchEffect(() => {
 if (secondsSinceMidnight.value > SECONDS_IN_DAY) {
  secondsSinceMidnight.value = 0
 }
})
