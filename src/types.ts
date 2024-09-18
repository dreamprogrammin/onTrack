import {
 BUTTON_TYPE_DANGER,
 BUTTON_TYPE_NEUTRAL,
 BUTTON_TYPE_PRIMARY, BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING,
 PAGE_ACTIVITIES,
 PAGE_PROGRESS,
 PAGE_TIMELINE
} from "@/constants"
export type PageName = typeof PAGE_TIMELINE | typeof PAGE_ACTIVITIES | typeof PAGE_PROGRESS

export type ButtonType = typeof BUTTON_TYPE_PRIMARY | typeof BUTTON_TYPE_DANGER | typeof BUTTON_TYPE_NEUTRAL | typeof BUTTON_TYPE_SUCCESS | typeof BUTTON_TYPE_WARNING

export interface NavItem {
 page: PageName,
 icon: string
}

export interface SelectOptions <T = string> {
 value: T
 label:string
}


export interface Activity {
 id: string,
 name: string,
 secondToComplete: number
}

export interface State {
 activities: Activity[],
 timelineItems: TimelineItem[],
 lastActiveAt: Date
}

export interface TimelineItem {
 hour: number
 activityId: null | Activity['id']
 activitySeconds: number
 isActive: boolean
}

export enum ProgressColorClass {
 red = 'bg-red-500',
 yellow = 'bg-yellow-500',
 blue = 'bg-blue-500',
 green = 'bg-green-500',
}
