// //src\components\blogCenter\BlogCenter.tsx

import { Blog, fetchBlogs } from "../app/services/data";
import Image from "next/image";

const BlogCenter = async () => {
  // Fetch blogs on server side
  const res: Blog[] = await fetchBlogs();

  return (
    <>
      {res.map((item: Blog, index: number) => {
        return (
          <div key={index} className="w-full mb-12">
            {/* image top div */}
            <div className="w-full">
              <Image
                src={"/images/shop.png"}
                width={50}
                height={50}
                alt="image1"
                className="w-full h-auto"
              />
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex gap-2">
                <Image src="/admin.png" width={20} height={20} alt="admin" />
                <p className="text-gray-400">{item.blogUser}</p>
              </div>
              <div className="flex gap-2">
                <Image src="/date.png" width={20} height={20} alt="date" />
                <p className="text-gray-400">{item.blogDate}</p>
              </div>
              <div className="flex gap-2">
                <Image src="/wood.png" width={20} height={20} alt="category" />
                <p className="text-gray-400">{item.blogIcon}</p>
              </div>
            </div>

            {/* bottom div */}
            <div className="mt-4">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-medium mb-2">
                {item.blogTitle}
              </h1>
              <p className="text-sm sm:text-base leading-relaxed mb-4">
                {item.blogDescription}
              </p>
              <p className="text-sm underline cursor-pointer">Read More</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default BlogCenter;
