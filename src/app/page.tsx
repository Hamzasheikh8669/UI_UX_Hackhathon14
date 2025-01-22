
import HeroSection from "@/components/HeroSection"
import BrowseSection from "@/components/BrowserSection"
import InspirationSection from "@/components/inspiration-section"

import GallerySection from "@/components/gallery-section"
import ProductSection from "@/components/OurProducts";



export default function Home() {
  return (
    <div>
      <HeroSection />
      <BrowseSection />
      <ProductSection/>
      <InspirationSection />
      <GallerySection />


    </div>
  );
}
