import { ChartBarIcon, ClockIcon, ListBulletIcon } from "@heroicons/vue/24/outline/index.js"
import { generatePeriodSelectOptions } from "@/function.js"

export const PAGE_TIMELINE = "timeline"
export const PAGE_ACTIVITIES = "activities"
export const PAGE_PROGRESS = "progress"

export const MILLISECONDS_IN_SECONDS = 1000
export const SECONDS_IN_MINUTES = 60
export const MINUTES_IN_HOUR = 60
export const SECONDS_IN_HOUR = SECONDS_IN_MINUTES * MINUTES_IN_HOUR
export const HOUR_IN_DAY = 24
export const MIDNIGHT_HOUR = 0

export const BUTTON_TYPE_PRIMARY = "primary"
export const BUTTON_TYPE_DANGER = "danger"
export const BUTTON_TYPE_NEUTRAL = "neutral"
export const BUTTON_TYPE_SUCCESS = "success"
export const BUTTON_TYPE_WARNING = "warning"

export const BUTTON_TYPES = [
 BUTTON_TYPE_NEUTRAL,
 BUTTON_TYPE_DANGER,
 BUTTON_TYPE_PRIMARY,
 BUTTON_TYPE_WARNING,
 BUTTON_TYPE_SUCCESS
]

export const NAV_ITEMS = {
 [PAGE_TIMELINE]: ClockIcon,
 [PAGE_ACTIVITIES]: ListBulletIcon,
 [PAGE_PROGRESS]: ChartBarIcon
}

export const PERIOD_SELECT_OPTIONS = generatePeriodSelectOptions()
