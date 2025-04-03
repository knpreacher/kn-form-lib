<script lang="ts" setup>
import type {
  KnFormTextLinesInputFieldProps
} from '../../types'
import { type VModelEmitter } from '../../utils/useVModel'
import { QInput, QBtn } from 'quasar'
import { useKnFormField } from '../../helpers/useHelpers.ts'
import { useKnCustomField } from '../../utils/customFieldUtils.ts'
import { computed, ref, watch } from 'vue'
import { isEmpty } from '../../utils/jsUtils'

defineOptions({
  name: 'KnFormTextLinesInputField'
})

type InputType = string[]

const props = withDefaults(defineProps<KnFormTextLinesInputFieldProps>(), {})
const emit = defineEmits<VModelEmitter<string | undefined>>()

const { model: nativeModel } = useKnFormField(props, emit)

const inputRefs = ref<QInput[]>([])

function setInputRef(_ref: QInput | null | undefined) {
  if (!_ref) return
  if (inputRefs.value.includes(_ref)) return
  inputRefs.value.push(_ref)
}

function guessSeparator(text: string): string {
  if (text.includes('\r\n')) return '\r\n'
  return '\n'
}

const separator = props.splitBy ?? guessSeparator(nativeModel.value ?? '')

function getModelValue(v: string | undefined): InputType {
  if (!v) return ['']
  const _tmp = (v ?? '').split(separator).filter(s => !isEmpty(s))
  _tmp.push('')
  return _tmp
}

const model = ref<InputType>(getModelValue(nativeModel.value))

watch(model, (value) => {
  if (isEmpty(value)) {
    nativeModel.value = undefined
    return
  }
  const _tmp = value.filter(s => !isEmpty(s))
  if (isEmpty(_tmp)) {
    nativeModel.value = undefined
    return
  }
  nativeModel.value = _tmp.join(separator)
}, { deep: true })

watch(nativeModel, (value) => {
  model.value = getModelValue(value)
})

function onInputSubmit(value: string, index: number) {
  console.log('onInputSubmit', value, index)
  if (!value) return
  console.log(inputRefs.value[index + 1])
  inputRefs.value[index+1]?.focus()
}

const { errorMessage } = useKnCustomField(props, model)

const gutterClass = computed(()=> props.spaceSize ? `q-gutter-${props.spaceSize}` : undefined)
</script>
<template>
  <div class="kn-form-text-lines-input">
    <div class="kn-form-text-lines-input__label" v-text="label"></div>
    <div class="column" :class="gutterClass">
      <q-input
      v-for="(_, index) in model" :key="index"
      class="kn-form-text-lines-input__input"
      :ref="setInputRef"
      :autofocus="false"
      v-bind="inputProps"
      v-model="model[index]"
      @keydown.enter.stop.prevent="onInputSubmit(model[index], index)"
    >
      <template #after>
        <q-btn
          flat dense round icon="close"
          :disable="model.length === 1 || isEmpty(model[index])"
          @click="model.splice(index, 1)" />
      </template>
    </q-input>
    </div>
    <div v-if="errorMessage" v-text="errorMessage"></div>
  </div>
</template>
