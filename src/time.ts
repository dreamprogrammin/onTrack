import { computed, ref } from "vue"
import  {
 HUNDRED_PERCENT,
 MILLISECONDS_IN_SECONDS,
 SECONDS_IN_DAY,
 SECONDS_IN_HOUR
} from "@/constants"

export const now = ref(today())

export function today():Date {
 return new Date()
}

export function tomorrow():Date {
 const tomorrow = new Date()

 tomorrow.setDate(tomorrow.getDate() + 1)

 return tomorrow
}

export function isToday(date:Date):boolean {
 return date.toDateString() === today().toDateString()
}


const midnight = computed(():number => new Date(now.value).setHours(0, 0, 0, 0))

const secondsSinceMidnight = computed(():number => ((now.value as any) - midnight.value) / MILLISECONDS_IN_SECONDS)

export const secondsSinceMidnightInPercentage = computed(():number => {
 return (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
})

export function startCurrentDateTimer():void {
 setInterval(():void => {
  now.value = today()
 },MILLISECONDS_IN_SECONDS)
}

export function endOfHour(date:Date):Date {
 const endOfHour = new Date(date)

 endOfHour.setTime(endOfHour.getHours() + SECONDS_IN_HOUR * MILLISECONDS_IN_SECONDS)

 endOfHour.setMinutes(0, 0, 0)

 return endOfHour
}

export function toSeconds(milliSeconds:number):number {
 return Math.round(milliSeconds / MILLISECONDS_IN_SECONDS)
}
