// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";

import Image from "next/image";
import React from "react";
import heroimage from "../../public/images/hero-image.jpeg";
import logo from "../../public/images/logo (2).png";

interface RouteHeroProps {
  prop: string; // Adjust the type of `prop` based on your requirement
}

function RouteHero({ prop }: RouteHeroProps) {
  return (
    <div className="h-auto">
      <div className="relative">
        <Image
          src={heroimage}
          alt="heroImage"
          className="object-cover opacity-[50%] md:h-[400px] h-[200px]  blur-[1px]"
        />
        {/* Use Flexbox to center the text */}
        <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center z-10">
          <Image src={logo} width={70} alt="logo" height={20} />
          <h1 className="text-black font-poppins font-[500] text-3xl md:text-5xl text-center">
            {prop}
          </h1>
          <div className="">
            {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{prop}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RouteHero;