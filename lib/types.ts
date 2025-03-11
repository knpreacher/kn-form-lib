import type { QInputProps } from "quasar";
import type { VModelProps } from "./utils/useVModel";

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
  key: string;
  /**
   * Type of the field
   */
  dataType: KnFormDataType;

  /**
   * The label of the field (required) (will be passed to the input component as label prop)
   */
  label: string;

  wrapSwitch?: true | string;

  inputProps?: InputPropsType;
}

export declare type KnFormInputProps<
  Field = KnFormAbstractField,
  JsDataType = unknown
> = Omit<Field, "wrapSwitch" | "dataType"> & VModelProps<JsDataType>;

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
 * All
 */
export declare type KnFormAnyField = KnFormAbstractField;

export interface KnFormGroupField {
  /**
   * The key of the field (required)
   */
  key: string;

  /**
   * The label of the group (required)
   */
  label: string;

  /**
   * The fields of the group (required)
   */
  fields: KnFormAnyField[];
}
