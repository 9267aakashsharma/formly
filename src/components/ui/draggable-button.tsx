import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { Button, ButtonProps } from "./button";

function DraggableButton({ id, children, ...props }: ButtonProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id as string,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      {...props}
    >
      {children}
    </Button>
  );
}

export { DraggableButton };
