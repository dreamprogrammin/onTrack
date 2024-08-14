import {
 HOUR_IN_DAY,
 MIDNIGHT_HOUR,
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

export function generateTimelineItems() {
 const timelineItems = []

 for (let hour = MIDNIGHT_HOUR; hour < HOUR_IN_DAY; hour++) {
  timelineItems.push({
   hour,
   activityId: null
  })
 }

 return timelineItems
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
