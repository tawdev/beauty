export function About() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1630595271375-5073a6c0638b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxiZWF1dHklMjBzcGElMjB3ZWxsbmVzcyUyMGVsZWdhbnR8ZW58MXx8fHwxNzc2NzY2MjUyfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="BeautyStudio Spa"
              className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
            />
          </div>

          <div className="order-1 md:order-2">
            <h2
              className="text-4xl md:text-5xl mb-6 text-[#2B2B2B]"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
            >
              About Us
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              At BeautyStudio, we believe that beauty is an art form. With over 15 years of experience, our team of passionate professionals is dedicated to bringing out the best in every client.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              We use only premium products and the latest techniques to ensure you receive exceptional results every time. Your satisfaction and confidence are our top priorities.
            </p>
            <a href="#services" className="inline-block border-2 border-[#E8B4B8] text-[#2B2B2B] px-8 py-3 rounded-full hover:bg-[#E8B4B8] hover:text-white transition-all text-center">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
