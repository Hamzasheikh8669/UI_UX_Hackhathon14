"use client";

import { useEffect, useState } from "react";
import type { Product } from "../../types/productTypes";
import { client } from "@/sanity/lib/client";
import { four } from "@/lib/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Heart, Share2 } from "lucide-react";

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getProducts() {
      const fetchProducts: Product[] = await client.fetch(four);
      setProducts(fetchProducts);
    }
    getProducts();
  }, []);

  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-20">
        {/* Title */}
        <h2 className="mb-12 text-3xl font-bold text-center">Our Products</h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Sale Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500 text-white text-sm font-medium">
                 -{product.dicountPercentage}%
                </span>
              </div>

              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                {product.productImage && (
                  <Image
                    src={
                      urlFor(product.productImage).url() || "/placeholder.svg"
                    }
                    alt={product.productName}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {product.productName}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{product.title}</p>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-lg font-bold text-gray-900">
                    Rp {new Intl.NumberFormat().format(product.price)}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between border-t pt-4">
                  <button className="px-4 py-2 bg-[#B88E2F] text-white rounded hover:bg-[#9c7829] transition-colors">
                    Add to cart
                  </button>
                  <div className="flex gap-3">
                    <button className="text-gray-600 hover:text-gray-900">
                      <Share2 className="w-5 h-5" />
                    </button>
                    {/* <button className="text-gray-600 hover:text-gray-900">
                      <Equal className="w-5 h-5" />
                    </button> */}
                    <button className="text-gray-600 hover:text-gray-900">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center justify-center border border-[#B88E2F] bg-white px-8 py-2 text-sm font-medium text-[#B88E2F] transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
            Show More
          </button>
        </div>
      </div>
    </section>
  );
}
