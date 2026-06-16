'use client';

import { useCart } from "@/context/CartContext";
import { ShoppingCart, Eye, Star } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function ProductCard({ product }: { product: any }) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: String(product.id),
      name: product.name,
      price: Number(product.price),
      quantity: 1,
      image_url: product.image_url,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.image_url || 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=1000&auto=format&fit=crop'} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <Link 
            href={`/shop/${product.id}`}
            className="p-3 bg-white rounded-full text-[#2B2B2B] hover:bg-[#CBA135] hover:text-white transition-all transform hover:scale-110"
          >
            <Eye size={20} />
          </Link>
          <button 
            onClick={handleAddToCart}
            className="p-3 bg-[#CBA135] rounded-full text-white hover:bg-[#B8912F] transition-all transform hover:scale-110"
          >
            <ShoppingCart size={20} />
          </button>
        </div>

        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Only {product.stock} left!
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/shop/${product.id}`} className="hover:text-[#CBA135] transition-colors">
            <h3 className="text-xl font-bold text-[#2B2B2B] line-clamp-1" style={{ fontFamily: 'Playfair Display, serif' }}>
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 text-[#CBA135]">
            <Star size={14} fill="currentColor" />
            <span className="text-sm font-semibold text-gray-600">4.8</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
          {product.description || 'Premium quality beauty product for professional results.'}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t">
          <span className="text-2xl font-black text-[#2B2B2B]">{parseFloat(product.price).toFixed(2)} MAD</span>
          <button 
            onClick={handleAddToCart}
            className="text-[#CBA135] font-bold text-sm hover:underline flex items-center gap-1"
          >
            <Plus size={14} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function Plus({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
