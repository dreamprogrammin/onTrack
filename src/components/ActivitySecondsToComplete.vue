<script setup>
import { formatSeconds } from "@/function.js"
import { isActivityValid } from "@/components/validator.js"

defineProps({
 activity: {
  type: Object,
  required: true,
  validator: isActivityValid
 }
})
</script>

<template>
 <div class="flex items-center rounded bg-purple-100 px-2 font-mono text-xl text-purple-800">
  {{ formatSeconds(activity.secondToComplete) }}
 </div>
</template>

<style scoped></style>
