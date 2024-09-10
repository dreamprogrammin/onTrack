import { ref, watch } from "vue"
import { updateTimelineItems } from "@/timeline-items.js"
import { MILLISECONDS_IN_SECONDS } from "@/constants.js"

export function useStopwatch(timelineItem) {
 const seconds = ref(timelineItem.activitySeconds)
 const isRunning = ref(false)
 const temp = 120

 function start() {
  isRunning.value = setInterval(() => {
   updateTimelineItems(timelineItem, {
    activitySeconds: timelineItem.activitySeconds + temp
   })
   seconds.value += temp
  }, MILLISECONDS_IN_SECONDS)
 }
 function stop() {
  clearInterval(isRunning.value)

  isRunning.value = false
 }
 function reset() {
  updateTimelineItems(timelineItem, {
   activitySeconds: timelineItem.activitySeconds - seconds.value
  })
  stop()

  seconds.value = 0
 }

 watch(
  () => timelineItem.activityId,
  () => updateTimelineItems(timelineItem, { activitySeconds: seconds.value })
 )

 return {
  start,
  stop,
  reset,
  isRunning,
  seconds
 }
}
