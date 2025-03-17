<script lang="ts" setup>
import type { KnFormFloatInputFieldProps} from '../../types'
import { type VModelEmitter } from '../../utils/useVModel'
import { QInput } from 'quasar'
import { useKnFormField } from '../../helpers/useHelpers.ts'

defineOptions({
  name: 'KnFormFloatInputField'
})

const props = defineProps<KnFormFloatInputFieldProps>()
const emit = defineEmits<VModelEmitter<number>>()

const { model } = useKnFormField(props, emit)
</script>
<template>
  <div>
    <q-input v-model.number="model" :label="props.label" v-bind="props.inputProps" type="number" />
  </div>
</template>