<script setup>
import { PAGE_TIMELINE } from "@/constants.js"
import { navigate } from "@/router.js"
</script>

<template>
 <a :href="`#${PAGE_TIMELINE}`" @click="navigate(PAGE_TIMELINE)">
  <img class="h-9" src="../assets/img/logo.png" alt="logo" />
 </a>
</template>

<style scoped></style>
