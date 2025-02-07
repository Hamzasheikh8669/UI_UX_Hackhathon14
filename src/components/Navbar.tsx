"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Heart, ShoppingCart, AlignLeft } from "lucide-react";
import { useAtom } from "jotai";
import { searchName } from "../app/globalState/globalState";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [value, setValue] = useAtom(searchName);

  return (
    <nav className="relative w-full bg-white z-50">
      {/* Main container for Navbar */}
      <div
        className="max-w-[1286px] mx-auto px-4 lg:ml-[60px] 
         sm:px-0 ml-[51px] sm:ml-0 flex items-center justify-between h-[41px] mt-[29px]  "
      >
        {/* Logo Section */}
        <Link href="/" className="flex items-center">
          <div className="text-2xl font-bold text-black flex items-center  ">
            <Image
              src="/images/logo.png"
              width={50}
              height={50}
              alt="Furniro"
              priority
            />
            <span>Furniro</span>
          </div>
        </Link>
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 ">
          <Link
            href="/"
            className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/blog"
            className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Icons Section */}
        <div className="hidden sm:flex md:items-center gap-6 sm:pr-10">
          <input
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search..."
            className="p-2 border mb-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            aria-label="Search"
            className="p-2 hover:bg-black/5 rounded-full transition-colors"
          >
            <Search className="w-6 h-6" />
          </button>

          <Link href={"/wishlist"}>
            <button
              aria-label="Wishlist"
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <Heart className="w-6 h-6" />
            </button>
          </Link>
          <Link href="/cart">
            <button
              aria-label="Shopping Cart"
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
            </button>
          </Link>
          <UserButton />
        </div>
      </div>

      {/* Mobile View - Hamburger Menu */}
      <div className="sm:hidden  flex items-center justify-between px-4 py-0 ">
        <Button variant={"no"} onClick={() => setMenuOpen(!menuOpen)}>
          <AlignLeft color="#d1b238" style={{ width: 30, height: 30 }} />
        </Button>
      </div>

      {/* Sliding Mobile Menu */}
      <div
        className={`absolute top-[70px] left-0 w-full bg-white shadow-lg z-10 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center gap-4 py-4 bg-[#fff3e3]">
          <Link
            href="/"
            className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/blog"
            className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          <div className=" mt-2 sm:flex md:items-center gap-6 sm:pr-10">
            <button
              aria-label="Search"
              onClick={() => setMenuOpen(false)}
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <Search className="w-6 h-6" />
            </button>
            <Link href={"/wishlist"}>
              <button
                aria-label="Wishlist"
                onClick={() => setMenuOpen(false)}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <Heart className="w-6 h-6" />
              </button>
            </Link>
            <Link href="/cart">
              <button
                aria-label="Shopping Cart"
                onClick={() => setMenuOpen(false)}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
              </button>
            </Link>
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}