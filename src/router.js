import { ref } from "vue"
import { normalizePagesHash } from "@/function.js"
import { PAGE_TIMELINE } from "@/constants.js"

export const currentPage = ref(normalizePagesHash())
export const timelineRef = ref()

export const navigate = (page) => {
 if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
  timelineRef.value.scrollToHour()
 }

 if (page !== PAGE_TIMELINE) {
  document.body.scrollIntoView()
 }
 currentPage.value = page
}
