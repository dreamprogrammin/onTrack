<script setup>
import TheHeader from "@/components/TheHeader.vue"
import TheNav from "@/components/TheNav.vue"
import TheTimeline from "@/components/page/TheTimeline.vue"
import TheActivities from "@/components/page/TheActivities.vue"
import TheProgress from "@/components/page/TheProgress.vue"
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from "@/contacts.js"
import { ref } from "vue"

const normalizePagesHash = () => {
 const hash = window.location.hash.slice(1)

 if (Object.keys([PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS]).includes(hash)) {
  return hash
 }

 window.location.hash = PAGE_TIMELINE

 return PAGE_TIMELINE
}

const goTo = (page) => {
 currentPage.value = page
}

const currentPage = ref(normalizePagesHash())
</script>
<template>
 <the-header @go-to-timeline="goTo(PAGE_TIMELINE)" @go-to-progress="goTo(PAGE_PROGRESS)" />
 <main class="flex-grow flex-col">
  <the-timeline v-show="currentPage === PAGE_TIMELINE" />
  <the-activities v-show="currentPage === PAGE_ACTIVITIES" />
  <the-progress v-show="currentPage === PAGE_PROGRESS" />
 </main>
 <the-nav :current-page="currentPage" @navigator="goTo($event)" />
</template>
