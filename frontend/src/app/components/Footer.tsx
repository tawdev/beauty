'use client';

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useTranslations } from 'next-intl';

export function Footer() {
  const [settings, setSettings] = useState<any>(null);
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  
  const siteName = settings?.site_name || "Maison d'Eclat";
  const address = settings?.address || '123 Beauty Avenue, Casablanca';
  const phone = settings?.phone || '+212 600-000000';
  const email = settings?.email || 'hello@maison.com';

  useEffect(() => {
    api.settings.get()
      .then(setSettings)
      .catch((error) => console.warn('Failed to load website settings:', error));
  }, []);

  return (
    <footer id="contact" className="bg-[#2B2B2B] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3
              className="text-[#E8B4B8] text-2xl mb-4"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
            >
              {siteName}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {t('description')}
            </p>
          </div>

          <div>
            <h4
              className="text-lg mb-4"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}
            >
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#home" className="hover:text-[#E8B4B8] transition-colors">
                  {tNav('home')}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E8B4B8] transition-colors">
                  {tNav('services')}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#E8B4B8] transition-colors">
                  {tNav('gallery')}
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-[#E8B4B8] transition-colors">
                  {tNav('bookNow')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="text-lg mb-4"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}
            >
              {t('contactInfo')}
            </h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-[#E8B4B8] flex-shrink-0 mt-1" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-[#E8B4B8] flex-shrink-0" />
                <span>{phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-[#E8B4B8] flex-shrink-0" />
                <span>{email}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="text-lg mb-4"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}
            >
              {t('followUs')}
            </h4>
            <div className="flex gap-4">
              <a
                href={settings?.facebook_url || '#'}
                className="w-10 h-10 rounded-full bg-[#E8B4B8] flex items-center justify-center hover:bg-[#CBA135] transition-colors"
              >
                <Facebook size={20} className="text-white" />
              </a>
              <a
                href={settings?.instagram_url || '#'}
                className="w-10 h-10 rounded-full bg-[#E8B4B8] flex items-center justify-center hover:bg-[#CBA135] transition-colors"
              >
                <Instagram size={20} className="text-white" />
              </a>
              <a
                href={settings?.twitter_url || '#'}
                className="w-10 h-10 rounded-full bg-[#E8B4B8] flex items-center justify-center hover:bg-[#CBA135] transition-colors"
              >
                <Twitter size={20} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2026 {siteName}. {t('rights')}</p>
        </div>
      </div>
    </footer>
  );
}
