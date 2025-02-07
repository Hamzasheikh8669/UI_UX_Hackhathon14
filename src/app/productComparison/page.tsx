//src\app\productComparison\page.tsx

import React from "react";
import Image from "next/image";

export const dynamic = "force-dynamic";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { client } from "@/sanity/lib/client";
import PcSectionTwo from "../../components/pcSectionTwo";
import FeatureSection from "@/components/feacturesSection";

export default async function ProductComparisonContent({
  searchParams,
}: {
  searchParams: Promise<{
    productName: string;
    productPrice: string;
    productImage: string;
    productDescription: string;
  }>;
}) {
  const { productName, productPrice, productImage, productDescription } =
    await searchParams;

  interface BoxContent {
    boxTitle: string;
    field1: string;
    field2: string;
    field3: string;
    field4: string;
    field5: string;
    field6: string;
    field7: string;
    field8: string;
    field9: string;
    field10: string;
    field11: string;
    field12: string;
    field13: string;
    field14: string;
    field15: string;
    field16: string;
    field17: string;
    field18: string;
  }

  const res: BoxContent[] = await client.fetch(`
  *[_type=='pC'][].box[].boxContent[]{
'boxTitle':boxTitle,
'field1':field1,
'field2':field2,
'field3':field3,
'field4':field4,
'field5':field5,
'field6':field6,
'field7':field7,
'field8':field8,
'field9':field9,
'field10':field10,
'field11':field11,
'field12':field12,
'field13':field13,
'field14':field14,
'field15':field15,
'field16':field16,
'field17':field17,
'field18':field18,
}
  `);

  return (
    <>
      <div className="bg-[url('/blogMainImage.png')] bg-cover bg-center py-16 mb-12">
        <div className="container text-center">
          <div className="inline-block w-16 h-16 bg-[url('/logo1.png')] mb-4" />
          <h1 className="text-3xl md:text-4xl font-medium mb-4 font-poppins">
            Product Comparison
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>
              <Image src="/rightA.png" width={20} height={20} alt="arrow" />
            </span>
            <span>Comparison</span>
          </div>
        </div>
      </div>

      <section className="m-auto pb-[112px]">
        <PcSectionTwo
          productName={productName}
          productPrice={productPrice}
          productImage={productImage}
          productDescription={productDescription}
        />

        <div className="mt-[42px] px-[16px] sm:px-[50px]">
          {res.map((section: BoxContent, index: number) => {
            return (
              <div key={index} className="mt-[96px]">
                <h3 className="text-[18px] sm:text-2xl font-medium">
                  {section.boxTitle}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="w-full border-r border-gray-300">
                    <div className="font-medium mt-[28px] mb-[34px]">
                      {section.field1}
                    </div>
                    <div className="font-medium mb-[34px]">
                      {section.field2}
                    </div>
                    <div className="font-medium mb-[34px]">
                      {section.field3}
                    </div>
                    <div className="font-medium mb-[34px]">
                      {section.field4}
                    </div>
                    <div className="font-medium mb-[34px]">
                      {section.field5}
                    </div>
                    <div className="font-medium mb-[34px]">
                      {section.field6}
                    </div>
                  </div>

                  <div className="w-full border-r border-gray-300">
                    <div className="mb-[34px] mt-[28px]">{section.field7}</div>
                    <div className="mb-[34px]">{section.field8}</div>
                    <div className="mb-[34px]">{section.field9}</div>
                    <div className="mb-[34px]">{section.field10}</div>
                    <div className="mb-[34px]">{section.field11}</div>
                    <div className="mb-[34px]">{section.field12}</div>
                  </div>
                  <div className="w-full border-r border-gray-300">
                    <div className="mb-[34px] mt-[28px]">{section.field13}</div>
                    <div className="mb-[34px]">{section.field14}</div>
                    <div className="mb-[34px]">{section.field15}</div>
                    <div className="mb-[34px]">{section.field16}</div>
                    <div className="mb-[34px]">{section.field17}</div>
                    <div className="mb-[34px]">{section.field18}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center mt-[53px] mb-[50px] gap-[24px] sm:gap-[108px] flex-wrap">
          <div />
          <Link href="/cart">
            <Button className="exsm:hidden sm:block text-[16px] sm:text-[20px] leading-[30px] py-[12px] sm:py-[17px] px-[12px] sm:px-8 lg:px-12 w-[160px] sm:w-[215px] bg-[#B88E2F] hover:bg-[#B88E2F]/90 text-white h-16">
              Add To Cart
            </Button>
          </Link>

          <Link href="/cart">
            <Button className="text-[16px] sm:text-[20px] leading-[30px] w-[160px] sm:w-[215px] py-[12px] sm:py-[17px] px-[12px] sm:px-8 lg:px-12 bg-[#B88E2F] hover:bg-[#B88E2F]/90 text-white h-16">
              Add To Cart
            </Button>
          </Link>
        </div>

        <FeatureSection />
      </section>
    </>
  );
}
