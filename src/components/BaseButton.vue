<script setup>
import { BUTTON_TYPE_DANGER, BUTTON_TYPE_NEUTRAL } from "@/constants.js"
import { isButtonTypeValid } from "@/components/validator.js"

defineProps({
 type: {
  type: String,
  default: BUTTON_TYPE_NEUTRAL,
  validator: isButtonTypeValid
 }
})

const typeClasses = {
 [BUTTON_TYPE_NEUTRAL]: "bg-gray-100 enabled:hover:bg-gray-200",
 [BUTTON_TYPE_DANGER]: "bg-red-500 enabled:hover:bg-red-600 text-white"
}
</script>

<template>
 <button
  :class="`${typeClasses[type]} rounded p-3 disabled:cursor-not-allowed disabled:opacity-50`"
 >
  <slot></slot>
 </button>
</template>

<style scoped></style>
