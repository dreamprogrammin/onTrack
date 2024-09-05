<script setup>
import { formatSeconds } from "@/function.js"
import { isActivityValid } from "@/components/validator.js"
import { computed } from "vue"
import { getTotalActivitySeconds } from "@/timeline-items.js"

const props = defineProps({
 activity: {
  type: Object,
  required: true,
  validator: isActivityValid
 }
})

const classes = computed(
 () =>
  `flex items-center rounded bg-purple-100 px-2 font-mono text-xl text-purple-800 ${colorClasses.value}`
)

const colorClasses = computed(() =>
 secondsDiff.value < 0 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
)

const seconds = computed(() => `${sign.value}${formatSeconds(secondsDiff.value)}`)

const sign = computed(() => (secondsDiff.value >= 0 ? "+" : "-"))

const secondsDiff = computed(
 () => getTotalActivitySeconds(props.activity) - props.activity.secondToComplete
)
</script>

<template>
 <div :class="classes">
  {{ seconds }}
 </div>
</template>

<style scoped></style>
