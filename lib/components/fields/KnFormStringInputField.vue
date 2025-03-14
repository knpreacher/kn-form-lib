<script lang="ts" setup>
import type { KnFormStringInputFieldProps } from '../../types'
import { type VModelEmitter } from '../../utils/useVModel'
import { QInput } from 'quasar'
import { useKnFormField } from '../../helpers/useHelpers.ts'

defineOptions({
  name: 'KnFormStringInputField'
})

const props = defineProps<KnFormStringInputFieldProps>()
const emit = defineEmits<VModelEmitter<string>>()

const { model } = useKnFormField(props, emit)
</script>
<template>
  <div>
    <q-input v-model="model" :label="props.label" v-bind="props.inputProps" />
  </div>
</template>