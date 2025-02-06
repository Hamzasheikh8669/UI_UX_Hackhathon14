
"use client";

import { Button } from "@/components/ui/button";
import { CircleX, Heart, Star, StarHalf } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {  sanityUserPost } from "../app/services/clerkApi";

interface IProduct {
  id: string;
  productName: string;
  productImage: string;
  productPrice: number;
  qty: number;
  tags: string;
  isNew: boolean;
  dicountPercentage: number;
}

function Spmain(props: {
  id: number;
  productName: string;
  productPrice: number;
  productImage: string;
  productDescription: string;
  dicountPercentage: number;
  tags: string;
  isNew: boolean;
}) {
  const {
    id,
    productName,
    productPrice,
    productImage,
    productDescription,
    dicountPercentage,
    tags,
    isNew
  } = props;

  const [cartVisible, setCartVisible] = useState(false);
  const [addToCart, setAddToCart] = useState(1);
  const [cartItem, setCartItem] = useState<IProduct[]>([]);

  

  const searchParams = useSearchParams();

  
  // Function for increasing quantity
  function handleAddToCart() {
    setAddToCart(addToCart + 1);
  }

  // Function for decreasing quantity
  function handleDecreaseFromCart() {
    if (addToCart > 1) {
      setAddToCart(addToCart - 1);
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 1 && value <= 100) {
      setAddToCart(value);
    }
  }

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    const updatedCart = cart ? JSON.parse(cart) : [];

    const urlId = searchParams.get("id");
    const urlProductName = searchParams.get("productName");
    const urlProductPrice = searchParams.get("productPrice");
    const urlProductImage = searchParams.get("productImage");
    const urlQty = searchParams.get("qty");

    if (urlProductName && urlProductPrice && urlProductImage && urlId && urlQty) {
      const newItem = {
        id: urlId,
        productName: urlProductName,
        productImage: urlProductImage,
        productPrice: Number(urlProductPrice),
        qty: Number(urlQty),
      };

      const existingItemIndex = updatedCart.findIndex((item: IProduct) => item.id === urlId);
      if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex].qty += Number(urlQty);
        setAddToCart(updatedCart[existingItemIndex].qty);
      } else {
        updatedCart.push(newItem);
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    setCartItem(updatedCart);
  }, [searchParams]);


