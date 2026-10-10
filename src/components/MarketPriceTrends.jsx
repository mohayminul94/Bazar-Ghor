"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const toBengaliNumber = (num) => {
  if (num === null || num === undefined) return "";
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => banglaDigits[parseInt(digit, 10)]);
};

export default function MarketPriceTrends() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/products",
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

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-500 font-medium">
        বাজারের তথ্য লোড হচ্ছে...
      </div>
    );
  }

  const increasedProducts = products.filter(
    (item) => item.change?.dir === "up",
  );

  const decreasedProducts = products.filter(
    (item) => item.change?.dir === "down",
  );

  const filteredAllProducts = products.filter((product) => {
    const matchesSearch = product.nameBn
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: "all", name: "সব পণ্য" },
    ...Array.from(new Set(products.map((p) => p.category))).map((cat) => {
      const match = products.find((p) => p.category === cat);
      return { id: cat, name: match?.categoryNameBn || cat };
    }),
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-14 font-sans">
      {increasedProducts.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-900">
            <span className="text-red-700 text-sm">▲</span>
            <h2>আজ দাম বেড়েছে</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {increasedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="block"
              >
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {decreasedProducts.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-900">
            <span className="text-green-700 text-sm">▼</span>
            <h2>আজ দাম কমেছে</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {decreasedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="block"
              >
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        </section>
      )}

      <section id="products" className="pt-6 border-t border-gray-200/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1f2923]">সকল পণ্য</h2>
            <p className="text-sm text-gray-500 mt-1">
              বাজারের সকল পণ্যের তালিকা এবং বর্তমান দরদাম
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="পণ্য খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition"
            />
            <span className="absolute left-3.5 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? "bg-[#118B44] text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {filteredAllProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAllProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="block"
              >
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            কোনো পণ্য পাওয়া যায়নি।
          </div>
        )}
      </section>
    </div>
  );
}

function ProductCard({ product }) {
  const name = product?.nameBn || "পণ্য";
  const unit =
    product?.unit === "kg" ? "প্রতি কেজি" : `প্রতি ${product?.unit || "কেজি"}`;
  const price = product?.today || 0;
  const changePct = product?.change?.pct || 0;
  const isIncrease = product?.change?.dir === "up";

  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="bg-[#f8faf8] border border-[#e8eee9] rounded-[24px] p-5 w-full shadow-sm flex flex-col justify-between hover:shadow-md transition-all cursor-pointer">
        
        {/* আইকন ও নাম */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-[#f0f4f1] rounded-[18px] flex items-center justify-center shrink-0 text-3xl">
            {product?.image || product?.categoryIcon || "🧅"}
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#1f2923] leading-tight">
              {name}
            </h3>
            <p className="text-[#64748b] text-sm mt-0.5 font-normal">
              {unit}
            </p>
          </div>
        </div>

        {/* দাম ও পার্সেন্টেজ পিল */}
        <div className="mt-6 flex items-end justify-between">
          <div>
            <span className="text-[#64748b] text-xs block mb-1">
              আজকের দাম
            </span>
            <div className="text-2xl font-black text-[#1a231e] tracking-tight">
              {toBengaliNumber(price)} <span className="font-bold text-xl">টাকা</span>
            </div>
          </div>

          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold ${
              isIncrease
                ? "bg-[#f4ebeb] text-[#c02626]"
                : "bg-[#e8f5e9] text-[#1b8a43]"
            }`}
          >
            <span className="text-xs">{isIncrease ? "▲" : "▼"}</span>
            <span>{toBengaliNumber(Math.abs(changePct))}%</span>
          </div>
        </div>

      </div>
    </Link>
  );
}
