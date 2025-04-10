<script lang="ts" setup>
import type { KnFormFloatInputFieldProps } from '../../types'
import { type VModelEmitter } from '../../utils/useVModel'
import { QInput } from 'quasar'
import { useKnFormField } from '../../helpers/useHelpers.ts'
import { useQuasarKnSlots } from '../../utils/quasarSlotUtils.ts'
import SlotRenderer from '../helpers/SlotRenderer.vue'

defineOptions({
  name: 'KnFormFloatInputField'
})

const props = defineProps<KnFormFloatInputFieldProps>()
const emit = defineEmits<VModelEmitter<number>>()

const { model } = useKnFormField(props, emit)

const { usedSlots } = useQuasarKnSlots(props)
</script>
<template>
  <div>
    <q-input v-model.number="model" :label="props.label" v-bind="props.inputProps" type="number">
      <template v-for="[quasarSlot, knSlot] in usedSlots" #[quasarSlot]>
        <slot-renderer :slot-data="slots?.[knSlot]" />
      </template>
    </q-input>
  </div>
</template>
