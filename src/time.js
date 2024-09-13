import { computed, ref } from "vue"
import { HUNDRED_PERCENT, MILLISECONDS_IN_SECONDS, SECONDS_IN_DAY } from "@/constants.js"

export function today() {
 const today = new Date()

 today.setHours(0, 0)

 return today
}

export function tomorrow() {
 const tomorrow = new Date()

 tomorrow.setDate(tomorrow.getDate() + 1)

 return tomorrow
}

export function isToday(date) {
 return date.toDateString() === today().toDateString()
}

export const now = ref(today())

const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0))

const secondsSinceMidnight = computed(() => (now.value - midnight.value) / MILLISECONDS_IN_SECONDS)

export const secondsSinceMidnightInPercentage = computed(() => {
 return (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
})

let timer = null

export function startTimer() {
 now.value = today()

 timer = setInterval(() => {
  now.value = new Date(now.value.getTime() + MILLISECONDS_IN_SECONDS)
 }, MILLISECONDS_IN_SECONDS)
}

export function stopTimer() {
 clearInterval(timer)
}
