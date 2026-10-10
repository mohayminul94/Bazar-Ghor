"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const NavItems = () => {
  const [navItem, setNavItem] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/categories",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setNavItem(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 bg-[#FAFCFA] justify-center items-center border-y border-[#e2e8e3] py-2.5 overflow-hidden">
      <div className="container mx-auto flex flex-wrap gap-4 p-4 justify-left items-center">
        {navItem.map((item) => (
          <div key={item.id} className=" text-black">
            {/* শুধুমাত্র Link এর href-এ ডাইনামিক ক্যাটাগরি রুট যুক্ত করা হয়েছে */}
            <Link href={`/category/${item.slug || item.id}`}>
              <h1 className="text-lg font-semibold">
                {item.icon} {item.nameBn}
              </h1>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavItems;