import { ref } from "vue"
import { HOUR_IN_DAY, MIDNIGHT_HOUR } from "@/constants.js"
import { currentHour } from "@/function.js"

export const timelineItemsRefs = ref([])
export const timelineItems = ref(generateTimelineItems(activities.value))

export function scrollToCurrentHour(isSmooth = false) {
 scrollToHour(currentHour(), isSmooth)
}

export function scrollToHour(hour, isSmooth = true) {
 const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemsRefs.value[hour - 1].$el

 el.scrollIntoView({ behavior: isSmooth ? "smooth" : "instant" })
}

export function updateTimelineItems(timelineItems, fields) {
 return Object.assign(timelineItems, fields)
}

export function calculateTrackedActivitySeconds(timelineItems, activity) {
 return filterTimelineItemsByActivity(timelineItems, activity)
  .map(({ activitySeconds }) => activitySeconds)
  .reduce((total, seconds) => Math.round(total + seconds), 0)
}

export function resetTimelineItemActivities(timelineItem, activity) {
 return filterTimelineItemsByActivity(timelineItem, activity).forEach((timelineItem) =>
  updateTimelineItems(timelineItem, {
   activityId: null,
   activitySeconds: timelineItem.hour === currentHour() ? timelineItem.activitySeconds : 0
  })
 )
}

export function generateTimelineItems() {
 return [...Array(HOUR_IN_DAY).keys()].map((hour) => ({
  hour,
  activityId: null, //[0, 1, 2, 3, 4].includes(hour) ? activities.value[hour % 3].id : null,
  activitySeconds: 0 // [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0
  // activityId: hour % 4 === 0 ? null : activities[hour % 2].id,
  // activitySeconds: hour % 4 === 0 ? 0 : (15 * SECONDS_IN_MINUTES * hour) % SECONDS_IN_HOUR
 }))
}

function filterTimelineItemsByActivity(timelineItems, { id }) {
 return timelineItems.filter(({ activityId }) => activityId === id)
}
