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
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="focus-visible:outline-none flex items-center justify-center w-fit h-fit"
    >
      <Button id={id} {...props}>
        {children}
      </Button>
    </div>
  );
}

export { DraggableButton };
