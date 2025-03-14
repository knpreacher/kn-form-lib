<script lang="ts" setup>

import { useVModel, type VModelEmitter } from '../utils/useVModel.ts'
import type { KnFormAnyFieldProps } from '../types.ts'
import type { QToggleProps } from 'quasar'
import { ref } from 'vue'
import KnFormUnknownInputField from '../components/fields/KnFormUnknownInputField.vue'
import { TYPE_COMPONENT_MAP } from '../utils/fieldTypeMap.ts'

defineOptions({
  name: 'KnFormInputFieldWrapper'
})

const props = defineProps<KnFormAnyFieldProps>()
const emit = defineEmits<VModelEmitter<any>>()

const { model } = useVModel(props, emit, props.defaultValue)

const toggleProps: Omit<QToggleProps, 'modelValue'> | undefined =
  props.wrapToggle === true
    ? {
      label: props.label
    }
    : props.wrapToggle

const useToggle = !!toggleProps

const toggled = ref(false)

const componentToBeMount: any = TYPE_COMPONENT_MAP[props.dataType] ?? KnFormUnknownInputField
</script>
<template>
  <div class="kn-form-input-field-wrapper">
    <div v-if="useToggle">
      <q-toggle v-model="toggled" v-bind="toggleProps" />
      <component v-if="toggled" v-bind="props" :is="componentToBeMount" v-model="model" />
    </div>
    <component v-else v-bind="props" :is="componentToBeMount" v-model="model" />
  </div>
</template>