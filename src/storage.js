import { APP_NAME, MILLISECONDS_IN_SECONDS } from "@/constants.js"
import { endOfHour, isToday, today, toSeconds } from "@/time.js"
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
  activeTimelineItem.activitySeconds +=
   calculateSyncIdleSeconds(lastActiveAt) / MILLISECONDS_IN_SECONDS
 }
 return timelineItems
}

function calculateSyncIdleSeconds(lastActiveAt) {
 return lastActiveAt.getHours() === today().getHours()
  ? toSeconds(today() - lastActiveAt)
  : toSeconds(endOfHour(lastActiveAt) - lastActiveAt)
}
