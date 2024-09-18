import { computed, ComputedRef } from "vue"
import { calculateCompletionPercentage, trackActivities } from "@/activities"
import { calculateTrackedActivitySeconds, timelineItems } from "@/timeline-items"
import { getProgressColorClass } from "@/function"
import type { ProgressColorClass } from "@/types"

export function useTotalProgress():{
 colorClass: ComputedRef<ProgressColorClass>
 percentage: ComputedRef<number>
} {
 const colorClass = computed(():ProgressColorClass => getProgressColorClass(percentage.value))

 const percentage = computed(():number => calculateCompletionPercentage(totalTrackedSeconds.value))

 const totalTrackedSeconds = computed(():number => {
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
