'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ShoppingCart, Minus, Plus, Share2, Heart, Check, ChevronRight, MessageSquare, Info, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { RelatedProducts } from "@/app/components/RelatedProducts";

interface ProductDetailClientProps {
  product: any;
  reviews: any[];
  relatedProducts: any[];
}

export function ProductDetailClient({ product, reviews, relatedProducts }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);

  const images = product.images?.length > 0 
    ? product.images.map((img: any) => img.url) 
    : [product.image_url || 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=1000&auto=format&fit=crop'];

  const handleAddToCart = () => {
    addItem({
      id: String(product.id),
      name: product.name,
      price: Number(product.price),
      quantity: quantity,
      image_url: product.image_url,
    });
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  const tabs = [
    { id: 'description', label: 'Description', icon: <Info size={18} /> },
    { id: 'reviews', label: `Reviews (${reviews.length})`, icon: <MessageSquare size={18} /> },
    { id: 'shipping', label: 'Shipping', icon: <ShieldCheck size={18} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <a href="/" className="hover:text-[#CBA135]">Home</a>
        <ChevronRight size={14} />
        <a href="/shop" className="hover:text-[#CBA135]">Shop</a>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative aspect-square rounded-3xl overflow-hidden bg-white border shadow-sm group"
          >
            <img 
              src={images[selectedImage]} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {product.stock <= 5 && (
              <div className="absolute top-6 left-6 bg-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                Limited Stock: {product.stock} left
              </div>
            )}
            <button 
              onClick={() => toast.success(`${product.name} added to favorites!`)}
              className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md rounded-full text-gray-900 hover:bg-[#CBA135] hover:text-white transition-all shadow-sm"
            >
              <Heart size={20} />
            </button>
          </motion.div>

          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-[#CBA135] ring-2 ring-[#CBA135]/20' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-[#CBA135]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-sm text-gray-500">(4.8/5 based on {reviews.length} reviews)</span>
            </div>

            <h1 className="text-5xl font-black text-[#2B2B2B] mb-4 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              {product.name}
            </h1>
            
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-black text-[#CBA135]">{parseFloat(product.price).toFixed(2)} MAD</span>
              {product.old_price && (
                <span className="text-xl text-gray-400 line-through">{parseFloat(product.old_price).toFixed(2)} MAD</span>
              )}
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.description || "Indulge in our premium beauty essential. Crafted with the finest ingredients to enhance your natural radiance and provide long-lasting results."}
            </p>

            <div className="space-y-6 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-white border rounded-full px-2 py-1 shadow-sm">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:text-[#CBA135] transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:text-[#CBA135] transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#2B2B2B] text-white rounded-full py-4 px-8 font-bold flex items-center justify-center gap-3 hover:bg-[#CBA135] transition-all transform active:scale-95 shadow-xl hover:shadow-2xl hover:shadow-[#CBA135]/20"
                >
                  <ShoppingCart size={20} />
                  Add to Shopping Bag
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-sm text-gray-600 bg-white p-4 rounded-2xl border shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <Check size={18} />
                  </div>
                  <div>
                    <p className="font-bold">In Stock</p>
                    <p className="text-xs">Ready to ship</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success('Link copied to clipboard!');
                  }}
                  className="flex items-center gap-3 text-sm text-gray-600 bg-white p-4 rounded-2xl border shadow-sm hover:border-[#CBA135] hover:shadow-md transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Share2 size={18} />
                  </div>
                  <div>
                    <p className="font-bold">Share</p>
                    <p className="text-xs">Invite friends</p>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-24">
        <div className="flex border-b border-gray-200 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-8 py-4 font-bold transition-all relative ${
                activeTab === tab.id ? 'text-[#CBA135]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#CBA135] rounded-t-full"
                />
              )}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-12 border shadow-sm">
          <AnimatePresence mode="wait">
            {activeTab === 'description' && (
              <motion.div
                key="description"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="prose max-w-none text-gray-600 leading-relaxed"
              >
                <h3 className="text-2xl font-bold text-[#2B2B2B] mb-4">Product Details</h3>
                <p className="mb-6">{product.description || "No description available."}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div className="bg-[#FDF6F0] p-6 rounded-2xl">
                    <h4 className="font-bold text-[#2B2B2B] mb-2">Key Benefits</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#CBA135]" /> Natural ingredients</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#CBA135]" /> Long-lasting effect</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#CBA135]" /> Suitable for all skin types</li>
                    </ul>
                  </div>
                  <div className="bg-[#FDF6F0] p-6 rounded-2xl">
                    <h4 className="font-bold text-[#2B2B2B] mb-2">How to Use</h4>
                    <p className="text-sm">Apply a small amount to clean, dry skin. Massage gently in circular motions until fully absorbed. Use daily for best results.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <h3 className="text-3xl font-black text-[#2B2B2B] mb-2">Customer Reviews</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex text-[#CBA135]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={20} fill={i < 4 ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <span className="text-lg font-bold text-gray-600">4.8 out of 5</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => toast.info('Review functionality is coming soon! Stay tuned.')}
                    className="bg-[#CBA135] text-white px-8 py-3 rounded-full font-bold hover:bg-[#B8912F] transition-all"
                  >
                    Write a Review
                  </button>
                </div>

                {reviews.length > 0 ? (
                  <div className="space-y-8">
                    {reviews.map((review: any) => (
                      <div key={review.id} className="border-b pb-8">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-bold text-lg text-[#2B2B2B]">{review.user_name || 'Verified Buyer'}</p>
                            <div className="flex text-[#CBA135] mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-400">{new Date(review.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed italic">"{review.comment}"</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare size={48} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'shipping' && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-gray-600 leading-relaxed"
              >
                <h3 className="text-2xl font-bold text-[#2B2B2B] mb-4">Shipping & Returns</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-50 flex-shrink-0 flex items-center justify-center text-orange-600">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-[#2B2B2B]">Free Express Delivery</p>
                      <p>Enjoy free shipping on all orders over 1000 MAD. Typical delivery time is 2-4 business days.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex-shrink-0 flex items-center justify-center text-green-600">
                      <Check size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-[#2B2B2B]">Easy 30-Day Returns</p>
                      <p>Not satisfied? Return your unused product within 30 days for a full refund, no questions asked.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}
