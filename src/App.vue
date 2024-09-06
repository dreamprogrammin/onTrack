<script setup>
import TheHeader from "@/components/TheHeader.vue"
import TheNav from "@/components/TheNav.vue"
import TheTimeline from "@/components/page/TheTimeline.vue"
import TheActivities from "@/components/page/TheActivities.vue"
import TheProgress from "@/components/page/TheProgress.vue"
import { PAGE_TIMELINE, PAGE_PROGRESS, PAGE_ACTIVITIES } from "@/constants.js"
import { navigate, currentPage } from "@/router.js"
</script>
<template>
 <the-header @navigator="navigate" />
 <main class="flex grow flex-col">
  <the-timeline v-show="currentPage === PAGE_TIMELINE" />
  <the-activities v-show="currentPage === PAGE_ACTIVITIES" />
  <the-progress v-show="currentPage === PAGE_PROGRESS" />
 </main>
 <the-nav :current-page="currentPage" @navigator="navigate" />
</template>
