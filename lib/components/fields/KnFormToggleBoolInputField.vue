<script lang="ts" setup>
import type {
  KnFormToggleBoolInputFieldProps
} from '../../types'
import { type VModelEmitter } from '../../utils/useVModel'
import { type QBtnToggleProps, QBtnToggle } from 'quasar'
import { useKnFormField } from '../../helpers/useHelpers.ts'
import { computed } from 'vue'

defineOptions({
  name: 'KnFormToggleBoolInputField'
})

type ValueType = boolean | undefined

const props = withDefaults(defineProps<KnFormToggleBoolInputFieldProps>(), {})
const emit = defineEmits<VModelEmitter<ValueType>>()

const { model } = useKnFormField(props, emit)

const toggleModel = computed({
  get: () => {
    return props.emptyAsFalse ? model.value || false : model.value
  },
  set: (value) => {
    model.value = value
  }
})

const buttonOptions = computed<QBtnToggleProps['options']>(
  () => [
    {
      value: true,
      label: props.trueData?.label ?? '+',
      icon: props.trueData?.leftIcon?.name
    },
    {
      value: false,
      label: props.falseData?.label ?? '-',
      icon: props.falseData?.leftIcon?.name
    }
  ]
)
</script>
<template>
  <q-btn-toggle
    v-model="toggleModel"
    v-bind="inputProps"
    :clearable="clearable"
    :options="buttonOptions"
  />
</template>
