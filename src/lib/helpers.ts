import { nanoid } from "nanoid";

import { DEFAULT_FIELDS } from "./constants";
import { Form_Field_Types } from "@/components/field-picker/types";

export const getMockFields = () =>
  Object.values(DEFAULT_FIELDS).map((field) => ({ ...field, id: nanoid() }));

export const getDefaultFieldByType = (type: Form_Field_Types) =>
  DEFAULT_FIELDS[type] ? { ...DEFAULT_FIELDS[type], id: nanoid() } : null;
