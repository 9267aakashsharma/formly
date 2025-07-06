"use client";

import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";
import { Boxes } from "@/components/ui/background-boxes";
import Link from "next/link";

const words = ["modern", "fast", "beautiful", "accessible", "responsive"];

export default function Home() {
  return (
    <div className="h-screen relative w-full overflow-hidden bg-background flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full bg-neutral-200 dark:bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-4 z-30">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.webp"
            alt="formly"
            width={64}
            height={64}
            className="w-12 h-12 md:w-16 md:h-16"
          />
          <h3 className="text-2xl font-bold">Formly</h3>
        </div>
        <Button variant="outline">Sign Up</Button>
      </nav>
      <div className="relative z-20 mt-16 text-center text-4xl md:text-7xl mx-auto font-normal text-foreground/80">
        Build <FlipWords words={words} /> <br />
        forms in minutes
      </div>
      <div className="relative z-20 mt-4">
        <Link href="/builder">
          <Button
            size="lg"
            className="mt-4 scale-125 hover:scale-150 transition-transform duration-300"
          >
            Try me &#58;&#41;
          </Button>
        </Link>
      </div>
    </div>
  );
}
