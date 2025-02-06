

import Image from "next/image";
import Link from "next/link";
import { ArrowRightLeft, Heart, Share2 } from "lucide-react";

import { Button } from "./ui/button";
import { fetchProducts } from "../app/services/data";

interface ProductSection {
  title: string;
  description: string;
  isNew: boolean;
  tags: string[];
  price: number;
  productImage: string;
  dicountPercentage: number;
  _id: string;
}

export default async function OurProducts() {
  // Fetch data on the server
  const cards: ProductSection[] = await fetchProducts();

  return (
    <>
      {/* Product Section */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="mb-8 text-center text-3xl font-bold">Our Products</h2>
          <div className="grid grid-cols-1 exsm:grid-cols-1 xsm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {cards.slice(0, 8).map((item: ProductSection, index: number) => (
              <div
                key={index}
                className="group shadow-md rounded-lg relative w-full max-w-xs exsm:max-w-[280px] xsm:max-w-[320px] sm:max-w-[300px] md:max-w-[240px] lg:max-w-[280px] xl:max-w-[300px] 2xl:max-w-[320px] overlay-wrapper"
              >

                 {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <Link
                  href={`/shop/ProductDetails?id=${index}&productName=${item.title}&productPrice=${item.price}&productImage=${item.productImage}&productDescription=${item.description}&dicountPercentage=${item.dicountPercentage}&tags=${item.tags}&isNew=${item.isNew}`}
                >
                  <Button className="absolute w-[202px] exsm:w-[180px] xsm:w-[190px] sm:w-[200px] top-[175px] exsm:top-[150px] xsm:top-[160px] sm:top-[170px] left-1/2 transform -translate-x-1/2 z-20 bg-white hover:bg-gray-200 text-black transition-all opacity-0 group-hover:opacity-100">
                    Add to Cart
                  </Button>
                </Link>

  {/* Icon Buttons Section */}
                 <div className="absolute inset-x-0 bottom-32 z-50 bg-black bg-opacity-0 p-4 transition-all group-hover:bg-opacity-20 rounded-lg">
                   <div className="flex justify-evenly space-x-4 opacity-0 transition-opacity group-hover:opacity-100 rounded-md">
                    <Button variant="no" size="icon" className="h-10 w-10 text-white">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="no" size="icon" className="h-10 w-10 text-white">
                      <ArrowRightLeft className="h-4 w-4" />
                      Compare
                    </Button>
                    <Button variant="no" size="icon" className="h-10 w-10 text-white">
                      <Heart className="h-4 w-4" />
                      Like
                    </Button>
                  </div>
                 </div>

                <div className="relative w-full h-[301px] exsm:h-[250px] xsm:h-[270px] sm:h-[280px] md:h-[240px] lg:h-[260px] xl:h-[280px] 2xl:h-[300px] overflow-hidden">
                  <Image
                    src={item.productImage}
                    alt={item.title}
                    style={{ objectFit: 'cover' }}
                    
                    fill
                    className="transition-transform group-hover:scale-105"
                  />
                </div>
                {item.isNew && (
                  <div
                    className={`absolute left-4 top-4 rounded-full px-3 py-2 text-sm text-white ${
                      item.isNew === true ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {item.isNew === true ? "New" : "Old"}
                  </div>
                )}
                {item.dicountPercentage>=0 && (
                  <div className="absolute right-4 top-4 rounded-full px-3 py-1 text-sm text-white bg-red-500">
                    -{item.dicountPercentage}%
                  </div>
                )}
               
                <div className="p-4 flex flex-col gap-3">
                  <h2 className="text-[24px] exsm:text-[20px] xsm:text-[22px] sm:text-[24px] leading-[28px] font-semibold">
                    {item.title}
                  </h2>
                  <p className="exsm:text-sm xsm:text-sm sm:text-base">
                    {item.description.slice(0, 20)}...
                  </p>
                  {item.tags && (


                  <div className="  px-3 py-1 text-sm text-white flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-200 text-black px-2 rounded-md  py-1 ">{tag}</span>
                    ))}
                  </div>
                )}
                 
                  <div className="flex justify-between">
                    <p className="text-[20px] exsm:text-[18px] xsm:text-[18px] sm:text-[20px] leading-[24px] font-semibold">
                      Rs. {item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/shop">
              <button className="border-2 border-[#B88E2F] px-8 py-2 text-[#B88E2F] hover:bg-[#B88E2F] hover:text-white transition-colors">
                Show More
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}