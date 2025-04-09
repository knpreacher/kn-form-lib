import type {
  QBtnProps, QDialogProps,
  QField, QFieldProps,
  QIconProps,
  QInputProps, QItemProps, QOptionGroupProps, QPopupProxyProps, QScrollAreaProps, QSelectProps,
  QToggleProps,
  VueClassProp
} from 'quasar'
import type { VModelProps } from './utils/useVModel'
import type { AbstractLazyResourceService } from './utils/lazyResourceService.ts'

/**
 * Screen and sizing
 */

export declare type ScreenBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export declare type ScreenBreakpointSize = number

export declare type FlexItemsAlign =
  | 'center'
  | 'start'
  | 'end'
  | 'stretch'
  | 'baseline'

export declare type GridSizeProps = Partial<{
  [key in ScreenBreakpoint]: ScreenBreakpointSize | undefined
}> & {
  fit?: boolean
}

export interface GutterSizeObject {
  x?: ScreenBreakpointSize
  y?: ScreenBreakpointSize
}

export declare type GutterSizeProps = GutterSizeObject | ScreenBreakpoint
/**
 * Dom extra
 */
export declare type DomExtraProps = Partial<{
  bindAttrs: Record<string, unknown>
  itemClass: VueClassProp
}>

/**
 * Data typing
 */

export declare type KnFormDataType =
  | 'label'
  | 'computed'
  | 'str'
  | 'int'
  | 'float'
  | 'bool'
  | 'bool_switch'
  | 'text_lines'
  | 'select'
  | 'radio_select'
  | 'select_lazy'
  | 'inner_form'

//
// Utilities
//
export type ValidateFn = (value: any) => boolean | string
export type AsyncValidateFn = (value: any) => Promise<ReturnType<ValidateFn>>

export type FieldHasCustomValidationProps = {
  rules?: (AsyncValidateFn | ValidateFn)[],
}

export type KnFormModelData = Record<string, any>

export declare type FieldShowConditionFunction<T extends KnFormModelData = KnFormModelData> = (allData: T) => boolean

export interface KnFieldSlotData {
  text?: string
  icon?: QIconProps | string
  html?: string
  component?: any,
  componentProps?: any
}

export interface KnFieldSlotDataObject {
  text?: string
  icon?: QIconProps
  html?: string
  component?: any,
  componentProps?: any
}

type DefaultCommonSlotNames =
  'outLabel' | 'outLabelText' | 'outLabelAppend' | 'outLabelPrepend' | 'outLabelAppendSide' |
  'label' | 'prepend' | 'prependInner' | 'append' | 'appendInner' | 'header' | 'footer'

export interface KnFormAbstractField<
  DataType extends KnFormDataType = 'label',
  InputPropsType = Record<string, any>,
  SlotNames extends string = DefaultCommonSlotNames,
  // SlotsType = Record<string, KnFieldSlotData>
> {
  /**
   * The key of the field (required)
   */
  dataKey: string
  /**
   * Type of the field
   */
  dataType: DataType

  /**
   * The label of the field (required) (will be passed to the input component as label prop)
   */
  label?: string
  useOutLabel?: boolean
  gridSize?: GridSizeProps
  wrapToggle?: true | Omit<QToggleProps, 'modelValue'>
  untoggledValue?: any

  prepareValue?: <In = any, Out = any>(value: In) => Out

  showIf?: FieldShowConditionFunction<Record<string, any>>

  inputProps?: InputPropsType,
  slots?: Partial<Record<SlotNames, KnFieldSlotData | string>>
}

export declare type KnSelectDefaultOptionType = {
  value: string
  label?: string
  disable?: boolean,
  leftIcon?: QIconProps,
  rightIcon?: QIconProps,
}

export declare type SharedKnFormFieldData<Field = KnFormAbstractField> = Omit<Field, 'dataKey'>

