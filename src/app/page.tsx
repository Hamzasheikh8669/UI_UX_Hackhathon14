//src\app\page.tsx

import BeautifulRoom from "@/components/BeautifulRoom";

import Hero from "../components/HeroSection";
import OurProducts from "@/components/OurProducts";

import BrowseSection from "@/components/BrowserSection";
import GallerySection from "@/components/gallery-section";


export default async function Home() {
  return (
    <>
      <Hero />
      <BrowseSection />

      <OurProducts />
      <BeautifulRoom />
      <GallerySection/>
      </>
     
  );
}
