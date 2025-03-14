import type { KnFormDataType, KnFormIntInputField, KnFormLabelInputField, KnFormStringInputField } from '../types.ts'

type DTAppend = { dataType: KnFormDataType }

function defineKnLabelField(
  options: Omit<KnFormLabelInputField, 'dataType'>
): KnFormLabelInputField {
  return Object.assign(options, { dataType: 'label' } as DTAppend) as KnFormLabelInputField
}

function defineKnFormStringField(
  options: Omit<KnFormStringInputField, 'dataType'>
): KnFormStringInputField {
  return Object.assign(options, { dataType: 'str' } as DTAppend) as KnFormStringInputField
}

function defineKnFormIntField(
  options: Omit<KnFormIntInputField, 'dataType'>
): KnFormIntInputField {
  return Object.assign(options, { dataType: 'int' } as DTAppend) as KnFormStringInputField
}

export const dh = {
  defineKnLabelField,
  defineKnFormStringField,
  defineKnFormIntField
}
