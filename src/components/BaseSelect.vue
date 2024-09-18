<script setup lang="ts" generic="T extends number | string">


import {
 isUndefinedOrNull,
} from "@/components/validator"
import BaseButton from "@/components/BaseButton.vue"
import { computed } from "vue"
import { BUTTON_TYPE_NEUTRAL } from "@/constants"
import { normalizeSelectValue } from "@/function"
import BaseIcon from "@/BaseIcon.vue"
import { ICON_X_MARK } from "@/icons.js"
import type { SelectOptions } from "@/types"

const props = defineProps<{
 placeholder: string
 selected: T | null
 options: SelectOptions<T>[]
}>()


const isNotSelected = computed(():boolean => {
 return isUndefinedOrNull(props.selected)
})


const emit = defineEmits<{
 select: [value : string | number | null]
}>()

function select(value:string | null):void {
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
   @change="select(($event.target as HTMLSelectElement).value)"
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
