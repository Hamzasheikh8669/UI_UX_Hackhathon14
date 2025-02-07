"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, } from "lucide-react";

import Features from "./features";

export default function ShopHeader() {
 
  return (
    <div>
      {/* Hero Section with Breadcrumb */}
      <div className="relative h-64 bg-[#F9F1E7] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/shop.png" // Correct src for static image in public folder
          alt="Shop Hero"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
          priority
        />

        {/* Overlay Content */}
        <div className="relative text-center space-y-4">
          <h1 className="text-4xl font-medium text-gray-900">Shop</h1>
          <nav className="flex items-center justify-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900">Shop</span>
          </nav>
        </div>
      </div>

      <Features />
    </div>
  );
}
