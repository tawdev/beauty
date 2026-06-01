'use client';

import { ProductCard } from './ProductCard';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { motion } from 'motion/react';
import { Loader2, ArrowRight } from 'lucide-react';

export function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await api.products.getAll();
        // Just take the first 3 as featured for now
        setProducts(data.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
        // Fallback to static data
        setProducts([
          { id: '1', name: 'Glow Serum', price: 45, category_id: 1, description: 'Radiance-boosting serum with Vitamin C.', image_url: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=1000&auto=format&fit=crop' },
          { id: '2', name: 'Velvet Lipstick', price: 28, category_id: 2, description: 'Long-lasting matte finish in classic red.', image_url: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1000&auto=format&fit=crop' },
          { id: '3', name: 'Argan Oil Mask', price: 35, category_id: 3, description: 'Deep conditioning treatment for dry hair.', image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <section id="shop" className="py-32 px-4 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#FDF6F0]/50 -skew-x-12 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#CBA135] font-black text-sm uppercase tracking-[0.3em] mb-4 block"
            >
              The Collection
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-black text-[#2B2B2B] mb-6" 
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Curated <span className="italic text-[#CBA135]">Excellence</span>
            </motion.h2>
            <p className="text-xl text-gray-500 leading-relaxed">
              Discover our hand-picked selection of premium cosmetic products, designed to elevate your daily beauty ritual.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/shop" 
              className="group flex items-center gap-4 bg-[#2B2B2B] text-white px-10 py-5 rounded-full font-bold transition-all hover:bg-[#CBA135] shadow-xl hover:shadow-[#CBA135]/20"
            >
              View Full Boutique
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-12 h-12 text-[#CBA135] animate-spin" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading collection...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
