import { type ComponentPublicInstance, computed, ref, watch } from "vue"
import { HOUR_IN_DAY, MIDNIGHT_HOUR} from "@/constants"
import { endOfHour, isToday, today, toSeconds, now } from "@/time"
import { stopTimelineItemTimer } from "@/timeline-item-timer"
import type { Activity, Hour, State, TimelineItem } from "@/types"

export const timelineItemsRefs = ref<ComponentPublicInstance[] | null>(null)
export const timelineItems = ref<TimelineItem[]>([])

export const activeTimelineItems = computed(():TimelineItem | undefined =>
 timelineItems.value.find(({ isActive }):boolean => isActive)
)

export function updateTimelineItems(timelineItems:TimelineItem, fields:Partial<TimelineItem>) {
 return Object.assign(timelineItems, fields)
}

export function scrollToCurrentHour(isSmooth:boolean = false):void {
 scrollToHour(today().getHours() as Hour, isSmooth)
}

export function scrollToHour(hour:Hour, isSmooth = true):void {
 const el:HTMLBodyElement | HTMLLIElement = hour === MIDNIGHT_HOUR || !timelineItemsRefs.value ? document.body : timelineItemsRefs.value[hour - 1].$el

 el.scrollIntoView({ behavior: isSmooth ? "smooth" : "instant" })
}

export function calculateTrackedActivitySeconds(timelineItems:TimelineItem[], activity:Activity):number {
 return filterTimelineItemsByActivity(timelineItems, activity)
  .map(({ activitySeconds }:TimelineItem):number => activitySeconds)
  .reduce((total:number, seconds:number):number => Math.round(total + seconds), 0)
}

export function resetTimelineItemActivities(timelineItem:TimelineItem[], activity:Activity):void {
 return filterTimelineItemsByActivity(timelineItem, activity)
  .forEach((timelineItem:TimelineItem ):void => {
   updateTimelineItems(timelineItem, {
    activityId: null,
    activitySeconds: timelineItem.hour === today().getHours() ? timelineItem.activitySeconds : 0
   })
  }
 )
}

watch<Date>(now, (after, before):void => {
 if (activeTimelineItems.value && activeTimelineItems.value.hour !== after.getHours()) {
  stopTimelineItemTimer()
 }
 if (before.getHours() !== after.getHours() && after.getHours() === MIDNIGHT_HOUR) {
  resetTimelineItems()
 }
})

function resetTimelineItems():void {
 timelineItems.value.forEach((timelineItem):void =>
  updateTimelineItems(timelineItem, {
   activitySeconds: 0,
   isActive: false
  })
 )
}



export function initializeTimelineItems(state:State):void {
 const lastActiveAt:Date = new Date(state.lastActiveAt)

 timelineItems.value = state.timelineItems ?? generateTimelineItems()

 if (activeTimelineItems.value && isToday(lastActiveAt)) {
  syncIdleSeconds(lastActiveAt)
 } else if (state.timelineItems) {
  resetTimelineItems()
 }
}

function syncIdleSeconds(lastActiveAt:Date):void {
 updateTimelineItems(activeTimelineItems.value as any, {
  activitySeconds: (activeTimelineItems.value.activitySeconds as any) + calculateIdleSeconds(lastActiveAt)
 })
}

function calculateIdleSeconds(lastActiveAt:Date):number {
 return lastActiveAt.getHours() === today().getHours()
  ? toSeconds((today()as any ) - (lastActiveAt as any ))
  : toSeconds((endOfHour(lastActiveAt) as any) - (lastActiveAt as any ))
}

function generateTimelineItems():TimelineItem[] {
 return ([...Array(HOUR_IN_DAY).keys()]as Hour[]).map((hour):TimelineItem => ({
  hour,
  activityId: null,
  activitySeconds: 0,
  isActive: false
 }))
}

function filterTimelineItemsByActivity(timelineItems:TimelineItem[], { id }:Activity) {
 return timelineItems.filter(({ activityId }):boolean => activityId === id)
}
