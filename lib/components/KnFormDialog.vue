<script setup lang="ts" generic="ValueType extends {} | undefined = undefined">
import { QBtn, QSpace, useDialogPluginComponent } from 'quasar';
import { type KnFormLayoutData } from '../types.ts';
import KnFormLayout from '../components/KnFormLayout.vue';
import { computed, type Ref, ref } from 'vue';
import type { KnFormLayoutExpose } from './KnFormLayout.vue';

const props = defineProps<{
  formData: KnFormLayoutData,
  initialValue?: Partial<KnFormLayoutData>
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

const model: Ref<Required<ValueType>> = ref(initialValue)

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
</script>

<template>
  <q-dialog ref="dialogRef" :model-value="true">
    <q-card>
      <q-card-section>Title</q-card-section>
      <q-card-section>
        <kn-form-layout
          v-bind="formData"
          v-model="model"
          @submit="onFormSubmit"
        >
          <template #buttons></template>
        </kn-form-layout>
      </q-card-section>
      <q-card-actions>
        <div class="row items-center kn-form-layout__buttons" :class="actionButtonsGutterSizeClass">
          <q-btn
            v-if="cancelButtonProps" v-bind="cancelButtonProps"
            type="button" @click="onFormCancel"
          />
          <q-space/>
          <q-btn
            v-if="resetButtonProps" v-bind="resetButtonProps"
            type="reset" @click="onFormReset"
          />
          <q-btn
            v-if="submitButtonProps" v-bind="submitButtonProps"
            type="submit" @click="onFormSubmitClick"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
