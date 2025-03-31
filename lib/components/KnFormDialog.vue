<script setup lang="ts" generic="ValueType extends {} | undefined = undefined">
import {
  QBtn,
  QSpace,
  QDialog,
  QCard,
  QCardSection,
  QCardActions,
  QScrollArea,
  useDialogPluginComponent
} from 'quasar'
import { type KnFormLayoutData } from '../types.ts'
import KnFormLayout from '../components/KnFormLayout.vue'
import { computed, type Ref, ref } from 'vue'
import type { KnFormLayoutExpose } from './KnFormLayout.vue'

const props = defineProps<{
  formData: KnFormLayoutData,
  initialValue?: Partial<KnFormLayoutData>,
  title?: string
}>()
defineEmits(
  useDialogPluginComponent.emits
)
const {
  dialogRef,
  onDialogOK,
  onDialogCancel
} = useDialogPluginComponent<ValueType>()

const {
  cancelButtonProps,
  resetButtonProps,
  submitButtonProps
} = props.formData

const formRef = ref<KnFormLayoutExpose | null>(null)

const initialValue = (props.initialValue ?? {}) as Required<ValueType>

const model = ref(initialValue) as Ref<Required<ValueType>>

const actionButtonsGutterSizeClass = computed(
  () => props.formData.actionButtonsGutterSize ?
    `q-gutter-${props.formData.actionButtonsGutterSize}` :
    undefined
)

function onFormSubmitClick() {
  formRef.value?.submit()
}

function onFormSubmit(data: Required<ValueType>) {
  onDialogOK(data)
}

function onFormReset() {
  model.value = initialValue as Required<ValueType>
}

function onFormCancel() {
  onDialogCancel()
}

defineSlots<{
  title: () => any
}>()
</script>

<template>
  <q-dialog ref="dialogRef" :model-value="true">
    <q-card>
      <slot name="title" v-if="title">
        <q-card-section class="row items-center" style="max-width: 200px">
          <div v-text="title" class="ellipsis"></div>
          <q-space />
        </q-card-section>
      </slot>
      <q-scroll-area style="max-height: 200px;height: 80vh; max-width: 200px; width: 90vw" visible>
        <q-card-section :class="title ? 'q-pt-none' : ''">
          <kn-form-layout
            v-bind="formData"
            v-model="model"
            @submit="onFormSubmit as any"
            :use-action-buttons="false"
          >
            <template #buttons></template>
          </kn-form-layout>
        </q-card-section>
      </q-scroll-area>
      <q-card-actions :class="actionButtonsGutterSizeClass" align="center">
        <q-btn
          v-if="cancelButtonProps" v-bind="cancelButtonProps"
          type="button" @click="onFormCancel"
        />
        <q-space />
        <q-btn
          v-if="resetButtonProps" v-bind="resetButtonProps"
          type="reset" @click="onFormReset"
        />
        <q-btn
          v-if="submitButtonProps" v-bind="submitButtonProps"
          type="submit" @click="onFormSubmitClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
