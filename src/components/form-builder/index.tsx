"use client";

import { useEffect, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { BetweenHorizontalStart } from "lucide-react";

import { Field } from "../field";
import { FORM_MODES } from "./constants";
import { useFormStore } from "@/lib/store";
import { FormTitle } from "../field/form-title";
import { FIELD_MODES } from "../field-picker/constants";
import { Field as Field_Type } from "../field-picker/types";
import { SortableItem } from "../ui/sortable";

const FormBuilder = () => {
  const [draggedField, setDraggedField] = useState<{
    field: Field_Type;
    serialNumber: number;
  } | null>(null);
  const { fields, insertMockFields, updateAllFields } = useFormStore();
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    if (!active?.id) {
      console.warn("Drag started without a valid active item id");
      return;
    }
    const fieldIndex = fields.findIndex((f) => f.id === active.id);
    if (fieldIndex === -1) {
      console.warn("Field not found for id:", active.id);
      return;
    }
    const field = fields[fieldIndex];
    if (!field) {
      console.warn("Field is undefined for id:", active.id);
      return;
    }
    const serialNumber = fieldIndex + 1;
    setDraggedField({ field, serialNumber });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active?.id && over?.id && active.id !== over.id) {
      let [oldIndex, newIndex] = [-1, -1];
      const fieldsArray = Array.isArray(fields) ? [...fields] : [];
      fieldsArray.forEach((field, index) => {
        if (field.id === active.id) oldIndex = index;
        if (field.id === over.id) newIndex = index;
      });

      if (oldIndex === -1 || newIndex === -1) {
        console.warn("Invalid drag indices", { oldIndex, newIndex });
        return;
      }

      const newFields = arrayMove(fieldsArray, oldIndex, newIndex);
      updateAllFields(newFields);
    }
  }

  // NOTE: This effect is for development purposes only.
  useEffect(() => {
    const shouldInsertMockFields =
      localStorage && localStorage.getItem("DEV") === "true";
    if (shouldInsertMockFields) insertMockFields();
  }, [insertMockFields]);

  return (
    <section className="space-y-4 flex flex-col justify-center items-center">
      <div className="py-8 flex-1 w-full sm:max-w-full md:max-w-1/2 grid grid-flow-row gap-y-4 md:gap-y-6">
        <FormTitle mode={FORM_MODES.EDIT} />
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          collisionDetection={closestCenter}
        >
          {fields && fields.length > 0 ? (
            <SortableContext
              items={fields.map((field) => field.id)}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, i) => (
                <SortableItem id={field.id} key={field.id || i + 1}>
                  <FieldItem field={field} serialNumber={i + 1} />
                </SortableItem>
              ))}
            </SortableContext>
          ) : (
            <EmptyFieldState />
          )}
          <DragOverlay>
            {draggedField ? <FieldItem {...draggedField} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </section>
  );
};

export { FormBuilder };

const FieldItem = ({
  field,
  serialNumber,
}: {
  field: Field_Type;
  serialNumber: number;
}) => {
  const { mode, selectedField } = useFormStore();

  const isFieldSelected = selectedField === field.id;
  const fieldMode = isFieldSelected ? FIELD_MODES.EDIT : FIELD_MODES.DRAFT;

  return (
    <Field
      field={field}
      serialNumber={serialNumber}
      mode={mode === FORM_MODES.PREVIEW ? FIELD_MODES.PREVIEW : fieldMode}
    />
  );
};

const EmptyFieldState = () => {
  return (
    <div className="min-h-[50vh] p-4 border border-foreground/20 hover:border-foreground/40 rounded-lg shadow-md flex flex-col items-center justify-center gap-y-8">
      <BetweenHorizontalStart size={64} className="text-muted-foreground" />
      <p className="text-lg text-muted-foreground">
        Drag and drop items from elements list to add here
      </p>
    </div>
  );
};
