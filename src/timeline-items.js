import { ref } from "vue"
import { activities } from "@/activities.js"
import { HOUR_IN_DAY } from "@/constants.js"

export const timelineItems = ref(generateTimelineItems(activities.value))

export function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
 timelineItem.activitySeconds = activitySeconds
}

export function updateTimelineItems(timelineItems, fields) {
 return Object.assign(timelineItems, fields)
}

export function getTotalActivitySeconds(activity) {
 return timelineItems.value
  .filter((timelineItem) => hasActivity(timelineItem, activity))
  .reduce((totalSecond, timelineItem) => Math.round(timelineItem.activitySeconds + totalSecond), 0)
}

export function resetTimelineItemActivities(activity) {
 timelineItems.value
  .filter((timelineItem) => hasActivity(timelineItem, activity))
  .forEach((timelineItem) =>
   updateTimelineItems(timelineItem, { activityId: null, activitySeconds: 0 })
  )
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

function hasActivity(timelineItem, activity) {
 return timelineItem.activityId === activity.id
}
