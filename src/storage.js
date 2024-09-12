import { APP_KEY } from "@/constants.js"
import { today } from "@/time.js"

export function load() {
 const state = localStorage.getItem(APP_KEY)

 return state ? JSON.parse(state) : {}
}

export function save(data) {
 localStorage.setItem(
  APP_KEY,
  JSON.stringify({
   ...data,
   data: today().toDateString()
  })
 )
}
