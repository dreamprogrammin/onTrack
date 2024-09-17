<script setup>
import { currentPage, navigate } from "@/router.ts"
import { isNavItemValid } from "@/components/validator.js"
import { computed } from "vue"
import BaseIcon from "@/BaseIcon.vue"
import { PAGE_TIMELINE } from "@/constants.ts"
import { scrollToCurrentHour } from "@/timeline-items.ts"

const props = defineProps({
 navItem: {
  required: true,
  type: Object,
  validator: isNavItemValid
 }
})

const classes = computed(() => [
 "flex flex-col items-center p-2 text-xs capitalize",
 props.navItem.page === currentPage.value ? "bg-gray-200" : "hover:bg-gray-100"
])

function handleClick() {
 currentPage.value === PAGE_TIMELINE && currentPage.value === props.navItem.page
  ? scrollToCurrentHour(true)
  : navigate(props.navItem.page)
}
</script>

<template>
 <li class="flex-1">
  <a :href="`#${navItem.page}`" :class="classes" @click="handleClick">
   <base-icon :name="navItem.icon" class="h-6 w-6" /> {{ navItem.page }}
  </a>
 </li>
</template>

<style scoped></style>
