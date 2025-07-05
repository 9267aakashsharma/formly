"use client";

import { useEffect } from "react";
import { BetweenHorizontalStart } from "lucide-react";

import { Field } from "../field";
import { FORM_MODES } from "./constants";
import { useFormStore } from "@/lib/store";
import { FormTitle } from "../field/form-title";
import { FIELD_MODES } from "../field-picker/constants";
import { Field as Field_Type } from "../field-picker/types";

const FormBuilder = () => {
  const { fields, insertMockFields } = useFormStore();

  // NOTE: This effect is for development purposes only.
  useEffect(() => {
    const shouldInsertMockFields =
      localStorage && localStorage.getItem("DEV") === "true";
    if (shouldInsertMockFields) insertMockFields();
  }, [insertMockFields]);

  return (
    <section className="space-y-4 flex flex-col justify-center items-center">
      <div className="py-8 flex-1 w-full sm:max-w-full md:max-w-1/2 grid grid-flow-row gap-y-4 md:gap-y-6">
        <FormTitle mode={FORM_MODES.EDIT} />
        {fields && fields.length > 0 ? (
          fields.map((field, i) => (
            <FieldItem
              field={field}
              serialNumber={i + 1}
              key={field.id || i + 1}
            />
          ))
        ) : (
          <EmptyFieldState />
        )}
      </div>
    </section>
  );
};

export { FormBuilder };

const FieldItem = ({
  field,
  serialNumber,
}: {
  field: Field_Type;
  serialNumber: number;
}) => {
  const { mode, selectedField } = useFormStore();

  const isFieldSelected = selectedField === field.id;
  const fieldMode = isFieldSelected ? FIELD_MODES.EDIT : FIELD_MODES.DRAFT;

  return (
    <Field
      field={field}
      serialNumber={serialNumber}
      mode={mode === FORM_MODES.PREVIEW ? FIELD_MODES.PREVIEW : fieldMode}
    />
  );
};

const EmptyFieldState = () => {
  return (
    <div className="min-h-[50vh] p-4 border border-foreground/20 hover:border-foreground/40 rounded-lg shadow-md flex flex-col items-center justify-center gap-y-8">
      <BetweenHorizontalStart size={64} className="text-muted-foreground" />
      <p className="text-lg text-muted-foreground">
        Drag and drop items from elements list to add here
      </p>
    </div>
  );
};
