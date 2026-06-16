'use client';

import { useState } from "react";
import { ProductCard } from "@/app/components/ProductCard";
import { FiltersSidebar } from "@/app/components/FiltersSidebar";

export function ShopClient({ initialProducts, categories }: { initialProducts: any[]; categories: any[] }) {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  const handleFilterChange = (filters: any) => {
    let filtered = [...initialProducts];

    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) =>
        filters.categories.includes(Number(p.category_id))
      );
    }

    if (filters.priceRange) {
      filtered = filtered.filter(
        (p) => Number(p.price) <= filters.priceRange[1]
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <aside className="w-full md:w-64 md:sticky md:top-24 md:self-start flex-shrink-0 md:max-h-[calc(100vh-7rem)] md:overflow-y-auto">
        <FiltersSidebar categories={categories} onFilterChange={handleFilterChange} />
      </aside>
      
      <main className="flex-1">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border shadow-sm">
            <h3 className="text-2xl font-bold text-gray-400">No products found matching your filters.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
