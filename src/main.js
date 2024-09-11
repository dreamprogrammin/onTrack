import "./assets/main.css"
import * as storage from "./storage.js"

import { createApp } from "vue"
import App from "./App.vue"
import { timelineItems } from "@/timeline-items.js"
import { activities } from "@/activities.js"

loadState()

document.addEventListener("visibilitychange", () => {
 document.visibilityState === "hidden" ? saveState() : loadState()
})

function loadState() {
 const state = storage.load()

 timelineItems.value = state.timelineItems
 activities.value = state.activity
}

function saveState() {
 storage.save({
  timelineItems: timelineItems.value,
  activity: activities.value
 })
}

createApp(App).mount("#app")
