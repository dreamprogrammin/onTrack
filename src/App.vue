<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue"
import TheNav from "@/components/TheNav.vue"
import { navigate, currentPage, routes } from "@/router.js"

const name:string = 'malik'

console.log(name)

</script>
<template>
 <the-header @navigator="navigate" />
 <main class="flex grow flex-col">
  <keep-alive>
   <component :is="routes[currentPage]" />
  </keep-alive>
 </main>
 <the-nav :current-page="currentPage" @navigator="navigate" />
</template>
