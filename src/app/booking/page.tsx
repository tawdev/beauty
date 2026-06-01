import { Booking } from '@/app/components/Booking';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';

export default function BookingPage() {
  return (
    <div className="size-full overflow-y-auto">
      <Navbar />
      <div className="pt-20">
        <Booking />
      </div>
      <Footer />
    </div>
  );
}
