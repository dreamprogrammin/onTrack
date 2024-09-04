<script setup>
import navItem from "@/components/NavItem.vue"
import { NAV_ITEMS } from "@/constants.js"
</script>

<template>
 <nav class="sticky bottom-0 z-10 bg-white">
  <ul class="flex items-center justify-around border-t">
   <nav-item v-for="navItem in NAV_ITEMS" :key="navItem" :nav-item="navItem"> </nav-item>
  </ul>
 </nav>
</template>

<style scoped></style>
