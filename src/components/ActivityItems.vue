<script setup>
import BaseButton from "@/components/BaseButton.vue"
import BaseSelect from "@/components/BaseSelect.vue"
import { TrashIcon } from "@heroicons/vue/24/outline/index.js"
import { ref } from "vue"
import { BUTTON_TYPE_DANGER, PERIOD_SELECT_OPTIONS } from "@/constants.js"
import { isActivityValid, isUndefined } from "@/components/validator.js"

const secondToComplete = ref(null)

defineProps({
 activity: { type: Object, required: true, validator: isActivityValid }
})

const emit = defineEmits({
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
    :selected="secondToComplete"
    :options="PERIOD_SELECT_OPTIONS"
    placeholder="h:mm"
    @select="secondToComplete = $event"
   />
  </div>
 </li>
</template>

<style scoped></style>
