import { HOUR_IN_DAY, MIDNIGHT_HOUR, PAGE_TIMELINE, SECONDS_IN_HOUR } from "@/constants.js"
import { isPageValid } from "@/components/validator.js"

export const normalizePagesHash = () => {
 const page = window.location.hash.slice(1)

 if (isPageValid(page)) return page

 window.location.hash = PAGE_TIMELINE

 return PAGE_TIMELINE
}

export function generateActivities() {
 return [
  {
   id: id(),
   name: "Reading",
   secondToComplete: 0 * SECONDS_IN_HOUR
  },
  {
   id: id(),
   name: "Coding",
   secondToComplete: 1 * SECONDS_IN_HOUR
  },
  {
   id: id(),
   name: "Training",
   secondToComplete: 2 * SECONDS_IN_HOUR
  }
 ]
}

export function id() {
 return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export function generateTimelineItems() {
 const timelineItems = []

 for (let hour = MIDNIGHT_HOUR; hour < HOUR_IN_DAY; hour++) {
  timelineItems.push({ hour })
 }

 return timelineItems
}

export function generateActivitiesSelectOptions(activities) {
 return activities.map((activity) => ({ value: activity.id, label: activity.name }))
}
