import { ref } from "vue"
import { MILLISECONDS_IN_SECONDS } from "./constants"
import { activeTimelineItems, updateTimelineItems } from "./timeline-items"

const timelineItemTimer = ref(false)

export function startTimelineItemTimer(timelineItem) {
 timelineItem = timelineItem ?? activeTimelineItems.value

 updateTimelineItems(timelineItem, { isActive: true })

 timelineItemTimer.value = setInterval(() => {
  updateTimelineItems(timelineItem, {
   activitySeconds: timelineItem.activitySeconds + 1
  })
 }, MILLISECONDS_IN_SECONDS)
}

export function stopTimelineItemTimer() {
 updateTimelineItems(activeTimelineItems.value, { isActive: false })

 clearInterval(timelineItemTimer.value)

 timelineItemTimer.value = false
}

export function resetTimelineItemTimer(timelineItem) {
 updateTimelineItems(timelineItem, { activitySeconds: 0 })

 if (activeTimelineItems.value) {
  stopTimelineItemTimer()
 }
}
