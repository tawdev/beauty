import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from 'sonner';
import "../../styles/index.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-[#FDF6F0]" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            {children}
            <Toaster position="top-right" richColors />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
