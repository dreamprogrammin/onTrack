import { HOUR_IN_DAY, MIDNIGHT_HOUR, NAV_ITEMS } from "@/contacts.js"

export function isPageValid(page) {
 return Object.keys(NAV_ITEMS).includes(page)
}

export function isTimelineItemValid({ hour }) {
 return isNumber(hour) && isHourValid(hour)
}

function isHourValid(hour) {
 return isBetween(hour, MIDNIGHT_HOUR, HOUR_IN_DAY - 1)
}

export function validateTimelineItems(timelineItems) {
 return timelineItems.every(isTimelineItemValid)
}

export function validateSelectOptions(options) {
 return options.every(isSelectOptionValid)
}

export function isNumberOrNull(value) {
 return isNull(value) || isNumber(value)
}

export function isUndefinedOrNull(value) {
 return isNull(value) || isUndefined(value)
}

function isNull(value) {
 return value === null
}

function isUndefined(value) {
 return value === undefined
}

function isSelectOptionValid({ value, label }) {
 return isNumber(value) && isString(label)
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
