import type {
  GridSizeProps,
  KnFormAbstractField,
  KnFormFieldGroup,
  KnFormFieldGroupPossibleDefaults, ScreenBreakpoint,
  SharedKnFormFieldData
} from '../types.ts'
import utils from './jsUtils.ts'
import type { VueClassObjectProp } from 'quasar'


export function getGridClass(gridProps?: GridSizeProps): VueClassObjectProp {
  if (!gridProps) return {};
  if (gridProps?.fit) return { 'col-12': true };
  const resultClass = {} as Record<string, boolean>;
  ['xs', 'sm', 'md', 'lg', 'xl'].forEach(prop => {
    const v = gridProps[prop as ScreenBreakpoint]
    if (v) {
      resultClass[`col-${prop}-${v}`] = true
    }
  })
  return resultClass;
}

export function getFieldProps<FieldType extends KnFormAbstractField>(
  fieldData: FieldType,
  groupDefaults?: Partial<Omit<SharedKnFormFieldData<FieldType>, 'dataType'>>,
): FieldType {
  if (!groupDefaults) return fieldData
  return utils.deepJoinObjects(
    groupDefaults,
    fieldData
  ) as FieldType
}

export function getGroupProps(
  groupData: KnFormFieldGroup,
  formDefaults?: KnFormFieldGroupPossibleDefaults,
): KnFormFieldGroup {
  if (!formDefaults) return groupData
  return utils.deepJoinObjects(
    formDefaults,
    groupData
  ) as KnFormFieldGroup
}