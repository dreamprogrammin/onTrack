<script setup>
// defineProps(["placeholder", "options", "select"])

import { validateSelectOptions, isUndefinedOrNull, isNumberOrNull } from "@/components/validator.js"
import BaseButton from "@/components/BaseButton.vue"
import { XMarkIcon } from "@heroicons/vue/24/outline/index.js"
import { computed } from "vue"
import { BUTTON_TYPE_NEUTRAL, BUTTON_TYPE_PRIMARY } from "@/constants.js"

const props = defineProps({
 placeholder: { required: true, type: String },
 options: {
  type: Array,
  required: true,
  validator: validateSelectOptions
 },
 selected: Number
})

const isNotSelected = computed(() => {
 return isUndefinedOrNull(props.selected)
})

const emit = defineEmits({ select: isNumberOrNull })
</script>

<template>
 <div class="flex gap-2">
  <base-button :type="BUTTON_TYPE_NEUTRAL" @click="emit('select', null)">
   <XMarkIcon class="h-8" />
  </base-button>
  <select
   class="w-full truncate rounded bg-gray-100 px-2 py-1 text-2xl"
   @change="emit('select', +$event.target.value)"
  >
   <option disabled :selected="isNotSelected" value="">{{ placeholder }}</option>
   <option
    v-for="{ value, label } in options"
    :key="value"
    :value="value"
    :selected="value === selected"
   >
    {{ label }}
   </option>
  </select>
 </div>
</template>

<style scoped></style>
