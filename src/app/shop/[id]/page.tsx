import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Spmain from '../../../components/spmain';
import Productdetails from '../../../components/productDetails';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Image from 'next/image';
import { relatedProducts } from '../../../app/services/relatedProducts';

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

async function Singleproduct(
  props: { 
    searchParams: Promise<{ 
      id: number;
      productName: string;
      productPrice: number;
      productImage: string;
      productDescription: string;
      productdicountPercentage: number;
      tags: string;
      isNew: boolean;
    }>; 
  }
) {
  const searchParams = await props.searchParams;
  const { 
    id,
    productName,
    productPrice,
    productImage,
    productDescription,
    productdicountPercentage,
    tags,
    isNew
  } = searchParams;

  const cards:ProductSection[] = await relatedProducts();
  return (
    <>
      {/* Breadcrumb Navigation Section */}
      <div className="w-full flex items-center min-h-[80px] exsm:min-h-[90px] xsm:min-h-[100px] sm:min-h-[120px] bg-[#f9f1e7] px-2 exsm:px-4 xsm:px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 box-border">
        {/* Breadcrumb Links */}
        <div className="w-full flex items-center flex-wrap text-sm exsm:text-base xsm:text-lg sm:text-xl md:text-2xl leading-[22px] exsm:leading-[24px] xsm:leading-[26px] sm:leading-[28px] md:leading-[30px]">
          
          {/* Home Link */}
          <Link href="/">  
            <p className="text-[#7c7474] flex items-center">
              Home
              <ChevronRight className="inline ml-1 exsm:ml-2 w-4 h-4 exsm:w-5 exsm:h-5 xsm:w-6 xsm:h-6 sm:w-7 sm:h-7" />
            </p>
          </Link>

          {/* Shop Link */}
          <Link href="/shop">
            <p className="text-[#7c7474] ml-2 exsm:ml-3 xsm:ml-4 sm:ml-5 md:ml-6 flex items-center">
              Shop
              <ChevronRight className="inline ml-1 exsm:ml-2 w-4 h-4 exsm:w-5 exsm:h-5 xsm:w-6 xsm:h-6 sm:w-7 sm:h-7" />
            </p>
          </Link>

          {/* Product Name with Left Border */}
          <div className="ml-2 exsm:ml-3 xsm:ml-4 sm:ml-5 md:ml-6 pl-2 exsm:pl-3 xsm:pl-4 sm:pl-5 md:pl-6 border-l-2 border-black">
            <p className="font-medium text-sm exsm:text-base xsm:text-lg sm:text-xl md:text-2xl">
              {productName}
            </p>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <Spmain 
        id={id} 
        productName={productName} 
        productPrice={productPrice} 
        productImage={productImage} 
        productDescription={productDescription} 
        dicountPercentage={productdicountPercentage} 
        tags={tags} 
        isNew={isNew}
      />

      {/* Product Details Section */}
      <Productdetails 
        id={id} 
        tags={tags} 
        isNew={isNew} 
        productName={productName} 
        productPrice={productPrice} 
        productDescription={productDescription} 
        productImage={productImage} 
        dicountPercentage={productdicountPercentage} 
      />

      {/* Related Products Section */}
       {/*related product section */}
       <section className="py-12">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Related Products </h2>
      </div>
       <Carousel
      
      opts={{
        align: "start",
        loop: true,
      }}
      
      
      className="w-[1236px] m-auto ">
        <CarouselContent className="flex overflow-x-auto space-x-4">
          {(cards.reverse()).map((item:ProductSection ,index:number) =>{
            
            return(
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
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description.slice(0,20)}...</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      Rs.{item.price}
                    </span>
                    
                  </div>
                </div>
              </div>
            </CarouselItem>
            )} )}
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
    </>
  );
}

export default Singleproduct;