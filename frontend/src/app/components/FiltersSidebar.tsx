'use client';

import { useState } from "react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";

export function FiltersSidebar({ 
  categories, 
  onFilterChange 
}: { 
  categories: any[]; 
  onFilterChange: (filters: any) => void;
}) {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);

  const handleCategoryToggle = (categoryId: number) => {
    const newSelected = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    setSelectedCategories(newSelected);
    onFilterChange({ categories: newSelected, priceRange });
  };

  return (
    <div className="w-full md:w-64 space-y-8 p-6 bg-white rounded-3xl shadow-sm border">
      <div className="flex items-center gap-2 pb-4 border-b">
        <Filter size={20} className="text-[#CBA135]" />
        <h2 className="text-xl font-bold text-[#2B2B2B]">Filters</h2>
      </div>

      <div className="space-y-4">
        <button 
          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          className="flex justify-between items-center w-full text-lg font-semibold text-[#2B2B2B]"
        >
          Categories
          {isCategoriesOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {isCategoriesOpen && (
          <div className="space-y-2 pl-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                    className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-[#CBA135] checked:border-[#CBA135] transition-all"
                  />
                  <svg className="absolute w-3 h-3 text-white left-1 hidden peer-checked:block pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-600 group-hover:text-[#CBA135] transition-colors">{category.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4 pt-4 border-t">
        <button 
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="flex justify-between items-center w-full text-lg font-semibold text-[#2B2B2B]"
        >
          Price Range
          {isPriceOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {isPriceOpen && (
          <div className="space-y-6 px-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>0 MAD</span>
              <span>1000+ MAD</span>
            </div>
            <input 
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange[1]}
              onChange={(e) => {
                const newRange = [0, parseInt(e.target.value)];
                setPriceRange(newRange);
                onFilterChange({ categories: selectedCategories, priceRange: newRange });
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#CBA135]"
            />
            <div className="text-center font-bold text-[#CBA135]">
              Max Price: {priceRange[1]} MAD
            </div>
          </div>
        )}
      </div>

      <button 
        onClick={() => {
          setSelectedCategories([]);
          setPriceRange([0, 1000]);
          onFilterChange({ categories: [], priceRange: [0, 1000] });
        }}
        className="w-full py-2 text-sm text-gray-500 hover:text-[#CBA135] transition-colors underline"
      >
        Reset Filters
      </button>
    </div>
  );
}