useEffect(()=>{

  sanityUserPost();
},[])


  function handleRemoveItem(id: string) {
    const updatedCart = cartItem.filter((item: IProduct) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItem(updatedCart);
  }

  function calculateTotalPrice(dicountPercentage: number ) {
    const total = cartItem.reduce(
      (total, item) => total + (item.productPrice || 0) * (item.qty || 0),
      0
    );

    // Apply the discount
    const discount = (total * dicountPercentage) / 100;
    const finalTotal = total - discount;

    return finalTotal;
  }
  

  function addItemToCart() {
    const newItem = {
      id: id.toString(),
      productName,
      productImage,
      productPrice,
      qty: addToCart,
      tags: tags,
      isNew: isNew,
      dicountPercentage: dicountPercentage
    };

    const updatedCart = [...cartItem];
    const existingItemIndex = updatedCart.findIndex(item => item.id === newItem.id);
    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].qty += addToCart;
    } else {
      updatedCart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItem(updatedCart);
    setCartVisible(true);
  }

  function handleCartClick(id: number) {
    setCartVisible(true);
    const updatedCart = [...cartItem];
    setAddToCart(updatedCart.find(item => +item.id === id)?.qty || 1);
  }

  function handleWishlistClick() {
    toast.success("Item Added to Wishlist");
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

   
    wishlist.push({ id, productName, productImage, productPrice });

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    
  }

  return (
    <div className="relative w-full mt-[30px] mb-[100px] px-4 exsm:px-2 xsm:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
      {cartVisible && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={() => setCartVisible(false)}
          ></div>

          <div className="absolute flex flex-col top-0 right-0 w-[400px] exsm:w-[300px]   p-4 bg-white z-20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-[20px] exsm:text-[22px] xsm:text-[24px]">Shopping Cart</h2>
              <button 
              onClick={() => setCartVisible(false)}
              className="relative w-4 h-4">
                <Image
                  src="/Group.png"
                  alt="Shopping Cart"
                  fill
                  style={{ objectFit: 'cover' }} // Corrected here
                />
              </button>
            </div>

            <div className="h-[2px] w-full bg-gray-200 mb-4"></div>

            {cartItem.map((item: IProduct, index: number) => {return (
              <div key={index} className="flex gap-4 mb-4">
                <div className="relative w-[80px] exsm:w-[90px] xsm:w-[100px] sm:w-[108px] h-[80px] exsm:h-[90px] xsm:h-[100px] sm:h-[105px]">
                  <Image
                    src={item.productImage}
                    alt="Product"
                    fill
                    style={{ objectFit: 'cover' }} // Corrected here
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[14px] exsm:text-[16px]">{item.productName}</h3>
                  <p className="text-[12px] exsm:text-[14px] sm:text-[16px]">
                    {item.qty} x{" "}
                    <span className="text-yellow-600">Rs. {item.productPrice}</span>
                  </p>
                  <p className="text-[12px] exsm:text-[14px] sm:text-[16px]">Discount: {item.dicountPercentage}%</p>
                </div>
                <Button variant={"ghost"} onClick={() => handleRemoveItem(item.id)}>
                  <CircleX className="text-gray-400 mt-6 cursor-pointer" />
                </Button>
              </div>)} 
            
           )}

            <div className="h-[2px] w-full bg-gray-300 mb-4"></div>

            <div className="flex justify-between mt-auto mb-6">
              <h3>Subtotal: </h3>
              <p>Rs. {calculateTotalPrice(dicountPercentage||0)}</p>
            </div>
            <div className="h-[2px] w-full bg-gray-200 mb-6"></div>
            <div className="gap-4 flex exsm:grid grid-cols-1 place-items-center">
              <Link
                href={`/cart?id=${id}&productImage=${productImage}&productName=${productName}&productPrice=${productPrice}&qty=${addToCart}&dicountPercentage=${dicountPercentage}`} 
              >
                <Button
                  variant={"outline"}
                  className="border-2 border-black px-4 exsm:px-6 rounded-full"
                  onClick={() => handleCartClick(addToCart)}
                >
                  Cart
                </Button>
              </Link>

              <Link
                href={`/checkout?id=${id}&productName=${productName}&productPrice=${productPrice}&qty=${addToCart}&totalItems=${cartItem.length}&totalPrice=${calculateTotalPrice(dicountPercentage)}&subTotal=${calculateTotalPrice(dicountPercentage)}&dicountPercentage=${dicountPercentage}`}
              >
                <Button
                  variant={"outline"}
                  className="border-2 border-black px-4 exsm:px-6 rounded-full"
                >
                  Checkout
                </Button>
              </Link>

              <Link
                href={`/productComparison?id=${id}&productName=${productName}&productPrice=${productPrice}&productImage=${productImage}&productDescription=${productDescription}&dicountPercentage=${dicountPercentage}`}
              >
                <Button
                  variant={"outline"}
                  className="border-2 border-black px-4 exsm:px-6 rounded-full"
                >
                  Comparison
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}

      <div className="m-auto flex flex-col lg:flex-row gap-10 lg:justify-center">
        <div className="flex flex-col lg:flex-row gap-6 mt-10 lg:w-1/2">
          {/* Thumbnails */}
          <div className="flex gap-4 lg:flex-col">
            {[...Array(4)].map((_, index) =>{return(

<div
                key={index}
                className="w-[60px] h-[60px] exsm:w-[70px] exsm:h-[70px] xsm:w-[76px] xsm:h-[80px] bg-[#f9f1e7] rounded-xl flex items-center justify-center"
              >
                <Image
                  src={productImage}
                  alt="Thumbnail"
                  width={50}
                  height={50}
                  className="w-[50px] h-[50px] object-center rounded-md"
                />
              </div>
            )} )}
          </div>

          {/* Main Image */}
          <div className="relative bg-red-500 w-full max-w-[300px] md:max-w-[423px] h-[300px] md:h-[500px] rounded-lg flex items-center justify-center mx-auto exsm:mx-1 md:ml-[50px]">
  <Image
    src={productImage}
    alt="Main Image"
    fill
    style={{ objectFit: "cover" }}
    className="object-center rounded-md"
  />
</div>

        </div>

        <div className="w-full lg:w-[606px] space-y-6">
          <div className="text-center lg:text-left">
            <div className="flex gap-16">
              <h1 className="text-2xl exsm:text-3xl xsm:text-4xl font-bold">
                {productName}
              </h1>
              <button onClick={handleWishlistClick} aria-label="Wishlist" className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            <p className="text-lg exsm:text-xl xsm:text-2xl text-muted-foreground mt-2">
              Rs. {productPrice}
            </p>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-2">
            <div className="flex">
              {[...Array(4)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 exsm:w-5 exsm:h-5 fill-[#FFC700] text-primary"
                />
              ))}
              <StarHalf className="w-4 h-4 exsm:w-5 exsm:h-5 fill-primary text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">|</span>
            <span className="text-sm text-muted-foreground">
              5 Customer Reviews
            </span>
          </div>

          <p className="text-sm exsm:text-base text-muted-foreground">
            {productDescription.slice(0, 300)}...
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex justify-center items-center border rounded-md w-[100px] exsm:w-[123px] h-[48px]">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-none"
                onClick={handleDecreaseFromCart}
                disabled={addToCart <= 1}
              >
                -
              </Button>
              <input
                type="number"
                min={1}
                max={100}
                value={addToCart}
                onChange={handleInputChange}
                className="text-center w-12"
              />
              <Button
                variant="ghost"
                size="sm"
                className="rounded-none"
                onClick={handleAddToCart}
              >
                +
              </Button>
            </div>

            
            <Button
              variant="outline"
              
              onClick={() => { addItemToCart(); }}
              className="w-full exsm:w-[215px] h-[48px] exsm:h-[64px] rounded-[15px]"
            >
              Add To Cart
            </Button>
           

            <Link
              href={`/productComparison?id=${id}&productName=${productName}&productPrice=${productPrice}&productImage=${productImage}&productDescription=${productDescription}&dicountPercentage=${dicountPercentage}`}
            >
              <Button
                variant="outline"
                className="w-full exsm:w-[215px] h-[48px] exsm:h-[64px] rounded-md exsm:rounded-[15px]"
              >
                + Compare
              </Button>
            </Link>
          </div>

          <div className="bg-gray-200 w-full h-1"></div>

          <div className="flex justify-between text-gray-500">
            <p>New/Old: {isNew ? "New" : "Old"}</p>
          </div>

          <div className="flex justify-between text-gray-500">
            <p>Discount: {dicountPercentage ? "available" : "not available"}</p>
          </div>

          <div className="flex flex-col justify-between text-gray-500">
            <p className="underline">Tags:</p>
            <div>
              {(tags ? tags.split(',') : []).map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>

            <div className="flex gap-4 items-center">
              <p>Share:</p>
              <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookSquare />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitterSquare />
              </Link>
              <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Spmain;