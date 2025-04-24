<script lang="ts" setup
        generic="OptionType extends KnSelectDefaultOptionType = KnSelectDefaultOptionType, ValueType = any">
import type {
  KnFormSelectManyInputFieldProps,
  KnSelectDefaultOptionType
} from '../../types'
import { type VModelEmitter } from '../../utils/useVModel'
import { type QItemProps, QSelect, QItem, QItemSection, QItemLabel, QIcon, QCheckbox } from 'quasar'
import { useKnFormField } from '../../helpers/useHelpers.ts'
import SlotRenderer from '../helpers/SlotRenderer.vue'
import { useQuasarKnSlots } from '../../utils/quasarSlotUtils.ts'

interface OptionSlotScope {
  index: number,
  opt: OptionType,
  itemProps: QItemProps,
  selected: boolean,
  toggleOption: (opt: OptionType) => void
}

defineOptions({
  name: 'KnFormSelectManyInputField'
})

const props = withDefaults(defineProps<KnFormSelectManyInputFieldProps<OptionType, ValueType>>(), {})
const emit = defineEmits<VModelEmitter<ValueType>>()

const { model } = useKnFormField(props, emit)
const { usedSlots } = useQuasarKnSlots(props)

const displayOptionText = (o: OptionType): string => {
  if (o.label) {
    return o.label
  }
  return String(o.value)
}
</script>
<template>
  <q-select v-model="model"
            :label="label"
            option-value="value"
            option-label="label"
            option-disable="disable"
            multiple map-options
            :options="options"
            v-bind="inputProps"
            :emit-value="!returnObject"
  >
    <template v-for="[quasarSlot, knSlot] in usedSlots" #[quasarSlot]>
      <slot-renderer :slot-data="slots?.[knSlot]" />
    </template>
    <template #option="{opt, itemProps, selected, toggleOption}: OptionSlotScope">
      <q-item v-bind="itemProps">
        <q-item-section side>
          <q-checkbox :model-value="selected" dense @update:model-value="toggleOption(opt)" />
        </q-item-section>
        <q-item-section avatar v-if="opt.leftIcon">
          <q-icon v-bind="opt.leftIcon" />
        </q-item-section>
        <q-item-section>
          <q-item-label v-text="displayOptionText(opt)"></q-item-label>
        </q-item-section>
        <q-item-section side v-if="opt.rightIcon">
          <q-icon v-bind="opt.rightIcon" />
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
