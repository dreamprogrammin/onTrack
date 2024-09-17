import  { APP_NAME } from "@/constants"
import { today } from "@/time.js"
import { activeTimelineItems, timelineItems, initializeTimelineItems } from "@/timeline-items.js"
import { activities, initializeActivities } from "@/activities"
import { startTimelineItemTimer, stopTimelineItemTimer } from "@/timeline-item-timer.js"
import { State } from "@/types"

export function syncState(shouldSLoad = true) {
 shouldSLoad ? loadState() : saveState()

 if (activeTimelineItems.value) {
  shouldSLoad ? startTimelineItemTimer() : stopTimelineItemTimer()
 }
}

export function loadState():void {
 const state = loadFromLocalStorage()

 initializeActivities(state)

 initializeTimelineItems(state)
}

export function saveState():void {
 localStorage.setItem(
  APP_NAME,
  JSON.stringify({
   activities: activities.value,
   timelineItems: timelineItems.value,
   lastActiveAt: today()
  })
 )
}

function loadFromLocalStorage():State {
 return JSON.parse(localStorage.getItem(APP_NAME) ?? "{}")
}
