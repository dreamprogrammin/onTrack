<script setup>
import TheLogo from "@/components/TheLogo.vue"
import TheHeaderProgress from "@/components/TheHeaderProgress.vue"

const emit = defineEmits(["goToTimeline", "goToProgress"])
</script>

<template>
 <header class="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-3">
  <the-logo @click="emit('goToTimeline')" />
  <the-header-progress @click="emit('goToProgress')" />
 </header>
</template>
