"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setPrompt } from "@/features/prompt/promptSlice";

type InspirationItem = {
  id: number;
  title: string;
  image: string;
};

export const InspirationGrid = () => {
  const [items, setItems] = useState<InspirationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const loadInspirations = async () => {
      try {
        const response = await fetch("/api/inspirations");
        const json = await response.json();
        setItems(json.data);
      } catch (err) {
        setError("Failed to load inspirations.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadInspirations();
  }, []);

  const handleSelect = (title: string) => {
    dispatch(setPrompt(title));
    router.push("/text-to-image?auto=1");
  };

  return (
    <section className="space-y-4 md:space-y-8">
      <h2 className="text-center text-2xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
        Inspirations
      </h2>
      {loading && (
        <div className="grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div
              key={idx}
              className="h-48 animate-pulse rounded-2xl bg-slate-100 md:h-64"
            />
          ))}
        </div>
      )}
      {error && (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-center text-sm text-red-600">
          {error}
        </p>
      )}
      {!loading && !error && (
        <div className="grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.slice(0, 12).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item.title)}
              className="group relative overflow-hidden rounded-xl md:rounded-2xl border border-slate-200 bg-white text-left shadow-md transition hover:shadow-lg"
            >
              <div className="relative aspect-square w-full">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-slate-100 text-xs text-slate-400">
                    Image unavailable
                  </div>
                )}
                {/* Text Overlay for Mobile */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-2.5 md:hidden">
                  <p className="text-xs font-medium text-white leading-tight line-clamp-2">
                    {item.title}
                  </p>
                </div>
              </div>
              {/* Text Below for Desktop */}
              <div className="hidden px-4 py-3 md:block">
                <p className="text-sm text-slate-700">
                  A painting of a woman with long hairs
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

