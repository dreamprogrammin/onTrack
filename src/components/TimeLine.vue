<script setup lang="ts">
import BaseSelect from "@/components/BaseSelect.vue"
import TimelineHour from "@/components/TimelineHour.vue"
import TimelineStopwatch from "@/components/TimelineStopwatch.vue"
import { activitySelectOptions } from "@/activities"
import { updateTimelineItems } from "@/timeline-items"
import type { TimelineItem } from "@/types"

defineProps<{
 timelineItem : TimelineItem
}>()


</script>

<template>
 <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
  <timeline-hour :hour="timelineItem.hour" />
  <base-select
   :options="activitySelectOptions"
   placeholder="Rest"
   :selected="timelineItem.activityId"
   @select="updateTimelineItems(timelineItem, { activityId: $event })"
  />
  <timeline-stopwatch :timeline-item="timelineItem" />
 </li>
</template>

<style scoped></style>
