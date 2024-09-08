<script setup>
import { PAGE_PROGRESS } from "@/constants.js"
import { navigate } from "@/router.js"
import BaseIcon from "@/BaseIcon.vue"
import { ICON_CHECK_CIRCLE } from "@/icons.js"
</script>

<template>
 <a class="text-sm" :href="`#${PAGE_PROGRESS}`" @click="navigate(PAGE_PROGRESS)">
  <div v-if="true" class="flex items-center gap-1">
   Day complete!
   <base-icon :name="ICON_CHECK_CIRCLE" class="h-7 text-green-500" />
  </div>
  <div v-else class="flex items-center gap-1">
   Progress:
   <span class="font-mono">20%</span>
   <div class="h-3 w-3 rounded-full bg-red-500"></div>
  </div>
 </a>
</template>

<style scoped></style>
