"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { Trash } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import FeatureSection from "@/components/feacturesSection";
import Link from "next/link";

import { client } from "@/sanity/lib/client";
interface ProductSection {
  title: string;
  description: string;
  isNew: boolean;
  tags: string[];
  price: number;
  productImage: string;
  discountPercentage: number;
  _id: string;
}
interface IProduct {
  id: string;
  productName: string;
  productImage: string;
  productPrice: number;
  qty: number;
  dicountPercentage: number;
  total: number;
}

function CartContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [cartItem, setCartItem] = useState<IProduct[]>([]);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    const updatedCart = cart ? JSON.parse(cart) : [];

    const id = searchParams.get("id");
    const productName = searchParams.get("productName");
    const productPrice = Number(searchParams.get("productPrice"));
    const productImage = searchParams.get("productImage");
    const qty = Number(searchParams.get("qty") || 1);
    const dicountPercentage = Number(
      searchParams.get("dicountPercentage") || 0
    );

    if (productName && productPrice && productImage && id) {
      const isDuplicate = updatedCart.some(
        (item: IProduct) => item.productName === productName
      );
      if (!isDuplicate) {
        updatedCart.push({
          id,
          productName,
          productImage,
          productPrice,
          qty,
          dicountPercentage,
        });
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartItem(updatedCart);
      router.replace("/cart");
    }
  }, [searchParams, router]);

  const [cards, setCards] = useState<ProductSection[]>([]);

  useEffect(() => {
    const fetchData1 = async () => {
      const res: ProductSection[] = await client.fetch(`
          
          *[_type=='product'][]{
          'productImage': productImage.asset->url,
          description,
          discountPercentage,
          tags,
          isNew,
          title,
          price,
          _id
        }
        `);

      setCards(res);
    };

    fetchData1();
  }, []);

  function handleRemoveItem(index: number) {
    const removedCard = [...cartItem];
    removedCard.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(removedCard));
    setCartItem(removedCard);
  }

  const totalItems = cartItem.reduce((sum, item) => sum + item.qty, 0);
  const subTotal = cartItem.reduce(
    (sum, item) => sum + item.productPrice * item.qty,
    0
  );
  const totalPrice = cartItem.reduce(
    (sum, item) =>
      sum +
      (item.productPrice * item.qty * (100 - item.dicountPercentage)) / 100,
    0
  );

  return (
    <>
      {/* Banner Section */}
      <section className="bg-[url('/images/shop.png')] bg-cover bg-center py-12 md:py-16 mb-6">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block w-16 h-16 bg-[url('/images/logo.png')] mb-4" />
          <h1 className="text-3xl md:text-4xl font-medium mb-4">Cart</h1>
          <div className="flex items-center justify-center gap-2 text-sm">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span>Cart</span>
          </div>
        </div>
      </section>

      {/* Middle Section */}
      <div className="w-full flex flex-col lg:flex-row gap-8 px-6 md:px-12 lg:px-24 mb-16">
        {/* Left Div - Cart Items */}
        <div className="w-full lg:w-[817px]">
          {cartItem.length > 0 ? (
            <table className="w-full table-auto border-collapse border border-[#f9f1e7]">
              {/* Table Header */}
              <thead className="bg-[#f9f1e7] h-14 text-[16px] leading-[24px]">
                <tr>
                  <th className="border border-[#f9f1e7] w-1/4 text-center">
                    Product
                  </th>
                  <th className="border border-[#f9f1e7] w-1/4 text-center">
                    Price
                  </th>
                  <th className="border border-[#f9f1e7] w-1/4 text-center">
                    Quantity
                  </th>
                  <th className="border border-[#f9f1e7] w-1/4 text-center">
                    SubTotal
                  </th>
                  <th className="border border-[#f9f1e7] w-1/4 text-center"></th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {cartItem.map((item: IProduct, index) => {
                  return (
                    <tr key={index} className="text-center">
                      {/* Product Details */}
                      <td className="border border-[#f9f1e7] flex flex-col items-center justify-center gap-4 p-4">
                        <Image
                          src={item.productImage}
                          alt={item.productName}
                          width={108}
                          height={105}
                          className="max-w-full"
                        />
                        <p className="text-[#9f9f9f]">{item.productName}</p>
                      </td>
                      {/* Price */}
                      <td className="border border-[#f9f1e7] text-[#9f9f9f]">
                        Rs. {item.productPrice}
                      </td>
                      {/* Quantity */}
                      <td className="text-[#9f9f9f] mb-10 flex justify-center items-center h-full">
                        <Input
                          type="number"
                          value={item.qty}
                          onChange={(e) => {
                            const updatedCart = [...cartItem];
                            updatedCart[index].qty =
                              Number(e.target.value) || 1;
                            localStorage.setItem(
                              "cart",
                              JSON.stringify(updatedCart)
                            );
                            setCartItem(updatedCart);
                          }}
                          className="w-16 text-center"
                        />
                      </td>
                      {/* SubTotal */}
                      <td className="border border-[#f9f1e7] text-[#9f9f9f]">
                        Rs.{" "}
                        {(item.productPrice *
                          item.qty *
                          (100 - item.dicountPercentage)) /
                          100}
                      </td>
                      {/* Action */}
                      <td className="border border-[#f9f1e7]">
                        <Button
                          variant={"no"}
                          onClick={() => handleRemoveItem(index)}
                        >
                          <Trash size={28} fill="#b88e2f" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-lg text-gray-600">
              Your cart is empty.
            </p>
          )}
        </div>

        {/* Right Div - Totals */}
        <div className="w-full lg:w-[393px]">
          <div className="w-[90%] max-w-[393px] sm:max-w-[480px] md:max-w-[640px] lg:max-w-[768px] xl:max-w-[1024px] 2xl:max-w-[1280px] mx-auto flex flex-col  items-center bg-[#f9f1e7] p-4 sm:p-6 md:p-8 rounded-md">
            <div>
              <h1 className="text-[28px] sm:text-[32px] leading-[40px] sm:leading-[48px] text-center font-semibold mt-[15px] mb-[40px] sm:mb-[61px]">
                Cart Totals
              </h1>
            </div>
            <div className="text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] flex items-center justify-between w-full mb-[20px] sm:mb-[31px]">
              <p>Total Items:</p>
              <p className="text-[#a5a4ae]">{totalItems}</p>
            </div>
            <div className="text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] flex items-center justify-between w-full mb-[20px] sm:mb-[31px]">
              <p>Subtotal:</p>
              <p className="text-[#a5a4ae]">Rs. {subTotal}</p>
            </div>
            <div className="mb-[20px] text-[14px] text-gray-400 sm:text-[16px] leading-[20px] sm:leading-[24px] flex items-center justify-between w-full">
              <p>After discount:</p>
            </div>
            <div className="text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] flex items-center justify-between w-full">
              <p>Total Price</p>
              <p className="text-[#b88e2f] text-[18px] sm:text-[20px] leading-[26px] sm:leading-[30px]">
                Rs. {totalPrice}
              </p>
            </div>
            <div className="mt-[30px] sm:mt-[42px] mb-[50px] sm:mb-[80px]">
              <Link
                href={`/checkout?totalItems=${totalItems}&totalPrice=${totalPrice}&subTotal=${subTotal}&productName=${cartItem.map((item) => item.productName).join(",")}`}
              >
                <Button
                  variant="outline"
                  className="w-full sm:w-[222px] border-black rounded-[12px] sm:rounded-[15px] text-[18px] sm:text-[20px] leading-[26px] sm:leading-[30px] px-6 py-4 sm:px-10 sm:py-6"
                >
                  Check Out
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* related products section */}

      <section className="py-12">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Related Products{" "}
          </h2>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-[1236px] m-auto "
        >
          <CarouselContent className="flex overflow-x-auto space-x-4">
            {cards.reverse().map((item: ProductSection, index: number) => {
              return (
                <CarouselItem key={index} className="flex-none w-[285px]">
                  <div className="bg-white border border-gray-200 rounded-lg shadow">
                    <div className="relative w-full h-[301px] overflow-hidden rounded-t-lg">
                      <Image
                        src={item.productImage}
                        alt={item.title}
                        fill
                        className="object-center"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.description.slice(0, 20)}...
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          Rs.{item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
        <div className="flex justify-center mt-10">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-8 py-3 border border-[#b88e2f] hover:bg-[#b88e2f] hover:text-white transition-colors text-[#b88e2f]"
          >
            Search More
          </Link>
        </div>
      </section>
      <FeatureSection />
    </>
  );
}

export default function Cart() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CartContent />
    </Suspense>
  );
}