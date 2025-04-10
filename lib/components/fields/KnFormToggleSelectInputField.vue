<script lang="ts" setup
        generic="OptionType extends KnSelectDefaultOptionType = KnSelectDefaultOptionType, ValueType = any">
import type {
  KnFormToggleSelectInputFieldProps,
  KnSelectDefaultOptionType
} from '../../types'
import { type VModelEmitter } from '../../utils/useVModel'
import { type QBtnToggleProps, QBtnToggle } from 'quasar'
import { useKnFormField } from '../../helpers/useHelpers.ts'
import { computed } from 'vue'

defineOptions({
  name: 'KnFormToggleSelectInputField'
})

const props = withDefaults(defineProps<KnFormToggleSelectInputFieldProps<OptionType, ValueType>>(), {})
const emit = defineEmits<VModelEmitter<ValueType>>()

const { model } = useKnFormField(props, emit)

const displayOptionText = (o: OptionType): string => {
  if (o.label) {
    return o.label
  }
  return String(o.value)
}

const buttonOptions = computed<QBtnToggleProps['options']>(
  ()=> props.options.map(o=>({
    label: displayOptionText(o),
    value: o.value,
    icon: o.leftIcon?.name,
    disable: o.disable
  }))
)
</script>
<template>
  <q-btn-toggle
    v-model="model"
    v-bind="inputProps"
    :clearable="clearable"
    :options="buttonOptions"
  />
</template>
