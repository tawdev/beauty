'use client';

import { useCart } from "@/context/CartContext";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { motion } from "motion/react";
import { ShoppingBag, ChevronRight, CreditCard, ShieldCheck, ArrowLeft, Send } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { api } from "@/lib/api";
import { useTranslations } from "next-intl";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const t = useTranslations('checkout');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });

  if (items.length === 0) {
    return (
      <div className="size-full overflow-y-auto bg-[#FDF6F0]">
        <Navbar />
        <div className="pt-40 pb-20 text-center max-w-lg mx-auto px-4">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
            <ShoppingBag size={48} className="text-gray-200" />
          </div>
          <h1 className="text-4xl font-black text-[#2B2B2B] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{t('emptyCart')}</h1>
          <p className="text-gray-500 mb-8">You need to add some premium items to your bag before checking out.</p>
          <Link href="/shop" className="inline-block bg-[#CBA135] text-white px-10 py-4 rounded-full font-bold hover:bg-[#B8912F] transition-all">
            {t('backToShop')}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const shipping_address = `${formData.address}, ${formData.city}, ${formData.zipCode} (Phone: ${formData.phone})`;
    const orderItems = items.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    try {
      await api.orders.create({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        shipping_address,
        items: orderItems,
      });

      toast.success("Order placed successfully! We will contact you soon.");
      clearCart();
      router.push('/');
    } catch (error: any) {
      console.error('Failed to submit order:', error);
      toast.error(error.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="size-full overflow-y-auto bg-[#FDF6F0]">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-12">
            <Link href="/shop" className="hover:text-[#CBA135]">Shop</Link>
            <ChevronRight size={14} />
            <span className="text-[#2B2B2B]">Secure Checkout</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left Column: Form */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-[#FDF6F0] rounded-2xl flex items-center justify-center text-[#CBA135]">
                    <Send size={24} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-[#2B2B2B]" style={{ fontFamily: 'Playfair Display, serif' }}>{t('shippingInfo')}</h2>
                    <p className="text-sm text-gray-400 font-medium">Where should we send your luxury items?</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">{t('firstName')}</label>
                      <input 
                        required
                        type="text" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="e.g. Sarah"
                        className="w-full bg-[#FDF6F0] border-transparent focus:border-[#CBA135] focus:bg-white rounded-2xl p-4 transition-all outline-none text-[#2B2B2B] font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">{t('lastName')}</label>
                      <input 
                        required
                        type="text" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="e.g. Johnson"
                        className="w-full bg-[#FDF6F0] border-transparent focus:border-[#CBA135] focus:bg-white rounded-2xl p-4 transition-all outline-none text-[#2B2B2B] font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">{t('email')}</label>
                      <input 
                        required
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="sarah@example.com"
                        className="w-full bg-[#FDF6F0] border-transparent focus:border-[#CBA135] focus:bg-white rounded-2xl p-4 transition-all outline-none text-[#2B2B2B] font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">{t('phone')}</label>
                      <input 
                        required
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+212 600 000 000"
                        className="w-full bg-[#FDF6F0] border-transparent focus:border-[#CBA135] focus:bg-white rounded-2xl p-4 transition-all outline-none text-[#2B2B2B] font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">{t('address')}</label>
                    <input 
                      required
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street address, Apartment, etc."
                      className="w-full bg-[#FDF6F0] border-transparent focus:border-[#CBA135] focus:bg-white rounded-2xl p-4 transition-all outline-none text-[#2B2B2B] font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">{t('city')}</label>
                      <input 
                        required
                        type="text" 
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Marrakech"
                        className="w-full bg-[#FDF6F0] border-transparent focus:border-[#CBA135] focus:bg-white rounded-2xl p-4 transition-all outline-none text-[#2B2B2B] font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">{t('zipCode')}</label>
                      <input 
                        required
                        type="text" 
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="40000"
                        className="w-full bg-[#FDF6F0] border-transparent focus:border-[#CBA135] focus:bg-white rounded-2xl p-4 transition-all outline-none text-[#2B2B2B] font-medium"
                      />
                    </div>
                  </div>

                  <div className="pt-8 flex flex-col sm:flex-row items-center gap-4">
                    <Link href="/shop" className="flex items-center gap-2 text-sm font-black text-gray-400 hover:text-[#2B2B2B] transition-colors group">
                      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                      {t('backToShop')}
                    </Link>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="flex-1 w-full bg-[#2B2B2B] text-white py-5 rounded-full font-black text-lg hover:bg-[#CBA135] transition-all transform active:scale-95 shadow-xl hover:shadow-[#CBA135]/20 disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                      {loading ? t('processing') : t('placeOrder')}
                      {!loading && <CreditCard size={20} />}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Right Column: Summary */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="sticky top-32 space-y-8"
              >
                <div className="bg-[#2B2B2B] text-white rounded-[2.5rem] p-10 shadow-2xl">
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {t('orderSummary')}
                    <span className="text-[10px] bg-[#CBA135] px-2 py-1 rounded-full text-white uppercase tracking-widest">{items.length} items</span>
                  </h3>
                  
                  <div className="space-y-6 mb-8 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-20 h-20 bg-white/10 rounded-2xl overflow-hidden flex-shrink-0">
                          <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 py-1">
                          <h4 className="font-bold text-sm text-gray-200">{item.name}</h4>
                          <p className="text-xs text-gray-400 mt-1">Qty: {item.quantity}</p>
                          <p className="text-[#CBA135] font-black mt-2">{(item.price * item.quantity).toFixed(2)} MAD</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 pt-8 border-t border-white/10">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{t('subtotal')}</span>
                      <span className="text-white font-bold">{total.toFixed(2)} MAD</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{t('shipping')}</span>
                      <span className="text-green-400 font-bold">{t('free')}</span>
                    </div>
                    <div className="flex justify-between text-3xl font-black text-white pt-4">
                      <span style={{ fontFamily: 'Playfair Display, serif' }}>{t('total')}</span>
                      <span className="text-[#CBA135]">{total.toFixed(2)} MAD</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-4 bg-white p-6 rounded-3xl border shadow-sm">
                    <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <p className="font-black text-[#2B2B2B] text-sm uppercase tracking-tight">Secure Payment</p>
                      <p className="text-xs text-gray-400">SSL Encrypted protection</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white p-6 rounded-3xl border shadow-sm">
                    <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <p className="font-black text-[#2B2B2B] text-sm uppercase tracking-tight">Express Delivery</p>
                      <p className="text-xs text-gray-400">2-3 Business Days</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
