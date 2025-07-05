import { CheckBoxField } from "./check-box-field";
import { EmailInputField } from "./email-input-field";
import { FORM_FIELD_TYPES } from "../field-picker/constants";
import { InputField } from "./input-field";
import { NumberInputField } from "./number-input-field";
import { RadioButtonField } from "./radio-button-field";
import { SelectField } from "./select-field";
import { TextAreaField } from "./text-area-field";

import type {
  Field as Field_Type,
  Field_Modes,
  Field_With_Options,
  Field_With_Text,
} from "../field-picker/types";

interface FieldProps {
  mode: Field_Modes;
  field: Field_Type;
  serialNumber?: number;
}

const Field = ({ field, ...props }: FieldProps) => {
  switch (field.type) {
    case FORM_FIELD_TYPES.TEXT_INPUT:
      return <InputField field={field as Field_With_Text} {...props} />;
    case FORM_FIELD_TYPES.NUMBER_INPUT:
      return <NumberInputField field={field as Field_With_Text} {...props} />;
    case FORM_FIELD_TYPES.EMAIL_INPUT:
      return <EmailInputField field={field as Field_With_Text} {...props} />;
    case FORM_FIELD_TYPES.TEXTAREA:
      return <TextAreaField field={field as Field_With_Text} {...props} />;
    case FORM_FIELD_TYPES.SELECT_DROPDOWN:
      return <SelectField field={field as Field_With_Options} {...props} />;
    case FORM_FIELD_TYPES.CHECKBOX:
      return <CheckBoxField field={field as Field_With_Options} {...props} />;
    case FORM_FIELD_TYPES.RADIO_BUTTON_GROUP:
      return (
        <RadioButtonField field={field as Field_With_Options} {...props} />
      );
    default:
      return null;
  }
};

export { Field };
