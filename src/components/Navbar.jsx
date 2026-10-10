"use client";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { useSession, signOut } from "@/lib/auth-client";

const Navbar = () => {
  const [formattedDate, setFormattedDate] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Better Auth session hook
  const { data: session, isPending } = useSession();

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
              বাজার <span className="text-black">দর</span>
            </h1>
            <span>{formattedDate || "আজকের তারিখ"}</span>
          </Link>
        </div>

        <div className="space-x-4 flex items-center">
          {isPending ? (
            <span className="text-sm text-gray-500">লোড হচ্ছে...</span>
          ) : session ? (
           
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 focus:outline-none cursor-pointer"
              >
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User Avatar"}
                    className="w-9 h-9 rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 border border-gray-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}
                <span className="text-sm font-semibold">{session.user?.name || "ইউজার"}</span>
                <span className="text-xs text-gray-500">▼</span>
              </button>

             
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-bold text-gray-800">{session.user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    👤 আমার প্রোফাইল
                  </Link>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      signOut({
                        fetchOptions: {
                          onSuccess: () => {
                            window.location.href = "/signIn";
                          },
                        },
                      });
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium cursor-pointer"
                  >
                    ↩ সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            
            <>
              <Link href="/signIn">
                <button className="text-bold cursor-pointer text-black hover:text-[#0F8C43]">সাইন ইন</button>
              </Link>
              <Link href="/signUp">
                <button className="bg-[#0F8C43] hover:bg-[#0D7A3A] text-white font-bold py-2 px-4 rounded cursor-pointer">
                  সাইন আপ
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;