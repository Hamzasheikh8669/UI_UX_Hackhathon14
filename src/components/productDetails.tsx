
//src\components\productdetails\Productdetails.tsx

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Image from "next/image";
import PostCreator from "../components/Comment";


export default function ProductDetails(props:{id:number,tags:string,productName:string,isNew:boolean,productDescription:string,productImage:string,productPrice:number,dicountPercentage:number}) {

  const {id, tags,productName,isNew,productDescription,productImage,productPrice,dicountPercentage } = props
  return (
    <div className="max-w-7xl mx-auto px-2 exsm:px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Tabs for Description, Additional Information, and Reviews */}
      <Tabs defaultValue="description" className="w-full">
        {/* Tab navigation list with 3 items */}
        <TabsList className="grid w-full grid-cols-1 xsm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-8 exsm:mb-[90px]">
          <TabsTrigger value="description" className="text-base sm:text-lg">Description</TabsTrigger>
          <TabsTrigger value="additional" className="text-base sm:text-lg">Additional Information</TabsTrigger>
          <TabsTrigger value="reviews" className="text-base sm:text-lg">Reviews</TabsTrigger>
        </TabsList>

        {/* Tab content for "Description" */}
        <TabsContent value="description" className="space-y-4 sm:space-y-6">
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6">
              {productDescription}
            </p>
          </div>

          {/* Grid layout for images, responsive with 1 column on small screens and 2 columns on medium and larger screens */}
          <div className="grid  place-items-center grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
  <div className="bg-[#f9f1e7] relative flex justify-center items-center w-[350px] h-[350px] rounded-lg p-4 sm:p-8">
    <Image
      src={productImage}
      alt="image"
      width={200}
      height={200}
      className=""
    />
  </div>
  <div className="bg-[#f9f1e7] relative flex justify-center items-center w-[350px] h-[350px] rounded-lg p-4 sm:p-8">
    <Image
      src={productImage}
      alt="image"
      width={200}
      height={200}
      className=""
    />
  </div>
</div>

        </TabsContent>

        {/* Tab content for "Additional Information" */}
        <TabsContent value="additional">
          <div className="prose max-w-none flex flex-col gap-6">
            <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">{productName}</h2>
            <p>New/Old: {isNew ? "New" : "Old"}</p>
            <p>Tags: {tags}</p>
            
            <p >Price:<span className="text-black font-bold"> Rs. {productPrice}</span></p>
            <p>Discount: <span className="text-black font-bold"> Rs. {dicountPercentage}</span>%</p>
            <p className="text-gray-600">{productDescription}</p>

          </div>
        </TabsContent>

        {/* Tab content for "Reviews" */}
        <TabsContent value="reviews">
          <div className="prose max-w-none flex flex-col gap-6">
          <PostCreator blog_id={id}/>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
