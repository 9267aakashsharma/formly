import { FIELD_MODES, FORM_FIELD_TYPES } from "./constants";

// NOTE: We use Sentence Snake_Case for interface and types declaration
export type Form_Field_Types =
  (typeof FORM_FIELD_TYPES)[keyof typeof FORM_FIELD_TYPES];

export interface Form_Field_Picker {
  type: Form_Field_Types;
  name: string;
  description?: string;
}

export type Field_Modes = (typeof FIELD_MODES)[keyof typeof FIELD_MODES];

export interface Base_Field {
  id: string;
  label: string;
  defaultLabel: string;
  placeholder: string;
  defaultPlaceholder: string;
  value?: string;
  required?: boolean;
}

// NOTE: Super strict type definitions are used here. Hope you like it! 😄
export type Form_Field_Types_With_Text = Extract<
  Form_Field_Types,
  "text-input" | "number-input" | "email-input" | "text-area"
>;

export type Form_Field_Types_With_Options = Extract<
  Form_Field_Types,
  "select-dropdown" | "checkbox" | "radio-button-group"
>;

export interface Field_With_Text extends Base_Field {
  type: Form_Field_Types_With_Text;
}

export interface Field_With_Options extends Base_Field {
  type: Form_Field_Types_With_Options;
  options: string[];
}

export type Field = Field_With_Text | Field_With_Options;
