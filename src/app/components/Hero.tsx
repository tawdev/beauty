"use client";
import Link from 'next/link';
export function Hero() {
  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1762342669315-f209a6682b3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxiZWF1dHklMjBtb2RlbCUyMHBvcnRyYWl0JTIwZWxlZ2FudHxlbnwxfHx8fDE3NzY3NjYyNDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Elegant beauty model"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#E8B4B8]/60 to-[#E8B4B8]/30"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1
          className="text-5xl md:text-7xl mb-6 text-white drop-shadow-lg"
          style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
        >
          Reveal Your Natural Beauty
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-md">
          Professional beauty services tailored for you
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToBooking}
            className="w-full sm:w-auto bg-[#CBA135] text-white px-10 py-4 rounded-full text-lg hover:bg-[#B8912F] transition-all transform hover:scale-105 shadow-lg font-bold"
          >
            Book Appointment
          </button>
          <Link
            href="/shop"
            className="w-full sm:w-auto bg-white/20 backdrop-blur-md text-white border-2 border-white px-10 py-4 rounded-full text-lg hover:bg-white hover:text-[#2B2B2B] transition-all transform hover:scale-105 shadow-lg font-bold"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
