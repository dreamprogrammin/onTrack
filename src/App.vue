<script setup>
import TheHeader from "@/components/TheHeader.vue"
import TheNav from "@/components/TheNav.vue"
import TheTimeline from "@/components/page/TheTimeline.vue"
import TheActivities from "@/components/page/TheActivities.vue"
import TheProgress from "@/components/page/TheProgress.vue"
import {
 generateTimelineItems,
 generateActivitiesSelectOptions,
 generateActivities,
 generatePeriodSelectOptions
} from "@/function.js"
import { PAGE_TIMELINE, PAGE_PROGRESS, PAGE_ACTIVITIES } from "@/constants.js"
import { computed, provide, ref } from "vue"
import { navigate, currentPage, timelineRef } from "@/router.js"

const activities = ref(generateActivities())

const timelineItems = ref(generateTimelineItems(activities.value))

const activitySelectOptions = computed(() => generateActivitiesSelectOptions(activities.value))

function deleteActivity(activity) {
 timelineItems.value.forEach((timelineItem) => {
  if (timelineItem.activityId === activity.id) {
   timelineItem.activityId = null
   timelineItem.activitySeconds = 0
  }
 })

 activities.value.splice(activities.value.indexOf(activity), 1)
}

function createActivity(activity) {
 activities.value.push(activity)
}

function setTimelineItemActivity(timelineItem, activityId) {
 timelineItem.activityId = activityId
}

function setActivitySecondToComplete(activity, secondToComplete) {
 activity.secondToComplete = secondToComplete
}

function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
 timelineItem.activitySeconds += activitySeconds
}

provide("updateTimelineItemActivitySeconds", updateTimelineItemActivitySeconds)
provide("timelineItems", timelineItems.value)
provide("periodSelectOptions", generatePeriodSelectOptions())
provide("setTimelineItemActivity", setTimelineItemActivity)
provide("setActivitySecondToComplete", setActivitySecondToComplete)
provide("activitySelectOptions", activitySelectOptions.value)
provide("createActivity", createActivity)
provide("deleteActivity", deleteActivity)
</script>
<template>
 <the-header @navigator="navigate" />
 <main class="flex grow flex-col">
  <the-timeline
   v-show="currentPage === PAGE_TIMELINE"
   :timeline-items="timelineItems"
   :current-page="currentPage"
   ref="timelineRef"
  />
  <the-activities v-show="currentPage === PAGE_ACTIVITIES" :activities="activities" />
  <the-progress v-show="currentPage === PAGE_PROGRESS" />
 </main>
 <the-nav :current-page="currentPage" @navigator="navigate" />
</template>
