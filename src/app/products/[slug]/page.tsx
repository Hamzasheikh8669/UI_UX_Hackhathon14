"use client";

import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { fullProduct } from "../../../../interface";

import { Star, Truck } from "lucide-react";

import ImageGallery from "@/components/imageGallery";

async function getData(slug: string): Promise<fullProduct | null> {
  const query = `*[_type == 'product' && slug.current == $slug][0] {
    _id,
    "productImage": productImage.asset->url,
    price,
    description,
    title,
    "slug": slug.current,
    price_id
  }`;

  try {
    const data = await client.fetch(query, { slug });
    console.log("Fetched Product Data:", data);
    return data || null;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    setError("Unable to load products. Please try again later.");
    return null;
  }
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = React.use(params); // Unwrap the params Promise
  const slug = resolvedParams.slug;

  const [data, setData] = useState<fullProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const productData = await getData(slug);
      setData(productData);
      setIsLoading(false);
    };

    fetchData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-800">Product Not Found</h1>
      </div>
    );
  }

  const imageUrls = data.productImage ? [data.productImage] : ["/fallback.jpg"];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <ImageGallery images={imageUrls} />
          <div className="md:py-8">
            <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
              {data.title}
              {data.title}
            </h2>
            <div className="mb-6 flex items-center md:mb-10 py-4">
              <button className="rounded-full bg-blue-600 flex items-center gap-2 py-1 px-3">
                <span className="text-sm text-white">4.2</span>
                <Star className="h-6 w-6 text-white" />
              </button>
              <span className="text-sm text-gray-600 font-medium px-2">
                56 Ratings
              </span>
            </div>
            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  ${data.price}
                </span>
                <span className="mb-0.5 text-red-500 line-through">
                  ${data.price + 30}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                Incl. VAT plus shipping
              </span>
            </div>

            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" />
              <span className="text-sm">2-4 Day Shipping</span>
            </div>
            <div className="flex gap-2.5"></div>
            <p className="mt-12 text-base text-gray-500 tracking-wide">
              {data.description
                ? data.description.split(" ").slice(0, 50).join(" ") + "..."
                : "No description available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
function setError(arg0: string) {
  console.error(`Error: ${arg0}`);
  throw new Error("Function not implemented.");
}
