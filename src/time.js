import { computed, ref } from "vue"
import {
 HUNDRED_PERCENT,
 MILLISECONDS_IN_SECONDS,
 SECONDS_IN_DAY,
 SECONDS_IN_MINUTES
} from "@/constants.js"

const date = new Date()

date.setHours(0, 0)

export const now = ref(date)

const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0))

const secondsSinceMidnight = computed(() => (now.value - midnight.value) / MILLISECONDS_IN_SECONDS)

export const secondsSinceMidnightInPercentage = computed(() => {
 return (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
})

let timer = null

export function startTimer() {
 now.value = date

 timer = setInterval(() => {
  now.value = new Date(now.value.getTime() + SECONDS_IN_MINUTES * MILLISECONDS_IN_SECONDS)
 }, MILLISECONDS_IN_SECONDS)
}

export function stopTimer() {
 clearInterval(timer)
}
