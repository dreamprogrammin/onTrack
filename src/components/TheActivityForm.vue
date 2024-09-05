<script setup>
import BaseButton from "@/components/BaseButton.vue"
import { PlusIcon } from "@heroicons/vue/24/outline/index.js"
import { ref, nextTick } from "vue"
import { id } from "@/function.js"
import { createActivity } from "@/activities.js"

const name = ref("")

async function submit() {
 createActivity({
  id: id(),
  name: name.value,
  secondToComplete: 0
 })

 name.value = ""

 await nextTick(() => window.scrollTo(0, document.body.scrollHeight))
}
</script>

<template>
 <form
  @submit.prevent="submit('submit', name)"
  class="sticky bottom-[57px] flex gap-2 border-t p-4"
 >
  <input
   class="w-full rounded border px-4 text-xl"
   v-model="name"
   placeholder="Activity name"
   type="text"
  />
  <base-button :disabled="name.trim() === ''">
   <PlusIcon class="h-8" />
  </base-button>
 </form>
</template>

<style scoped></style>
