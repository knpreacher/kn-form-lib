<script lang="ts" setup generic="MountProps extends {} = {}">
import type { KnFormCustomInputFieldProps } from '../../types'
import type { VModelEmitter } from '../../utils/useVModel'
import { useKnFormField } from '../../helpers/useHelpers.ts'

defineOptions({
  name: 'KnFormCustomInputField'
})
const props = defineProps<KnFormCustomInputFieldProps<MountProps>>()
const emit = defineEmits<VModelEmitter<any>>()

const { model } = useKnFormField(props, emit)
const allData = defineModel<Record<string, any> | undefined>('allData')
</script>
<template>
  <component v-if="formAsModel"
             :is="mountComponent" v-bind="mountComponentProps ?? {}"
             v-model="allData"
  />
  <component v-else
             :is="mountComponent" v-bind="mountComponentProps ?? {}"
             v-model="model"
  />
</template>
