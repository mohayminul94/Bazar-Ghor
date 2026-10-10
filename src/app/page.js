import HeroSection from "@/components/HeroSection";
import MarketPriceTrends from "@/components/MarketPriceTrends";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center font-sans text-gray-500">লোড হচ্ছে...</div>}>
        <HeroSection />
        <MarketPriceTrends />
      </Suspense>
    </>
  );
}
