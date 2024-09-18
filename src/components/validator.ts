import { BUTTON_TYPES, HOUR_IN_DAY, MIDNIGHT_HOUR, NAV_ITEMS } from "@/constants"
import { ICONS } from "@/icons"

export function isIconsValid(icon: any):boolean {
 return Object.keys(ICONS).includes(icon)
}

export function isPageValid(page: any):boolean {
 return NAV_ITEMS.some((navItem) => navItem.page === page)
}

export function isNavItemValid(navItem:any):boolean {
 return NAV_ITEMS.includes(navItem)
}

export function isTimelineItemValid({ hour }:any):boolean {
 return isNumber(hour) && isHourValid(hour)
}

export function isNumber(value:any):boolean {
 return typeof value === "number"
}

export function isHourValid(hour: any):boolean {
 return isBetween(hour, MIDNIGHT_HOUR, HOUR_IN_DAY - 1)
}

export function validateTimelineItems(timelineItems: any):boolean {
 return timelineItems.every(isTimelineItemValid)
}
// функция строки и номера
export function validateSelectOptions(options: any):boolean {
 return options.every(isSelectOptionValid)
}
// функция для функции строки и номера
function isSelectOptionValid({ value, label }:any):boolean {
 return isNumber(value) || (isNotEmptyString(value) && isNotEmptyString(label))
}

export function isNumberOrNull(value:any):boolean {
 return isNull(value) || isNumber(value)
}

export function isSelectValueValid(value: any):boolean {
 return isNumberOrNull(value) || isNotEmptyString(value)
}

export function isUndefinedOrNull(value:any):boolean {
 return isNull(value) || isUndefined(value)
}

export function isNull(value:any):boolean {
 return value === null
}

export function isUndefined(value:any):boolean {
 return value === undefined
}

export function isButtonTypeValid(type:any):boolean {
 return BUTTON_TYPES.includes(type)
}

export function isActivityValid({ id, name, secondToComplete }:any):boolean {
 if (isNull(id)) {
  return true
 }
 return [isNotEmptyString(id), isNotEmptyString(name), isNumber(secondToComplete)].every(Boolean)
}

export function isNotEmptyString(value:any):boolean {
 return isString(value) && value.length > 0
}

function isString(label:any):boolean {
 return typeof label === "string"
}

function isBetween(value: any, start:any, end:any):boolean {
 return value >= start && value <= end
}
