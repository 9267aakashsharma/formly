"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";

import { FieldIcon } from "./icons";
import { Button } from "../ui/button";
import { FORM_FIELDS } from "./constants";
import { useFormStore } from "@/lib/store";
import { Form_Field_Types } from "./types";
import useMobileView from "@/hooks/useIsMobile";
import { DraggableButton } from "../ui/draggable-button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const FormFieldsPicker = () => {
  const { isMobile } = useMobileView();
  const [isExpanded, setIsExpanded] = useState(!isMobile);
  const { addField } = useFormStore();

  const handleAddField = (fieldType: Form_Field_Types) => {
    addField(fieldType);
    setIsExpanded(false);
  };

  return (
    <Popover
      open={isExpanded}
      defaultOpen={!isMobile}
      onOpenChange={setIsExpanded}
    >
      <PopoverTrigger asChild title="Add field(s)">
        <Button
          variant="secondary"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="fixed right-5 bottom-5 md:left-4 md:top-1/3 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full "
        >
          <motion.span
            initial={{ rotate: 0 }}
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex items-center justify-center w-full h-full"
          >
            <Plus
              size={isMobile ? 20 : 24}
              className="!w-5 !h-5 !md:w-6 !md:h-6"
            />
          </motion.span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        className="w-fit h-fit min-w-0 border-none bg-transparent overflow-y-hidden"
        side={isMobile ? "top" : "bottom"}
      >
        <motion.ul
          initial={{ height: 0 }}
          animate={{
            height: isExpanded ? "auto" : 0,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex flex-col items-start gap-2"
        >
          {FORM_FIELDS.map((field) => (
            <DraggableButton
              id={field.type}
              key={field.type}
              autoFocus={false}
              variant="secondary"
              title={`Click or drag to add ${field.name}`}
              onClick={() => handleAddField(field.type)}
              className="h-fit cursor-pointer flex justify-center items-center rounded-full p-0"
            >
              <div className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center">
                <FieldIcon size={isMobile ? 18 : 20} fieldType={field.type} />
              </div>
            </DraggableButton>
          ))}
        </motion.ul>
      </PopoverContent>
    </Popover>
  );
};

export { FormFieldsPicker };
