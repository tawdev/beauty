"use client";

import { useTranslations } from 'next-intl';

export function Gallery() {
  const t = useTranslations('gallery');

  const images = [
    'https://images.unsplash.com/photo-1646526803575-5c3759f2b932?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxiZWF1dHklMjBtb2RlbCUyMHBvcnRyYWl0JTIwZWxlZ2FudHxlbnwxfHx8fDE3NzY3NjYyNDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1723150512429-bfa92988d845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtYWtldXAlMjBhcnRpc3QlMjBiZWF1dHklMjBjb3NtZXRpY3N8ZW58MXx8fHwxNzc2NzY2MjUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1754799670312-8e7da8e40ad7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxuYWlsJTIwYXJ0JTIwbWFuaWN1cmUlMjBiZWF1dHl8ZW58MXx8fHwxNzc2NzY2MjUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1760320483926-5e3e4fe1c3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxiZWF1dHklMjBtb2RlbCUyMHBvcnRyYWl0JTIwZWxlZ2FudHxlbnwxfHx8fDE3NzY3NjYyNDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1761931403667-a6753db21f32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxoYWlyJTIwc3R5bGluZyUyMHNhbG9uJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3Njc2NjI1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1772322586754-34c9e6f5be6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxuYWlsJTIwYXJ0JTIwbWFuaWN1cmUlMjBiZWF1dHl8ZW58MXx8fHwxNzc2NzY2MjUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1762254321931-852fe54b4579?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxiZWF1dHklMjBtb2RlbCUyMHBvcnRyYWl0JTIwZWxlZ2FudHxlbnwxfHx8fDE3NzY3NjYyNDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1653130029149-9109b115ab9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtYWtldXAlMjBhcnRpc3QlMjBiZWF1dHklMjBjb3NtZXRpY3N8ZW58MXx8fHwxNzc2NzY2MjUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1772322586649-fc11154e76b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxuYWlsJTIwYXJ0JTIwbWFuaWN1cmUlMjBiZWF1dHl8ZW58MXx8fHwxNzc2NzY2MjUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  ];

  return (
    <section id="gallery" className="py-24 px-4 bg-[#FDF6F0]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl mb-4 text-[#2B2B2B]"
            style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
          >
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl shadow-lg aspect-square group cursor-pointer"
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#E8B4B8]/0 group-hover:bg-[#E8B4B8]/40 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
