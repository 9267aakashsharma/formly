import { Checkbox, CheckboxProps } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { FIELD_MODES } from "../field-picker/constants";
import { Field_Modes, Field_With_Options } from "../field-picker/types";
import { FieldWrapper } from "./field-wrapper";
import { Label } from "../ui/label";
import { Options } from "./options";
import { useFormStore } from "@/lib/store";

interface CheckBoxFieldProps {
  mode: Field_Modes;
  className?: string;
  serialNumber?: number;
  field: Field_With_Options;
  checkboxProps?: CheckboxProps;
}

export const CheckBoxField = ({
  mode,
  field,
  className,
  serialNumber,
  checkboxProps,
}: CheckBoxFieldProps) => {
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
          {validOptions && validOptions.length > 0 ? (
            validOptions.map((option, index) => (
              <div className="flex items-start gap-3" key={index}>
                <Checkbox
                  id={`${option}-${index}`}
                  disabled={
                    checkboxProps?.disabled
                      ? checkboxProps.disabled
                      : mode === FIELD_MODES.DRAFT
                  }
                  {...checkboxProps}
                />
                <Label htmlFor={`${option}-${index}`}>{option}</Label>
              </div>
            ))
          ) : (
            <div className="flex items-start gap-3">
              <Checkbox disabled id="no-options" {...checkboxProps} />
              <Label htmlFor="no-options">No Options Added</Label>
            </div>
          )}
        </div>
      )}
    </FieldWrapper>
  );
};
