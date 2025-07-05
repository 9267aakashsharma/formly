import { cn } from "@/lib/utils";
import { FieldWrapper } from "./field-wrapper";
import { Field, Field_Modes } from "../field-picker/types";
import { FIELD_MODES } from "../field-picker/constants";
import { Textarea } from "../ui/textarea";

interface TextAreaFieldProps {
  field: Field;
  mode: Field_Modes;
  serialNumber?: number;
  textAreaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export const TextAreaField = ({
  mode,
  field,
  serialNumber,
  textAreaProps,
}: TextAreaFieldProps) => {
  return (
    <FieldWrapper mode={mode} field={field} serialNumber={serialNumber}>
      <Textarea
        required={field.required}
        data-slot="input"
        className={cn(
          "w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
          textAreaProps?.className
        )}
        placeholder={textAreaProps?.placeholder || "Enter answer..."}
        disabled={
          textAreaProps?.disabled !== undefined
            ? textAreaProps.disabled
            : mode !== FIELD_MODES.PREVIEW
        }
        {...textAreaProps}
      />
    </FieldWrapper>
  );
};
