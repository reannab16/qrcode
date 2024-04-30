import Link from "next/link";
import React from "react";

export default function Nav() {
  return (
    <div className="w-full bg-[#75868a] flex items-center justify-center">
      <div className="container items-center justify-between flex text-[#d6dbdc] py-6">
        <Link href="/" className="hover:bg-[#d6dbdc] hover:text-[#75868a] duration-300 rounded px-3 py-2">QRCODE</Link>
        <div className="flex items-center justify-end gap-x-4">
            <Link href="/generate" className="hover:bg-[#d6dbdc] hover:text-[#75868a] duration-300 rounded px-3 py-2">generate</Link>
            <Link href="/scanner" className="hover:bg-[#d6dbdc] hover:text-[#75868a] duration-300 rounded px-3 py-2">scanner</Link>
        </div>
      </div>
    </div>
  );
}
