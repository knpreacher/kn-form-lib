import type { KnFormDataType } from '../types.ts'
import * as fields from '../components/fields'

export const TYPE_COMPONENT_MAP: Partial<Record<KnFormDataType, any>> = Object.freeze({
  str: fields.KnFormStringInputField,
  int: fields.KnFormIntInputField,
  float: fields.KnFormFloatInputField,
  text_lines: fields.KnFormTextLinesInputField,
  label: fields.KnFormLabelInputField,
  select: fields.KnFormSelectInputField,
  radio_select: fields.KnFormRadioSelectInputField,
  select_lazy: fields.KnFormLazySelectInputField,
  inner_form: fields.KnFormInnerFormInputField
})
