
import React, { useState, useEffect, useCallback } from 'react';
import QuoteIcon from './icons/QuoteIcon';
import { ArrowLeftIcon, ArrowRightIcon } from './icons/ArrowIcons';

interface TestimonialsProps {
  isVisible?: boolean;
  isMobile?: boolean;
}

const testimonialsData = [
  {
    quote: "Bloom Green transformed our house into a home. Their attention to detail is impeccable, and the result exceeded all our expectations. Truly a remarkable team!",
    name: "Sarah Johnson",
    role: "Homeowner",
    img: "https://picsum.photos/seed/person1/100/100"
  },
  {
    quote: "Working with Bloom Green was a seamless experience. Their professionalism and creative vision brought our commercial space to life. Highly recommended!",
    name: "Michael Chen",
    role: "CEO, Tech Solutions",
    img: "https://picsum.photos/seed/person2/100/100"
  },
  {
    quote: "The design they came up with was not only beautiful but also incredibly functional. They listened to our needs and delivered a perfect space for our family.",
    name: "Emily Rodriguez",
    role: "Marketing Director",
    img: "https://picsum.photos/seed/person3/100/100"
  }
];

const Testimonials: React.FC<TestimonialsProps> = ({ isVisible, isMobile }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % testimonialsData.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length);
  };

  useEffect(() => {
    if (isVisible) {
      const slideInterval = setInterval(nextSlide, 5000);
      return () => clearInterval(slideInterval);
    }
  }, [nextSlide, isVisible]);

  const titleChars = "Testimonials".split('');

  return (
    <section className={`w-full relative flex flex-col items-center justify-center overflow-hidden ${isMobile ? 'min-h-screen py-24' : 'h-full'}`}>
      <div 
        className="absolute inset-0 bg-cover bg-center animate-kenburns" 
        style={{ backgroundImage: "url('https://cdn.jsdelivr.net/gh/chandru36james/website@main/bloom%20greens/assets/images/interior/interior%20(5).avif')" }}>
      </div>
      <div className="absolute inset-0 bg-brand-dark opacity-80"></div>
      <div className="relative container mx-auto px-4 sm:px-6 md:pr-24 lg:px-24 text-white py-10">
        <div className={`text-center mb-12`}>
          <h3 className={`text-brand-gold font-semibold tracking-widest uppercase mb-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>WHAT CLIENTS SAY</h3>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold">
            {titleChars.map((char, index) => (
              <span key={index} className="inline-block overflow-hidden">
                <span
                  className={`inline-block transform transition-all duration-500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                  style={{ transitionDelay: `${100 + index * 50}ms` }}
                >
                  {char}
                </span>
              </span>
            ))}
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {testimonialsData.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 text-center px-4">
                  <QuoteIcon className="mx-auto mb-6 text-brand-gold" />
                  <p className="text-xl md:text-2xl italic leading-relaxed mb-8">{testimonial.quote}</p>
                  <img src={testimonial.img} alt={testimonial.name} className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-brand-gold"/>
                  <h4 className="font-bold text-lg font-playfair">{testimonial.name}</h4>
                  <p className="text-gray-300">{testimonial.role}</p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={prevSlide} className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-12 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hidden md:block">
            <ArrowLeftIcon />
          </button>
          <button onClick={nextSlide} className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-12 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hidden md:block">
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;