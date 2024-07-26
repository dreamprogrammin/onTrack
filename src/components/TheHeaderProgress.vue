<script setup>
import { CheckCircleIcon } from "@heroicons/vue/24/solid/index.js"
import { PAGE_PROGRESS } from "@/constants.js"
</script>

<template>
 <a class="text-sm" :href="`#${PAGE_PROGRESS}`">
  <div v-if="true" class="flex items-center gap-1">
   Day complete!
   <CheckCircleIcon class="h-7 text-green-500" />
  </div>
  <div v-else class="flex items-center gap-1">
   Progress:
   <span class="font-mono">20%</span>
   <div class="h-3 w-3 rounded-full bg-red-500"></div>
  </div>
 </a>
</template>

<style scoped></style>
