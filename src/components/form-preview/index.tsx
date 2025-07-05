import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Field } from "../field";
import { Button } from "../ui/button";
import { useFormStore } from "@/lib/store";
import { Separator } from "../ui/separator";
import { FormTitle } from "../field/form-title";
import { FORM_MODES } from "../form-builder/constants";
import { FIELD_MODES } from "../field-picker/constants";
import { BetweenHorizontalStart } from "lucide-react";

const FormPreview = () => {
  const { fields } = useFormStore();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Preview</Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-full md:max-w-2/3 border-foreground/30 py-4 px-6 overflow-auto">
        <SheetTitle className="text-4xl">Preview</SheetTitle>
        <SheetDescription>
          This is how your form will look like to everyone else
        </SheetDescription>
        <Separator />
        <div>
          <FormTitle mode={FORM_MODES.PREVIEW} />
          <Separator className="w-4/5"></Separator>
          <div className="mt-4 md:mt-6 grid grid-flow-row gap-y-4 md:gap-y-6">
            {fields && fields.length > 0 ? (
              fields.map((field, i) => (
                <Field
                  key={field.id || i + 1}
                  field={field}
                  mode={FIELD_MODES.PREVIEW}
                  serialNumber={i + 1}
                />
              ))
            ) : (
              <EmptyPreviewState />
            )}
          </div>
          <div className="my-4 md:my-6 flex justify-between items-start">
            <Button>Share</Button>
            <Button variant="ghost" size="sm" disabled>
              Clear form
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { FormPreview };

const EmptyPreviewState = () => {
  return (
    <div className="min-h-[50vh] p-4 border border-foreground/20 hover:border-foreground/40 rounded-lg shadow-md flex flex-col items-center justify-center gap-y-8">
      <BetweenHorizontalStart size={64} className="text-muted-foreground" />
      <p className="text-lg text-muted-foreground">
        Make changes to the form in the editor to see them here.
      </p>
    </div>
  );
};
