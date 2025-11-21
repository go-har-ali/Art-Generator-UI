'use client';

import { PromptForm } from "./PromptForm";
import { useRouter } from "next/navigation";

export const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center gap-6 md:gap-8 text-center">
      <div className="space-y-3 md:space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 md:text-5xl lg:text-6xl">
          AI Art Generator
        </h1>
        <p className="mx-auto max-w-3xl text-sm text-slate-600 md:text-base lg:text-lg">
          Create awe-inspiring masterpieces effortlessly and explore the endless possibilities of AI generated art. Enter a prompt, and choose a style, AI art generator bring your ideas to life!
        </p>
      </div>

      <div className="w-full max-w-4xl">
        <PromptForm
          placeholder="Enter prompt here..."
          buttonLabel="Generate"
          onGenerate={() => router.push("/text-to-image")}
        />
      </div>
    </section>
  );
};

