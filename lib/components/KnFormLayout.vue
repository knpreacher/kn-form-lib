<script setup lang="ts">
import type { KnFormLayoutData, KnFormModelData, PreparedQuasarFormButton, ScreenBreakpoint } from '../types.ts'
import { useVModel, type VModelEmitter, type VModelProps } from '../utils/useVModel.ts'
import { computed, inject, ref } from 'vue'
import { QForm, QBtn, QSpace, type QFormChildComponent } from 'quasar'
import { getGroupProps } from '../utils/formUtils.ts'
import KnFormInputGroup from './KnFormInputGroup.vue'
import { Consts } from '../consts.ts'

defineOptions({
  name: 'KnFormLayout'
})

const isDebug = inject<boolean>(Consts.debugInjectKey, false)

// export type KnFormLayoutExpose = Partial<Pick<QForm, 'validate' | 'getValidationComponents' | 'resetValidation' | 'reset'>>
export type KnFormLayoutExpose = {
  validate: (shouldFocus?: boolean) => Promise<boolean> | undefined,
  getValidationComponents: () => QFormChildComponent[] | undefined,
  submit: () => void
}
// export type KnFormLayoutExpose = {
//   form: Ref<QForm | null>
// }

const props = defineProps<KnFormLayoutData & VModelProps<KnFormModelData>>()
const emit = defineEmits<
  VModelEmitter<KnFormModelData> & {
  'submitBeforeValidate': [data: KnFormModelData],
  'submit': [data: KnFormModelData],
  'cancel': [data: KnFormModelData],
  'reset': [data: KnFormModelData],
}
>()

const { model } = useVModel(props, emit)

const groups = computed(
  () => props.groups.map(g => getGroupProps(g, props.groupDefaults))
)

const formRef = ref<QForm | null>(null)

function exposedSubmit() {
  formRef.value?.submit()
}

function onFormSubmit(e: Event) {
  if (!(e instanceof SubmitEvent)) {
    if (props.disableValidationOnSubmit) {
      emit('submit', model.value)
    }
    return
  }
  const data = model.value
  isDebug && console.log('SUBMIT', data)
  emit('submitBeforeValidate', data)

  validate(true)?.then(value => {
    if (!value) return
    emit('submit', data)
  })
}

function onFormReset() {
  formRef.value?.resetValidation()
  emit('reset', model.value)
}

function onFormCancel() {
  emit('cancel', model.value)
}


function validate(shouldFocus?: boolean) {
  return formRef.value?.validate(shouldFocus)
}

function getValidationComponents() {
  return formRef.value?.getValidationComponents()
}

const actionButtonsGutterSizeClass = computed(
  () => props.actionButtonsGutterSize ?
    `q-gutter-${props.actionButtonsGutterSize} q-pt-${props.actionButtonsGutterSize}` :
    undefined
)

defineExpose<KnFormLayoutExpose>({
  validate,
  getValidationComponents,
  submit: exposedSubmit
})

defineSlots<{
  before: (props: {}) => void
  after: (props: {}) => any
  buttons: (
    props: {
      gutter?: ScreenBreakpoint,
      cancelButtonProps?: PreparedQuasarFormButton
      resetButtonProps?: PreparedQuasarFormButton
      submitButtonProps?: PreparedQuasarFormButton
    }
  ) => any
}>()
</script>

<template>
  <q-form
    ref="formRef"
    class="kn-form-layout" @submit.prevent.stop="onFormSubmit"
  >
    <slot name="before"></slot>
    <kn-form-input-group
      v-for="(g, g_index) in groups" :key="g.groupKey ?? `group__${g_index}`"
      v-bind="g" v-model="model"
    >
    </kn-form-input-group>
    <slot name="after"></slot>
    <slot
      name="buttons"
      v-if="useActionButtons"
      :gutter="actionButtonsGutterSize"
      :cancel-button-props="cancelButtonProps"
      :reset-button-props="resetButtonProps"
      :submit-button-props="submitButtonProps"
    >
      <div class="row items-center kn-form-layout__buttons" :class="actionButtonsGutterSizeClass">
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
          type="submit" @click="onFormSubmit"
        />
      </div>
    </slot>
  </q-form>
</template>
