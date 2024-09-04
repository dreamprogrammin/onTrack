import { HOUR_IN_DAY, MINUTES_IN_HOUR, SECONDS_IN_HOUR, SECONDS_IN_MINUTES } from "@/constants.js"
import { isNull } from "@/components/validator.js"

export function getTotalActivitySeconds(activity, timelineItems) {
 return timelineItems
  .filter((timelineItem) => timelineItem.activityId === activity.id)
  .reduce((totalSecond, timelineItem) => Math.round(timelineItem.activitySeconds + totalSecond), 0)
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
  activityId: [0, 1, 2, 3, 4].includes(hour) ? activities[hour % 3].id : null,
  activitySeconds: [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0
  // activityId: hour % 4 === 0 ? null : activities[hour % 2].id,
  // activitySeconds: hour % 4 === 0 ? 0 : (15 * SECONDS_IN_MINUTES * hour) % SECONDS_IN_HOUR
 }))
}

export function normalizeSelectValue(value) {
 return isNull(value) || isNaN(value) ? value : +value
}

export function generateActivitiesSelectOptions(activities) {
 return activities.map((activity) => ({ value: activity.id, label: activity.name }))
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
