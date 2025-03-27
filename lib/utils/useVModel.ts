import type {Ref} from 'vue';
import {type DefineProps, ref, watch} from 'vue';

export const MODEL_DEFAULT_EMIT = 'update:modelValue'

export declare type VModelEmitter<T = unknown> = { 'update:modelValue': [value: T] }
export declare type VModelEmitterOption<T = unknown> = ((evt: 'update:modelValue', value: T) => void)
export declare type VModelComponentEmitOption<T = unknown> = { 'update:modelValue': (value: T) => void }
export declare type VModelProps<T = unknown> = { modelValue: T, defaultValue?: T }
export declare type VModelPartialProps<T = unknown> = Partial<VModelProps<T>>


function getModelValue(value: any, _default: any = undefined) {
  if (typeof value === 'number') {
    if (Number.isNaN(value)) return _default
    return value
  }
  if (typeof value === 'boolean') {
    return value
  }
  if (typeof value === 'string') {
    return value
  }
  return value ?? _default
}

function getInitialValue(value: any, _default: any = undefined) {
  const mv = getModelValue(value, _default)
  if (typeof mv === 'undefined') return mv
  return mv
}

/**
 * App mixin to produce v-model interface
 * @param props - component props provided by defineProps()
 * @param emit - component emit provided by defineEmits()
 * @param _default - default value if property value unset
 */
export function useVModel<T = unknown>(
  props: VModelProps<T> | DefineProps<VModelProps<T>, any> | VModelPartialProps<T> | DefineProps<VModelPartialProps<T>, any>,
  emit: VModelEmitterOption<T>,
  _default: T | undefined = undefined
): { model: Ref<T>, initial: Ref<T> } {
  // TODO assign default value correctly
  const initial = getInitialValue(props.modelValue, props?.defaultValue ?? _default)
  const model = ref<T>(getModelValue(props.modelValue, props?.defaultValue ?? _default)) as unknown as Ref<T>
  watch(model, (value) => {
    emit(MODEL_DEFAULT_EMIT, value as T)
  }, {
    deep: true
  })
  watch(() => props.modelValue, (value) => {
    model.value = value as T
  }, {
    deep: true
  })
  return {
    model, initial
  }
}
