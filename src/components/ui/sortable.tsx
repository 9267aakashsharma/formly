import React, { HTMLAttributes } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Button } from "./button";
import { GripHorizontal } from "lucide-react";

const SortableItem: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  id,
  children,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id as string });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? "10" : "auto",
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <div {...attributes} {...listeners}>
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-0.5 left-1/2 -translate-x-1/2 z-5"
        >
          <GripHorizontal />
        </Button>
      </div>
      {children}
    </div>
  );
};

export { SortableItem };
