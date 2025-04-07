<script lang="ts" setup>
import type {
  KnFormInnerFormInputFieldProps
} from '../../types'
import { type VModelEmitter } from '../../utils/useVModel'
import { useKnFormField } from '../../helpers/useHelpers.ts'
import { useKnCustomField } from '../../utils/customFieldUtils.ts'
import KnFormInputFieldWrapper from 'lib/components/KnFormInputFieldWrapper.vue'
import { computed, ref, watch } from 'vue'
import { getFieldProps } from 'lib/utils/formUtils.ts'
import { isEmpty } from '../../utils/jsUtils'

type ValueType = { [key: string]: any } | undefined

defineOptions({
  name: 'KnFormInnerFormInputField'
})

const props = withDefaults(defineProps<KnFormInnerFormInputFieldProps>(), {})
const emit = defineEmits<VModelEmitter<ValueType>>()

const { model } = useKnFormField(props, emit)
// if (!model.value) model.value = {}
const innerModel = ref(model.value ?? {})

watch(model, (value) => {
  innerModel.value = value ?? {}
}, {deep: true})

watch(innerModel, (value)=>{
  model.value = isEmpty(value) ? undefined : value
}, {deep: true})

const fields = computed(
  () => props.fields.filter(
    // filter visible fields
    f => f.showIf?.(innerModel.value) ?? true
  ).map(
    // apply defaults
    f => getFieldProps(f as any, props.fieldDefaults)
  )
)

const { errorMessage } = useKnCustomField(props, model)

const gutterClass = computed(() => props.fieldGutter ? `q-pb-${props.fieldGutter}` : '')
const offsetStyle = computed(() => ({'margin-left': `${props.offset}px`}))
</script>
<template>
  <div class="kn-form-inner-form-input" :style="offsetStyle">
    <div>{{offsetStyle}}</div>
    <div class="kn-form-inner-form-input__label" v-text="label"></div>
    <div v-if="innerModel">
      <kn-form-input-field-wrapper
        :class="gutterClass"
        v-for="f in fields" :key="f.dataKey"
        :field-props="f"
        v-model="innerModel[f.dataKey]"
      />
    </div>
    <div v-if="errorMessage" v-text="errorMessage"></div>
  </div>
</template>
