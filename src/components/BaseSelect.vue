<script setup>
// defineProps(["placeholder", "options", "select"])

import {
 validateSelectOptions,
 isUndefinedOrNull,
 isSelectValueValid
} from "@/components/validator.ts"
import BaseButton from "@/components/BaseButton.vue"
import { computed } from "vue"
import { BUTTON_TYPE_NEUTRAL } from "@/constants.ts"
import { normalizeSelectValue } from "@/function.ts"
import BaseIcon from "@/BaseIcon.vue"
import { ICON_X_MARK } from "@/icons.js"

const props = defineProps({
 placeholder: { required: true, type: String },
 options: {
  type: Array,
  required: true,
  validator: validateSelectOptions
 },
 selected: [Number, String]
})

const isNotSelected = computed(() => {
 return isUndefinedOrNull(props.selected)
})

const emit = defineEmits({ select: isSelectValueValid })

function select(value) {
 emit("select", normalizeSelectValue(value))
}
</script>

<template>
 <div class="flex gap-2">
  <base-button :type="BUTTON_TYPE_NEUTRAL" @click="select(null)">
   <base-icon :name="ICON_X_MARK" />
  </base-button>
  <select
   class="w-full truncate rounded bg-gray-100 px-2 py-1 text-2xl"
   @change="select($event.target.value)"
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
