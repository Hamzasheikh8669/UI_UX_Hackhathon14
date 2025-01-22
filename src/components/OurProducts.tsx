"use client";
import { useEffect, useState } from "react";
import { Product } from "../../types/productTypes";
import { client } from "@/sanity/lib/client";
import { four } from "@/lib/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

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
    <section className="py- lg:py-16 bg-gray-100">
      <div className="container mx-auto px-4 lg:px-20">
        {/* Title */}
        <h2 className="mb-8 text-3xl font-bold text-gray-900 lg:text-4xl text-center">
          Our Products
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 p-4"
            >
              {/* Product Image */}
              {product.productImage && (
                <Image
                  src={urlFor(product.productImage).url()}
                  alt={product.productName}
                  className="rounded-t-lg"
                  width={300}
                  height={200}
                />
              )}
              {/* Product Details */}
              <div className="p-4 text-left">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.productName}
                </h3>
                <div className="text-md font-bold text-gray-500">
                  {product.title}
                  <p className="mt-2 text-xl font-bold text-[#B88E2F]">
                    {product.price}
                  </p>
                </div>
                {/* Add to Cart / Labels */}
                <div className="mt-4 flex justify-between items-center">
                  <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded">
                    New
                  </span>

                  <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded">
                    -{product.dicountPercentage}%
                  </span>
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
