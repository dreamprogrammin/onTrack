import {
 APP_NAME,
 MILLISECONDS_IN_SECONDS,
 SECONDS_IN_HOUR,
 SECONDS_IN_MINUTES
} from "@/constants.js"
import { isToday, today } from "@/time.js"
import { timelineItems } from "@/timeline-items.js"
import { activities } from "@/activities.js"

export function loadState() {
 const serializedState = localStorage.getItem(APP_NAME)
 const state = serializedState ? JSON.parse(serializedState) : {}

 activities.value = state.activities || activities.value
 const lastActiveAt = new Date(state.lastActiveAt)

 timelineItems.value = isToday(lastActiveAt)
  ? syncIdleSeconds(state.timelineItems, lastActiveAt)
  : timelineItems.value

 console.log(isToday(lastActiveAt))
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

function syncIdleSeconds(timelineItems, lastActiveAt) {
 const activeTimelineItem = timelineItems.find(({ isActive }) => isActive)
 console.log(activeTimelineItem)
 if (activeTimelineItem) {
  activeTimelineItem.activitySeconds += (today() - lastActiveAt) / MILLISECONDS_IN_SECONDS
 }
 return timelineItems
}

function calculateSyncIdleSeconds(lastActiveAt) {
 let idleMilliSeconds = today() - lastActiveAt

 if (lastActiveAt.getHours() !== today().getHours()) {
  idleMilliSeconds = getEndOfIdleHour(lastActiveAt) - lastActiveAt
 }

 return idleMilliSeconds / MILLISECONDS_IN_SECONDS
}

function getEndOfIdleHour(lastActiveAt) {
 const endOfIdleHour = new Date(lastActiveAt)

 endOfIdleHour.setTime(endOfIdleHour.getHours() + SECONDS_IN_HOUR * MILLISECONDS_IN_SECONDS)

 endOfIdleHour.setMinutes(0, 0, 0)

 return endOfIdleHour
}
