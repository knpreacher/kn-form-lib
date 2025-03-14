import type { KnFormDataType } from '../types.ts'
import KnFormStringInputField from '../components/fields/KnFormStringInputField.vue'

export const TYPE_COMPONENT_MAP: Partial<Record<KnFormDataType, any>> = Object.freeze({
  str: KnFormStringInputField
})