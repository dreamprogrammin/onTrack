import {
 HUNDRED_PERCENT,
 LOW_PERCENT,
 MIDDLE_PERCENT,
 MINUTES_IN_HOUR,
 SECONDS_IN_MINUTES
} from "@/constants"
import { isNull } from "@/components/validator.js"

enum ProgressColorClass {
 red = 'bg-red-500',
 yellow = 'bg-yellow-500',
 blue = 'bg-blue-500',
 green = 'bg-green-500',
}

interface PeriodSelectOptions {
 value: number,
 label:string
}

export function currentHour():number {
 return new Date().getHours()
}

export function id():string {
 return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export function normalizeSelectValue(value:any):any {
 return isNull(value) || isNaN(value) ? value : +value
}

export function generatePeriodSelectOptions():PeriodSelectOptions[] {
 const periodsInMinutes = [
  15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480
 ]

 return periodsInMinutes.map((periodsInMinutes):PeriodSelectOptions => ({
  value: periodsInMinutes * SECONDS_IN_MINUTES,
  label: generatePeriodSelectOptionsValue(periodsInMinutes)
 }))
}

function generatePeriodSelectOptionsValue(periodInMinutes:number):string {
 const hour = Math.floor(periodInMinutes / MINUTES_IN_HOUR)
  .toString()
  .padStart(2, '0')
 const minute = (periodInMinutes % MINUTES_IN_HOUR).toString().padStart(2, '0')

 return `${hour}:${minute}`
}

export function formatSecondsWithSign(seconds: number):string  {
 return `${seconds >= 0 ? "+" : "-"}${formatSeconds(seconds)}`
}

export function formatSeconds(seconds: number):string {
 const date = new Date()

 date.setTime(Math.abs(seconds) * 1000)

 const utc = date.toUTCString()

 return utc.substring(utc.indexOf(":") - 2, utc.indexOf(":") + 6)
}

export function getProgressColorClass(percentage:number):ProgressColorClass {
 if (percentage < LOW_PERCENT) return ProgressColorClass.red
 if (percentage < MIDDLE_PERCENT) return ProgressColorClass.yellow
 if (percentage < HUNDRED_PERCENT) return ProgressColorClass.blue

 return ProgressColorClass.green
}
