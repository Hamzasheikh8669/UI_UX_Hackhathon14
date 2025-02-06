//src\components\pcSectiontwo\PcSectionTwo.tsx
import React from 'react'

import { IoIosArrowDown } from 'react-icons/io';
import { FaRegStarHalfStroke, FaStar } from 'react-icons/fa6';

import Image from 'next/image';
import { Button } from './ui/button';




function PcSectionTwo(props:{productName:string,productPrice:string,productImage:string,productDescription:string}) {
  

  
    
  
  
  const { productName,productPrice,productImage,productDescription } = props;

    
  return (
    <>
     <div className="w-full max-w-screen-xl m-auto mt-[55px] border-b-[1px] border-gray-300 px-[16px] sm:px-[50px] flex gap-[50px] flex-wrap justify-between">
          <div className="w-full sm:w-[223px] text-left">
            <h1 className="text-[24px] sm:text-[28px] leading-[30px] sm:leading-[35.42px] font-semibold mb-[21px]">
              Go to Product page for more Products
            </h1>
            <span className="border-b-2 pb-2 pr-5  border-gray-600 text-gray-500 text-[14px] sm:text-[16px]">View More</span>
          </div>

         
            
              <div
                
                className="w-full sm:w-[280px] flex flex-col gap-[18px] mb-[64px]"
              >
                <div className="relative w-full h-[150px] sm:h-[177px] mb-[18px]">
                  <Image
                    src={productImage}
                    alt={productName}
                    fill
                    objectFit="center"
                  />
                </div>

                <div className="pl-4">
                  <h1 className="text-[20px] sm:text-[24px] leading-[26px] sm:leading-[30.36px] font-semibold mb-[6px]">
                    {productName}
                  </h1>

                  <p className="mb-[7px] text-[16px] sm:text-[18px] leading-[22px] sm:leading-[27px]">{productDescription.slice(0, 100)}...</p>
                  <p className="mb-[7px] text-[16px] sm:text-[18px] leading-[22px] sm:leading-[27px]">Rs.{productPrice}</p>

                  <pre className="text-[14px] sm:text-[16px]">
                     5.0
                    {[...Array(5)].map((_, index) =>{return(
                      <FaStar
                        key={index}
                        color="yellow"
                        size={18}
                        className="inline ml-[6px] mb-[7px]"
                      />

                    )} )} 
                    <FaRegStarHalfStroke
                      color="yellow"
                      size={18}
                      className="inline ml-[6px] mb-[7px]"
                    />
                    |
                    <span className="text-gray-500">{" "} 145 Reviews</span>

                  </pre>
                </div>
              </div>
              <div
                
                className="w-full sm:w-[280px] flex flex-col gap-[18px] mb-[64px]"
              >
                <div className="relative  w-full h-[250px] sm:h-[177px] mb-[18px]">
                  <Image
                    src={productImage}
                    alt={productName}
                    fill
                    objectFit="center"
                  />
                </div>

                <div className="pl-4">
                  <h1 className="text-[20px] sm:text-[24px] leading-[26px] sm:leading-[30.36px] font-semibold mb-[6px]">
                    {productName}
                  </h1>

                  <p className="mb-[7px] text-[16px] sm:text-[18px] leading-[22px] sm:leading-[27px]">{productDescription.slice(0, 100)}...</p>

                  <p className="mb-[7px] text-[16px] sm:text-[18px] leading-[22px] sm:leading-[27px]">{productPrice}</p>

                  <pre className="text-[14px] sm:text-[16px]">
                     4.5
                    {[...Array(3)].map((_, index) =>{return(
                      <FaStar
                        key={index}
                        color="yellow"
                        size={18}
                        className="inline ml-[6px] mb-[7px]"
                      />

                    )} )} 
                    <FaRegStarHalfStroke
                      color="yellow"
                      size={18}
                      className="inline ml-[6px] mb-[7px]"
                    />
                    |
                    <span className="text-gray-500">{" "}145 Reviews</span>

                  </pre>
                </div>
              </div>
            
          






          <div className="w-full sm:w-[242px] text-left flex flex-col gap-[20px] items-left justify-center">
            <h1 className="text-[20px] sm:text-[24px] leading-[30.36px] font-semibold">
              Add A Product
            </h1>
            <div>
              <Button className="bg-[#b88e2f] w-full sm:w-[242px] px-[15px] py-[10px]">
                Choose a Product{" "}
                <IoIosArrowDown size={18} className="inline ml-[42px]" />
              </Button>
            </div>
          </div>
        </div>
    </>
  )
}

export default PcSectionTwo