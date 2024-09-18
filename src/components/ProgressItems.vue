<script setup>
import { formatSeconds, getProgressColorClass } from "@/function.ts"
import { isActivityValid } from "@/components/validator.ts"
import { useProgress } from "@/composables/progress.ts"
import { HUNDRED_PERCENT } from "@/constants.ts"

const props = defineProps({
 activity: {
  type: Object,
  required: true,
  validator: isActivityValid
 }
})

const { trackedActivitySeconds, percentage, colorClass } = useProgress(props.activity)
</script>

<template>
 <li class="flex flex-col gap-1 p-4">
  <div class="truncate text-xl">{{ activity.name }}</div>
  <div class="flex h-5 overflow-hidden rounded bg-neutral-200">
   <div
    :class="['transition-all', colorClass]"
    :style="{ width: `${Math.min(percentage, HUNDRED_PERCENT)}%` }"
   ></div>
  </div>
  <div class="flex justify-between font-mono text-sm">
   <span>{{ percentage }}%</span>
   <span
    >{{ formatSeconds(trackedActivitySeconds) }} /
    {{ formatSeconds(props.activity.secondToComplete) }}</span
   >
  </div>
 </li>
</template>

<style scoped></style>
