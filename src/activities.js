import { computed, ref } from "vue"
import { id } from "@/function.js"
import { HUNDRED_PERCENT, SECONDS_IN_HOUR } from "@/constants.js"

export const activities = ref(generateActivities())
export const activitySelectOptions = computed(() =>
 generateActivitiesSelectOptions(activities.value)
)

export const trackActivities = computed(() =>
 activities.value.filter(({ secondToComplete }) => secondToComplete)
)

export function calculateActivityCompletionPercentage({ secondToComplete }, trackedActivity) {
 return Math.floor((trackedActivity * HUNDRED_PERCENT) / secondToComplete)
}

export function calculateCompletionPercentage(totalTrackedSeconds) {
 return Math.floor((totalTrackedSeconds * HUNDRED_PERCENT) / totalActivitySecondsToComplete.value)
}

function generateActivities() {
 return ["Reading", "Coding", "Training"].map((name, hour) => ({
  id: id(),
  name,
  secondToComplete: 15 * 60 // hour * SECONDS_IN_HOUR
 }))
}

function generateActivitiesSelectOptions(activities) {
 return activities.map((activity) => ({ value: activity.id, label: activity.name }))
}

const totalActivitySecondsToComplete = computed(() => {
 return trackActivities.value
  .map(({ secondToComplete }) => secondToComplete)
  .reduce((total, seconds) => total + seconds, 0)
})
export function updateActivity(activity, fields) {
 return Object.assign(activity, fields)
}

export function createActivity(activity) {
 activities.value.push(activity)
}

export function deleteActivity(activity) {
 activities.value.splice(activities.value.indexOf(activity), 1)
}
