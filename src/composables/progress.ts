import { computed, ComputedRef } from "vue"
import { calculateActivityCompletionPercentage } from "@/activities"
import { calculateTrackedActivitySeconds, timelineItems } from "@/timeline-items"
import { getProgressColorClass } from "@/function"
import type  { Activity, ProgressColorClass } from "@/types"

export function useProgress(activity :Activity): {
 colorClass: ComputedRef<ProgressColorClass>
 percentage: ComputedRef<number>
 trackedActivitySeconds: ComputedRef<number>
} {
 const colorClass = computed(():ProgressColorClass => getProgressColorClass(percentage.value))

 const percentage = computed(():number =>
  calculateActivityCompletionPercentage(activity, trackedActivitySeconds.value)
 )

 const trackedActivitySeconds = computed(():number =>
  calculateTrackedActivitySeconds(timelineItems.value, activity)
 )

 return {
  trackedActivitySeconds,
  percentage,
  colorClass
 }
}
