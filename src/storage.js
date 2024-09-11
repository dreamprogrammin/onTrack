import { APP_KEY } from "@/constants.js"

export function load() {}

export function save(data) {
 localStorage.setItem(
  APP_KEY,
  JSON.stringify({
   ...data,
   data: new Date().toDateString()
  })
 )
}
