import type { KnFormDataType } from '../types.ts'
import * as fields from '../components/fields'

export const TYPE_COMPONENT_MAP: Partial<Record<KnFormDataType, any>> = Object.freeze({
  str: fields.KnFormStringInputField,
  label: fields.KnFormLabelInputField
})