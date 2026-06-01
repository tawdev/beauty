"use client";

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { format, parse, isValid } from 'date-fns';
import { api } from '@/lib/api';
import { BookingDateTimePicker } from './BookingDateTimePicker';

export function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    date: '',
    time: '',
  });
  const [services, setServices] = useState<{ id: number; name: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    api.services
      .getAll()
      .then((data) => setServices(data))
      .catch(() => {
        setServices([
          { id: 1, name: 'Signature Facial' },
          { id: 2, name: 'Bridal Makeup' },
          { id: 3, name: 'Balayage Hair Color' },
        ]);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.date || !formData.time) {
      toast.error('Please select a date and time for your appointment.');
      return;
    }

    setIsSubmitting(true);

    const parsedDate = parse(formData.date, 'yyyy-MM-dd', new Date());
    const summaryDate = isValid(parsedDate)
      ? format(parsedDate, 'EEEE, MMMM d, yyyy')
      : formData.date;
    const parsedTime = parse(formData.time, 'HH:mm', new Date());
    const timeLabel = isValid(parsedTime)
      ? format(parsedTime, 'h:mm a')
      : formData.time;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Booking request submitted!', {
      description: `${summaryDate} at ${timeLabel}. We will contact you shortly to confirm.`,
    });
    setFormData({ name: '', email: '', service: '', date: '', time: '' });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="booking" className="py-24 px-4 bg-[#FDF6F0]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl mb-4 text-[#2B2B2B]"
            style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
          >
            Book Your Appointment
          </h2>
          <p className="text-lg text-gray-600">
            Schedule your beauty transformation today
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-[#CBA135]/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-[#2B2B2B] font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#CBA135] focus:ring-2 focus:ring-[#CBA135]/20 bg-[#FDF6F0] transition-all"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-[#2B2B2B] font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#CBA135] focus:ring-2 focus:ring-[#CBA135]/20 bg-[#FDF6F0] transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="service" className="block mb-2 text-[#2B2B2B] font-medium">
                Select Service
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#CBA135] focus:ring-2 focus:ring-[#CBA135]/20 bg-[#FDF6F0] transition-all"
              >
                <option value="">Choose a service</option>
                {services.map((s) => (
                  <option key={s.id} value={String(s.id)}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <BookingDateTimePicker
              date={formData.date}
              time={formData.time}
              onDateChange={(date) => setFormData((prev) => ({ ...prev, date }))}
              onTimeChange={(time) => setFormData((prev) => ({ ...prev, time }))}
            />

            {formData.date && formData.time && (
              <div className="rounded-2xl bg-gradient-to-r from-[#FDF6F0] to-[#CBA135]/10 border border-[#CBA135]/20 px-5 py-4 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#CBA135] mb-1">
                  Your selection
                </p>
                <p className="text-[#2B2B2B] font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {isValid(parse(formData.date, 'yyyy-MM-dd', new Date())) &&
                    format(parse(formData.date, 'yyyy-MM-dd', new Date()), 'EEEE, MMMM d')}
                  {' · '}
                  {formatTimeDisplay(formData.time)}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#CBA135] text-white py-4 rounded-full hover:bg-[#B8912F] transition-all transform hover:scale-[1.02] shadow-lg shadow-[#CBA135]/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Confirming...
                </>
              ) : (
                'Confirm Booking'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function formatTimeDisplay(value: string) {
  const parsed = parse(value, 'HH:mm', new Date());
  return isValid(parsed) ? format(parsed, 'h:mm a') : value;
}
