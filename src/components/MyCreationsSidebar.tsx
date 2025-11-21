'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

type InspirationItem = {
  id: number;
  title: string;
  image: string;
};

export const MyCreationsSidebar = () => {
  const [items, setItems] = useState<InspirationItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/inspirations");
        const json = await response.json();
        setItems(json.data.slice(0, 4));
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
  }, []);

  const handleDelete = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <aside className="hidden w-48 flex-shrink-0 flex-col gap-4 border-r border-slate-100 pr-4 lg:flex">
      <h3 className="text-sm font-semibold text-slate-800">My Creations</h3>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-2xl border border-slate-200"
          >
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                width={160}
                height={160}
                className="aspect-square w-full object-cover"
              />
            ) : (
              <div className="flex aspect-square w-full items-center justify-center bg-slate-100 text-xs text-slate-400">
                Preview
              </div>
            )}
            <button
              onClick={() => handleDelete(item.id)}
              className="absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition hover:bg-red-600 group-hover:opacity-100"
              aria-label="Delete creation"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};

