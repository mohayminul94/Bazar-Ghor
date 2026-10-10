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
    <div className="flex flex-wrap gap-4 bg-[#FAFCFA] justify-center items-center mt-4">
      <div className="container mx-auto flex flex-wrap gap-4 justify-left items-center">
        {navItem.map((item) => (
          <div key={item.id} className=" p-1 m-2 text-black">
            <Link href={"/"}>
              <h1>
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
