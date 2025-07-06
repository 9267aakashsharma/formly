"use client";

import Image from "next/image";

import { Button } from "../ui/button";
import { useFormStore } from "@/lib/store";
import { FormPreview } from "../form-preview";

const FormNavigation = () => {
  const { formMetaData } = useFormStore();
  return (
    <nav className="z-50 fixed top-0 backdrop-filter backdrop-blur-lg bg-background/30 w-full h-16 flex items-center justify-center">
      <div className="relative overflow-hidden w-full max-w-full md:max-w-2/3 px-4 py-2 flex justify-between items-center gap-x-4">
        <div className="flex-1 flex items-center gap-x-2 overflow-hidden">
          <Image
            src="/logo.webp"
            alt="formly"
            width={50}
            height={50}
            className="w-8 h-8 md:w-10 md:h-10"
          />
          <h1 className="text-primary text-lg md:text-2xl text-ellipsis whitespace-nowrap overflow-hidden">
            {formMetaData.title || "Untitled Form"}
          </h1>
        </div>
        <div className="shrink-0 flex items-center justify-end gap-x-2">
          <FormPreview />
          <Button>Publish</Button>
        </div>
      </div>
    </nav>
  );
};

export { FormNavigation };
