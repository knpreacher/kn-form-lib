import type {
  QIconProps,
  QInputProps,
  QToggleProps,
  VueClassProp
} from 'quasar'
import type { VModelProps } from './utils/useVModel'

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
  | 'str'
  | 'int'
  | 'float'
  | 'bool'
  | 'bool_switch'

export type KnFormModelData = Record<string, any>

export declare type FieldShowConditionFunction<T extends KnFormModelData = KnFormModelData> = (allData: T) => boolean

export interface KnFormAbstractField<InputPropsType = Record<string, any>> {
  /**
   * The key of the field (required)
   */
  dataKey: string
  /**
   * Type of the field
   */
  dataType: KnFormDataType

  /**
   * The label of the field (required) (will be passed to the input component as label prop)
   */
  label?: string
  gridSize?: GridSizeProps
  wrapToggle?: true | Omit<QToggleProps, 'modelValue'>
  untoggledValue?: any

  showIf?: FieldShowConditionFunction<Record<string, any>>

  inputProps?: InputPropsType
}

export declare type SharedKnFormFieldData<Field = KnFormAbstractField> = Omit<Field, 'dataKey'>

export declare type KnFormInputProps<
  Field = KnFormAbstractField,
  JsDataType = unknown
> = SharedKnFormFieldData<Field> & VModelProps<JsDataType>

export declare type PreparedQuasarFieldProps<T extends { label?: string }> =
  Omit<T, 'label'>
/**
 * Label input field
 */
export declare type KnFormLabelInputField = KnFormAbstractField<{}>
export declare type KnFormLabelInputFieldProps = KnFormInputProps<
  KnFormLabelInputField,
  string
>
/**
 * String input field
 */
export declare type KnFormStringInputField = KnFormAbstractField<
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
  PreparedQuasarFieldProps<QInputProps>
>
export declare type KnFormIntInputFieldProps = KnFormInputProps<
  KnFormIntInputField,
  number
>

/**
 * All
 */
export declare type KnFormAnyField =
  | KnFormLabelInputField
  | KnFormStringInputField
  | KnFormIntInputField
export declare type KnFormAnyFieldProps =
  | KnFormLabelInputFieldProps
  | KnFormStringInputFieldProps
  | KnFormIntInputFieldProps

export interface KnFormFieldGroup {
  /**
   * The label of the group (required)
   */
  label?: string
  groupKey?: string
  iconProps?: QIconProps

  expandable?: boolean
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

export interface KnFormLayoutData {
  /**
   * The groups of the form (required)
   */
  groups: KnFormFieldGroup[]

  /**
   * Pass as default to all groups
   */
  groupDefaults?: Partial<Omit<KnFormFieldGroupProps, 'fields'>>

}
