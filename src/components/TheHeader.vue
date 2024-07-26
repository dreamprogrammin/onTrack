<script setup>
import TheLogo from "@/components/TheLogo.vue"
import TheHeaderProgress from "@/components/TheHeaderProgress.vue"
import { isPageValid } from "@/components/validator.js"
import { PAGE_PROGRESS, PAGE_TIMELINE } from "@/constants.js"

const emit = defineEmits({ navigator: isPageValid })
</script>

<template>
 <header class="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-3">
  <the-logo @click="emit('navigator', PAGE_TIMELINE)" />
  <the-header-progress @click="emit('navigator', PAGE_PROGRESS)" />
 </header>
</template>
