import { defineComponent, h } from "vue";
import type { KnFormAnyFieldProps } from "../../types";
import type { VModelComponentEmitOption } from "../../utils/useVModel";

export default defineComponent<KnFormAnyFieldProps, VModelComponentEmitOption>(
  (props) => {
    return () =>
      h(
        "div",
        { class: "kn-form-input__unknown" },
        `No defined input component for type "${props.dataType}"`
      );
  }
);
