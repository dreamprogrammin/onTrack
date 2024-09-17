import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from "@/constants"
export type PageName = typeof PAGE_TIMELINE | typeof PAGE_ACTIVITIES | typeof PAGE_PROGRESS

export interface Activity {
 id: string,
 name: string,
 secondToComplete: number
}

export interface ActivitySelectOption {
 value:string,
 label:string
}

export interface State {
 activities: Activity[],
 timelineItems: any,
 lastActiveAt: Date
}

export interface TimelineItem {
 hour: number
 activityId: null | string
 activitySeconds: number
 isActive: boolean
}
