import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

export default function CategoryFilter() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [category, setCategory] = useState("all");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button to open dropdown */}
      <Button
        variant="ghost"
        className="flex items-center space-x-2"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <SlidersHorizontal className="h-4 w-4" />
        <span>Filter</span>
      </Button>

      {/* Dropdown for category filter */}
      {isDropdownOpen && (
        <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md border p-4 z-10">
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="text-gray-600 font-semibold mb-2"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-100 border rounded px-3 py-2"
            >
              <option value="all">All</option>
              <option value="furniture">Furniture</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