export declare type KnFormInputProps<
  Field = KnFormAbstractField,
  JsDataType = unknown
> = SharedKnFormFieldData<Field> & VModelProps<JsDataType> & {
  allData?: Record<string, any>
}

export declare type PreparedQuasarFieldProps<T extends { label?: string, modelValue?: any }> =
  Omit<T, 'label' | 'modelValue'>
/**
 * Label input field
 */
export declare type KnFormLabelInputField = KnFormAbstractField<'label', {}>
export declare type KnFormLabelInputFieldProps = KnFormInputProps<
  KnFormLabelInputField,
  string
>
/**
 * Computed input field
 */
export declare type KnFormComputedInputField = KnFormAbstractField<
  'computed',
  PreparedQuasarFieldProps<QFieldProps>
> & {
  getter: (allData: Record<string, any> | undefined) => any
}
export declare type KnFormComputedInputFieldProps = KnFormInputProps<
  KnFormComputedInputField,
  any
>
/**
 * String input field
 */
export declare type KnFormStringInputField = KnFormAbstractField<
  'str',
  PreparedQuasarFieldProps<QInputProps>
>
export declare type KnFormStringInputFieldProps = KnFormInputProps<
  KnFormStringInputField,
  string
>
/**
 * Int input field
 */
export declare type KnFormIntInputField = KnFormAbstractField<
  'int',
  PreparedQuasarFieldProps<QInputProps>
>
export declare type KnFormIntInputFieldProps = KnFormInputProps<
  KnFormIntInputField,
  number
>
/**
 * Float input field
 */
export declare type KnFormFloatInputField = KnFormAbstractField<
  'float',
  PreparedQuasarFieldProps<QInputProps>
>
export declare type KnFormFloatInputFieldProps = KnFormInputProps<
  KnFormFloatInputField,
  number
>
/**
 * Text lines input field
 */
export declare type SplitTextOption = '\r\n' | '\n' | string
export declare type KnFormTextLinesInputField = KnFormAbstractField<
  'text_lines',
  PreparedQuasarFieldProps<QInputProps>
> & FieldHasCustomValidationProps & {
  splitBy?: SplitTextOption,
  spaceSize?: ScreenBreakpoint
}
export declare type KnFormTextLinesInputFieldProps = KnFormInputProps<
  KnFormTextLinesInputField,
  string | undefined
>
/**
 * Select input field
 */
export declare type KnFormSelectInputField<OptionType extends KnSelectDefaultOptionType = KnSelectDefaultOptionType> =
  KnFormAbstractField<
    'select',
    PreparedQuasarFieldProps<Omit<QSelectProps, 'options' | 'mapOptions'>>
  >
  & {
  options: OptionType[],
  returnObject?: boolean,
}
export declare type KnFormSelectInputFieldProps<
  OptionType extends KnSelectDefaultOptionType = KnSelectDefaultOptionType,
  ValueType = any
> = KnFormInputProps<
  KnFormSelectInputField<OptionType>,
  ValueType
>
/**
 * Radio select input field
 */
export declare type KnFormRadioSelectInputField<OptionType extends KnSelectDefaultOptionType = KnSelectDefaultOptionType> =
  KnFormAbstractField<
    'radio_select',
    PreparedQuasarFieldProps<Omit<QOptionGroupProps, 'options'>>
  >
  & FieldHasCustomValidationProps & {
  options: OptionType[],
  returnObject?: boolean,
}
export declare type KnFormRadioSelectInputFieldProps<
  OptionType extends KnSelectDefaultOptionType = KnSelectDefaultOptionType,
  ValueType = any
> = KnFormInputProps<
  KnFormRadioSelectInputField<OptionType>,
  ValueType
>
/**
 * Lazy select input field
 */
export declare type KnFormLazySelectInputField<
  ServiceType extends AbstractLazyResourceService = AbstractLazyResourceService
