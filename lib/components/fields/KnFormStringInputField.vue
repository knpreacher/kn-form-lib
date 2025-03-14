<script lang="ts" setup>
import type { KnFormStringInputFieldProps } from '../../types';
import { useVModel, type VModelEmitter } from '../../utils/useVModel';
import { QInput } from "quasar";

defineOptions({
  name: 'KnFormStringInputField',
})

const props = defineProps<KnFormStringInputFieldProps>()
const emit = defineEmits<VModelEmitter<string>>()

const { model } = useVModel(props, emit, props.defaultValue)
</script>
<template>
  <div>
    <q-input v-model="model" :label="props.label" v-bind="props.inputProps" />
  </div>
</template>