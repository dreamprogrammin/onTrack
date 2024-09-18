<script setup lang="ts">
import { formatSecondsWithSign } from "@/function"
import { computed } from "vue"
import { calculateTrackedActivitySeconds, timelineItems } from "@/timeline-items"
import type { Activity } from "@/types"

const props = defineProps<{activity: Activity}>()


const classes = computed(():string[] => [
 "flex items-center rounded  px-2 font-mono text-xl",
 RemainingSeconds.value < 0 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
])

const RemainingSeconds = computed(
 () =>
  calculateTrackedActivitySeconds(timelineItems.value, props.activity) -
  props.activity.secondToComplete
)
</script>

<template>
 <div :class="classes">
  {{ formatSecondsWithSign(RemainingSeconds) }}
 </div>
</template>

<style scoped></style>
