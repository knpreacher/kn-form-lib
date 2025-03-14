import type {
  QIconProps,
  QInputProps,
  QToggleProps,
  VueClassProp,
} from "quasar";
import type { VModelProps } from "./utils/useVModel";

/**
 * Screen and sizing
 */

export declare type ScreenBreakpoint = "xs" | "sm" | "md" | "lg" | "xl";
export declare type ScreenBreakpointSize = number;

export declare type FlexItemsAlign =
  | "center"
  | "start"
  | "end"
  | "stretch"
  | "baseline";

export declare type GridSizeProps = Partial<{
  [key in ScreenBreakpoint]: ScreenBreakpointSize | undefined;
}> & {
  fit?: boolean;
};

export declare type GutterSizeProps =
  | {
      x?: ScreenBreakpoint;
      y?: ScreenBreakpoint;
    }
  | ScreenBreakpoint;
/**
 * Dom extra
 */
export declare type DomExtraProps = Partial<{
  bindAttrs: Record<string, unknown>;
  itemClass: VueClassProp;
}>;

/**
 * Data typing
 */

export declare type KnFormDataType =
  | "label"
  | "str"
  | "int"
  | "float"
  | "bool"
  | "bool_switch";

export interface KnFormAbstractField<InputPropsType = object> {
  /**
   * The key of the field (required)
   */
  dataKey: string;
  /**
   * Type of the field
   */
  dataType: KnFormDataType;

  /**
   * The label of the field (required) (will be passed to the input component as label prop)
   */
  label?: string;

  wrapToggle?: true | Omit<QToggleProps, "modelValue">;
  untoggledValue?: any;

  inputProps?: InputPropsType;
}

export declare type KnFormInputProps<
  Field = KnFormAbstractField,
  JsDataType = unknown
> = Omit<Field, "dataKey"> & VModelProps<JsDataType>;

export declare type PreparedQuasarFieldProps<T extends { label?: string }> =
  Omit<T, "label">;
/**
 * String input field
 */
export declare type KnFormStringInputField = KnFormAbstractField<
  PreparedQuasarFieldProps<QInputProps>
>;
export declare type KnFormStringInputFieldProps = KnFormInputProps<
  KnFormStringInputField,
  string
>;
/**
 * String input field
 */
export declare type KnFormIntInputField = KnFormAbstractField<
  PreparedQuasarFieldProps<QInputProps>
>;
export declare type KnFormIntInputFieldProps = KnFormInputProps<
  KnFormIntInputField,
  number
>;

/**
 * All
 */
export declare type KnFormAnyField =
  | KnFormStringInputField
  | KnFormIntInputField;
export declare type KnFormAnyFieldProps =
  | KnFormStringInputFieldProps
  | KnFormIntInputFieldProps;

export interface KnFormFieldGroup {
  /**
   * The label of the group (required)
   */
  label?: string;

  iconProps?: QIconProps;

  expandable?: boolean;

  /**
   * The fields of the group (required)
   */
  fields: KnFormAnyField[];
}
