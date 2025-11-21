'use client';

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type AdditionalSettingsProps = {
  children?: React.ReactNode;
};

export const AdditionalSettings = ({ children }: AdditionalSettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full space-y-3">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
      >
        <span>Additional settings</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      {isOpen && (
        <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
          {children || (
            <p className="text-xs text-slate-500">No additional settings available</p>
          )}
        </div>
      )}
    </div>
  );
};

