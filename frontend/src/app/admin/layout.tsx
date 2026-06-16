import type { Metadata } from "next";
import "../../styles/index.css";

export const metadata: Metadata = {
  title: "Admin Dashboard | Maison d'Éclat",
  description: "Maison d'Éclat Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#FDF6F0]">
        {children}
      </body>
    </html>
  );
}
