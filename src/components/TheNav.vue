<script setup>
import navItem from "@/components/NavItem.vue"
import { NAV_ITEMS } from "@/contacts.js"
import { isPageValid } from "@/components/validator.js"

defineProps({
 currentPage: {
  type: String,
  required: true,
  validator: isPageValid
 }
})

const emit = defineEmits({ navigator: isPageValid })
</script>

<template>
 <nav class="sticky bottom-0 z-10 bg-white">
  <ul class="flex items-center justify-around border-t">
   <nav-item
    v-for="(icon, page) in NAV_ITEMS"
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
