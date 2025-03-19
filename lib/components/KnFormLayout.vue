<script setup lang="ts">
import type {KnFormLayoutData, KnFormModelData} from '../types.ts'
import {useVModel, type VModelEmitter, type VModelProps} from '../utils/useVModel.ts'
import {computed} from 'vue'
import {QForm} from 'quasar';
import {getGroupProps} from '../utils/formUtils.ts'
import KnFormInputGroup from './KnFormInputGroup.vue'

defineOptions({
  name: 'KnFormLayout'
})

const props = defineProps<KnFormLayoutData & VModelProps<KnFormModelData>>()
const emit = defineEmits<VModelEmitter<KnFormModelData>>()

const {model} = useVModel(props, emit)

const groups = computed(
    () => props.groups.map(g => getGroupProps(g, props.groupDefaults))
)

function onFormSubmit(data: any) {
  console.log('SUBMIT', data)
}
</script>

<template>
  <q-form class="kn-form-layout" @submit.prevent="onFormSubmit">
    <kn-form-input-group
        v-for="(g, g_index) in groups" :key="g.groupKey ?? `group__${g_index}`"
        v-bind="g" v-model="model"
    >

    </kn-form-input-group>
    <button type="submit"></button>
  </q-form>
</template>