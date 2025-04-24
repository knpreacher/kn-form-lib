<script setup lang="ts">
import type {
  GutterSizeObject,
  KnFormFieldGroupProps,
  KnFormModelData, SimpleGridProps
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

const {model} = useVModel(props, emit)
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
  const appendColCls = props.simpleGrid ? '' : '-col'
  if (typeof props.gutterSize === 'string') return {
    [`q${appendColCls}-gutter-${props.gutterSize}`]: true
  }
  return {
    [`q${appendColCls}-gutter-x-${(props.gutterSize as GutterSizeObject)?.x}`]: true,
    [`q${appendColCls}-y-${(props.gutterSize as GutterSizeObject)?.y}`]: true
  }
}

const simpleGridClasses: () => VueClassObjectProp = () => {
  if (!props.simpleGrid) return {}
  if (typeof props.simpleGrid === 'boolean') return {}
  const gridProps = props.simpleGrid as SimpleGridProps
  return {
    [`items-${gridProps.align}`]: true,
    [`justify-${gridProps.justify}`]: true,
    [`wrap`]: gridProps.wrap
  }

}

const fieldRowClasses: VueClassObjectProp = {
  ...(props.headerPadding ? {
    [`q-mt-${props.headerPadding}`]: true
  } : {}),
  ...getGutterClasses(),
  ...simpleGridClasses()
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
        :simple-grid="simpleGrid"
        :field-defaults="fieldDefaults"
        :field-props="f"
      />
    </div>
  </q-expansion-item>
  <div class="kn-form-input-group" v-else>
    <div class="row items-center full-width q-gutter-x-sm kn-form-input-group__header">
      <q-icon v-if="props.iconProps" v-bind="props.iconProps"/>
      <div v-if="label" class="kn-form-input-group__label" v-html="label"></div>
    </div>
    <div class="row" :class="fieldRowClasses">
      <kn-form-input-field-wrapper
        v-for="f in fields" :key="f.dataKey"
        v-model="model[f.dataKey]"
        :all-data="model"
        :simple-grid="simpleGrid"
        :field-defaults="fieldDefaults"
        :field-props="f"
      />
    </div>
  </div>
</template>
