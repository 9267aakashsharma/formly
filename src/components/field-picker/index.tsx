"use client";

import { useMemo } from "react";

import { FieldIcon } from "./icons";
import { FORM_FIELDS } from "./constants";
import { useFormStore } from "@/lib/store";
import { Form_Field_Types } from "./types";
import { FloatingDock } from "../ui/floating-dock";

const FormFieldsPicker = () => {
  const { addField } = useFormStore();
  const actionItems = useMemo(() => {
    return FORM_FIELDS.map((field) => ({
      title: field.name,
      icon: <FieldIcon fieldType={field.type} />,
      id: field.type,
    }));
  }, []);

  const handleAddField = (fieldType: Form_Field_Types) => {
    addField(fieldType);
  };

  return (
    <FloatingDock
      items={actionItems}
      mobileClassName="fixed right-5 bottom-1 z-50"
      desktopClassName="fixed bottom-5 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
      onClickItem={(itemId) => handleAddField(itemId as Form_Field_Types)}
    />
  );
};

export { FormFieldsPicker };
