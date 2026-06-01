import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { ShopClient } from './ShopClient';
import { api } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  try {
    const products = await api.products.getAll();
    const categories = await api.categories.getAll();

    return (
      <div className="size-full overflow-y-auto bg-[#FDF6F0]">
        <Navbar />
        <div className="pt-20 min-h-screen">
          <section className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
              <header className="mb-12">
                <h1 className="text-5xl font-black mb-4 text-[#2B2B2B]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  The Beauty Shop
                </h1>
                <p className="text-xl text-gray-600">Curated premium products for your daily routine.</p>
              </header>

              <ShopClient 
                initialProducts={products} 
                categories={categories} 
              />
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Failed to load shop dynamically:", error);
    
    // Graceful fallback to static placeholders if API is unavailable
    const placeholderCategories = [
      { id: 1, name: 'Skincare' },
      { id: 2, name: 'Makeup' },
      { id: 3, name: 'Haircare' },
    ];

    const placeholderProducts = [
      { id: '1', name: 'Glow Serum', price: 45, category_id: 1, description: 'Radiance-boosting serum with Vitamin C.' },
      { id: '2', name: 'Velvet Lipstick', price: 28, category_id: 2, description: 'Long-lasting matte finish in classic red.' },
      { id: '3', name: 'Argan Oil Mask', price: 35, category_id: 3, description: 'Deep conditioning treatment for dry hair.' },
      { id: '4', name: 'Hydrating Cream', price: 52, category_id: 1, description: '24-hour moisture lock for all skin types.' },
    ];

    return (
      <div className="size-full overflow-y-auto bg-[#FDF6F0]">
        <Navbar />
        <div className="pt-20 min-h-screen">
          <section className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
              <header className="mb-12">
                <h1 className="text-5xl font-black mb-4 text-[#2B2B2B]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  The Beauty Shop
                </h1>
                <p className="text-xl text-gray-600">Curated premium products for your daily routine.</p>
              </header>

              <ShopClient 
                initialProducts={placeholderProducts} 
                categories={placeholderCategories} 
              />
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

