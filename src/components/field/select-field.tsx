import * as SelectPrimitive from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldWrapper } from "./field-wrapper";
import { Field_Modes, Field_With_Options } from "../field-picker/types";
import { FIELD_MODES } from "../field-picker/constants";
import { Options } from "./options";
import { useFormStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface SelectFieldProps {
  mode: Field_Modes;
  serialNumber?: number;
  field: Field_With_Options;
  placeholder?: string;
  selectProps?: React.ComponentProps<typeof SelectPrimitive.Root>;
}

export const SelectField = ({
  mode,
  field,
  selectProps,
  placeholder,
  serialNumber,
}: SelectFieldProps) => {
  const { options } = field || {};
  const { updateField } = useFormStore();

  const validOptions = Array.isArray(options)
    ? options.filter((opt) => opt.trim() !== "")
    : [];

  const handleOptionsChange = (options: string[]) => {
    updateField(field.id, { options });
  };

  return (
    <FieldWrapper mode={mode} field={field} serialNumber={serialNumber}>
      {mode === FIELD_MODES.EDIT ? (
        <Options options={options} onChange={handleOptionsChange} />
      ) : (
        <Select
          {...selectProps}
          required={field.required}
          disabled={mode === FIELD_MODES.DRAFT}
        >
          <SelectTrigger
            className={cn("w-full", {
              "pointer-events-none": mode === FIELD_MODES.DRAFT,
              "pointer-events-auto": mode !== FIELD_MODES.DRAFT,
            })}
          >
            <SelectValue placeholder={placeholder || "Select answer..."} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {validOptions && validOptions.length > 0 ? (
                validOptions.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="not-available" disabled>
                  No options available
                </SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </FieldWrapper>
  );
};
