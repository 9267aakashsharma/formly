import { nanoid } from "nanoid";

import { Field, Form_Field_Types } from "@/components/field-picker/types";
import { FORM_FIELD_TYPES } from "@/components/field-picker/constants";

export const TEXT_FIELD_TYPE: Field = {
  id: nanoid(),
  type: FORM_FIELD_TYPES.TEXT_INPUT,
  label: "",
  placeholder: "Text Input Question",
  required: false,
};

export const NUMBER_FIELD_TYPE: Field = {
  id: nanoid(),
  type: FORM_FIELD_TYPES.NUMBER_INPUT,
  label: "",
  placeholder: "Number Input Question",
  required: false,
};

export const EMAIL_FIELD_TYPE: Field = {
  id: nanoid(),
  type: FORM_FIELD_TYPES.EMAIL_INPUT,
  label: "",
  placeholder: "Email Input Question",
  required: false,
};

export const TEXTAREA_FIELD_TYPE: Field = {
  id: nanoid(),
  type: FORM_FIELD_TYPES.TEXTAREA,
  label: "",
  placeholder: "Text Area Question",
  required: false,
};

export const SELECT_DROPDOWN_FIELD_TYPE: Field = {
  id: nanoid(),
  type: FORM_FIELD_TYPES.SELECT_DROPDOWN,
  label: "",
  placeholder: "Select Dropdown Question",
  required: false,
  options: [],
};

export const CHECKBOX_FIELD_TYPE: Field = {
  id: nanoid(),
  type: FORM_FIELD_TYPES.CHECKBOX,
  label: "",
  placeholder: "Checkbox Question",
  required: false,
  options: [],
};

export const RADIO_BUTTON_GROUP_FIELD_TYPE: Field = {
  id: nanoid(),
  type: FORM_FIELD_TYPES.RADIO_BUTTON_GROUP,
  label: "",
  placeholder: "Radio Button Group Question",
  required: false,
  options: [],
};

export const DEFAULT_FIELDS: {
  [key in Form_Field_Types]: Field;
} = {
  [FORM_FIELD_TYPES.TEXT_INPUT]: TEXT_FIELD_TYPE,
  [FORM_FIELD_TYPES.NUMBER_INPUT]: NUMBER_FIELD_TYPE,
  [FORM_FIELD_TYPES.EMAIL_INPUT]: EMAIL_FIELD_TYPE,
  [FORM_FIELD_TYPES.TEXTAREA]: TEXTAREA_FIELD_TYPE,
  [FORM_FIELD_TYPES.SELECT_DROPDOWN]: SELECT_DROPDOWN_FIELD_TYPE,
  [FORM_FIELD_TYPES.CHECKBOX]: CHECKBOX_FIELD_TYPE,
  [FORM_FIELD_TYPES.RADIO_BUTTON_GROUP]: RADIO_BUTTON_GROUP_FIELD_TYPE,
};
