import "./assets/main.css"
import * as storage from "./storage.js"

import { createApp } from "vue"
import App from "./App.vue"
import { timelineItems } from "@/timeline-items.js"
import { activities } from "@/activities.js"

document.addEventListener("visibilitychange", () => {
 if (document.visibilityState === "hidden") {
  console.log("hidden")
  saveState()
 }
})

function saveState() {
 storage.save({
  timelineItems: timelineItems.value,
  activity: activities.value
 })
}

createApp(App).mount("#app")
