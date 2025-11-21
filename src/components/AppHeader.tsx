'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";

const tabs = [
  { href: "/text-to-image", label: "Text to image" },
  { href: "#", label: "Image to image", disabled: true },
  { href: "#", label: "AI Avatar", disabled: true },
  { href: "#", label: "Face Swap", disabled: true },
];

export const AppHeader = () => {
  const pathname = usePathname();

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
      <Link href="/" className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
        ART GENERATOR
      </Link>

      <nav className="flex flex-wrap items-center gap-2 text-sm font-medium">
        {tabs.map((tab) => {
          const isActive =
            tab.href !== "#" && (pathname === tab.href || pathname.startsWith(tab.href + "?"));
          return tab.disabled ? (
            <span
              key={tab.label}
              className="rounded-full bg-slate-100 px-4 py-2 text-slate-400"
            >
              {tab.label}
            </span>
          ) : (
            <Link
              key={tab.label}
              href={tab.href}
              className={`rounded-full px-4 py-2 transition ${
                isActive
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                  : "bg-slate-100 text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white">
        <User className="h-4 w-4" />
      </button>
    </header>
  );
};

