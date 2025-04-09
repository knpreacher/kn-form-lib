<script setup lang="ts">
import type { KnFieldSlotData, KnFieldSlotDataObject } from '../../types';
import {QIcon} from 'quasar';
import { computed } from 'vue';

const props = defineProps<{
  slotData?: KnFieldSlotData | string
}>()

const slotData = computed<KnFieldSlotDataObject | undefined>(() => {
  if (typeof props.slotData === 'string') {
    return {
      text: props.slotData
    }
  }
  if (typeof props.slotData?.icon === 'string') {
    return {
      icon: {
        name: props.slotData.icon
      }
    }
  }
  return props.slotData as KnFieldSlotDataObject
})
</script>

<template>
  <slot v-if="!slotData"></slot>
  <q-icon v-else-if="slotData.icon" v-bind="slotData.icon"/>
  <span v-else-if="slotData.text" v-text="slotData.text"></span>
  <div v-else-if="slotData.html" v-html="slotData.html"></div>
  <component v-else-if="slotData.component" :is="slotData.component" v-bind="slotData.componentProps"></component>
</template>

<style scoped>

</style>
