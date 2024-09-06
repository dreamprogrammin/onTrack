import { computed, ref } from "vue"
import { id } from "@/function.js"
import { SECONDS_IN_HOUR } from "@/constants.js"

export const activities = ref(generateActivities())
export const activitySelectOptions = computed(() =>
 generateActivitiesSelectOptions(activities.value)
)

function generateActivities() {
 return ["Reading", "Coding", "Training"].map((name, hour) => ({
  id: id(),
  name,
  secondToComplete: hour * SECONDS_IN_HOUR
 }))
}

function generateActivitiesSelectOptions(activities) {
 return activities.map((activity) => ({ value: activity.id, label: activity.name }))
}

export function updateActivity(activity, fields) {
 return Object.assign(activity, fields)
}

export function createActivity(activity) {
 activities.value.push(activity)
}

export function deleteActivity(activity) {
 activities.value.splice(activities.value.indexOf(activity), 1)
}
