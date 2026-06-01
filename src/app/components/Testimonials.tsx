import { Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1771512681998-99342c9a4f12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBtb2RlbCUyMHBvcnRyYWl0JTIwZWxlZ2FudHxlbnwxfHx8fDE3NzY3NjYyNDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      review: 'Absolutely amazing experience! The staff is professional and talented. My makeup looked flawless for my wedding day.',
      rating: 5,
    },
    {
      name: 'Emily Davis',
      image: 'https://images.unsplash.com/photo-1646526805660-b3b71cacf6d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8YmVhdXR5JTIwbW9kZWwlMjBwb3J0cmFpdCUyMGVsZWdhbnR8ZW58MXx8fHwxNzc2NzY2MjQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      review: 'The best hair salon I have ever been to! They transformed my hair and I could not be happier with the results.',
      rating: 5,
    },
    {
      name: 'Jessica Martinez',
      image: 'https://images.unsplash.com/photo-1646526812570-ebb1987bedcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw5fHxiZWF1dHklMjBtb2RlbCUyMHBvcnRyYWl0JTIwZWxlZ2FudHxlbnwxfHx8fDE3NzY3NjYyNDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      review: 'Their nail services are top-notch! Beautiful designs and excellent customer service. Highly recommend!',
      rating: 5,
    },
  ];

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl mb-4 text-[#2B2B2B]"
            style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
          >
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read testimonials from our satisfied clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#FDF6F0] rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-[#E8B4B8]"
                />
                <h3
                  className="text-xl mb-2 text-[#2B2B2B]"
                  style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}
                >
                  {testimonial.name}
                </h3>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-[#CBA135] text-[#CBA135]" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed italic">"{testimonial.review}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
