
"use client"

import { useState } from "react"
import { Search, Star, ShoppingBag, CalendarDays } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const mockReviews = [
  {
    id: "REV-001",
    customer: "John Doe",
    rating: 5,
    comment: "Absolutely love this product! Exceeded all my expectations and the quality is outstanding.",
    product: "Premium Wireless Headphones",
    date: "2024-03-15",
  },
  {
    id: "REV-002",
    customer: "Jane Smith",
    rating: 4,
    comment: "Good value for money, but the shipping took longer than expected.",
    product: "Smart Fitness Tracker",
    date: "2024-03-14",
  },
  {
    id: "REV-003",
    customer: "Mike Johnson",
    rating: 2,
    comment: "Product stopped working after 2 weeks. Very disappointed.",
    product: "Bluetooth Speaker X200",
    date: "2024-03-13",
  },
  {
    id: "REV-004",
    customer: "Sarah Wilson",
    rating: 5,
    comment: "Best purchase I've made this year! Highly recommend to everyone.",
    product: "Ergonomic Office Chair",
    date: "2024-03-12",
  },
  {
    id: "REV-005",
    customer: "Alex Chen",
    rating: 3,
    comment: "Decent product but the instructions were unclear.",
    product: "Wireless Charging Pad",
    date: "2024-03-11",
  },
]

export default function ReviewsGrid() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const totalPages = Math.ceil(mockReviews.length / itemsPerPage)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentReviews = mockReviews.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={cn(
          "h-4 w-4 transition-all duration-300",
          index < rating ? "fill-yellow-400 stroke-yellow-400" : "fill-gray-200 stroke-gray-300",
        )}
      />
    ))
  }

  return (
    <div className="space-y-8 p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Customer Reviews
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search reviews..." className="pl-10 w-full shadow-sm" />
        </div>

        <div className="flex gap-4 w-full sm:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px] shadow-sm">
              <SelectValue placeholder="Filter by rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentReviews.map((review) => (
          <Card
            key={review.id}
            className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    {review.customer.charAt(0)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{review.customer}</CardTitle>
                    <div className="flex items-center gap-1 mt-1">{renderStars(review.rating)}</div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-2">
              <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{review.comment}</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <ShoppingBag className="h-4 w-4" />
                <span className="font-medium">{review.product}</span>
              </div>
            </CardContent>

            <CardFooter className="border-t pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <CalendarDays className="h-4 w-4" />
                {new Date(review.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(currentPage - 1)
              }}
              className={cn(currentPage > 1 ? "opacity-100" : "opacity-50 pointer-events-none")}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(page)
                }}
                className={cn(
                  page === currentPage ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-muted",
                )}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(currentPage + 1)
              }}
              className={cn(currentPage < totalPages ? "opacity-100" : "opacity-50 pointer-events-none")}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
