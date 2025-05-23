<script lang="ts" setup generic="FieldProps extends KnFormAnyFieldProps, ValueType = any">

import {
  useVModel,
  type VModelEmitter,
  type VModelProps
} from '../utils/useVModel.ts'
import type { KnFormAnyFieldProps, SharedKnFormFieldData, SimpleGridProps } from '../types.ts'
import type { QToggleProps, VueClassProp } from 'quasar'
import { QToggle, QSpace } from 'quasar'
import { computed, ref, type StyleValue, watch } from 'vue'
import KnFormUnknownInputField from '../components/fields/KnFormUnknownInputField.vue'
import { TYPE_COMPONENT_MAP } from '../utils/fieldTypeMap.ts'
import { getGridClass } from '../utils/formUtils.ts'
import { isEmpty, styleValue } from '../utils/jsUtils'
import SlotRenderer from './helpers/SlotRenderer.vue'

defineOptions({
  name: 'KnFormInputFieldWrapper'
})

const props = defineProps<{
  // fieldProps: Omit<FieldProps, 'modelValue'>,
  fieldProps: FieldProps,
  fieldDefaults?: Omit<SharedKnFormFieldData, 'dataType'>,
  simpleGrid?: SimpleGridProps | boolean
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
const isSpace = fieldProps.dataType === 'space'
const componentToBeMount: any = TYPE_COMPONENT_MAP[fieldProps.dataType] ?? KnFormUnknownInputField

const columnClass = props.simpleGrid ? {
  [`self-${fieldProps.flex?.align}`]: fieldProps.flex?.align,
  'fit': fieldProps.flex?.fit
} : getGridClass(fieldProps.gridSize)

const columnStyle: StyleValue = fieldProps.flex ? {
  flexBasis: styleValue(fieldProps.flex.basis),
  flexGrow: fieldProps.flex.grow,
  flexShrink: fieldProps.flex.shrink,
  width: styleValue(fieldProps.flex.width),
  maxWidth: styleValue(fieldProps.flex.maxWidth),
  height: styleValue(fieldProps.flex.height),
  maxHeight: styleValue(fieldProps.flex.maxHeight)
} : {}

const innerClass = computed<VueClassProp | undefined>(() => {
  if (!fieldProps.inlineOutLabel) return undefined
  if (fieldProps.inlineOutLabel === true) {
    return 'row items-center'
  } else return fieldProps.inlineOutLabel
})

const bindLabel = computed(() => props.fieldProps.useOutLabel ? undefined : props.fieldProps.label)
</script>
<template>
  <q-space v-if="isSpace" :class="columnClass" :style="columnStyle" />
  <div v-else class="kn-form-input-field-wrapper" :class="columnClass" :style="columnStyle">
    <div v-if="useToggle">
      <q-toggle v-model="toggled" v-bind="toggleProps"/>
      <component
        v-if="toggled" v-bind="fieldProps as {}"
        :label="bindLabel"
        :field-defaults="fieldDefaults"
        :is="componentToBeMount"
        v-model="model" v-model:all-data="allData"
      />
    </div>
    <div class="kn-form-input-field-wrapper__inner" :class="innerClass" v-else>
      <div class="kn-form-input-field-wrapper__header">
        <slot-renderer
          :slot-data="fieldProps.slots?.outLabelPrepend"
          :model-value="model"
          :all-data="allData"
        />
        <slot-renderer
          :slot-data="fieldProps.slots?.outLabel"
          :model-value="model"
          :all-data="allData"
        >
          <div class="kn-form-input-field-wrapper__label"
               v-if="fieldProps?.useOutLabel"
               v-text="fieldProps.label"
          ></div>
        </slot-renderer>
        <slot-renderer
          :slot-data="fieldProps.slots?.outLabelAppend"
          :model-value="model"
          :all-data="allData"
        />
        <q-space/>
        <slot-renderer
          :slot-data="fieldProps.slots?.outLabelAppendSide"
          :model-value="model"
          :all-data="allData"
        />
      </div>
      <q-space/>
      <component
        v-bind="fieldProps"
        :label="bindLabel"
        :field-defaults="fieldDefaults"
        :is="componentToBeMount"
        v-model="model" v-model:all-data="allData"
      />
    </div>
    <div class="kn-form-input-field-wrapper__footer">
      <slot-renderer
        :slot-data="fieldProps.slots?.footer"
        :model-value="model"
        :all-data="allData"
      />
    </div>
  </div>
</template>
