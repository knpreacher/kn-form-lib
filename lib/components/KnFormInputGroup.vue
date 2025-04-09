<script setup lang="ts">
import type {
  GutterSizeObject,
  KnFormFieldGroupProps,
  KnFormModelData
} from '../types.ts'
import { useVModel, type VModelEmitter, type VModelProps } from '../utils/useVModel.ts'
import type { VueClassObjectProp } from 'quasar'
import { computed, ref } from 'vue'
import { QExpansionItem, QIcon } from 'quasar'
import { getFieldProps } from '../utils/formUtils.ts'
import KnFormInputFieldWrapper from './KnFormInputFieldWrapper.vue'

defineOptions({
  name: 'KnFormInputGroup'
})

const props = withDefaults(defineProps<KnFormFieldGroupProps & VModelProps<KnFormModelData>>(), {
  headerPadding: 'xs'
})
const emit = defineEmits<VModelEmitter<KnFormModelData>>()

const { model } = useVModel(props, emit)
const expanded = ref(props.expandable ? props.expanded : true)

const fields = computed(
  () => props.fields.filter(
    // filter visible fields
    f => f.showIf?.(model.value) ?? true
  ).map(
    // apply defaults
    f => getFieldProps(f as any, props.fieldDefaults)
  )
)

const getGutterClasses: () => VueClassObjectProp = () => {
  if (!props.gutterSize) return {}
  if (typeof props.gutterSize === 'string') return {
    [`q-col-gutter-${props.gutterSize}`]: true
  }
  return {
    [`q-col-gutter-x-${(props.gutterSize as GutterSizeObject)?.x}`]: true,
    [`q-col-gutter-y-${(props.gutterSize as GutterSizeObject)?.y}`]: true
  }
}

const fieldRowClasses: VueClassObjectProp = {
  ...(props.headerPadding ? {
    [`q-mt-${props.headerPadding}`]: true
  } : {}),
  ...getGutterClasses()
}
</script>
<template>
  <q-expansion-item
    v-if="expandable"
    :label="label"
    :icon="iconProps?.name"
    v-model="expanded"
  >
    <div class="row" :class="fieldRowClasses">
      <kn-form-input-field-wrapper
        v-for="f in fields" :key="f.dataKey"
        v-model="model[f.dataKey]"
        :all-data="model"
        :field-defaults="fieldDefaults"
        :field-props="f"
      />
    </div>
  </q-expansion-item>
  <div class="kn-form-input-group" v-else>
    <div class="row items-center full-width q-gutter-x-sm kn-form-input-group__header">
      <q-icon v-if="props.iconProps" v-bind="props.iconProps" />
      <div v-if="label" class="kn-form-input-group__label" v-html="label"></div>
    </div>
    <div class="row" :class="fieldRowClasses">
      <kn-form-input-field-wrapper
        v-for="f in fields" :key="f.dataKey"
        v-model="model[f.dataKey]"
        :field-props="f"
      />
    </div>
  </div>
</template>
