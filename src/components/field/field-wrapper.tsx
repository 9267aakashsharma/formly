import { Copy, GripHorizontal, Trash2 } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { Field, Field_Modes, Form_Field_Types } from "../field-picker/types";
import { FIELD_MODES, FORM_FIELDS } from "../field-picker/constants";
import { useFormStore } from "@/lib/store";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Badge } from "../ui/badge";
import { FieldIcon } from "../field-picker/icons";

interface FieldWrapperProps {
  withTitle?: boolean;
  serialNumber?: number;
  mode: Field_Modes;
  field?: Field;
  children: React.ReactNode;
}

const getFieldTypeLabel = (fieldType?: Form_Field_Types) => {
  const fieldLabel = FORM_FIELDS.find(
    (field) => field.type === fieldType
  )?.name;
  return fieldLabel || "Unknown Field Type";
};

const FieldWrapper = ({
  mode,
  children,
  field,
  serialNumber,
  withTitle = true,
}: FieldWrapperProps) => {
  const {
    id: fieldId,
    type: fieldType,
    label: fieldLabel,
    required: fieldRequired,
    placeholder: fieldPlaceholder,
  } = field || {};
  const { updateSelectedField, updateField } = useFormStore();

  const handleClick = () => {
    if (mode === FIELD_MODES.DRAFT && fieldId) {
      updateSelectedField(fieldId);
    }
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (fieldId) {
      updateField(fieldId, { label: e.target.value });
    }
  };

  return (
    <section className="relative w-full">
      {mode !== FIELD_MODES.PREVIEW && (
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-0.5 left-1/2 -translate-x-1/2 z-10"
        >
          <GripHorizontal />
        </Button>
      )}
      <div
        aria-selected={mode === FIELD_MODES.EDIT}
        className="p-4 pt-6 border border-foreground/20 cursor-pointer rounded-lg shadow-md flex flex-col gap-y-4 aria-selected:border-foreground aria-selected:cursor-auto aria-selected:shadow-lg aria-selected:border-l-8 aria-selected:border-l-primary"
        onClick={handleClick}
      >
        {withTitle && (
          <div className="flex items-center justify-between">
            <h6 className="text-2xl text-foreground/60">
              <span>#</span>
              {serialNumber}
            </h6>
            <Badge variant="secondary">
              {fieldType && (
                <FieldIcon
                  size={20}
                  label={fieldLabel}
                  fieldType={fieldType}
                  className="mr-1"
                />
              )}{" "}
              {getFieldTypeLabel(fieldType)}
            </Badge>
          </div>
        )}
        {mode === FIELD_MODES.EDIT ? (
          <Input
            autoFocus
            type="text"
            placeholder={fieldPlaceholder || "Untitled Question"}
            value={fieldLabel || ""}
            onChange={handleQuestionChange}
          />
        ) : (
          <h4 className="text-xl font-semibold">
            {fieldLabel || fieldPlaceholder || "Untitled Question"}
            {fieldRequired && <span className="text-red-500 ml-1">*</span>}
          </h4>
        )}
        {children}
        {mode === FIELD_MODES.EDIT && <FieldFooter fieldId={fieldId} />}
      </div>
    </section>
  );
};

export { FieldWrapper };

const FieldFooter = ({ fieldId }: { fieldId?: string }) => {
  const { deleteField, addFieldDuplicate, updateField } = useFormStore();

  const handleDelete = () => {
    if (fieldId) {
      deleteField(fieldId);
    }
  };

  const handleDuplicate = () => {
    if (fieldId) {
      addFieldDuplicate(fieldId);
    }
  };

  const handleMarkAsRequired = (checked: boolean) => {
    if (fieldId) {
      updateField(fieldId, { required: checked });
    }
  };

  return (
    <>
      <Separator />
      <div className="flex items-stretch justify-end space-x-2">
        <div className="flex items-center justify-between space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="cursor-pointer"
                onClick={handleDuplicate}
              >
                <Copy />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Duplicate question</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="cursor-pointer"
                onClick={handleDelete}
              >
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete question</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Separator orientation="vertical" className="h-[unset] mx-4" />
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" onCheckedChange={handleMarkAsRequired} />
          <Label htmlFor="airplane-mode">Required</Label>
        </div>
      </div>
    </>
  );
};
