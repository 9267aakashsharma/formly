"use client";

import { useCallback, useEffect, useState } from "react";
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

import { Field } from "../field";
import { FORM_MODES } from "./constants";
import { useFormStore } from "@/lib/store";
import { SortableItem } from "../ui/sortable";
import { FormTitle } from "../field/form-title";
import { SPACE_ID } from "../form-space/constants";
import { FormFieldsPicker } from "../field-picker";
import { getDefaultFieldByType } from "@/lib/helpers";
import { DroppableFieldSection } from "../form-space";
import { FIELD_MODES, FORM_FIELD_TYPES } from "../field-picker/constants";
import { Field as Field_Type, Form_Field_Types } from "../field-picker/types";

const FormBuilder = () => {
  const [newDraggedFieldType, setNewDraggedFieldType] =
    useState<Form_Field_Types | null>(null);
  const [draggedField, setDraggedField] = useState<{
    field: Field_Type;
    serialNumber: number;
  } | null>(null);
  const { fields, insertMockFields, updateAllFields, addField } =
    useFormStore();
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

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event;
      if (!active?.id) {
        console.warn("Drag started without a valid active item id");
        return;
      }
      if (
        Object.values(FORM_FIELD_TYPES).includes(active.id as Form_Field_Types)
      ) {
        setNewDraggedFieldType(active.id as Form_Field_Types);
        setDraggedField(null);
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
    },
    [setNewDraggedFieldType, setDraggedField, fields]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      try {
        const { active, over } = event;
        console.log("Drag Ended:", { active, over });
        if (active?.id && over?.id && active.id !== over.id) {
          if (newDraggedFieldType && active.id === newDraggedFieldType) {
            addField(
              newDraggedFieldType,
              over?.id === SPACE_ID ? null : (over?.id as string)
            );
          } else {
            let [oldIndex, newIndex] = [-1, -1];
            const fieldsArray = Array.isArray(fields) ? [...fields] : [];
            fieldsArray.forEach((field, index) => {
              if (field.id === active.id) oldIndex = index;
              if (field.id === over.id) newIndex = index;
            });

            if (oldIndex === -1 || newIndex === -1)
              throw new Error("Invalid drag indices");
            const newFields = arrayMove(fieldsArray, oldIndex, newIndex);
            updateAllFields(newFields);
          }
        }
      } catch (error) {
        console.error("Error during drag end:", error);
      } finally {
        setNewDraggedFieldType(() => null);
        setDraggedField(() => null);
      }
    },
    [
      newDraggedFieldType,
      setNewDraggedFieldType,
      setDraggedField,
      fields,
      updateAllFields,
      addField,
    ]
  );

  // NOTE: This effect is for development purposes only.
  useEffect(() => {
    const shouldInsertMockFields =
      localStorage && localStorage.getItem("DEV") === "true";
    if (shouldInsertMockFields) insertMockFields();
  }, [insertMockFields]);

  return (
    <section className="space-y-4 flex flex-col justify-center items-center">
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        collisionDetection={closestCenter}
      >
        <FormFieldsPicker />
        <div className="pt-8 w-full max-w-full md:max-w-1/2 flex-1 flex flex-col gap-y-4 md:gap-y-6">
          <FormTitle mode={FORM_MODES.EDIT} />
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
        </div>
        <DroppableFieldSection
          withEmptyPlaceholder={!fields || !fields.length}
          minHeight={`calc(70vh / ${fields.length || 1})`}
          className="shrink-0 w-full max-w-full md:max-w-1/2 "
        />
        <DragOverlay>
          {draggedField ? <FieldItem {...draggedField} /> : null}
          <NewFieldDragOverlay type={newDraggedFieldType} />
        </DragOverlay>
      </DndContext>
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

const NewFieldDragOverlay = ({ type }: { type: Form_Field_Types | null }) => {
  const newField = type ? getDefaultFieldByType(type) : null;
  return newField ? (
    <div className="w-full">
      <FieldItem field={newField} serialNumber={0} />
    </div>
  ) : null;
};
