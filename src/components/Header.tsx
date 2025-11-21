'use client';

import { ChevronDown, User } from "lucide-react";
import Link from "next/link";

const menuItems = [
  { label: "Photo Editing Tools" },
  { label: "AI Tools" },
  { label: "Support" },
];

export const Header = () => {
  return (
    <header className="flex flex-col gap-4 border-b border-white/60 pb-4 md:pb-6 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent md:text-xl">
          ART GENERATOR
        </Link>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white md:hidden"
        >
          <User className="h-4 w-4" />
        </button>
      </div>

      <nav className="hidden flex-wrap items-center gap-4 text-sm font-medium text-slate-700 md:flex">
        {menuItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className="flex items-center gap-1 text-slate-700 transition hover:text-slate-900"
          >
            {item.label}
            <ChevronDown className="h-4 w-4" />
          </button>
        ))}
      </nav>

      <div className="hidden md:block">
        <button
          type="button"
          className="rounded-md bg-red-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          Sign in
        </button>
      </div>
    </header>
  );
};

