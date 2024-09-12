import "./assets/main.css"
import { loadState, saveState } from "@/storage.js"

import { createApp } from "vue"
import App from "./App.vue"

loadState()

document.addEventListener("visibilitychange", () =>
 document.visibilityState === "visible" ? loadState() : saveState()
)

createApp(App).mount("#app")
