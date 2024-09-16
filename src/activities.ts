import { computed, ref } from "vue"
import { HUNDRED_PERCENT } from "@/constants.js"

interface Activity {
 id: string,
 name: string,
 secondToComplete: number
}

interface ActivitySelectOption {
 value:string,
 label:string
}

export const activities = ref<Activity[]>([])
export const trackActivities = computed<Activity[]>(() =>
 activities.value.filter(({ secondToComplete }):Boolean => secondToComplete !== 0)
)

export const activitySelectOptions = computed<ActivitySelectOption[]>(() =>
 generateActivitiesSelectOptions(activities.value)
)

export function calculateActivityCompletionPercentage({ secondToComplete }:Activity, trackedActivity:number):number {
 return Math.floor((trackedActivity * HUNDRED_PERCENT) / secondToComplete)
}

export function calculateCompletionPercentage(totalTrackedSeconds:number):number {
 return Math.floor((totalTrackedSeconds * HUNDRED_PERCENT) / totalActivitySecondsToComplete.value)
}

function generateActivitiesSelectOptions(activities:Activity[]):ActivitySelectOption[] {
 return activities.map((activity):ActivitySelectOption => ({ value: activity.id, label: activity.name,  }))
}

const totalActivitySecondsToComplete = computed(() => {
 return trackActivities.value
  .map(({ secondToComplete }):number => secondToComplete)
  .reduce((total, seconds) => total + seconds, 0)
})
export function updateActivity(activity: Activity, fields:any) {
 return Object.assign(activity, fields)
}

export function createActivity(activity: Activity):void {
 activities.value.push(activity)
}

export function deleteActivity(activity) {
 activities.value.splice(activities.value.indexOf(activity), 1)
}

export function initializeActivities(state :any):void {
 activities.value = state.activities || []
}
