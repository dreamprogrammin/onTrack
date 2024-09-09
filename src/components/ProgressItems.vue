<script setup>
import { formatSeconds, getProgressColorClass } from "@/function.js"
import { isActivityValid } from "@/components/validator.js"
import { useProgress } from "@/composables/progress.js"

const props = defineProps({
 activity: {
  type: Object,
  required: true,
  validator: isActivityValid
 }
})

const { trackedSeconds, percentage, colorClass } = useProgress(props.activity)
</script>

<template>
 <li class="flex flex-col gap-1 p-4">
  <div class="truncate text-xl">{{ activity.name }}</div>
  <div class="flex h-5 overflow-hidden rounded bg-neutral-200">
   <div :class="colorClass" :style="`width: ${percentage}%`"></div>
  </div>
  <div class="flex justify-between font-mono text-sm">
   <span>{{ percentage }}%</span>
   <span
    >{{ formatSeconds(trackedSeconds) }} /
    {{ formatSeconds(props.activity.secondToComplete) }}</span
   >
  </div>
 </li>
</template>

<style scoped></style>
