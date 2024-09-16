import { computed, ref, watch, watchEffect } from "vue"
import { HOUR_IN_DAY, MIDNIGHT_HOUR, MILLISECONDS_IN_SECONDS } from "@/constants.ts"
import { endOfHour, isToday, today, toSeconds, now } from "@/time.js"
import { stopTimelineItemTimer } from "@/timeline-item-timer.js"

watch(now, (after, before) => {
 if (activeTimelineItems.value && activeTimelineItems.value.hour !== after.getHours()) {
  stopTimelineItemTimer()
 }

 if (before.getHours() !== after.getHours() && after.getHours() === MIDNIGHT_HOUR) {
  resetTimelineItems()
 }
})

export const timelineItemsRefs = ref([])
export const timelineItems = ref([])

export const activeTimelineItems = computed(() =>
 timelineItems.value.find(({ isActive }) => isActive)
)

export function updateTimelineItems(timelineItems, fields) {
 return Object.assign(timelineItems, fields)
}

export function scrollToCurrentHour(isSmooth = false) {
 scrollToHour(today().getHours(), isSmooth)
}

export function scrollToHour(hour, isSmooth = true) {
 const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemsRefs.value[hour - 1].$el

 el.scrollIntoView({ behavior: isSmooth ? "smooth" : "instant" })
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
   activitySeconds: timelineItem.hour === today().getHours() ? timelineItem.activitySeconds : 0
  })
 )
}

function resetTimelineItems() {
 timelineItems.value.forEach((timelineItem) =>
  updateTimelineItems(timelineItem, {
   activitySeconds: 0,
   isActive: false
  })
 )
}

export function initializeTimelineItems(state) {
 const lastActiveAt = new Date(state.lastActiveAt)

 timelineItems.value = state.timelineItems ?? generateTimelineItems()

 if (activeTimelineItems.value && isToday(lastActiveAt)) {
  syncIdleSeconds(lastActiveAt)
 } else if (state.timelineItems) {
  resetTimelineItems()
 }
}

function syncIdleSeconds(lastActiveAt) {
 updateTimelineItems(activeTimelineItems.value, {
  activitySeconds: activeTimelineItems.value.activitySeconds + calculateIdleSeconds(lastActiveAt)
 })
}

function calculateIdleSeconds(lastActiveAt) {
 return lastActiveAt.getHours() === today().getHours()
  ? toSeconds(today() - lastActiveAt)
  : toSeconds(endOfHour(lastActiveAt) - lastActiveAt)
}

function generateTimelineItems() {
 return [...Array(HOUR_IN_DAY).keys()].map((hour) => ({
  hour,
  activityId: null,
  activitySeconds: 0,
  isActive: false
 }))
}

function filterTimelineItemsByActivity(timelineItems, { id }) {
 return timelineItems.filter(({ activityId }) => activityId === id)
}
