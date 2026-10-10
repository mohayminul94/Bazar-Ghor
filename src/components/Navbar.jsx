"use client";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

const Navbar = () => {
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
    <div className="flex justify-between items-center p-4 bg-[#FAFCFA] text-black sticky top-0 z-50">
      <div className="flex justify-between items-center container mx-auto">
        <div>
          <Link href="/">
            <h1 className="text-2xl font-bold text-[#118B44]">
              বাজার দর
            </h1>
            <span>{formattedDate || "আজকের তারিখ"}</span>
          </Link>
        </div>
        <div className="space-x-4">
          <Link href="/signIn">
            <button className="text-bold cursor-pointer">সাইন ইন</button>
          </Link>
          <Link href="/signUp">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
              সাইন আপ
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
