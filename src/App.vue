<script setup>
import TheHeader from "@/components/TheHeader.vue"
import TheNav from "@/components/TheNav.vue"
import TheTimeline from "@/components/page/TheTimeline.vue"
import TheActivities from "@/components/page/TheActivities.vue"
import TheProgress from "@/components/page/TheProgress.vue"
import { generateTimelineItems, normalizePagesHash } from "@/function.js"
import { PAGE_TIMELINE, PAGE_PROGRESS, PAGE_ACTIVITIES } from "@/contacts.js"
import { ref } from "vue"

const goTo = (page) => {
 currentPage.value = page
}

const timelineItems = generateTimelineItems()

const currentPage = ref(normalizePagesHash())
</script>
<template>
 <the-header @navigator="goTo($event)" />
 <main class="flex-grow flex-col">
  <the-timeline v-show="currentPage === PAGE_TIMELINE" :timeline-items="timelineItems" />
  <the-activities v-show="currentPage === PAGE_ACTIVITIES" />
  <the-progress v-show="currentPage === PAGE_PROGRESS" />
 </main>
 <the-nav :current-page="currentPage" @navigator="goTo($event)" />
</template>
