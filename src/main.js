import "./assets/main.css"
import { loadState, saveState } from "@/storage.js"
import { findActivitySeconds, startTimelineItemsTimer } from "@/timeline-items.js"

import { createApp } from "vue"
import App from "./App.vue"

loadState()

const activeTimelineItem = findActivitySeconds()

if (activeTimelineItem) {
 startTimelineItemsTimer(activeTimelineItem)
}

document.addEventListener("visibilitychange", () =>
 document.visibilityState === "visible" ? loadState() : saveState()
)

createApp(App).mount("#app")
