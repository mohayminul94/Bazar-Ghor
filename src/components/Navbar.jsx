import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex justify-between items-center container mx-auto">
        <div>
          <Link href="/"><h1>BazarDor</h1></Link>
        </div>
        <div className="space-x-4">
          <Link href="/signIn"><button className="hover:bg-green-700 text-white font-bold py-2 px-4 rounded">সাইন ইন</button></Link>
          <Link href="/signUp"><button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">সাইন আপ</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
