<script setup lang="ts">
import type {KnFormLayoutData, KnFormModelData} from '../types.ts'
import {useVModel, type VModelEmitter, type VModelProps} from '../utils/useVModel.ts'
import { computed, type Ref, useTemplateRef } from 'vue'
import {QForm} from 'quasar';
import {getGroupProps} from '../utils/formUtils.ts'
import KnFormInputGroup from './KnFormInputGroup.vue'

defineOptions({
  name: 'KnFormLayout'
})

// export type KnFormLayoutExpose = Partial<Pick<QForm, 'validate' | 'getValidationComponents' | 'resetValidation' | 'reset'>>
export type KnFormLayoutExpose = {
  validate: (shouldFocus?: boolean) => Promise<boolean> | undefined
}
// export type KnFormLayoutExpose = {
//   form: Ref<QForm | null>
// }

const props = defineProps<KnFormLayoutData & VModelProps<KnFormModelData>>()
const emit = defineEmits<VModelEmitter<KnFormModelData>>()

const {model} = useVModel(props, emit)

const groups = computed(
    () => props.groups.map(g => getGroupProps(g, props.groupDefaults))
)

const formRef = useTemplateRef<QForm>('formRef')

function onFormSubmit(data: any) {
  console.log(formRef.value)
  console.log('SUBMIT', data)
}


function validate(shouldFocus?: boolean) {
  return formRef.value?.validate(shouldFocus)
}

defineExpose<KnFormLayoutExpose>({
  validate
})
</script>

<template>
  <q-form
    ref="formRef"
    class="kn-form-layout" @submit.prevent="onFormSubmit"
  >
    <kn-form-input-group
        v-for="(g, g_index) in groups" :key="g.groupKey ?? `group__${g_index}`"
        v-bind="g" v-model="model"
    >

    </kn-form-input-group>
    <button type="submit"></button>
  </q-form>
</template>
