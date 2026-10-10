"use client";

import React, { useState } from "react";
import { useSession, signOut, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // সরাসরি ইনিশিয়াল স্টেটেই সেশনের নাম সেট করা হলো (useEffect এর প্রয়োজন নেই)
  const [name, setName] = useState(() => session?.user?.name || "");
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // সেশন না থাকলে সাইন-ইন পেজে রিডাইরেক্ট
  React.useEffect(() => {
    if (!isPending && !session) {
      router.push("/signIn");
    }
  }, [session, isPending, router]);

  // নাম আপডেট করার ফাংশন
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage({ type: "", text: "" });

    try {
      if (authClient?.updateUser) {
        await authClient.updateUser({
          name: name,
        });
      }
      setMessage({ type: "success", text: "তথ্য সফলভাবে আপডেট করা হয়েছে!" });
    } catch (err) {
      setMessage({ type: "error", text: "আপডেট করতে সমস্যা হয়েছে।" });
    } finally {
      setUpdating(false);
    }
  };

  // সাইন আউট হ্যান্ডলার
  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/signIn";
        },
      },
    });
  };

  if (isPending || !session) {
    return (
      <div className="min-h-screen bg-[#F2F5F3] flex items-center justify-center font-sans text-gray-500">
        তথ্য লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F5F3] font-sans py-12 px-4 sm:px-6 flex justify-center">
      <div className="w-full max-w-2xl space-y-6">
        
        {/* Header Section */}
        <div>
          <h1 className="text-2xl font-bold text-[#1a231e]">আমার প্রোফাইল</h1>
          <p className="text-sm text-gray-500 mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div
            className={`p-3 text-sm rounded-lg border ${
              message.type === "success"
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-red-50 border-red-200 text-red-600"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* User Card */}
        <div className="bg-[#f8faf8] border border-[#e8eee9] rounded-2xl p-6 shadow-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User Avatar"}
                className="w-16 h-16 rounded-xl object-cover border border-gray-200"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-2xl border border-gray-300">
                {session.user?.name ? session.user.name.charAt(0).toUpperCase() : "U"}
              </div>
            )}
            <div>
              <h2 className="text-lg font-bold text-[#1a231e]">
                {session.user?.name || "ইউজার"}
              </h2>
              <p className="text-sm text-gray-500 truncate">
                {session.user?.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 border border-red-200 text-red-600 bg-white hover:bg-red-50 px-4 py-2 rounded-xl text-sm font-medium transition shadow-2xs cursor-pointer"
          >
            <span>↩</span> সাইন আউট
          </button>
        </div>

        {/* Form Section */}
        <div className="bg-[#f8faf8] border border-[#e8eee9] rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#1a231e]">তথ্য</h3>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                নাম
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম"
                className="w-full px-4 py-2.5 bg-white border border-[#e0e6e1] rounded-xl text-sm text-[#1a231e] focus:outline-none focus:ring-2 focus:ring-[#118B44]/20 focus:border-[#118B44] transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={updating}
              className="w-full bg-[#118B44] hover:bg-[#0d6e35] text-white py-3 rounded-xl text-sm font-semibold transition shadow-xs disabled:opacity-50 cursor-pointer"
            >
              {updating ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}