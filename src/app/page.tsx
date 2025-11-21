import { BottomNavigation } from "@/components/BottomNavigation";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { InspirationGrid } from "@/components/InspirationGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50/30 to-pink-50/50 px-4 py-6 text-slate-900 md:px-8 md:py-12 pb-20 md:pb-12">
      <main className="glass-panel mx-auto flex max-w-7xl flex-col gap-8 md:gap-12 rounded-[32px] border border-white/70 p-4 md:p-6 lg:p-10 shadow-[0_25px_80px_rgba(82,63,255,0.15)]">
        <Header />
        <HeroSection />
        <InspirationGrid />
        <FloatingActionButton />
      </main>
      <BottomNavigation />
    </div>
  );
}
