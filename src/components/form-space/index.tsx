import { useDroppable } from "@dnd-kit/core";
import { BetweenHorizontalStart } from "lucide-react";

import { cn } from "@/lib/utils";
import { SPACE_ID } from "./constants";
import { FORM_FIELD_TYPES } from "../field-picker/constants";

interface DroppableFieldSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  minHeight?: string | number;
  withEmptyPlaceholder?: boolean;
}

const DroppableFieldSection = ({
  minHeight,
  children,
  className,
  withEmptyPlaceholder,
  ...props
}: DroppableFieldSectionProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: SPACE_ID,
    data: {
      accepts: Object.values(FORM_FIELD_TYPES),
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn("", className)}
      style={{ ...props.style, minHeight }}
      {...props}
    >
      {children}
      {withEmptyPlaceholder && (
        <div
          className={cn(
            "min-h-[30vh] p-4 border hover:border-foreground/40 rounded-lg shadow-md flex flex-col items-center justify-center gap-y-8",
            {
              "border-foreground/40 bg-foreground/10": isOver,
              "border-foreground/20 bg-background": !isOver,
            }
          )}
        >
          <BetweenHorizontalStart size={64} className="text-muted-foreground" />
          <p className="text-lg text-muted-foreground">
            Drag and drop items from elements list to add here
          </p>
        </div>
      )}
    </div>
  );
};

export { DroppableFieldSection };
