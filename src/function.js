import { HOUR_IN_DAY, MIDNIGHT_HOUR, PAGE_TIMELINE } from "@/contacts.js"
import { isPageValid } from "@/components/validator.js"

export const normalizePagesHash = () => {
 const page = window.location.hash.slice(1)

 if (isPageValid(page)) return page

 window.location.hash = PAGE_TIMELINE

 return PAGE_TIMELINE
}

export function generateTimelineItems() {
 const timelineItems = []

 for (let hour = MIDNIGHT_HOUR; hour < HOUR_IN_DAY; hour++) {
  timelineItems.push({ hour })
 }

 return timelineItems
}
