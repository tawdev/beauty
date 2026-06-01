import type { Metadata } from "next";
import "../styles/index.css";

export const metadata: Metadata = {
  title: "Maison d'Éclat | Premium Beauty & Wellness",
  description: "Experience luxury beauty services and curated skincare products at Maison d'Éclat. Expert makeup, hair styling, and professional wellness treatments.",
  keywords: ["beauty salon", "luxury skincare", "makeup artist", "wellness center", "Maison d'Éclat"],
};

import { CartProvider } from "@/context/CartContext";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-[#FDF6F0]" suppressHydrationWarning>
        <CartProvider>
          {children}
          <Toaster position="top-right" richColors />
        </CartProvider>
      </body>
    </html>
  );
}
