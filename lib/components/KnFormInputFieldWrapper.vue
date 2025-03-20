<script lang="ts" setup generic="ValueType = any, FieldProps extends KnFormAnyFieldProps">

import { useVModel, type VModelEmitter, VModelProps } from '../utils/useVModel.ts'
import type { KnFormAnyFieldProps } from '../types.ts'
import type { QToggleProps } from 'quasar'
import { QToggle } from 'quasar'
import { ref, watch } from 'vue'
import KnFormUnknownInputField from '../components/fields/KnFormUnknownInputField.vue'
import { TYPE_COMPONENT_MAP } from '../utils/fieldTypeMap.ts'
import { getGridClass } from '../utils/formUtils.ts'

defineOptions({
  name: 'KnFormInputFieldWrapper'
})

const {fieldProps} = defineProps<{
  fieldProps: Omit<FieldProps, 'modelValue'>,
} & VModelProps<ValueType>>()
const emit = defineEmits<VModelEmitter<ValueType>>()

const {model} = useVModel(fieldProps, emit, fieldProps.defaultValue)

const toggleProps: Omit<QToggleProps, 'modelValue'> | undefined =
  fieldProps.wrapToggle === true
    ? {
      label: fieldProps.label
    }
    : fieldProps.wrapToggle

const useToggle = !!toggleProps

const toggled = ref(false)
const toggledValue = ref(model.value)

watch(toggled, (value) => {
  if (value) {
    model.value = toggledValue.value
  } else {
    toggledValue.value = model.value
    model.value = fieldProps.untoggledValue
  }
})

const componentToBeMount: any = TYPE_COMPONENT_MAP[fieldProps.dataType] ?? KnFormUnknownInputField

const columnClass = getGridClass(fieldProps.gridSize)
</script>
<template>
  <div class="kn-form-input-field-wrapper" :class="columnClass">
    <div v-if="useToggle">
      <q-toggle v-model="toggled" v-bind="toggleProps"/>
      <component v-if="toggled" v-bind="fieldProps" :is="componentToBeMount" v-model="model"/>
    </div>
    <component v-else v-bind="fieldProps" :is="componentToBeMount" v-model="model"/>
  </div>
</template>
