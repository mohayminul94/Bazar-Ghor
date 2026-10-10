"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#19221b] text-gray-300 font-sans mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand & Description */}
          <div className="md:col-span-1 space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-[#118B44]">বাজার</span>দর
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              আজকের রিয়েল-টাইম বাজারের দাম, গড় হিসাব ebong dam-er poriborton ek jaygay dekhun.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">
              দ্রুত লিঙ্ক
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-[#118B44] transition-colors">
                  হোম পেজ
                </Link>
              </li>
              <li>
                <a href="#products" className="hover:text-[#118B44] transition-colors">
                  সকল পণ্য
                </a>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#118B44] transition-colors">
                  সাইন ইন
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-[#118B44] transition-colors">
                  সাইন আপ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">
              ক্যাটাগরি
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li className="hover:text-[#118B44] cursor-pointer transition-colors">চাল ও ডাল</li>
              <li className="hover:text-[#118B44] cursor-pointer transition-colors">সবজি ও ফল</li>
              <li className="hover:text-[#118B44] cursor-pointer transition-colors">মাছ ও মাংস</li>
              <li className="hover:text-[#118B44] cursor-pointer transition-colors">তেল ও মসলা</li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base mb-4">
              নিয়মিত আপডেট পান
            </h3>
            <p className="text-sm text-gray-400">
              দৈনিক বাজারের খবর ebong dam-er update pete apnar email din.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="ইমেইল লিখুন"
                className="w-full px-4 py-2.5 bg-[#253228] border border-gray-700 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#118B44]"
              />
              <button
                type="submit"
                className="w-full bg-[#118B44] hover:bg-[#0d6e35] text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                সাবস্ক্রাইব করুন
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} বাজারদর। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400">গোপনীয়তা নীতি</a>
            <a href="#" className="hover:text-gray-400">ব্যবহারের শর্তাবলী</a>
            <a href="#" className="hover:text-gray-400">যোগাযোগ</a>
          </div>
        </div>

      </div>
    </footer>
  );
}