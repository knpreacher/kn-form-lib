import KnFormStringInputField from "./components/fields/KnFormStringInputField.vue";
import KnFormInputFieldWrapper from "./components/KnFormInputFieldWrapper";
import FormLayout from "./components/FormLayout.vue";
import "./types";
export interface KnForm {
  fields: any[];
}

export interface KnFormGenerator {
  create(): KnForm;
}

export const KnForm: KnFormGenerator = {
  create(): KnForm {
    return {
      fields: [],
    };
  },
};

export { FormLayout, KnFormInputFieldWrapper, KnFormStringInputField };
