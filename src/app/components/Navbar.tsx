"use client";
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CartDrawer } from './CartDrawer';
import { useCart } from '@/context/CartContext';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { items } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = async (id: string) => {
    setIsMenuOpen(false);
    if (pathname !== '/') {
      router.push(`/#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: 'Home', action: () => handleNavClick('home') },
    { label: 'Services', action: () => handleNavClick('services') },
    { label: 'Shop', href: '/shop' },
    { label: 'Gallery', action: () => handleNavClick('gallery') },
    { label: 'Contact', action: () => handleNavClick('contact') },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white/80 backdrop-blur-sm py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="w-10 h-10 bg-[#CBA135] rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition-transform">
                M
              </div>
              <h2 className="text-[#2B2B2B] text-2xl font-black tracking-tighter" style={{ fontFamily: 'Playfair Display, serif' }}>
                Maison d'Éclat
              </h2>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                link.href ? (
                  <Link 
                    key={link.label} 
                    href={link.href} 
                    className={`text-sm font-bold transition-colors ${
                      pathname === link.href ? 'text-[#CBA135]' : 'text-[#2B2B2B] hover:text-[#CBA135]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button 
                    key={link.label} 
                    onClick={link.action} 
                    className="text-sm font-bold text-[#2B2B2B] hover:text-[#CBA135] transition-colors"
                  >
                    {link.label}
                  </button>
                )
              ))}
              
              <div className="h-6 w-px bg-gray-200 mx-2" />

              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-[#2B2B2B] hover:text-[#CBA135] transition-all hover:scale-110"
              >
                <ShoppingBag size={22} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#CBA135] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold ring-2 ring-white">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => handleNavClick('booking')}
                className="bg-[#2B2B2B] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#CBA135] transition-all transform hover:scale-105 shadow-lg hover:shadow-[#CBA135]/20"
              >
                Book Now
              </button>
            </div>

            <div className="flex md:hidden items-center gap-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-[#2B2B2B]"
              >
                <ShoppingBag size={24} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#CBA135] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold ring-2 ring-white">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[#2B2B2B] p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-6 py-8 space-y-4">
            {navLinks.map((link) => (
              link.href ? (
                <Link 
                  key={link.label} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-bold text-[#2B2B2B] hover:text-[#CBA135]"
                >
                  {link.label}
                </Link>
              ) : (
                <button 
                  key={link.label} 
                  onClick={link.action} 
                  className="block w-full text-left text-lg font-bold text-[#2B2B2B] hover:text-[#CBA135]"
                >
                  {link.label}
                </button>
              )
            ))}
            <button
              onClick={() => handleNavClick('booking')}
              className="w-full bg-[#CBA135] text-white px-6 py-4 rounded-full font-bold text-lg shadow-xl"
            >
              Book Now
            </button>
          </div>
        </div>
      </nav>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
