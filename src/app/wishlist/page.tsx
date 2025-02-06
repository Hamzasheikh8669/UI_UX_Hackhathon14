"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface WishlistItem {
  id: string;
  productName: string;
  productPrice: number;
  productImage: string;
}

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  // localStorage.removeItem("wishlist");

  useEffect(() => {
   
      const storedWishlist = localStorage.getItem("wishlist");


      
      if (storedWishlist) {
        try {
          const parsedWishlist = JSON.parse(storedWishlist);
          console.log("🛒 Parsed Wishlist Data:", parsedWishlist);

          // Check if the data is an array
          if (!Array.isArray(parsedWishlist)) {
            console.error("Invalid wishlist data structure.");
            return;
          }

          // Transform keys to match WishlistItem interface
          const transformedWishlist: WishlistItem[] = parsedWishlist.map((item: WishlistItem) => ({
            id: item.id,
            productName: item.productName,
            productPrice: Number(item.productPrice), // Convert to number
            productImage: item.productImage,
          }));

          console.log("✅ Transformed Wishlist Data:", transformedWishlist);
          setWishlistItems(transformedWishlist);
        } catch (error) {
          console.error("❌ Error parsing wishlist data:", error);
        }
      }
    }
  , []);

  const handleRemoveItem = (id: string) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    console.log("Updated wishlist saved to localStorage:", updatedWishlist);
  };

  useEffect(() => {
    console.log("🛒 Wishlist updated:", wishlistItems);
  }, [wishlistItems]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-[url('/images/shop.png')] bg-cover bg-center py-16 mb-12">
        <div className="container text-center">
          <div className="inline-block w-16 h-16 bg-[url('/logo1.png')] mb-4" />
          <h1 className="text-3xl md:text-4xl font-medium mb-4 font-poppins">Wishlist</h1>
          <div className="flex items-center justify-center gap-2 text-sm">
            <Link href="/" className="hover:underline">Home</Link>
            <span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            </span>
            <span>Wishlist</span>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Wishlist Items */}
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Wishlist Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wishlistItems.length > 0 ? (
                wishlistItems.map((item: WishlistItem, index: number) => {
                  return (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="relative w-24 h-24 rounded-md overflow-hidden">
                        <Image src={item.productImage} alt={item.productName} layout="intrinsic" width={96} height={96} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.productName}</h3>
                        <p className="text-sm text-gray-500">Rs. {item.productPrice}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleRemoveItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500">Your wishlist is empty.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Wishlist Summary */}
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Wishlist Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              You have {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} in your wishlist.
            </p>
            <div className="flex justify-between mb-2">
              <span>Total Value:</span>
              <span className="font-semibold">
                Rs.{" "}
                {wishlistItems
                  .reduce((total, item) => total + item.productPrice, 0)
                  .toLocaleString()}
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Move All to Cart</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}