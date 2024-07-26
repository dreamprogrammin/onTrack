<script setup>
import BaseSelect from "@/components/BaseSelect.vue"
import { ref } from "vue"

const props = defineProps(["timelineItem"])

const hourLinkClasses = [
 "absolute",
 "-top-4",
 "left-1/2",
 "-translate-x-1/2",
 "rounded",
 "px-2",
 "font-mono",
 "text-lg",

 props.timelineItem.hour === new Date().getHours()
  ? "bg-purple-900 font-black text-white"
  : "bg-gray-100  text-gray-500"
]

const options = [
 { value: 1, label: "Coding" },
 { value: 2, label: "Reading" },
 { value: 3, label: "Training" }
]

const selectedActivityId = ref(1)
</script>

<template>
 <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
  <a :class="hourLinkClasses" href="#">{{ timelineItem.hour }}:00</a>
  <base-select
   :options="options"
   placeholder="Rest"
   :select="selectedActivityId"
   @select="selectedActivityId = $event"
  />
 </li>
</template>

<style scoped></style>
