<script setup>
import BaseButton from "@/components/BaseButton.vue"
import { ref, nextTick } from "vue"
import { id } from "@/function.js"
import { createActivity } from "@/activities.ts"
import BaseIcon from "@/BaseIcon.vue"
import { ICON_PLUS } from "@/icons.js"

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
   <base-icon :name="ICON_PLUS" />
  </base-button>
 </form>
</template>

<style scoped></style>
