import { ref } from "vue"
import { MILLISECONDS_IN_SECONDS } from "./constants"
import { activeTimelineItems, updateTimelineItems } from "./timeline-items"
import type { TimelineItem } from "@/types"

const timelineItemTimer = ref<number | undefined>()

export function startTimelineItemTimer(timelineItem?: TimelineItem): void {
 timelineItem = timelineItem ?? activeTimelineItems.value

 updateTimelineItems(timelineItem as any, { isActive: true })

 timelineItemTimer.value = setInterval((): void => {
  updateTimelineItems(timelineItem as any, {
   activitySeconds: (timelineItem as any).activitySeconds + 1
  })
 }, MILLISECONDS_IN_SECONDS)
}


export function stopTimelineItemTimer():void {
 updateTimelineItems(activeTimelineItems.value as any, { isActive: false })

 clearInterval(timelineItemTimer.value)

 timelineItemTimer.value = undefined
}

export function resetTimelineItemTimer(timelineItem:TimelineItem):void {
 updateTimelineItems(timelineItem, { activitySeconds: 0 })

 if (activeTimelineItems.value) {
  stopTimelineItemTimer()
 }
}
