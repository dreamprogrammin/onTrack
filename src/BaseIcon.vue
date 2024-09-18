<script setup>
import { ICONS } from "@/icons.js"
import { isIconsValid } from "@/components/validator.ts"
defineProps({
 name: {
  type: String,
  required: true,
  validator: isIconsValid
 }
})
</script>

<template>
 <component :is="ICONS[name]" :class="$attrs.class || 'h-8'" />
</template>

<style scoped></style>
