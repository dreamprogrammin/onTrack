import { computed, onActivated, onDeactivated, ref, watchEffect } from "vue"
import {
 HUNDRED_PERCENT,
 MILLISECONDS_IN_SECONDS,
 MINUTES_IN_HOUR,
 SECONDS_IN_DAY,
 SECONDS_IN_MINUTES
} from "@/constants.ts"

export function useSecondsSinceMidnight() {
 const secondsSinceMidnight = ref(calculateSecondsSinceMidnight())

 let timer = null

 onActivated(() => {
  timer = setInterval(() => (secondsSinceMidnight.value += 5 * 60), MILLISECONDS_IN_SECONDS)
  secondsSinceMidnight.value = calculateSecondsSinceMidnight()
 })

 onDeactivated(() => clearInterval(timer))
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

 watchEffect(() => {
  if (secondsSinceMidnight.value > SECONDS_IN_DAY) {
   secondsSinceMidnight.value = 0
  }
 })

 return {
  calculateSecondsSinceMidnightInPercentage
 }
}
