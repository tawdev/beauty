import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-[#2B2B2B] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3
              className="text-[#E8B4B8] text-2xl mb-4"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
            >
              BeautyStudio
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Your destination for professional beauty services. Transforming beauty into art since 2009.
            </p>
          </div>

          <div>
            <h4
              className="text-lg mb-4"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#home" className="hover:text-[#E8B4B8] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E8B4B8] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#E8B4B8] transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-[#E8B4B8] transition-colors">
                  Book Now
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="text-lg mb-4"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}
            >
              Contact Info
            </h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-[#E8B4B8] flex-shrink-0 mt-1" />
                <span>123 Beauty Avenue, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-[#E8B4B8] flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-[#E8B4B8] flex-shrink-0" />
                <span>hello@beautystudio.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="text-lg mb-4"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}
            >
              Follow Us
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#E8B4B8] flex items-center justify-center hover:bg-[#CBA135] transition-colors"
              >
                <Facebook size={20} className="text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#E8B4B8] flex items-center justify-center hover:bg-[#CBA135] transition-colors"
              >
                <Instagram size={20} className="text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#E8B4B8] flex items-center justify-center hover:bg-[#CBA135] transition-colors"
              >
                <Twitter size={20} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2026 BeautyStudio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
