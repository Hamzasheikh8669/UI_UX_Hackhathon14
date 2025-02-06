"use client"

import { Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "../components/ui/separate"

interface ProductFilterBarProps {
  show: number
  setShow: (value: number) => void
  viewMode: "grid" | "list"
  setViewMode: (mode: "grid" | "list") => void
  totalResults: number
}

export function ProductFilterBar({ show, setShow, viewMode, setViewMode, totalResults }: ProductFilterBarProps) {
  return (
    <div className="w-full h-[100px] bg-[#F9F1E7] flex flex-col exsm:flex-row items-center justify-between px-4 exsm:px-6 py-4 exsm:py-0">
      {/* Left Section: Filter and View Mode */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="text-base exsm:text-xl">
          <Filter className="mr-2 h-5 w-5" />
          Filter
        </Button>
        <div className="exsm:hidden sm:flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-primary text-primary-foreground" : ""}
          >
            <Grid className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-primary text-primary-foreground" : ""}
          >
            <List className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Middle Section: Separator and Results Count */}
      <Separator orientation="vertical" className="hidden exsm:block mx-4 h-9" />
      <div className="exsm:hidden sm:flex text-sm mt-4 exsm:mt-0">
        Showing 1–{Math.min(show, totalResults)} of {totalResults} results
      </div>

      {/* Right Section: Show Dropdown */}
      <div className="ml-auto flex items-center space-x-4 mt-4 exsm:mt-0">
        <div className="flex items-center space-x-2">
          <span className="text-base exsm:text-xl">Show</span>
          <Select value={show.toString()} onValueChange={(value) => setShow(Number(value))}>
            <SelectTrigger className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="16">16</SelectItem>
              <SelectItem value="24">24</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}