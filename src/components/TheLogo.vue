<script setup>
import { PAGE_TIMELINE } from "@/constants.js"
import { currentPage, navigate } from "@/router.js"
import { scrollToCurrentHour } from "@/timeline-items.js"

function handleClick() {
 currentPage.value === PAGE_TIMELINE ? scrollToCurrentHour() : navigate(PAGE_TIMELINE)
}
</script>

<template>
 <a :href="`#${PAGE_TIMELINE}`" @click="handleClick">
  <img class="h-9" src="../assets/img/logo.png" alt="logo" />
 </a>
</template>

<style scoped></style>
