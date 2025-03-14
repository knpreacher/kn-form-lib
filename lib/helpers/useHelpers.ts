import type { SharedKnFormFieldData } from '../types.ts'
import { useVModel, type VModelEmitterOption, type VModelProps } from '../utils/useVModel.ts'

export function useKnFormField<
  InputPropsType extends Record<string, any>,
  FieldType extends SharedKnFormFieldData<InputPropsType>,
  ValueClass = any
>(
  props: FieldType & VModelProps<ValueClass>,
  emit: VModelEmitterOption<ValueClass>
) {
  const { model, initial } = useVModel(props, emit, props.defaultValue)

  return {
    model, initial
  }
}