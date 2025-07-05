import React, { HTMLAttributes } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Button } from "./button";
import { GripHorizontal } from "lucide-react";

const SortableItem: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  id,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id as string });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="relative">
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-0.5 left-1/2 -translate-x-1/2 z-10"
        >
          <GripHorizontal />
        </Button>
      </div>
      {children}
    </div>
  );
};

export { SortableItem };
