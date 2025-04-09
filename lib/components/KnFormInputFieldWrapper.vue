<script lang="ts" setup generic="FieldProps extends KnFormAnyFieldProps, ValueType = any">

import {
  useVModel,
  type VModelEmitter,
  type VModelProps
} from '../utils/useVModel.ts'
import type { KnFormAnyFieldProps, SharedKnFormFieldData } from '../types.ts'
import type { QToggleProps } from 'quasar'
import { QToggle, QSpace } from 'quasar'
import { computed, ref, watch } from 'vue'
import KnFormUnknownInputField from '../components/fields/KnFormUnknownInputField.vue'
import { TYPE_COMPONENT_MAP } from '../utils/fieldTypeMap.ts'
import { getGridClass } from '../utils/formUtils.ts'
import { isEmpty } from '../utils/jsUtils'
import SlotRenderer from './helpers/SlotRenderer.vue';

defineOptions({
  name: 'KnFormInputFieldWrapper'
})

const props = defineProps<{
  // fieldProps: Omit<FieldProps, 'modelValue'>,
  fieldProps: FieldProps,
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

const bindLabel = computed(() => props.fieldProps.useOutLabel ? undefined : props.fieldProps.label)
</script>
<template>
  <div class="kn-form-input-field-wrapper" :class="columnClass">
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
    <template v-else>
      <div class="kn-form-input-field-wrapper__header">
        <slot-renderer :slot-data="fieldProps.slots?.outLabelPrepend"/>
        <slot-renderer :slot-data="fieldProps.slots?.outLabel">
          <div class="kn-form-input-field-wrapper__label"
               v-if="fieldProps?.useOutLabel"
               v-text="fieldProps.label"
          ></div>
        </slot-renderer>
        <slot-renderer :slot-data="fieldProps.slots?.outLabelAppend"/>
        <q-space />
        <slot-renderer :slot-data="fieldProps.slots?.outLabelAppendSide"/>
      </div>
      <component
        v-bind="fieldProps"
        :label="bindLabel"
        :field-defaults="fieldDefaults"
        :all-data="allData"
        :is="componentToBeMount" v-model="model"
      />
    </template>
  </div>
</template>

<style scoped>
.kn-form-input-field-wrapper__header {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 8px;
}
</style>
