import { defineComponent, h, ref, type PropType } from 'vue'
import type { KnFormDataType } from '../types'
import { QToggle, type QToggleProps } from 'quasar'
import KnFormStringInputField from './fields/KnFormStringInputField'
import KnFormUnknownInputField from './fields/KnFormUnknownInputField'

const TYPE_COMPONENT_MAP: Partial<Record<KnFormDataType, any>> = {
  str: KnFormStringInputField,
}

export default defineComponent(
  (props, { emit }) => {
    const toggleProps: Omit<QToggleProps, 'modelValue'> | undefined =
      props.wrapToggle === true
        ? {
            label: props.label,
          }
        : props.wrapToggle

    const useToggle = !!toggleProps

    const toggled = ref(false)

    const componentToBeMount: any = TYPE_COMPONENT_MAP[props.dataType] ?? KnFormUnknownInputField

    const renderInputComponent = () =>
      h(componentToBeMount, {
        ...props,
        'update:modelValue': (v: any) => emit('update:modelValue', v),
      })

    return () =>
      h(
        'div',
        {
          class: 'kn-form-input-field-wrapper',
        },
        [
          JSON.stringify(props),
          useToggle
            ? h(
                'div',
                {
                  class: 'kn-form-input-field-wrapper__toggle-area',
                },
                [
                  h(QToggle, {
                    modelValue: toggled.value,
                    'onUpdate:modelValue': (v: boolean) => (toggled.value = v),
                  }),
                  toggled.value ? renderInputComponent() : undefined,
                ],
              )
            : renderInputComponent(),
        ],
      )
  },
  {
    name: 'KnFormInputFieldWrapper',
    props: {
      dataType: {
        type: String as PropType<KnFormDataType>
      },
      wrapToggle: {
        type: (Boolean || Object) as PropType<true | Omit<QToggleProps, 'modelValue'>>
      },
      label: {
        type: String as PropType<string>
      }
    }
  },
)
