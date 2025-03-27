<script lang="ts" setup
        generic="OptionType extends KnSelectDefaultOptionType = KnSelectDefaultOptionType, ValueType = any">
import type {
  KnFormRadioSelectInputFieldProps,
  KnSelectDefaultOptionType
} from '../../types'
import { type VModelEmitter } from '../../utils/useVModel'
import { QOptionGroup } from 'quasar'
import { useKnFormField } from '../../helpers/useHelpers.ts'
import { useKnCustomField } from '../../utils/customFieldUtils.ts'

// interface OptionSlotScope {
//   index: number,
//   opt: OptionType,
//   itemProps: QItemProps,
// }

defineOptions({
  name: 'KnFormRadioSelectInputField'
})

const props = withDefaults(defineProps<KnFormRadioSelectInputFieldProps<OptionType, ValueType>>(), {})
const emit = defineEmits<VModelEmitter<ValueType>>()

const { model } = useKnFormField(props, emit)

const displayOptionText = (o: OptionType): string => {
  if (o.label) {
    return o.label
  }
  return String(o.value)
}

const { errorMessage } = useKnCustomField(props, model)
</script>
<template>
  <div>
    <input type="hidden" v-model="model">
    <q-option-group
      v-model="model"
      :color="inputProps?.color ?? 'primary'"
      :option-label="displayOptionText"
      v-bind="inputProps"
      :options="options"
    />
    <div v-if="errorMessage" v-text="errorMessage"></div>
  </div>
</template>
