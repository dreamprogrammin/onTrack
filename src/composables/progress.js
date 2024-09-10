import { computed } from "vue"
import { calculateActivityCompletionPercentage } from "@/activities.js"
import { calculateTrackedActivitySeconds, timelineItems } from "@/timeline-items.js"
import { getProgressColorClass } from "@/function.js"

export function useProgress(activity) {
 const colorClass = computed(() => getProgressColorClass(percentage.value))

 const percentage = computed(() =>
  calculateActivityCompletionPercentage(activity, trackedActivitySeconds.value)
 )

 const trackedActivitySeconds = computed(() =>
  calculateTrackedActivitySeconds(timelineItems.value, activity)
 )

 return {
  trackedActivitySeconds,
  percentage,
  colorClass
 }
}
