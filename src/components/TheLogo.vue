<script setup lang="ts">
import { PAGE_TIMELINE } from "@/constants"
import { currentPage, navigate } from "@/router"
import { scrollToCurrentHour } from "@/timeline-items"
import { ICON_CLOCK } from "@/icons.js"
import BaseIcon from "@/BaseIcon.vue"

function handleClick():void {
 currentPage.value === PAGE_TIMELINE ? scrollToCurrentHour(true) : navigate(PAGE_TIMELINE)
}
</script>

<template>
 <a
  :href="`#${PAGE_TIMELINE}`"
  @click="handleClick"
  class="origin-left scale-125 rounded bg-black p-1 text-white"
 >
  <BaseIcon :name="ICON_CLOCK" class="h-5" />
 </a>
</template>

<style scoped></style>
