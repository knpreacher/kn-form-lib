<script lang="ts" setup>
import type { KnFormIntInputFieldProps } from '../../types'
import { type VModelEmitter } from '../../utils/useVModel'
import { QInput } from 'quasar'
import { useKnFormField } from '../../helpers/useHelpers.ts'
import SlotRenderer from '../helpers/SlotRenderer.vue'
import { useQuasarKnSlots } from '../../utils/quasarSlotUtils.ts'

defineOptions({
  name: 'KnFormIntInputField'
})

const props = defineProps<KnFormIntInputFieldProps>()
const emit = defineEmits<VModelEmitter<number>>()

const { model } = useKnFormField(props, emit)
const { usedSlots } = useQuasarKnSlots(props)
</script>
<template>
  <div>
    <q-input
      :class="{'kn-form-no-spin-input': !showSpinButtons}"
      :min="min" :max="max" :step="step"
      v-model.number="model" :label="props.label"
      v-bind="props.inputProps" type="number"
    >
      <template v-for="[quasarSlot, knSlot] in usedSlots" #[quasarSlot]>
        <slot-renderer :slot-data="slots?.[knSlot]" />
      </template>
    </q-input>
  </div>
</template>
