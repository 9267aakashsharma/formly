import { FormBuilder } from "@/components/form-builder";
import { FormNavigation } from "@/components/form-navigation";

export default function BuilderPage() {
  return (
    <div className="flex flex-col h-screen">
      <FormNavigation />
      <main className="pt-10 px-2 md:px-0 flex-1 overflow-y-auto overflow-x-hidden">
        <FormBuilder />
      </main>
    </div>
  );
}
