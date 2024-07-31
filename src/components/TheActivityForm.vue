<script setup>
import BaseButton from "@/components/BaseButton.vue"
import { PlusIcon } from "@heroicons/vue/24/outline/index.js"
import { isActivityValid } from "@/components/validator.js"
import { ref, nextTick } from "vue"

const emit = defineEmits({
 submit: isActivityValid
})

const activity = ref("")

async function submit() {
 emit("submit", activity.value)

 activity.value = ""

 await nextTick(() => window.scrollTo(0, document.body.scrollHeight))
}
</script>

<template>
 <form
  @submit.prevent="submit('submit', activity)"
  class="sticky bottom-[57px] flex gap-2 border-t p-4"
 >
  <input
   class="w-full rounded border px-4 text-xl"
   v-model="activity"
   placeholder="Activity name"
   type="text"
  />
  <base-button :disabled="activity.trim() === ''">
   <PlusIcon class="h-8" />
  </base-button>
 </form>
</template>

<style scoped></style>
