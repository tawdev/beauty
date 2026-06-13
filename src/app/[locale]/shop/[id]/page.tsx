import { api } from "@/lib/api";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { ProductDetailClient } from "../../../shop/[id]/ProductDetailClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await api.products.getById(id);
    return {
      title: `${product.name} | Maison d'Éclat Beauty`,
      description: product.description,
    };
  } catch (error) {
    return {
      title: "Product Not Found | Maison d'Éclat Beauty",
    };
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  try {
    const product = await api.products.getById(id);
    const reviews = await api.reviews.getAll({ product_id: id });
    const allProducts = await api.products.getAll();
    
    const relatedProducts = allProducts
      .filter((p: any) => p.category_id === product.category_id && p.id !== product.id)
      .slice(0, 4);

    return (
      <div className="size-full overflow-y-auto bg-[#FDF6F0]">
        <Navbar />
        <div className="pt-20">
          <ProductDetailClient 
            product={product} 
            reviews={reviews} 
            relatedProducts={relatedProducts} 
          />
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    return (
      <div className="size-full overflow-y-auto bg-[#FDF6F0]">
        <Navbar />
        <div className="pt-40 pb-20 text-center">
          <h1 className="text-4xl font-bold text-[#2B2B2B] mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">We couldn't find the product you're looking for.</p>
          <a href="/shop" className="bg-[#CBA135] text-white px-8 py-3 rounded-full hover:bg-[#B8912F] transition-all">
            Back to Shop
          </a>
        </div>
        <Footer />
      </div>
    );
  }
}
