import { Form_Field_Picker } from "./types";

// NOTE: 1. We did not use enums here on-purpose as they increase runtime overhead, along with several other disadvantages. Read more here - https://dev.to/ivanzm123/dont-use-enums-in-typescript-they-are-very-dangerous-57bh
//       2. We use CAPITAL SNAKE_CASE for constants as a convention
export const FORM_FIELD_TYPES = {
  TEXT_INPUT: "text-input",
  NUMBER_INPUT: "number-input",
  EMAIL_INPUT: "email-input",
  TEXTAREA: "text-area",
  SELECT_DROPDOWN: "select-dropdown",
  CHECKBOX: "checkbox",
  RADIO_BUTTON_GROUP: "radio-button-group",
} as const;

export const FIELD_MODES = {
  DRAFT: "draft",
  EDIT: "edit",
  PREVIEW: "preview",
} as const;

export const FORM_FIELDS: Form_Field_Picker[] = [
  {
    type: FORM_FIELD_TYPES.TEXT_INPUT,
    name: "Text input",
    description: "Single line text input for short responses",
  },
  {
    type: FORM_FIELD_TYPES.NUMBER_INPUT,
    name: "Number input",
    description: "Input field for numeric values",
  },
  {
    type: FORM_FIELD_TYPES.EMAIL_INPUT,
    name: "Email input",
    description: "Input field for email addresses",
  },
  {
    type: FORM_FIELD_TYPES.TEXTAREA,
    name: "Text area",
    description: "Multi-line text input for longer responses",
  },
  {
    type: FORM_FIELD_TYPES.SELECT_DROPDOWN,
    name: "Select dropdown",
    description: "Dropdown menu for selecting one option from a list",
  },
  {
    type: FORM_FIELD_TYPES.CHECKBOX,
    name: "Checkbox",
    description: "Checkbox for binary choices (yes/no)",
  },
  {
    type: FORM_FIELD_TYPES.RADIO_BUTTON_GROUP,
    name: "Radio button group",
    description:
      "Group of radio buttons for selecting one option from multiple choices",
  },
];
