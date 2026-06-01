'use client';

import { Sparkles, Scissors, Hand, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { motion } from 'motion/react';

export function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await api.services.getAll();
        setServices(data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
        // Fallback to static data if API fails
        setServices([
          {
            title: 'Makeup',
            description: 'Professional makeup artistry for any occasion, enhancing your natural beauty with expert techniques.',
            image: 'https://images.unsplash.com/photo-1652706299340-e8a346491541?q=80&w=1080',
          },
          {
            title: 'Hair',
            description: 'Expert hair styling, coloring, and treatments to transform your look with the latest trends.',
            image: 'https://images.unsplash.com/photo-1763048208932-cbe149724374?q=80&w=1080',
          },
          {
            title: 'Nails',
            description: 'Luxurious nail care services including manicures, pedicures, and artistic nail designs.',
            image: 'https://images.unsplash.com/photo-1754799670410-b282791342c3?q=80&w=1080',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  const getIcon = (name: string) => {
    switch (name?.toLowerCase() || '') {
      case 'makeup': return <Sparkles size={32} />;
      case 'hair': return <Scissors size={32} />;
      case 'nails': return <Hand size={32} />;
      default: return <Sparkles size={32} />;
    }
  };

  return (
    <section id="services" className="py-32 px-4 bg-[#FDF6F0]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black mb-6 text-[#2B2B2B]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Artistry in Every <span className="text-[#CBA135]">Detail</span>
            </motion.h2>
            <p className="text-xl text-gray-500 leading-relaxed">
              Experience the pinnacle of beauty with our curated range of professional services, tailored to your unique elegance.
            </p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <div className="px-6 py-3 bg-white rounded-full border shadow-sm font-bold text-sm text-[#2B2B2B]">
              Premium Products
            </div>
            <div className="px-6 py-3 bg-[#CBA135] rounded-full shadow-lg font-bold text-sm text-white">
              Certified Experts
            </div>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-12 h-12 text-[#CBA135] animate-spin" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Curating services...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col border border-gray-100"
              >
                <div className="h-80 overflow-hidden relative">
                  <img
                    src={service.image_url || service.image}
                    alt={service.name || service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                  <div className="absolute bottom-6 left-6">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#CBA135] shadow-xl group-hover:bg-[#CBA135] group-hover:text-white transition-all duration-300">
                      {getIcon(service.name || service.title)}
                    </div>
                  </div>
                </div>
                <div className="p-10 flex-1 flex flex-col">
                  <h3
                    className="text-3xl font-bold mb-4 text-[#2B2B2B] group-hover:text-[#CBA135] transition-colors"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {service.name || service.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-lg mb-8 flex-1">
                    {service.description}
                  </p>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('booking');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 text-sm font-black text-[#2B2B2B] hover:text-[#CBA135] transition-colors group/btn"
                  >
                    LEARN MORE 
                    <div className="w-6 h-px bg-[#2B2B2B] group-hover/btn:bg-[#CBA135] group-hover/btn:w-10 transition-all" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
