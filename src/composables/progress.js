import { computed } from "vue"
import { calculateActivityCompletionPercentage } from "@/activities.ts"
import { calculateTrackedActivitySeconds, timelineItems } from "@/timeline-items.ts"
import { getProgressColorClass } from "@/function.ts"

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
