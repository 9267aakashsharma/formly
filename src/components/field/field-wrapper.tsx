import { useCallback, useState } from "react";
import { motion } from "motion/react";
import { Copy, EllipsisVertical, Trash2 } from "lucide-react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useFormStore } from "@/lib/store";
import { Separator } from "../ui/separator";
import { FieldIcon } from "../field-picker/icons";
import { FIELD_MODES, FORM_FIELDS } from "../field-picker/constants";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Field, Field_Modes, Form_Field_Types } from "../field-picker/types";

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
    defaultLabel: fieldDefaultLabel,
    defaultPlaceholder: fieldDefaultPlaceholder,
  } = field || {};
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(false);
  const { updateSelectedFieldId, updateField } = useFormStore();

  const handleClick = useCallback(() => {
    if (mode === FIELD_MODES.DRAFT && fieldId) {
      updateSelectedFieldId(fieldId);
    }
  }, [mode, fieldId, updateSelectedFieldId]);

  const handleQuestionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (fieldId) {
        updateField(fieldId, { label: e.target.value });
      }
    },
    [fieldId, updateField]
  );

  const handlePlaceholderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (fieldId) {
        updateField(fieldId, { placeholder: e.target.value });
      }
    },
    [fieldId, updateField]
  );

  const handlePlaceholderToggle = useCallback(() => {
    if (!fieldId) return;
    if (isPlaceholderVisible) {
      updateField(fieldId, { placeholder: "" });
    } else {
      updateField(fieldId, {
        placeholder: fieldDefaultPlaceholder || "",
      });
    }
    setIsPlaceholderVisible(!isPlaceholderVisible);
  }, [fieldId, fieldDefaultPlaceholder, updateField, isPlaceholderVisible]);

  return (
    <div
      aria-selected={mode === FIELD_MODES.EDIT}
      className="min-w-[40vh] md:min-w-80 p-4 pt-6 bg-background border border-foreground/20 cursor-pointer rounded-lg shadow-md flex flex-col gap-y-4 aria-selected:border-foreground aria-selected:cursor-auto aria-selected:shadow-lg aria-selected:border-l-8 aria-selected:border-l-primary"
      onClick={handleClick}
    >
      {withTitle && (
        <div className="flex items-center justify-between">
          <h6 className="text-2xl text-foreground/60">
            <span>#</span>
            {serialNumber}
          </h6>
          <div className="flex items-center gap-x-1">
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
            <Menubar className="border-none">
              <MenubarMenu>
                <MenubarTrigger
                  title="More options"
                  className="cursor-pointer overflow-hidden rounded-full aspect-square outline-none focus:outline-none"
                >
                  <EllipsisVertical size={16} />
                </MenubarTrigger>
                <MenubarContent className="min-w-fit">
                  <MenubarItem
                    className="cursor-pointer"
                    title="Edit default placeholder"
                    onClick={handlePlaceholderToggle}
                  >
                    {isPlaceholderVisible
                      ? "Hide Placeholder"
                      : "Edit Placeholder"}
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      )}
      {mode === FIELD_MODES.EDIT ? (
        <div className="flex flex-col gap-y-2">
          <Textarea
            rows={1}
            required
            autoFocus
            id="Question"
            name="Question"
            value={fieldLabel || ""}
            onChange={handleQuestionChange}
            placeholder={fieldDefaultLabel || "Untitled Question"}
          />
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isPlaceholderVisible ? 1 : 0,
              height: isPlaceholderVisible ? "auto" : 0,
            }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-x-2 overflow-hidden"
          >
            <Input
              type="text"
              id="Placeholder"
              name="Placeholder"
              value={fieldPlaceholder || ""}
              onChange={handlePlaceholderChange}
              placeholder={fieldDefaultPlaceholder || "Edit placeholder..."}
            />
          </motion.div>
        </div>
      ) : (
        <h4 className="text-xl font-semibold">
          {fieldLabel || fieldDefaultLabel || "Untitled Question"}
          {fieldRequired && <span className="text-destructive ml-1">*</span>}
        </h4>
      )}
      {children}
      {mode === FIELD_MODES.EDIT && <FieldFooter fieldId={fieldId} />}
    </div>
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
