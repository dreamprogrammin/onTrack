import "./assets/main.css"
import * as storage from "./storage.js"

import { createApp } from "vue"
import App from "./App.vue"
import { timelineItems } from "@/timeline-items.js"
import { activities } from "@/activities.js"
import { isToday } from "@/time.js"

loadState()

document.addEventListener("visibilitychange", () => {
 document.visibilityState === "hidden" ? saveState() : loadState()
})

function loadState() {
 const state = storage.load()

 timelineItems.value = isToday(new Date(state.data)) ? state.timelineItems : timelineItems.value
 activities.value = state.activity || activities.value
}

function saveState() {
 storage.save({
  timelineItems: timelineItems.value,
  activity: activities.value
 })
}

createApp(App).mount("#app")
