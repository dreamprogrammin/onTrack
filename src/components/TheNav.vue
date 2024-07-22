<script setup>
import { ChartBarIcon, ClockIcon, ListBulletIcon } from "@heroicons/vue/24/outline/index.js"
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from "@/contacts.js"
import NavItem from "@/components/NavItem.vue"

defineProps(["currentPage"])

const emit = defineEmits(["navigator"])

const navItems = {
 [PAGE_TIMELINE]: ClockIcon,
 [PAGE_ACTIVITIES]: ListBulletIcon,
 [PAGE_PROGRESS]: ChartBarIcon
}
</script>

<template>
 <nav class="sticky bottom-0 z-10 bg-white">
  <ul class="flex items-center justify-around border-t">
   <nav-item
    v-for="(icon, page) in navItems"
    :key="page"
    :href="`#${page}`"
    :class="{ 'pointer-events-none bg-gray-200': page === currentPage }"
    @click="emit('navigator', page)"
   >
    <component :is="icon" class="h-6 w-6" /> {{ page }}
   </nav-item>
  </ul>
 </nav>
</template>

<style scoped></style>
