<script setup>
import { ICONS } from "@/icons.js"
import { isIconsValid, isNotEmptyString } from "@/components/validator.js"
defineProps({
 name: {
  type: String,
  required: true,
  validator: isIconsValid
 },
 classes: {
  type: String,
  default: "h-8",
  validator: isNotEmptyString
 }
})
</script>

<template>
 <component :is="ICONS[name]" :class="classes" />
</template>

<style scoped></style>
