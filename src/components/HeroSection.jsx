"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import HeroImage from "@/assets/bazar-hero.png"; // Ensure the image is in the correct path

const HeroSection = () => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      const date = new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
      });
      setFormattedDate(date);
    });

    return () => cancelAnimationFrame(handle);
  }, []);

  return (
    <section className="bg-[#f0f5f1] px-4 py-3">
      <div className="flex mx-auto container rounded-3xl border border-[#dfe8e0] bg-[#fbfdfb] p-6 space-x-0 md:space-x-6 flex-col md:flex-row items-center justify-between">
        <div>
          <span className="inline-flex rounded-full bg-[#e1f2e8] px-3 py-1 text-sm font-medium text-[#078a43]">
            {formattedDate || "আজকের তারিখ"}
          </span>

          <h1 className="mt-3 text-3xl font-bold text-[#222923]">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-3 text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <a
            href="#products"
            className="mt-6 inline-flex rounded-lg bg-green-700 px-5 py-2.5 font-semibold text-white shadow-md transition hover:bg-green-800"
          >
            সব পণ্য দেখুন
          </a>
        </div>
        <div>
          <Image 
            src={HeroImage} 
            alt="Hero Image" 
            width={400} 
            height={400} 
            priority // Added priority to optimize Largest Contentful Paint (LCP)
            className="mx-auto mt-6 rounded-lg" 
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;