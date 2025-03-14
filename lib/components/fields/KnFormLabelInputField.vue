<script lang="ts" setup>
import type { KnFormLabelInputFieldProps } from '../../types'

defineOptions({
  name: 'KnFormLabelInputField'
})

defineProps<KnFormLabelInputFieldProps>()
</script>
<template>
  <div class="kn-form-label-input" v-html="modelValue">
  </div>
</template>