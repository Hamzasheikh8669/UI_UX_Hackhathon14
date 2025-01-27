"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: string;
  productImage: string;
  slug: string;
}

export default function ProductSection() {
  const [visibleProductsCount, setVisibleProductsCount] = useState(4); // Initially show 4 products
  const [products, setProducts] = useState<Product[]>([]); // State for products

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product"] {
        _id,
        title,
        "slug": slug.current,
        description,
        price,
        "productImage": productImage.asset->url,
      }`;

      try {
        const sanityProducts = await client.fetch(query);
        setProducts(sanityProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleShowMore = () => {
    setVisibleProductsCount((prevCount) =>
      Math.min(prevCount + 4, products.length)
    ); // Ensure it doesn't exceed total products
  };

  return (
    <section className="p-4 px-10 rounded-lg">
      <h2 className="py-4 text-3xl font-bold text-center mb-8">Our Products</h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto">
        {products.slice(0, visibleProductsCount).map((product) => (
          <Link href={`/product/${product.slug}`} key={product._id}>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <Image
                src={product.productImage || "/placeholder.jpg"} // Fallback to placeholder if image is missing
                alt={product.title || "Product"}
                className="w-full h-60 object-cover rounded-lg mb-4"
                width={400}
                height={240}
                priority
              />
              <h3 className="text-xl font-bold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-2">
                {product.description
                  ? product.description.split(" ").slice(0, 20).join(" ") +
                    "..."
                  : "No description available"}
              </p>
              <p className="text-lg font-bold mb-4">Rp {product.price}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Show More Button */}
      {visibleProductsCount < products.length && (
        <div className="flex justify-center mt-10">
          <button
            className="text-white px-6 py-3 rounded-md text-lg font-bold bg-yellow-600 hover:bg-yellow-800 transition-colors"
            onClick={handleShowMore}
            aria-label="Show more products"
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
}
