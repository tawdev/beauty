'use client';

import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
  products: any[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-4xl font-black text-[#2B2B2B] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            You May Also Love
          </h2>
          <p className="text-gray-500">Curated recommendations based on your selection.</p>
        </div>
        <a href="/shop" className="text-[#CBA135] font-bold hover:underline mb-2 transition-all hover:pr-2">
          View All Shop
        </a>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
