import { Services } from '@/app/components/Services';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';

export default function ServicesPage() {
  return (
    <div className="size-full overflow-y-auto">
      <Navbar />
      <div className="pt-20">
        <Services />
      </div>
      <Footer />
    </div>
  );
}
