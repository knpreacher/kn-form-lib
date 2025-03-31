<script setup lang="ts" generic="ValueType extends {} | undefined = undefined">
import {
  QBtn,
  QSpace,
  QDialog,
  QCard,
  QCardSection,
  QCardActions,
  QScrollArea,
  useDialogPluginComponent, type VueStyleObjectProp
} from 'quasar'
import { type KnFormDialogProps } from '../types.ts'
import KnFormLayout from '../components/KnFormLayout.vue'
import { computed, type Ref, ref } from 'vue'
import type { KnFormLayoutExpose } from './KnFormLayout.vue'

const props = withDefaults(defineProps<KnFormDialogProps>(), {
  maxWidth: '300px',
  maxHeight: '200px'
})
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

const scrollAreaStyle: VueStyleObjectProp = {
  maxHeight: props.maxHeight,
  maxWidth: props.maxWidth,
  height: '80vh',
  width: '90vw'
}

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
  <q-dialog ref="dialogRef" v-bind="dialogProps" :model-value="true">
    <q-card>
      <slot name="title" v-if="title">
        <q-card-section class="row items-center no-wrap" :style="{maxWidth}">
          <div v-text="title" class="ellipsis"></div>
          <q-space />
          <q-btn flat dense round icon="close" @click="onDialogCancel"  />
        </q-card-section>
      </slot>
      <q-scroll-area :style="scrollAreaStyle" v-bind="scrollAreaProps">
        <q-card-section :class="title ? 'q-pt-none' : ''">
          <kn-form-layout
            v-bind="formData"
            v-model="model"
            ref="formRef"
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
