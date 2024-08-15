<script setup>
import BaseButton from "@/components/BaseButton.vue"
import { ArrowPathIcon, PauseIcon, PlayIcon } from "@heroicons/vue/24/outline/index.js"
import { formatSeconds } from "@/function.js"
import { BUTTON_TYPE_DANGER, BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING } from "@/constants.js"
import { isNumber } from "@/components/validator.js"

defineProps({
 seconds: {
  type: Number,
  default: 0,
  validator: isNumber
 }
})
</script>

<template>
 <div class="flex w-full gap-2">
  <base-button :type="BUTTON_TYPE_DANGER">
   <ArrowPathIcon class="h-8" />
  </base-button>
  <div class="flex flex-grow items-center rounded-sm bg-gray-100 px-2 font-mono text-3xl">
   {{ formatSeconds(seconds) }}
  </div>
  <base-button :type="BUTTON_TYPE_WARNING">
   <PauseIcon class="h-8" />
  </base-button>
  <base-button :type="BUTTON_TYPE_SUCCESS">
   <PlayIcon class="h-8" />
  </base-button>
 </div>
</template>

<style scoped></style>
