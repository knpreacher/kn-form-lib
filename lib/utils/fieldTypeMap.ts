import type { KnFormDataType } from '../types.ts'
import * as fields from '../components/fields'

export const TYPE_COMPONENT_MAP: Partial<Record<KnFormDataType, any>> = Object.freeze({
  label: fields.KnFormLabelInputField,
  computed: fields.KnFormComputedInputField,
  str: fields.KnFormStringInputField,
  int: fields.KnFormIntInputField,
  float: fields.KnFormFloatInputField,
  bool_toggle: fields.KnFormToggleBoolInputField,
  text_lines: fields.KnFormTextLinesInputField,
  select: fields.KnFormSelectInputField,
  toggle_select: fields.KnFormToggleSelectInputField,
  radio_select: fields.KnFormRadioSelectInputField,
  select_lazy: fields.KnFormLazySelectInputField,
  inner_form: fields.KnFormInnerFormInputField
})
