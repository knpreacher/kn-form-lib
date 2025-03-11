import { defineComponent, h } from "vue";
import type { KnFormStringInputFieldProps } from "../../types";
import { QInput } from "quasar";
import type { VModelEmitterOption } from "../../utils/useVModel";

export default defineComponent(
  (
    props: KnFormStringInputFieldProps,
    { emit }: { emit: VModelEmitterOption<string> }
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
