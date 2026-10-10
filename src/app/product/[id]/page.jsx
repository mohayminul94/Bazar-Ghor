"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

const toBengaliNumber = (num) => {
  if (num === null || num === undefined) return "";
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => banglaDigits[parseInt(digit, 10)]);
};

export default function ProductDetailsPage({ params }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const router = useRouter();

  // Better Auth session check
  const { data: session, isPending: sessionLoading } = useSession();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Jodi user login na thake tahole signIn page-e redirect korbe
  useEffect(() => {
    if (!sessionLoading && !session) {
      router.push("/signIn");
    }
  }, [session, sessionLoading, router]);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/products"
        );
        const data = await res.json();
        
        const found = data.find(
          (item) => 
            item.id?.toString() === productId?.toString() || 
            item.slug === productId
        );

        setProduct(found || data[0]);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    if (session) {
      fetchProductDetails();
    }
  }, [productId, session]);

  if (sessionLoading || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans text-gray-500">
        Yachai kora hocche... Doya kore opekha korun.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center font-sans text-gray-500">
        পণ্য লোড হচ্ছে...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center font-sans text-gray-500">
        কোনো পণ্য পাওয়া যায়নি।
      </div>
    );
  }

  const name = product?.nameBn || "পণ্য";
  const categoryName = product?.categoryNameBn || product?.category || "অন্যান্য";
  const unit = product?.unit === "kg" ? "প্রতি কেজি" : `প্রতি ${product?.unit || "কেজি"}`;
  const price = product?.today || 0;
  const changePct = product?.change?.pct || 0;
  const isIncrease = product?.change?.dir === "up";

  const markets = product?.markets || [];

  const allMins = markets.map((m) => m.min).filter(Boolean);
  const allMaxs = markets.map((m) => m.max).filter(Boolean);
  const minPrice = allMins.length > 0 ? Math.min(...allMins) : price - 3;
  const maxPrice = allMaxs.length > 0 ? Math.max(...allMaxs) : price + 5;

  return (
    <div className="bg-[#f2f5f2] container mx-auto min-h-screen font-sans py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto space-y-6">

        <div className="text-sm text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#118B44]">হোম</Link>
          <span>›</span>
          <Link href={`/category/${product?.categoryId}`}>
            <span className="hover:text-[#118B44] cursor-pointer">{categoryName}</span>
          </Link>
          <span>›</span>
          <span className="text-gray-800 font-medium">{name}</span>
        </div>

        <div className="bg-[#f8faf8] border border-[#e8eee9] rounded-[24px] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#f0f4f1] rounded-[20px] flex items-center justify-center text-3xl sm:text-4xl shrink-0">
              {product?.image || product?.categoryIcon || "🍚"}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1a231e]">
                {name}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {unit} - {categoryName}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                আজকের দাম {isIncrease ? "বৃদ্ধি" : "কমে"} - {toBengaliNumber(Math.abs(changePct))}%
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#e8eee9] rounded-2xl px-6 py-4 text-left sm:text-right w-full sm:w-auto shadow-xs">
            <span className="text-xs text-gray-400 block">আজকের দাম</span>
            <div className="text-2xl sm:text-3xl font-bold text-[#1a231e] mt-0.5">
              {toBengaliNumber(price)} <span className="text-sm font-semibold text-gray-600">টাকা / কেজি</span>
            </div>
            <div className={`text-xs font-bold mt-1 flex items-center sm:justify-end gap-1 ${isIncrease ? "text-[#c02626]" : "text-[#1b8a43]"}`}>
              <span>{isIncrease ? "▲" : "▼"}</span>
              <span>{toBengaliNumber(Math.abs(changePct))}%</span>
            </div>
          </div>
        </div>

        <div className="bg-[#f8faf8] border border-[#e8eee9] rounded-[24px] p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-[#1a231e]">দামের সংখ্যা</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-[#e8eee9] rounded-2xl p-5 shadow-xs">
              <span className="text-xs text-gray-400">সর্বনিম্ন দাম</span>
              <div className="text-xl font-bold text-[#1b8a43] mt-1">
                {toBengaliNumber(minPrice)} টাকা
              </div>
              <span className="text-[11px] text-gray-400 mt-1 block">সবচেয়ে কম বাজারের হার</span>
            </div>

            <div className="bg-white border border-[#e8eee9] rounded-2xl p-5 shadow-xs">
              <span className="text-xs text-gray-400">সর্বোচ্চ দাম</span>
              <div className="text-xl font-bold text-[#c02626] mt-1">
                {toBengaliNumber(maxPrice)} টাকা
              </div>
              <span className="text-[11px] text-gray-400 mt-1 block">সবচেয়ে বেশি বাজারের হার</span>
            </div>

            <div className="bg-white border border-[#e8eee9] rounded-2xl p-5 shadow-xs">
              <span className="text-xs text-gray-400">গড় দাম</span>
              <div className="text-xl font-bold text-[#1a231e] mt-1">
                {toBengaliNumber(price)} টাকা
              </div>
              <span className="text-[11px] text-gray-400 mt-1 block">প্রতি কেজির হিসেবে</span>
            </div>
          </div>
        </div>

        <div className="bg-[#f8faf8] border border-[#e8eee9] rounded-[24px] p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-[#1a231e]">বাজারের আজকের দাম</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#e8eee9] text-xs font-semibold text-gray-500">
                  <th className="py-3 px-4">বাজার</th>
                  <th className="py-3 px-4">বিভাগ</th>
                  <th className="py-3 px-4">সর্বনিম্ন</th>
                  <th className="py-3 px-4">সর্বোচ্চ</th>
                  <th className="py-3 px-4">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8eee9] text-sm text-[#1a231e]">
                {markets.map((m, idx) => {
                  const avgPrice = Math.round((m.min + m.max) / 2);
                  return (
                    <tr key={idx} className="hover:bg-white/60 transition-colors">
                      <td className="py-3.5 px-4 font-medium">{m.market}</td>
                      <td className="py-3.5 px-4 text-gray-500">{m.division}</td>
                      <td className="py-3.5 px-4">{toBengaliNumber(m.min)} টাকা</td>
                      <td className="py-3.5 px-4">{toBengaliNumber(m.max)} টাকা</td>
                      <td className="py-3.5 px-4 font-semibold">{toBengaliNumber(avgPrice)} টাকা</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}