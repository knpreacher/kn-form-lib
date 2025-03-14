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

export interface KnFormAbstractField<InputPropsType = object> {
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

  inputProps?: InputPropsType
}

export declare type KnFormInputProps<
  Field = KnFormAbstractField,
  JsDataType = unknown
> = Omit<Field, 'dataKey'> & VModelProps<JsDataType>

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
  fields: KnFormAnyField[]
}

export type KnFormModelData = Record<string, any>
