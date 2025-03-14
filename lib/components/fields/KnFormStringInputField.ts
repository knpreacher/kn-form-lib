import { defineComponent, h } from "vue";
import type { KnFormStringInputFieldProps } from "../../types";
import { QInput } from "quasar";
import type { VModelComponentEmitOption } from "../../utils/useVModel";

export default defineComponent<KnFormStringInputFieldProps, VModelComponentEmitOption>(
  (
    props,
    { emit }
  ) => {
    return () =>
      h(QInput, {
        ...(props.inputProps ?? {}),
        label: props.label,
        "onUpdate:modelValue": (value: string) =>
          emit("update:modelValue", value),
      });
  }
);
