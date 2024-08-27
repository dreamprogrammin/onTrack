<script setup>
import TheHeader from "@/components/TheHeader.vue"
import TheNav from "@/components/TheNav.vue"
import TheTimeline from "@/components/page/TheTimeline.vue"
import TheActivities from "@/components/page/TheActivities.vue"
import TheProgress from "@/components/page/TheProgress.vue"
import {
 generateTimelineItems,
 normalizePagesHash,
 generateActivitiesSelectOptions,
 generateActivities
} from "@/function.js"
import { PAGE_TIMELINE, PAGE_PROGRESS, PAGE_ACTIVITIES } from "@/constants.js"
import { computed, ref } from "vue"

const activities = ref(generateActivities())

const timelineItems = ref(generateTimelineItems(activities.value))

const currentPage = ref(normalizePagesHash())

const timeline = ref()

const goTo = (page) => {
 if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
  timeline.value.scrollToHour()
 }

 if (page !== PAGE_TIMELINE) {
  document.body.scrollIntoView()
 }
 currentPage.value = page
}

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

function setTimelineItemActivity(timelineItem, activity) {
 timelineItem.activityId = activity.id
}

function setActivitySecondToComplete(activity, secondToComplete) {
 activity.secondToComplete = secondToComplete
}

const activitiesSelectOptions = computed(() => generateActivitiesSelectOptions(activities.value))
</script>
<template>
 <the-header @navigator="goTo($event)" />
 <main class="flex grow flex-col">
  <the-timeline
   v-show="currentPage === PAGE_TIMELINE"
   :timeline-items="timelineItems"
   :activities="activities"
   :activities-select-options="activitiesSelectOptions"
   @set-timeline-item-activity="setTimelineItemActivity"
   :current-page="currentPage"
   ref="timeline"
  />
  <the-activities
   v-show="currentPage === PAGE_ACTIVITIES"
   :activities="activities"
   @create-activity="createActivity"
   @delete-activity="deleteActivity"
   @set-activity-second-to-complete="setActivitySecondToComplete"
  />
  <the-progress v-show="currentPage === PAGE_PROGRESS" />
 </main>
 <the-nav :current-page="currentPage" @navigator="goTo($event)" />
</template>
