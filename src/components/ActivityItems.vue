<script setup>
import BaseButton from "@/components/BaseButton.vue"
import BaseSelect from "@/components/BaseSelect.vue"
import { TrashIcon } from "@heroicons/vue/24/outline/index.js"
import { BUTTON_TYPE_DANGER, PERIOD_SELECT_OPTIONS } from "@/constants.js"
import { isActivityValid, isNumber, isUndefined } from "@/components/validator.js"

defineProps({
 activity: { type: Object, required: true, validator: isActivityValid }
})

const emit = defineEmits({
 setSecondToComplete: isNumber,
 delete: isUndefined
})
</script>

<template>
 <li class="flex flex-col gap-2 p-4">
  <div class="flex items-center gap-2">
   <base-button :type="BUTTON_TYPE_DANGER" @click="emit('delete')">
    <TrashIcon class="h-8" />
   </base-button>
   <span class="truncate text-xl">{{ activity.name }}</span>
  </div>
  <div>
   <base-select
    class="font-mono"
    placeholder="h:mm"
    :options="PERIOD_SELECT_OPTIONS"
    :selected="activity.secondToComplete || null"
    @select="emit('setSecondToComplete', $event || 0)"
   />
  </div>
 </li>
</template>

<style scoped></style>
