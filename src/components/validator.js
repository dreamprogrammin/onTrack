import { BUTTON_TYPES, HOUR_IN_DAY, MIDNIGHT_HOUR, NAV_ITEMS } from "@/constants.js"

export function isPageValid(page) {
 return NAV_ITEMS.some((navItem) => navItem.page === page)
}

export function isNavItemValid(navItem) {
 return NAV_ITEMS.includes(navItem)
}

export function isTimelineItemValid({ hour }) {
 return isNumber(hour) && isHourValid(hour)
}

export function isNumber(value) {
 return typeof value === "number"
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
 return isNumber(value) || (isNotEmptyString(value) && isNotEmptyString(label))
}

export function isNumberOrNull(value) {
 return isNull(value) || isNumber(value)
}

export function isSelectValueValid(value) {
 return isNumberOrNull(value) || isNotEmptyString(value)
}

export function isUndefinedOrNull(value) {
 return isNull(value) || isUndefined(value)
}

export function isNull(value) {
 return value === null
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

export function isActivityValid({ id, name, secondToComplete }) {
 if (isNull(id)) {
  return true
 }
 return [isNotEmptyString(id), isNotEmptyString(name), isNumber(secondToComplete)].every(Boolean)
}

function isNotEmptyString(value) {
 return isString(value) && value.length > 0
}

function isString(label) {
 return typeof label === "string"
}

function isBetween(value, start, end) {
 return value >= start && value <= end
}
