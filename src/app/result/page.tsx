'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Share2, Download, User } from "lucide-react";
import { useEffect } from "react";

import { BottomNavigation } from "@/components/BottomNavigation";
import { useAppSelector } from "@/store/hooks";

export default function ResultPage() {
  const { imageUrl, prompt } = useAppSelector(
    (state) => state.generation
  );
  const router = useRouter();

  useEffect(() => {
    if (!imageUrl) {
      router.replace("/text-to-image");
    }
  }, [imageUrl, router]);

  const handleShare = async () => {
    if (!imageUrl) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "AI Art Generator Result",
          text: prompt,
          url: imageUrl,
        });
      } else {
        await navigator.clipboard.writeText(imageUrl);
        alert("Image link copied to clipboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = async () => {
    if (!imageUrl) return;
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ai-art.png";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  if (!imageUrl) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50/40 to-pink-50 px-4 py-6 pb-24 text-slate-900 md:px-8">
      <div className="mx-auto flex max-w-md flex-col gap-6">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent"
          >
            ART GENERATOR
          </Link>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white">
            <User className="h-4 w-4" />
          </button>
        </header>

        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Result
        </button>

        <div className="space-y-4 rounded-3xl bg-white p-4 shadow-lg">
          <div className="overflow-hidden rounded-3xl border border-slate-100">
            <div className="relative aspect-square w-full">
              <Image
                src={imageUrl}
                alt="Generated artwork"
                fill
                sizes="320px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-500">Prompt</p>
            <p className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
              {prompt}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleShare}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-orange-400 bg-white py-3 text-sm font-semibold text-orange-500"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 py-3 text-sm font-semibold text-white"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}

