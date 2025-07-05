import { FORM_MODES } from "./constants";

export type Form_Modes = (typeof FORM_MODES)[keyof typeof FORM_MODES];

export interface FormMetaData {
  title: string;
  description?: string;
  logo?: string;
  backgroundImage?: string;
  themeColor?: string;
}
