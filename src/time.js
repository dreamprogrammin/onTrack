import { computed, ref } from "vue"
import {
 HUNDRED_PERCENT,
 MILLISECONDS_IN_SECONDS,
 SECONDS_IN_DAY,
 SECONDS_IN_HOUR
} from "@/constants.js"

export function today() {
 return new Date()
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

export function startCurrentDateTimer() {
 setInterval(() => (now.value = today()), MILLISECONDS_IN_SECONDS)
}

export function endOfHour(date) {
 const endOfHour = new Date(date)

 endOfHour.setTime(endOfHour.getHours() + SECONDS_IN_HOUR * MILLISECONDS_IN_SECONDS)

 endOfHour.setMinutes(0, 0, 0)

 return endOfHour
}

export function toSeconds(milliSeconds) {
 return Math.round(milliSeconds / MILLISECONDS_IN_SECONDS)
}
