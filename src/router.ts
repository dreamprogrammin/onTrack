import { ref } from "vue"
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from "@/constants"
import { isPageValid } from "@/components/validator.js"
import TheTimeline from "@/components/page/TheTimeline.vue"
import TheActivities from "@/components/page/TheActivities.vue"
import TheProgress from "@/components/page/TheProgress.vue"
import type {PageName} from "@/types"
import type {Component} from 'vue'

export const routes: Record<PageName, Component>= {
 [PAGE_TIMELINE]: TheTimeline,
 [PAGE_ACTIVITIES]: TheActivities,
 [PAGE_PROGRESS]: TheProgress
}

export const normalizePagesHash = ():PageName => {
 const page = window.location.hash.slice(1)

 if (isPageValid(page)) return page as PageName

 window.location.hash = PAGE_TIMELINE

 return PAGE_TIMELINE
}

export const currentPage = ref<PageName>(normalizePagesHash())

export const navigate = (page:PageName):void => {
 document.body.scrollIntoView()
 currentPage.value = page
}
