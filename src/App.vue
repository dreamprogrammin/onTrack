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
 generateActivities,
 id
} from "@/function.js"
import { PAGE_TIMELINE, PAGE_PROGRESS, PAGE_ACTIVITIES } from "@/constants.js"
import { ref } from "vue"

const goTo = (page) => {
 currentPage.value = page
}

const activities = ref(generateActivities())

function deleteActivity(activity) {
 activities.value.splice(activities.value.indexOf(activity), 1)
}

function createActivity(activity) {
 activities.value.push(activity)
}

const activitiesSelectOptions = generateActivitiesSelectOptions(activities.value)

const timelineItems = generateTimelineItems()

const currentPage = ref(normalizePagesHash())
</script>
<template>
 <the-header @navigator="goTo($event)" />
 <main class="flex grow flex-col">
  <the-timeline
   v-show="currentPage === PAGE_TIMELINE"
   :timeline-items="timelineItems"
   :activities-select-options="activitiesSelectOptions"
  />
  <the-activities
   v-show="currentPage === PAGE_ACTIVITIES"
   :activities="activities"
   @create-activity="createActivity"
   @delete-activity="deleteActivity"
  />
  <the-progress v-show="currentPage === PAGE_PROGRESS" />
 </main>
 <the-nav :current-page="currentPage" @navigator="goTo($event)" />
</template>
