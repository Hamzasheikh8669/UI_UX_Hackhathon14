"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Heart, Share2, ArrowRightLeft } from "lucide-react";
import { ProductFilterBar } from "@/components/filterbar";
import { useAtom } from "jotai";
import { searchName } from "@/globalState/globalState";


interface ProductSection {
  title: string;
  description: string;
  isNew: boolean;
  tags: string[];
  price: number;
  productImage: string;
  dicountPercentage: number;
  _id: string;
}

interface ProductGridClientProps {
  initialCards: ProductSection[];
}

export default function ProductGridClient({
  initialCards,
}: ProductGridClientProps) {
  const [cards, setCards] = useState<ProductSection[]>(initialCards);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(8);
  const [search] = useAtom(searchName);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const itemsPerPage = show;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCards = cards.slice(startIndex, endIndex);
  const totalPages = Math.ceil(cards.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [show]);

  useEffect(() => {
    if (search) {
      const filteredCards = initialCards.filter((card) =>
        card.title.toLowerCase().includes(search.toLowerCase())
      );
      setCards(filteredCards);
      setCurrentPage(1);
    } else {
      setCards(initialCards);
    }
  }, [search, initialCards]);

  return (
    <>
      
        <ProductFilterBar
          show={show}
          setShow={setShow}
          viewMode={viewMode}
          setViewMode={setViewMode}
          totalResults={cards.length}
        />
      <div className="container mx-auto p-4 md:p-6">
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {paginatedCards.map((item: ProductSection) => (
            <Card
              key={item._id}
              className={`group relative overflow-hidden shadow-md ${viewMode === "list" ? "flex" : ""}`}
            >
              <div
                className={`relative ${viewMode === "grid" ? "aspect-square" : "w-1/3"}`}
              >
                <Image
                  src={item.productImage || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-center transition-transform group-hover:scale-105"
                />
              </div>

              {item.isNew && (
                <div className="absolute left-4 top-4 rounded-full px-3 py-2 text-sm text-white bg-green-500">
                  New
                </div>
              )}

              {item.dicountPercentage > 0 && (
                <div className="absolute right-4 top-4 rounded-full px-3 py-1 text-sm text-white bg-red-500">
                  -{item.dicountPercentage}%
                </div>
              )}

              <div className="absolute inset-0 bg-black bg-opacity-0 transition-all group-hover:bg-opacity-40 z-10 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                <Link
                  href={`/shop/ProductDetails?id=${item._id}&productName=${item.title}&productPrice=${item.price}&productImage=${item.productImage}&productDescription=${item.description}&productdicountPercentage=${item.dicountPercentage}&tags=${item.tags}&isNew=${item.isNew}`}
                >
                  <Button className="w-[202px] bg-white hover:bg-gray-200 text-black transition-all">
                    Add to Cart
                  </Button>
                </Link>
                <div className="flex justify-center w-[202px] py-2">
                  <Button variant="ghost" size="sm" className="text-white">
                    <Share2 className="h-4 w-4 mr-2" /> Share
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white">
                    <ArrowRightLeft className="h-4 w-4 mr-2" /> Compare
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white">
                    <Heart className="h-4 w-4 mr-2" /> Like
                  </Button>
                </div>
              </div>

              <div className={viewMode === "list" ? "flex-grow" : ""}>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">
                    {item.description.slice(0, 100)}...
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4 p-4">
                  {item.tags && (
                    <div className="  px-3 py-1 text-sm text-white flex flex-wrap gap-2">
                      {item.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 text-black px-2 rounded-md  py-1 "
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">Rs. {item.price}</span>
                  </div>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? "default" : "outline"}
              className="w-12"
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            className="w-20"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}