> =
  KnFormAbstractField<
    'select_lazy',
    PreparedQuasarFieldProps<Omit<QField, 'loading'>>
  >
  & {
  resourceService: ServiceType,
  popupProxyProps?: Omit<QPopupProxyProps, 'modelValue' | 'onUpdate:modelValue'>,
  returnObject?: boolean,
  optionsHeight?: number,
  optionsMenuWidth?: string,
  itemProps?: Omit<QItemProps, 'clickable' | 'active'>
}
export declare type KnFormLazySelectInputFieldProps<
  ValueType = any
> = KnFormInputProps<
  KnFormLazySelectInputField,
  ValueType
>
//
// Inner form
//
export declare type KnFormInnerFormInputField = KnFormAbstractField<
  'inner_form',
  {}
> & FieldHasCustomValidationProps & {
  fieldGutter?: ScreenBreakpoint
  offset?: number
  fieldDefaults?: Omit<SharedKnFormFieldData, 'dataType'>
  fields: KnFormAnyField[]
}
export declare type KnFormInnerFormInputFieldProps = KnFormInputProps<
  KnFormInnerFormInputField,
  { [key: string]: any } | undefined
>
/**
 * All
 */
export declare type KnFormAnyField =
  | KnFormLabelInputField
  | KnFormComputedInputField
  | KnFormStringInputField
  | KnFormIntInputField
  | KnFormFloatInputField
  | KnFormTextLinesInputField
  | KnFormSelectInputField
  | KnFormRadioSelectInputField
  | KnFormLazySelectInputField
  | KnFormInnerFormInputField
export declare type KnFormAnyFieldProps =
  | KnFormLabelInputFieldProps
  | KnFormComputedInputFieldProps
  | KnFormStringInputFieldProps
  | KnFormIntInputFieldProps
  | KnFormFloatInputFieldProps
  | KnFormTextLinesInputFieldProps
  | KnFormSelectInputFieldProps
  | KnFormRadioSelectInputFieldProps
  | KnFormLazySelectInputFieldProps
  | KnFormInnerFormInputFieldProps

export interface KnFormFieldGroup {
  /**
   * The label of the group (required)
   */
  label?: string
  groupKey?: string
  iconProps?: QIconProps

  expandable?: boolean
  expanded?: boolean
  /**
   * Pass as default to all fields
   */
  gridSize?: GridSizeProps
  gutterSize?: GutterSizeProps

  /**
   * The fields of the group (required)
   */
  fieldDefaults?: Omit<SharedKnFormFieldData, 'dataType'>,
  fields: KnFormAnyField[]
}

export declare type KnFormFieldGroupPossibleDefaults = Partial<Omit<KnFormFieldGroup, 'fields' | 'groupKey'>>

export interface KnFormFieldGroupProps extends KnFormFieldGroup {
  headerPadding?: ScreenBreakpoint
}

export type PreparedQuasarFormButton = Omit<QBtnProps, 'type' | 'disable' | 'onClick' | 'to' | 'target' | 'href'>

export interface KnFormLayoutData {
  /**
   * The groups of the form (required)
   */
  groups: KnFormFieldGroup[]

  /**
   * Pass as default to all groups
   */
  groupDefaults?: Partial<Omit<KnFormFieldGroupProps, 'fields'>>

  useActionButtons?: boolean
  actionButtonsGutterSize?: ScreenBreakpoint
  disableValidationOnSubmit?: boolean

  submitButtonProps?: PreparedQuasarFormButton,
  resetButtonProps?: PreparedQuasarFormButton,
  cancelButtonProps?: PreparedQuasarFormButton
}

export interface KnFormDialogProps {
  formData: KnFormLayoutData,
  initialValue?: any,
  title?: string,
  maxWidth?: string,
  maxHeight?: string,
  dialogProps?: Omit<QDialogProps, 'modelValue' | 'onUpdate:modelValue'>
  scrollAreaProps?: QScrollAreaProps
}
