import { useFormStore } from "@/lib/store";
import { FORM_MODES } from "../form-builder/constants";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Form_Modes } from "../form-builder/types";
import { cn } from "@/lib/utils";

const FormTitle = ({ mode }: { mode: Form_Modes }) => {
  const {
    selectedField,
    formMetaData,
    updateFormMetaData,
    updateSelectedFieldId,
  } = useFormStore();
  const isSelected = mode === FORM_MODES.EDIT && selectedField === null;

  const handleClick = () => {
    if (mode === FORM_MODES.EDIT) {
      updateSelectedFieldId(null);
    }
  };

  return (
    <div
      aria-selected={isSelected}
      className={cn(
        "h-fit rounded-lg flex flex-col gap-y-4 aria-selected:border-foreground aria-selected:cursor-auto aria-selected:shadow-lg aria-selected:border-t-8 aria-selected:border-t-primary",
        {
          "px-0 py-4 border-none cursor-auto": mode === FORM_MODES.PREVIEW,
          "px-4 py-4 border border-foreground/20 shadow-md cursor-pointer":
            isSelected,
        }
      )}
      onClick={handleClick}
    >
      {isSelected ? (
        <>
          <Input
            value={formMetaData.title || ""}
            placeholder="Untitled Form"
            onChange={(e) => updateFormMetaData({ title: e.target.value })}
            className="w-full"
            autoFocus
          />
          <Textarea
            value={formMetaData.description || ""}
            placeholder="Add description"
            onChange={(e) =>
              updateFormMetaData({ description: e.target.value })
            }
            className="w-full"
          />
        </>
      ) : (
        <>
          <h1 className="text-3xl">{formMetaData.title || "Untitled Form"}</h1>
          {formMetaData.description && (
            <p className="text-xl text-muted-foreground">
              {formMetaData.description}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export { FormTitle };
