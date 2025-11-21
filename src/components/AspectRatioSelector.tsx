'use client';

import { Square, RectangleVertical, RectangleHorizontal, Image as ImageIcon } from "lucide-react";

type AspectRatio = '1:1' | '2:3' | '3:2' | '3:4' | '4:3';

type AspectRatioOption = {
  value: AspectRatio;
  label: string;
  icon: React.ReactNode;
};

const aspectRatios: AspectRatioOption[] = [
  { value: '1:1', label: '1:1 Square', icon: <Square className="h-4 w-4" /> },
  { value: '2:3', label: '2:3 Portrait', icon: <RectangleVertical className="h-4 w-4" /> },
  { value: '3:2', label: '3:2 Post', icon: <RectangleHorizontal className="h-4 w-4" /> },
  { value: '3:4', label: '3:4 Reel', icon: <RectangleVertical className="h-4 w-4" /> },
  { value: '4:3', label: '4:3 Cover', icon: <ImageIcon className="h-4 w-4" /> },
];

type AspectRatioSelectorProps = {
  value: AspectRatio;
  onChange: (value: AspectRatio) => void;
};

export const AspectRatioSelector = ({ value, onChange }: AspectRatioSelectorProps) => {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {aspectRatios.map((ratio) => (
          <button
            key={ratio.value}
            type="button"
            onClick={() => onChange(ratio.value)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition ${
              value === ratio.value
                ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {ratio.icon}
            <span>{ratio.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

