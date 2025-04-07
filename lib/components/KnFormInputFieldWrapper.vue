<script lang="ts" setup generic="FieldProps extends KnFormAnyFieldProps, ValueType = any">

import {
  useVModel,
  type VModelEmitter,
  type VModelProps
} from '../utils/useVModel.ts'
import type { KnFormAnyFieldProps, SharedKnFormFieldData } from '../types.ts'
import type { QToggleProps } from 'quasar'
import { QToggle } from 'quasar'
import { computed, ref, watch } from 'vue'
import KnFormUnknownInputField from '../components/fields/KnFormUnknownInputField.vue'
import { TYPE_COMPONENT_MAP } from '../utils/fieldTypeMap.ts'
import { getGridClass } from '../utils/formUtils.ts'
import { isEmpty } from '../utils/jsUtils'

defineOptions({
  name: 'KnFormInputFieldWrapper'
})

const props = defineProps<{
  fieldProps: Omit<FieldProps, 'modelValue'>,
  fieldDefaults?: Omit<SharedKnFormFieldData, 'dataType'>,
} & VModelProps<ValueType>>()
const emit = defineEmits<VModelEmitter<ValueType>>()
const {fieldProps} = props

const allData = defineModel<Record<string, any>>('allData')

const {model} = useVModel<ValueType>(props, emit, fieldProps.defaultValue)
// const {model: allData} = useSyncPropMixin<'allData', Record<string, any>>(props, emit, 'allData')

const toggleProps: Omit<QToggleProps, 'modelValue'> | undefined =
  fieldProps.wrapToggle === true
    ? {
      label: fieldProps.label
    }
    : fieldProps.wrapToggle

const useToggle = !!toggleProps

const toggled = ref(!isEmpty(model.value))
const toggledValue = ref(model.value)

watch(toggled, (value) => {
  if (value) {
    model.value = toggledValue.value
  } else {
    toggledValue.value = model.value
    model.value = fieldProps.untoggledValue as ValueType
  }
})

const componentToBeMount: any = TYPE_COMPONENT_MAP[fieldProps.dataType] ?? KnFormUnknownInputField

const columnClass = getGridClass(fieldProps.gridSize)

const bindLabel = computed(()=>props.fieldProps.useOutLabel ? undefined : props.fieldProps.label)
</script>
<template>
  <div class="kn-form-input-field-wrapper" :class="columnClass">
    <div class="kn-form-input-field-wrapper__header">
      <div class="kn-form-input-field-wrapper__label"
           v-if="fieldProps?.useOutLabel"
           v-text="fieldProps.label"
      ></div>
    </div>
    <div v-if="useToggle">
      <q-toggle v-model="toggled" v-bind="toggleProps"/>
      <component
        v-if="toggled" v-bind="fieldProps as {}"
        :label="bindLabel"
        :field-defaults="fieldDefaults"
        :all-data="allData"
        :is="componentToBeMount" v-model="model"
      />
    </div>
    <component
      v-else v-bind="fieldProps as {}"
      :label="bindLabel"
      :field-defaults="fieldDefaults"
      :all-data="allData"
      :is="componentToBeMount" v-model="model"
    />
  </div>
</template>
