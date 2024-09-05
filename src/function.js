import { MINUTES_IN_HOUR, SECONDS_IN_MINUTES } from "@/constants.js"
import { isNull } from "@/components/validator.js"

export function currentHour() {
 return new Date().getHours()
}

export function id() {
 return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export function normalizeSelectValue(value) {
 return isNull(value) || isNaN(value) ? value : +value
}

export function generatePeriodSelectOptions() {
 const periodsInMinutes = [
  15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480
 ]

 return periodsInMinutes.map((periodsInMinutes) => ({
  value: periodsInMinutes * SECONDS_IN_MINUTES,
  label: generatePeriodSelectOptionsValue(periodsInMinutes)
 }))
}

function generatePeriodSelectOptionsValue(periodInMinutes) {
 const hour = Math.floor(periodInMinutes / MINUTES_IN_HOUR)
  .toString()
  .padStart(2, 0)
 const minute = (periodInMinutes % MINUTES_IN_HOUR).toString().padStart(2, 0)

 return `${hour}:${minute}`
}

export function formatSeconds(seconds) {
 const date = new Date()

 date.setTime(Math.abs(seconds) * 1000)

 const utc = date.toUTCString()

 return utc.substring(utc.indexOf(":") - 2, utc.indexOf(":") + 6)
}
