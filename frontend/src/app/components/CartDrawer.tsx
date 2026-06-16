'use client';

import { useCart } from "@/context/CartContext";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, total } = useCart();

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md" 
            onClick={onClose} 
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b flex justify-between items-center bg-[#FDF6F0]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#CBA135] rounded-xl flex items-center justify-center text-white">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-[#2B2B2B]" style={{ fontFamily: 'Playfair Display, serif' }}>Your Bag</h2>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{cartItemsCount} items selected</p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-gray-200 rounded-full transition-all hover:rotate-90"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-6">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                    <ShoppingBag size={48} className="opacity-20" />
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-[#2B2B2B]">Your bag is empty</p>
                    <p className="text-sm text-gray-400 mt-2">Looks like you haven't added anything yet.</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="bg-[#2B2B2B] text-white px-8 py-3 rounded-full font-bold hover:bg-[#CBA135] transition-all"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.id} 
                    className="flex gap-4 p-4 bg-[#FDF6F0] rounded-3xl group border border-transparent hover:border-[#CBA135]/20 transition-all"
                  >
                    <div className="w-24 h-24 bg-white rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                          <ShoppingBag size={24} className="text-gray-200" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-[#2B2B2B] leading-tight">{item.name}</h3>
                        <button 
                          onClick={() => removeItem(item.id)} 
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 bg-white rounded-full px-3 py-1 border shadow-sm">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="text-gray-400 hover:text-[#CBA135] transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-4 text-center font-bold text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-400 hover:text-[#CBA135] transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-black text-[#CBA135]">{(item.price * item.quantity).toFixed(2)} MAD</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 border-t bg-white space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>{total.toFixed(2)} MAD</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Shipping</span>
                    <span className="text-green-600 font-bold uppercase text-[10px] bg-green-50 px-2 py-1 rounded">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-2xl font-black text-[#2B2B2B] pt-2">
                    <span style={{ fontFamily: 'Playfair Display, serif' }}>Total</span>
                    <span>{total.toFixed(2)} MAD</span>
                  </div>
                </div>
                <Link 
                  href="/checkout" 
                  onClick={onClose}
                  className="group flex items-center justify-center gap-3 w-full bg-[#2B2B2B] text-white py-5 rounded-full font-black hover:bg-[#CBA135] transition-all transform active:scale-95 shadow-xl hover:shadow-[#CBA135]/20"
                >
                  Checkout Now
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest font-bold">Secure Checkout Powered by Stripe</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
