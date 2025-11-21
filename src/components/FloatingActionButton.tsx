"use client";

import { ArrowUp } from "lucide-react";

export const FloatingActionButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="hidden fixed bottom-8 right-8 z-40 h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition hover:scale-105 hover:bg-orange-600 md:flex md:bottom-12 md:right-12"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};

