import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FieldWrapper } from "./field-wrapper";
import { Field, Field_Modes } from "../field-picker/types";
import { FIELD_MODES } from "../field-picker/constants";

interface NumberInputFieldProps {
  field: Field;
  mode: Field_Modes;
  serialNumber?: number;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const NumberInputField = ({
  mode,
  field,
  serialNumber,
  inputProps,
}: NumberInputFieldProps) => {
  return (
    <FieldWrapper mode={mode} field={field} serialNumber={serialNumber}>
      <Input
        type="number"
        required={field.required}
        data-slot="input"
        className={cn(
          "w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
          inputProps?.className
        )}
        placeholder={
          field?.placeholder || field?.defaultPlaceholder || "Enter answer..."
        }
        disabled={
          inputProps?.disabled !== undefined
            ? inputProps.disabled
            : mode !== FIELD_MODES.PREVIEW
        }
        {...inputProps}
      />
    </FieldWrapper>
  );
};
