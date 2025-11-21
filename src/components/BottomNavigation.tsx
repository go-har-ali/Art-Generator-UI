'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, X, MessageCircle } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/text-to-image", label: "Create", icon: X },
  { href: "#", label: "My Creations", icon: MessageCircle, disabled: true },
];

export const BottomNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-slate-200 bg-white px-4 py-2 md:hidden">
      {navItems.map((item) => {
        const isActive =
          item.href === "/text-to-image"
            ? pathname.startsWith("/text-to-image") || pathname.startsWith("/result")
            : pathname === item.href;
        const Icon = item.icon;

        if (item.disabled) {
          return (
            <button
              key={item.label}
              type="button"
              disabled
              className="flex flex-col items-center gap-1 text-slate-400"
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center gap-1 transition ${
              isActive
                ? "text-orange-500"
                : "text-slate-600"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

