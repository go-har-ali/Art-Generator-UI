'use client';

import { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPrompt } from "@/features/prompt/promptSlice";

type PromptFormProps = {
  placeholder?: string;
  buttonLabel?: string;
  onGenerate?: () => void;
};

export const PromptForm = ({
  placeholder = "Enter prompt here...",
  buttonLabel = "Generate",
  onGenerate,
}: PromptFormProps) => {
  const prompt = useAppSelector((state) => state.prompt.value);
  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!prompt.trim()) return;
    onGenerate?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 p-2 shadow-lg md:flex-row md:items-center"
    >
      <input
        type="text"
        value={prompt}
        onChange={(event) => dispatch(setPrompt(event.target.value))}
        placeholder={placeholder}
        className="flex-1 rounded-xl border-none bg-transparent px-5 py-3 text-base text-slate-700 outline-none placeholder:text-slate-400"
      />
      <button
        type="submit"
        className="rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-3 text-base font-semibold text-white shadow-md transition hover:opacity-90"
      >
        {buttonLabel}
      </button>
    </form>
  );
};
