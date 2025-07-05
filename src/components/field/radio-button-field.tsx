import { cn } from "@/lib/utils";
import { FIELD_MODES } from "../field-picker/constants";
import { Field_Modes, Field_With_Options } from "../field-picker/types";
import { FieldWrapper } from "./field-wrapper";
import { Label } from "../ui/label";
import { Options } from "./options";
import { RadioGroup, RadioGroupItem, RadioGroupProps } from "../ui/radio-group";
import { useFormStore } from "@/lib/store";

interface RadioButtonFieldProps {
  mode: Field_Modes;
  className?: string;
  serialNumber?: number;
  disabled?: boolean;
  field: Field_With_Options;
  radioGroupProps?: RadioGroupProps;
}

export const RadioButtonField = ({
  mode,
  field,
  disabled,
  className,
  serialNumber,
  radioGroupProps,
}: RadioButtonFieldProps) => {
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
        <div
          className={cn(
            "grid grid-cols-1 grid-flow-row gap-y-3",
            {
              "pointer-events-none": mode === FIELD_MODES.DRAFT,
              "pointer-events-auto": mode !== FIELD_MODES.DRAFT,
            },
            className
          )}
        >
          <RadioGroup>
            {validOptions && validOptions.length > 0 ? (
              validOptions.map((option, index) => (
                <div key={option} className="flex items-center gap-3">
                  <RadioGroupItem
                    id={`${option}-${index}`}
                    value={option}
                    disabled={
                      disabled !== undefined
                        ? disabled
                        : mode === FIELD_MODES.DRAFT
                    }
                    {...radioGroupProps}
                  />
                  <Label htmlFor={`${option}-${index}`}>{option}</Label>
                </div>
              ))
            ) : (
              <div className="flex items-start gap-3">
                <RadioGroupItem
                  value="no-option"
                  disabled
                  id="no-options"
                  {...radioGroupProps}
                />
                <Label htmlFor="no-options">No Options Added</Label>
              </div>
            )}
          </RadioGroup>
        </div>
      )}
    </FieldWrapper>
  );
};
