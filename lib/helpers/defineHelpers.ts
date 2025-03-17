import type {
  KnFormDataType,
  KnFormFloatInputField,
  KnFormIntInputField,
  KnFormLabelInputField,
  KnFormLayoutData,
  KnFormStringInputField,
} from '../types.ts'

type DTAppend = { dataType: KnFormDataType }

function defineKnLabelField(
  options: Omit<KnFormLabelInputField, 'dataType'>,
): KnFormLabelInputField {
  return Object.assign(options, { dataType: 'label' } as DTAppend) as KnFormLabelInputField
}

function defineKnFormStringField(
  options: Omit<KnFormStringInputField, 'dataType'>,
): KnFormStringInputField {
  return Object.assign(options, { dataType: 'str' } as DTAppend) as KnFormStringInputField
}

function defineKnFormIntField(options: Omit<KnFormIntInputField, 'dataType'>): KnFormIntInputField {
  return Object.assign(options, { dataType: 'int' } as DTAppend) as KnFormIntInputField
}

function defineKnFormFloatField(
  options: Omit<KnFormFloatInputField, 'dataType'>,
): KnFormFloatInputField {
  return Object.assign(options, { dataType: 'float' } as DTAppend) as KnFormFloatInputField
}

function defineKnForm(options: KnFormLayoutData): KnFormLayoutData {
  return options
}

export default {
  defineKnLabelField,
  defineKnFormStringField,
  defineKnFormIntField,
  defineKnFormFloatField,

  defineKnForm,
}
