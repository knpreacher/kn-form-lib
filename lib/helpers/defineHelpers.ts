import type {
  KnFormDataType,
  KnFormFloatInputField,
  KnFormIntInputField,
  KnFormLabelInputField,
  KnFormLayoutData,
  KnFormStringInputField,
  KnFormSelectInputField,
  KnSelectDefaultOptionType,
  KnFormLazySelectInputField,
  KnFormRadioSelectInputField,
  KnFormInnerFormInputField
} from '../types.ts'
import type { AbstractLazyResourceService } from '../utils/lazyResourceService'

type DTAppend = { dataType: KnFormDataType, dataKey: string }

function defineKnFormLabelField(
  dataKey: string,
  options: Omit<KnFormLabelInputField, 'dataType' | 'dataKey'>
): KnFormLabelInputField {
  return Object.assign(options, { dataKey, dataType: 'label' } as DTAppend) as KnFormLabelInputField
}

function defineKnFormStringField(
  dataKey: string,
  options: Omit<KnFormStringInputField, 'dataType' | 'dataKey'>
): KnFormStringInputField {
  return Object.assign(options, { dataKey, dataType: 'str' } as DTAppend) as KnFormStringInputField
}

function defineKnFormIntField(
  dataKey: string,
  options: Omit<KnFormIntInputField, 'dataType' | 'dataKey'>
): KnFormIntInputField {
  return Object.assign(options, { dataKey, dataType: 'int' } as DTAppend) as KnFormIntInputField
}

function defineKnFormFloatField(
  dataKey: string,
  options: Omit<KnFormFloatInputField, 'dataType' | 'dataKey'>
): KnFormFloatInputField {
  return Object.assign(options, { dataKey, dataType: 'float' } as DTAppend) as KnFormFloatInputField
}

function defineKnFormSelectField<OptionType extends KnSelectDefaultOptionType = KnSelectDefaultOptionType>(
  dataKey: string,
  options: Omit<KnFormSelectInputField, 'dataType' | 'dataKey'>
): KnFormSelectInputField<OptionType> {
  return Object.assign(options, { dataKey, dataType: 'select' } as DTAppend) as KnFormSelectInputField<OptionType>
}

function defineKnFormRadioSelectField<OptionType extends KnSelectDefaultOptionType = KnSelectDefaultOptionType>(
  dataKey: string,
  options: Omit<KnFormRadioSelectInputField, 'dataType' | 'dataKey'>
): KnFormRadioSelectInputField<OptionType> {
  return Object.assign(options, { dataKey, dataType: 'radio_select' } as DTAppend) as KnFormRadioSelectInputField<OptionType>
}

function defineKnFormLazySelectField<
  ServiceType extends AbstractLazyResourceService,
>(
  dataKey: string,
  options: Omit<KnFormLazySelectInputField, 'dataType' | 'dataKey'>
): KnFormLazySelectInputField {
  return Object.assign(options, { dataKey, dataType: 'select_lazy' } as DTAppend) as unknown as KnFormLazySelectInputField<ServiceType>
}

function defineKnFormInnerFormField(
  dataKey: string,
  options: Omit<KnFormInnerFormInputField, 'dataType' | 'dataKey'>
): KnFormInnerFormInputField {
  return Object.assign(options, { dataKey, dataType: 'inner_form' } as DTAppend) as KnFormInnerFormInputField
}

function defineKnForm(options: KnFormLayoutData): KnFormLayoutData {
  return options
}

export default {
  defineKnFormLabelField,
  defineKnFormStringField,
  defineKnFormIntField,
  defineKnFormFloatField,
  defineKnFormSelectField,
  defineKnFormRadioSelectField,
  defineKnFormLazySelectField,
  defineKnFormInnerFormField,

  defineKnForm
}
