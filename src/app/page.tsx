import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { FeaturedProducts } from './components/FeaturedProducts';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { Booking } from './components/Booking';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="size-full overflow-y-auto">
      <Navbar />
      <Hero />
      <Services />
      <FeaturedProducts />
      <About />
      <Gallery />
      <Testimonials />
      <Booking />
      <Footer />
    </div>
  );
}
