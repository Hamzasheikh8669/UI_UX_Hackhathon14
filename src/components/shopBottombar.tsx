//src\components\shopBottomBar\Shopbottombar.tsx
import React from 'react'

import { Trophy, Truck, Headphones } from "lucide-react";
import { BsPatchCheck } from "react-icons/bs";

function Shopbottombar() {
  return (
    <>
      <section className="w-full h-auto items-center justify-center bg-[#f9f1e7] py-8 md:py-0">
        {/* Main container */}
        <div className="w-full max-w-screen-xl flex exsm:flex-wrap md:flex-nowrap m-auto gap-8 px-4 justify-center md:justify-between">
          {/* 1st Div - High Quality */}
          <div className="flex w-full exsm:w-[300px] xsm:w-[320px] sm:w-[337px] gap-4 items-center">
             <Trophy/>
            <div className="flex flex-col items-start">
              <h1 className="font-semibold text-[22px] sm:text-[25px] leading-[30px] sm:leading-[37.5px]">
                High Quality
              </h1>
              <p className="font-medium text-[18px] sm:text-[20px] text-[#898989] leading-[28px] sm:leading-[30px]">
                crafted from top materials
              </p>
            </div>
          </div>

          {/* 2nd Div - Warranty Protection */}
          <div className="flex w-full exsm:w-[300px] xsm:w-[320px] sm:w-[337px] gap-4 items-center">
            <Truck/>
            <div className="flex flex-col items-start">
              <h1 className="font-semibold text-[22px] sm:text-[25px] leading-[30px] sm:leading-[37.5px]">
                Warranty Protection
              </h1>
              <p className="font-medium text-[18px] sm:text-[20px] text-[#898989] leading-[28px] sm:leading-[30px]">
                Over 2 years
              </p>
            </div>
          </div>

          {/* 3rd Div - Free Shipping */}
          <div className="flex w-full exsm:w-[300px] xsm:w-[320px] sm:w-[337px] gap-4 items-center">
            <BsPatchCheck/>
            <div className="flex flex-col items-start">
              <h1 className="font-semibold text-[22px] sm:text-[25px] leading-[30px] sm:leading-[37.5px]">
                Free Shipping
              </h1>
              <p className="font-medium text-[18px] sm:text-[20px] text-[#898989] leading-[28px] sm:leading-[30px]">
                Order over $150
              </p>
            </div>
          </div>

          {/* 4th Div - 24/7 Support */}
          <div className="flex w-full exsm:w-[300px] xsm:w-[320px] sm:w-[337px] gap-4 items-center">
           <Headphones/>
            <div className="flex flex-col items-start">
              <h1 className="font-semibold text-[22px] sm:text-[25px] leading-[30px] sm:leading-[37.5px]">
                24/7 Support
              </h1>
              <p className="font-medium text-[18px] sm:text-[20px] text-[#898989] leading-[28px] sm:leading-[30px]">
                Dedicated support
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Shopbottombar