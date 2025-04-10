<script lang="ts" setup>
import type { KnFormStringInputFieldProps } from '../../types'
import { type VModelEmitter } from '../../utils/useVModel'
import { QInput } from 'quasar'
import { useKnFormField } from '../../helpers/useHelpers.ts'
import SlotRenderer from '../helpers/SlotRenderer.vue'
import { useQuasarKnSlots } from '../../utils/quasarSlotUtils.ts'

defineOptions({
  name: 'KnFormStringInputField'
})

const props = defineProps<KnFormStringInputFieldProps>()
const emit = defineEmits<VModelEmitter<string>>()

const { model } = useKnFormField(props, emit)
const { usedSlots } = useQuasarKnSlots(props)
</script>
<template>
  <div>
    <q-input v-model="model" :label="props.label" v-bind="props.inputProps">
      <template v-for="[quasarSlot, knSlot] in usedSlots" #[quasarSlot]>
        <slot-renderer :slot-data="slots?.[knSlot]" />
      </template>
    </q-input>
  </div>
</template>
