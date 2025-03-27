import type { AsyncValidateFn, FieldHasCustomValidationProps } from '../types.ts'
import { useFormChild } from 'quasar'
import { type Ref, ref } from 'vue'


function functionAsPromise<Fn extends (...args: any[]) => any>(f: Fn): Promise<ReturnType<Fn>> {
  return new Promise((resolve, reject) => {
    try {
      resolve(f())
    } catch (e) {
      reject(e)
    }
  })
}


type ValidationPromise = ReturnType<AsyncValidateFn>

export const useKnCustomField = <
  Props extends FieldHasCustomValidationProps = FieldHasCustomValidationProps,
  ValueType = any,
>(
  props: Props,
  model: Ref<ValueType>
) => {
  const errorMessage = ref('')
  const validate = async (): Promise<boolean> => {
    if (!props.rules) return true
    const _promises: ValidationPromise[] = props.rules.map(rFn => {
      const _r = rFn(model.value)
      if ((_r as ValidationPromise).then) {
        return _r as ValidationPromise
      }
      return functionAsPromise(() => _r) as ValidationPromise
    })

    const results = await Promise.all(_promises)

    for (const r of results) {
      if (typeof r === 'string') {
        errorMessage.value = r
        return false
      }
      if (!r) {
        errorMessage.value = '__error__'
        return false
      }
    }

    return true
  }

  const resetValidation = () => {
    console.log('resetValidation')
    errorMessage.value = ''
  }

  useFormChild({
    validate,
    resetValidation,
    requiresQForm: true
  })

  return {
    errorMessage
  }
}
