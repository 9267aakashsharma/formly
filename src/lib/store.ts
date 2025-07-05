import { nanoid } from "nanoid";
import { create } from "zustand";

import { getDefaultFieldByType, getMockFields } from "./helpers";
import { Field, Form_Field_Types } from "@/components/field-picker/types";
import { FORM_MODES } from "@/components/form-builder/constants";
import { Form_Modes, FormMetaData } from "@/components/form-builder/types";

export interface FormState {
  mode: Form_Modes;
  selectedField: null | string;
  fields: Field[];
  formMetaData: FormMetaData;
  updateFormMetaData: (metaData: Partial<FormMetaData>) => void;
  insertMockFields: () => void;
  addField: (fieldType: Form_Field_Types) => void;
  updateAllFields: (fields: Field[]) => void;
  addFieldDuplicate: (fieldId: string) => void;
  deleteField: (fieldId: string) => void;
  updateField: (fieldId: string, updatedField: Partial<Field>) => void;
  updateSelectedFieldId: (fieldId: string | null) => void;
}

export const useFormStore = create<FormState>((set) => ({
  mode: FORM_MODES.EDIT,
  selectedField: null,
  fields: [],
  formMetaData: {
    title: "",
    description: "",
    logo: "",
    backgroundImage: "",
    themeColor: "#ffffff",
  },
  updateFormMetaData: (metaData: Partial<FormMetaData>) =>
    set((state) => ({
      formMetaData: {
        ...state.formMetaData,
        ...metaData,
      },
    })),
  insertMockFields: () => {
    const mockFields = getMockFields();
    return set({ fields: mockFields });
  },
  updateSelectedFieldId: (fieldId: string | null) =>
    set({ selectedField: fieldId }),
  addField: (fieldType) => {
    const field = getDefaultFieldByType(fieldType);
    return set((state) =>
      field
        ? { fields: [...state.fields, field], selectedField: field.id }
        : state
    );
  },
  updateAllFields: (fields) => set({ fields }),
  addFieldDuplicate: (fieldId: string) =>
    set((state) => {
      const fieldToDuplicateIndex = state.fields.findIndex(
        (field) => field.id === fieldId
      );
      if (fieldToDuplicateIndex === -1) return state;
      const fieldToDuplicate = state.fields[fieldToDuplicateIndex];
      const newField = { ...fieldToDuplicate, id: nanoid() };
      const newFields = [...state.fields];
      newFields.splice(fieldToDuplicateIndex + 1, 0, newField);
      return { fields: newFields, selectedField: newField.id };
    }),
  deleteField: (fieldId: string) =>
    set((state) => ({
      fields: state.fields.filter((field) => field.id !== fieldId),
      selectedField: null,
    })),
  updateField: (fieldId: string, updatedField: Partial<Field>) =>
    set((state) => {
      const fieldIndex = state.fields.findIndex(
        (field) => field.id === fieldId
      );
      if (fieldIndex === -1) return state;
      const updatedFields = [...state.fields];
      // @ts-expect-error TS needs to know that updatedField is a valid Field type
      updatedFields[fieldIndex] = {
        ...updatedFields[fieldIndex],
        ...updatedField,
      };
      return { fields: updatedFields };
    }),
}));
