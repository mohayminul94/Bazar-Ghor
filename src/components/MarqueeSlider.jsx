"use client";

import { useEffect, useState } from "react";


const toBengaliNumber = (num) => {
  if (num === null || num === undefined) return "";
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => banglaDigits[parseInt(digit, 10)]);
};

export default function MarqueeSlider() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false); 

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/products"
        );
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("API Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading || !products.length) return null;

  const marqueeItems = [...products, ...products];

  return (
    <div 
      className="relative w-full bg-[#f8faf8] border-y border-[#e2e8e3] py-2.5 overflow-hidden font-sans z-30"
      onMouseEnter={() => setIsPaused(true)} 
      onMouseLeave={() => setIsPaused(false)} 
    >
      <div 
        className="flex w-max animate-marquee"
        style={{
          animationPlayState: isPaused ? "paused" : "running", 
        }}
      >
        {marqueeItems.map((product, idx) => {
          const name = product?.nameBn || "পণ্য";
          const unit = product?.unit === "kg" ? "কেজি" : product?.unit || "কেজি";
          const price = product?.today || 0;
          const changePct = product?.change?.pct || 0;
          const isIncrease = product?.change?.dir === "up";

          return (
            <div
              key={`${product.id}-${idx}`}
              onClick={() => {
                console.log("Clicked product:", name);
              }}
              className="flex items-center gap-2 px-6 border-r border-[#e2e8e3] whitespace-nowrap text-sm font-semibold text-[#1a231e] cursor-pointer"
            >
          
              <span className="text-base shrink-0">
                {product?.image || product?.categoryIcon || "🍚"}
              </span>

             
              <span>{name}</span>

           
              <span className="text-gray-700">
                {toBengaliNumber(price)} টাকা/{unit}
              </span>

              
              <span
                className={`flex items-center gap-0.5 text-xs font-bold pl-1 ${
                  isIncrease ? "text-[#c02626]" : "text-[#1b8a43]"
                }`}
              >
                <span>{isIncrease ? "▲" : "▼"}</span>
                <span>{toBengaliNumber(Math.abs(changePct))}%</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}