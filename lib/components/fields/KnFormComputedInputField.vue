<script lang="ts" setup>
import {QField} from 'quasar'
import { computed } from 'vue'
import type {
  KnFormComputedInputFieldProps
} from '../../types'
import { useQuasarKnSlots } from '../../utils/quasarSlotUtils.ts'
import SlotRenderer from '../helpers/SlotRenderer.vue'

defineOptions({
  name: 'KnFormComputedInputField'
})

const props = defineProps<KnFormComputedInputFieldProps>()

const model = computed(()=>props.getter(props.allData))

const {usedSlots} = useQuasarKnSlots(props)

</script>
<template>
  <q-field v-model="model" :label="label" v-bind="inputProps">
    <template #control>
      <slot>
        <div v-text="model"></div>
      </slot>
    </template>
    <template v-for="[quasarSlot, knSlot] in usedSlots" #[quasarSlot]>
      <slot-renderer :slot-data="slots?.[knSlot]" />
    </template>
  </q-field>
</template>
