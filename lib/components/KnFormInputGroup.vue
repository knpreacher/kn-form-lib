<script setup lang="ts">
import type { GutterSizeObject, KnFormFieldGroup, KnFormModelData, ScreenBreakpoint } from '../types.ts'
import { useVModel, type VModelEmitter, type VModelProps } from '../utils/useVModel.ts'
import type { VueClassProp } from 'quasar'

defineOptions({
  name: 'KnFormInputGroup'
})

const props = defineProps<KnFormFieldGroup & VModelProps<KnFormModelData>>()
const emit = defineEmits<VModelEmitter<KnFormModelData>>()

const { model } = useVModel(props, emit)

const getGutterClasses: () => VueClassProp = () => {
  if (!props.gutterSize) return {}
  if (props.gutterSize instanceof String) return {
    [`q-col-gutter-${props.gutterSize}`]: true
  }
  return {
    [`q-col-gutter-x-${(props.gutterSize as GutterSizeObject)?.x}`]: true,
    [`q-col-gutter-y-${(props.gutterSize as GutterSizeObject)?.y}`]: true
  }
}

const gutterClasses = getGutterClasses()

</script>
<template>
  <div class="kn-form-input-group">
    <div class="row" :class="gutterClasses"></div>
  </div>
</template>