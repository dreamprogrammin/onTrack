import { ref } from "vue"
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from "@/constants.ts"
import { isPageValid } from "@/components/validator.js"
import TheTimeline from "@/components/page/TheTimeline.vue"
import TheActivities from "@/components/page/TheActivities.vue"
import TheProgress from "@/components/page/TheProgress.vue"

export const routes = {
 [PAGE_TIMELINE]: TheTimeline,
 [PAGE_ACTIVITIES]: TheActivities,
 [PAGE_PROGRESS]: TheProgress
}

export const normalizePagesHash = () => {
 const page = window.location.hash.slice(1)

 if (isPageValid(page)) return page

 window.location.hash = PAGE_TIMELINE

 return PAGE_TIMELINE
}

export const currentPage = ref(normalizePagesHash())

export const navigate = (page) => {
 document.body.scrollIntoView()
 currentPage.value = page
}
