import { APP_NAME } from "@/constants.js"
import { today } from "@/time.js"
import { activeTimelineItems, timelineItems, initializeTimelineItems } from "@/timeline-items.js"
import { activities, initializeActivities } from "@/activities.js"
import { startTimelineItemTimer, stopTimelineItemTimer } from "@/timeline-item-timer.js"

export function syncState(shouldSLoad = true) {
 shouldSLoad ? loadState() : saveState()

 if (activeTimelineItems.value) {
  shouldSLoad ? startTimelineItemTimer() : stopTimelineItemTimer()
 }
}

export function loadState() {
 const state = loadFromLocalStorage()

 initializeActivities(state)

 initializeTimelineItems(state)
}

export function saveState() {
 localStorage.setItem(
  APP_NAME,
  JSON.stringify({
   activities: activities.value,
   timelineItems: timelineItems.value,
   lastActiveAt: today()
  })
 )
}

function loadFromLocalStorage() {
 return JSON.parse(localStorage.getItem(APP_NAME) ?? "{}")
}
