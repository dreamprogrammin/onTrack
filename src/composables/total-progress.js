import { computed } from "vue"
import { calculateCompletionPercentage, trackActivities } from "@/activities.ts"
import { calculateTrackedActivitySeconds, timelineItems } from "@/timeline-items.ts"
import { getProgressColorClass } from "@/function.ts"

export function useTotalProgress() {
 const colorClass = computed(() => getProgressColorClass(percentage.value))

 const percentage = computed(() => calculateCompletionPercentage(totalTrackedSeconds.value))

 const totalTrackedSeconds = computed(() => {
  return trackActivities.value
   .map((activity) =>
    Math.min(
     calculateTrackedActivitySeconds(timelineItems.value, activity),
     activity.secondToComplete
    )
   )
   .reduce((total, seconds) => total + seconds, 0)
 })

 return {
  percentage,
  colorClass
 }
}
