"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { signUp, signIn } from '@/lib/auth-client'; // Better Auth ক্লায়েন্ট ইমপোর্ট

const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ইমেইল ও পাসওয়ার্ড দিয়ে সাইন আপ হ্যান্ডলার
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signUp.email({
                email,
                password,
                name,
            }, {
                onSuccess: () => {
                    window.location.href = "/"; // সফলভাবে অ্যাকাউন্ট তৈরি হলে হোমপেজে রিডাইরেক্ট
                },
                onError: (ctx) => {
                    setError(ctx.error.message || "রেজিস্ট্রেশন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
                    setLoading(false);
                }
            });
        } catch (err) {
            setError("কোথাও কোনো সমস্যা হয়েছে।");
            setLoading(false);
        }
    };

    // সোশ্যাল সাইন আপ/ইন হ্যান্ডলার (Google/GitHub)
    const handleSocialSignIn = async (provider) => {
        await signIn.social({
            provider: provider,
            callbackURL: "/", // সফল লগইনের পর যেখানে রিডাইরেক্ট হবে
        });
    };

    return (
        <div className="min-h-screen bg-[#F2F5F3] flex flex-col items-center justify-center p-4 font-sans">
      
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#1f2328] mb-3">সাইন আপ</h1>
        <p className="text-gray-500 text-[15px]">
          বাজারদরের আপডেট ও পার্সোনালাইজড অভিজ্ঞতার জন্য অ্যাকাউন্ট তৈরি করুন।
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white w-full max-w-[460px] rounded-xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
        
        {/* এরর মেসেজ */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Name Input */}
          <div>
            <label className="block text-[15px] font-medium text-gray-800 mb-2">
              নাম
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার পুরো নাম"
              className="w-full px-4 py-2.5 border border-gray-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#118B44]/20 focus:border-[#118B44] transition-colors placeholder:text-gray-500 text-[15px]"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-[15px] font-medium text-gray-800 mb-2">
              ইমেইল
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-gray-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#118B44]/20 focus:border-[#118B44] transition-colors placeholder:text-gray-500 text-[15px]"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-[15px] font-medium text-gray-800 mb-2">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full px-4 py-2.5 border border-gray-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#118B44]/20 focus:border-[#118B44] transition-colors placeholder:text-gray-500 text-[15px]"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0F8C43] hover:bg-[#0c7637] text-white font-medium py-3 rounded-lg mt-2 transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-7">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="px-4 text-sm text-gray-500">অথবা</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button 
            type="button" 
            onClick={() => handleSocialSignIn("google")}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-[14px] font-medium text-[#1f2328]">Google দিয়ে চালিয়ে যান</span>
          </button>
          
          <button 
            type="button" 
            onClick={() => handleSocialSignIn("github")}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            <span className="text-[14px] font-medium text-[#1f2328]">GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        {/* Sign In Link */}
        <div className="mt-8 text-center text-[15px] text-gray-700">
          ইতিমধ্যে অ্যাকাউন্ট আছে? <Link href="/signIn" className="text-[#0F8C43] font-medium hover:underline ml-1">সাইন ইন করুন</Link>
        </div>
      </div>

      {/* Back to Home Link */}
      <div className="mt-8">
        <Link href="/" className="text-[14px] text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-2">
          <span>&larr;</span> হোম পেজে ফিরে যান
        </Link>
      </div>
      
    </div>
    );
};

export default SignUpPage;