"use client";
import Link from "next/link";
import { useEffect, useState, use } from "react";


const toBengaliNumber = (num) => {
  if (num === null || num === undefined) return "";
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => banglaDigits[parseInt(digit, 10)]);
};

export default function CategoryPage({ params }) {
  const resolvedParams = use(params);
  const categorySlug = resolvedParams.slug;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");


  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/products"
        );
        const data = await res.json();


        const filteredProducts = data.filter(
          (item) => item.category?.toLowerCase() === categorySlug?.toLowerCase()
        );

        setProducts(filteredProducts);
      } catch (err) {
        console.error("API Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [categorySlug]);


  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") return (a.today || 0) - (b.today || 0);
    if (sortBy === "price-high") return (b.today || 0) - (a.today || 0);
    if (sortBy === "change-high") return (b.change?.pct || 0) - (a.change?.pct || 0);
    return 0;
  });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center font-sans text-gray-500">
        ক্যাটাগরির তথ্য লোড হচ্ছে...
      </div>
    );
  }


  const categoryName = products[0]?.categoryNameBn || categorySlug;
  const categoryIcon = products[0]?.categoryIcon || products[0]?.image || "📦";

  return (
    <div className="bg-[#f2f5f2] min-h-screen font-sans py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto space-y-5">
        

        <div className="bg-[#f8faf8] border border-[#e8eee9] rounded-[24px] p-6 shadow-sm flex items-center gap-4">
          <div className=" bg-[#f0f4f1] rounded-[20px] flex items-center justify-center text-3xl shrink-0">
            {categoryIcon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1a231e]">
              {categoryName}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {toBengaliNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>


        <div className="bg-[#f8faf8] border border-[#e8eee9] rounded-[20px] px-6 py-3.5 shadow-sm flex items-center justify-end gap-3">
          <span className="text-sm font-medium text-gray-600">সাজান</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-[#e0e6e1] rounded-xl px-4 py-1.5 text-sm font-medium text-[#1a231e] focus:outline-none focus:ring-2 focus:ring-[#118B44]/20 cursor-pointer shadow-sm"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-low">দাম: কম থেকে বেশি</option>
            <option value="price-high">দাম: বেশি থেকে কম</option>
            <option value="change-high">সর্বোচ্চ দাম পরিবর্তন</option>
          </select>
        </div>


        <div className="text-sm text-gray-600 font-medium px-1">
          মোট {toBengaliNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
        </div>


        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedProducts.map((product) => (
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
          <div className="text-center py-16 bg-[#f8faf8] rounded-[24px] border border-[#e8eee9] text-gray-500">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </div>
        )}

      </div>
    </div>
  );
}


function ProductCard({ product }) {
  const name = product?.nameBn || "পণ্য";
  const unit = product?.unit === "kg" ? "প্রতি কেজি" : `প্রতি ${product?.unit || "কেজি"}`;
  const price = product?.today || 0;
  const changePct = product?.change?.pct || 0;
  const isIncrease = product?.change?.dir === "up";
  const isNeutral = changePct === 0;

  return (
    <div className="bg-[#f8faf8] container mx-auto border border-[#e8eee9] rounded-[24px] p-5 w-full shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
      

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-[#f0f4f1] rounded-[16px] flex items-center justify-center shrink-0 text-2xl">
          {product?.image || product?.categoryIcon || "📦"}
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1f2923] leading-tight">
            {name}
          </h3>
          <p className="text-[#64748b] text-xs mt-0.5 font-normal">
            {unit}
          </p>
        </div>
      </div>


      <div className="mt-6 flex items-end justify-between">
        <div>
          <span className="text-[#64748b] text-[11px] block mb-0.5">
            আজকের দাম
          </span>
          <div className="text-xl font-bold text-[#1a231e]">
            {toBengaliNumber(price)} <span className="font-semibold text-base">টাকা</span>
          </div>
        </div>


        <div
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
            isNeutral
              ? "bg-[#f1f3f1] text-gray-600"
              : isIncrease
              ? "bg-[#f4ebeb] text-[#c02626]"
              : "bg-[#e8f5e9] text-[#1b8a43]"
          }`}
        >
          {!isNeutral && <span>{isIncrease ? "▲" : "▼"}</span>}
          {isNeutral && <span>—</span>}
          <span>{toBengaliNumber(Math.abs(changePct))}%</span>
        </div>
      </div>

    </div>
  );
}