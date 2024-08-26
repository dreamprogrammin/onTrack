import {
 HOUR_IN_DAY,
 MINUTES_IN_HOUR,
 PAGE_TIMELINE,
 SECONDS_IN_HOUR,
 SECONDS_IN_MINUTES
} from "@/constants.js"
import { isNull, isPageValid } from "@/components/validator.js"

export const normalizePagesHash = () => {
 const page = window.location.hash.slice(1)

 if (isPageValid(page)) return page

 window.location.hash = PAGE_TIMELINE

 return PAGE_TIMELINE
}

export function generateActivities() {
 return ["Reading", "Coding", "Training"].map((name, hour) => ({
  id: id(),
  name,
  secondToComplete: hour * SECONDS_IN_HOUR
 }))
}

export function id() {
 return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export function generateTimelineItems(activities) {
 return [...Array(HOUR_IN_DAY).keys()].map((hour) => ({
  hour,
  activityId: hour % 4 === 0 ? null : activities[hour % 2].id,
  activitySeconds: hour % 4 === 0 ? 0 : (15 * SECONDS_IN_MINUTES * hour) % SECONDS_IN_HOUR
 }))
}

export function normalizeSelectValue(value) {
 return isNull(value) || isNaN(value) ? value : +value
}

export function generateActivitiesSelectOptions(activities) {
 return activities.map((activity) => ({ value: activity.id, label: activity.name }))
}

export function generatePeriodSelectOptions(periodsInMinutes) {
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
