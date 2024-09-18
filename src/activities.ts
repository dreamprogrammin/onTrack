import { computed, ref } from "vue"
import { HUNDRED_PERCENT } from "@/constants.js"
import type { Activity, SelectOptions, State } from "@/types"


export const activities = ref<Activity[]>([])
export const trackActivities = computed<Activity[]>(() =>
 activities.value.filter(({ secondToComplete }):Boolean => secondToComplete !== 0)
)

export const activitySelectOptions = computed<SelectOptions[]>(() =>
 generateActivitiesSelectOptions(activities.value)
)

export function calculateActivityCompletionPercentage({ secondToComplete }:Activity, trackedActivity:number):number {
 return Math.floor((trackedActivity * HUNDRED_PERCENT) / secondToComplete)
}

export function calculateCompletionPercentage(totalTrackedSeconds:number):number {
 return Math.floor((totalTrackedSeconds * HUNDRED_PERCENT) / totalActivitySecondsToComplete.value)
}

function generateActivitiesSelectOptions(activities:Activity[]):SelectOptions[] {
 return activities.map((activity):SelectOptions => ({ value: activity.id, label: activity.name,  }))
}

const totalActivitySecondsToComplete = computed(() => {
 return trackActivities.value
  .map(({ secondToComplete }):number => secondToComplete)
  .reduce((total, seconds) => total + seconds, 0)
})
export function updateActivity(activity: Activity, fields:Partial<Activity>) {
 return Object.assign(activity, fields)
}

export function createActivity(activity: Activity):void {
 activities.value.push(activity)
}

export function deleteActivity(activity: Activity):void {
 activities.value.splice(activities.value.indexOf(activity), 1)
}

export function initializeActivities(state :State):void {
 activities.value = state.activities || []
}
