import { BUTTON_TYPES, HOUR_IN_DAY, MIDNIGHT_HOUR, NAV_ITEMS } from "@/constants.js"

export function isPageValid(page) {
 return Object.keys(NAV_ITEMS).includes(page)
}

export function isTimelineItemValid({ hour }) {
 return isNumber(hour) && isHourValid(hour)
}

export function isHourValid(hour) {
 return isBetween(hour, MIDNIGHT_HOUR, HOUR_IN_DAY - 1)
}

export function validateTimelineItems(timelineItems) {
 return timelineItems.every(isTimelineItemValid)
}
// функция строки и номера
export function validateSelectOptions(options) {
 return options.every(isSelectOptionValid)
}
// функция для функции строки и номера
function isSelectOptionValid({ value, label }) {
 return isNumber(value) && isNotEmptyString(label)
}

export function isNumberOrNull(value) {
 return isNull(value) || isNumber(value)
}

export function isUndefinedOrNull(value) {
 return isNull(value) || isUndefined(value)
}

export function isUndefined(value) {
 return value === undefined
}

export function isButtonTypeValid(type) {
 return BUTTON_TYPES.includes(type)
}

export function validateActivities(activities) {
 return activities.every(isActivityValid)
}

export function isActivityValid(activity) {
 return isNotEmptyString(activity)
}

function isNotEmptyString(value) {
 return isString(value) && value.length > 0
}

function isNull(value) {
 return value === null
}

function isString(label) {
 return typeof label === "string"
}

function isNumber(value) {
 return typeof value === "number"
}

function isBetween(value, start, end) {
 return value >= start && value <= end
}
