"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  slug: string;
}

interface SanityProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  productImage: string | null;
}

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);

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
        const sanityProducts: SanityProduct[] = await client.fetch(query);
        const formatted = sanityProducts.map((p) => ({
          id: p._id,
          name: p.title || "Unnamed Product",
          slug: p.slug,
          description: p.description
            ? p.description.split(" ").slice(0, 20).join(" ") + "..."
            : "No description available",
          price: p.price,
          image: p.productImage || "/placeholder.jpg",
        }));
        setProducts(formatted);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold mb-6 flex justify-center">
          Our Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`}>
              <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer">
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-60 object-cover mb-4 rounded-lg"
                />
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-lg font-bold">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
