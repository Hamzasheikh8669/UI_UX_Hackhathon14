


import { Suspense } from "react"
import Link from "next/link"



import { getProducts } from "../../app/services/getProducts"
import ProductGridClient from "../../components/productGridClient"
import { ChevronRight } from "lucide-react"
 // Assume this function fetches products from your data source

export default async function ShopPage() {
  const products = await getProducts()

  return (
    <>
      <section className="bg-[url('/images/shop.png')] bg-cover bg-center py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block w-16 h-16 bg-[url('/logo1.png')] mb-4" />
          <h1 className="text-3xl md:text-4xl font-medium mb-4">Shop</h1>
          <div className="flex items-center justify-center gap-2 text-sm">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            </span>
            <span>Shop</span>
          </div>
        </div>
      </section>

      <Suspense fallback={<div>Loading...</div>}>
        <ProductGridClient initialCards={products} />
      </Suspense>

      
    </>
  )
}