import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative max-w-full mx-auto flex items-center justify-end bg-white h-[700px]">
      {/* Image Section */}
      <div className="absolute opacity-80 md:opacity-100 inset-0 w-full h-full">
        <Image
          src={"/images/hero-image.jpeg"}
          alt="Decorative Room"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      <div className="relative md:right-8 z-10 md:w-1/2 w-full bg-[#fff] p-8 md:p-12 rounded-md shadow-outer font-poppins">
        <p className="text-sm lg:text-base uppercase font-semibold text-[#333333] mb-[10px]">
          New Arrival
        </p>
        <h1 className="text-[30px] lg:text-[52px] leading-[50px] font-bold text-[#B88E2F] mb-5">
          Discover Our <br />
          New Collection
        </h1>
        <p className="text-[#333333] text-[15px] sm:text-base md:text-lg mb-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis.
        </p>
        <button className="bg-[#B88E2F] text-white text-sm md:text-base px-[60px] py-[14px] md:px-[65px] md:py-[15px] lg:px-[70px] lg:py-[17px] text-center content-center rounded-sm shadow-md hover:bg-[#b88f2ff8] font-bold">
          Buy Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
