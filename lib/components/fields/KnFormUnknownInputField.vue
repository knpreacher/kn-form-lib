<script lang="ts" setup>
import type { KnFormAnyFieldProps } from '../../types'

defineOptions({
  name: 'KnFormUnknownInputField',
})
defineProps<KnFormAnyFieldProps>()
</script>
<template>
  <div class="kn-form-input__unknown">
    No defined input component for type {{ dataType }}
  </div>
</template>