<script lang="ts" setup>
import type { KnFormLabelInputFieldProps } from '../../types'

defineOptions({
  name: 'KnFormLabelInputField'
})

defineProps<KnFormLabelInputFieldProps>()
</script>
<template>
  <div class="kn-form-label-input">
    <div class="kn-form-label-input__label q-field__label ellipsis" v-text="label"></div>
    <div v-html="modelValue" class="kn-form-label-input__value"></div>
  </div>
</template>