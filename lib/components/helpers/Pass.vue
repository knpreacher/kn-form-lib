<script setup lang="ts" generic="BindProps extends {} = {}">
defineProps<{
  bindProps: BindProps
}>()

defineSlots<{
  default: (props: BindProps) => any
}>()
</script>

<template>
  <slot v-bind="bindProps"></slot>
</template>

<style scoped>

</style>
