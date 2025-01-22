"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useState } from "react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface iAppProps {
  images: SanityImageSource[];
}

export default function ImageGallery({ images }: iAppProps) {
  // Initialize state before any conditional returns
  const [bigImage, setBigImage] = useState<SanityImageSource | null>(null);

  // Handle cases where images might be null or empty
  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 text-gray-500">
        No images available
      </div>
    );
  }

  // Set the initial bigImage if it's not already set
  if (!bigImage && images.length > 0) {
    setBigImage(images[0]);
  }

  const handleSmallImageClick = (image: SanityImageSource) => {
    setBigImage(image);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.map((image, idx) => {
          const imageUrl = urlFor(image).url();
          if (!imageUrl) return null; // Skip invalid images

          return (
            <div key={idx} className="overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={imageUrl}
                width={200}
                height={200}
                alt={`Product image ${idx + 1}`}
                className="h-full w-full object-cover object-center cursor-pointer"
                onClick={() => handleSmallImageClick(image)}
              />
            </div>
          );
        })}
      </div>

      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
        {bigImage ? (
          <Image
            src={urlFor(bigImage).url() || "/path/to/fallback-image.jpg"} // Use a fallback image if URL is empty
            alt="Main product image"
            width={500}
            height={500}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">
            No Image Available
          </div>
        )}

        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          Sale
        </span>
      </div>
    </div>
  );
}
