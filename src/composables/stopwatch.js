import { ref } from "vue"
import { MILLISECONDS_IN_SECONDS } from "@/constants.js"

export function useStopwatch(initialSeconds) {
 const seconds = ref(initialSeconds)
 const isRunning = ref(false)
 const temp = 1

 function start() {
  isRunning.value = setInterval(() => (seconds.value += temp), MILLISECONDS_IN_SECONDS)
 }
 function stop() {
  clearInterval(isRunning.value)

  isRunning.value = false
 }
 function reset() {
  stop()
  seconds.value = 0
 }

 return {
  start,
  stop,
  reset,
  isRunning,
  seconds
 }
}
