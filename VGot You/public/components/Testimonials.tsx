
import React from 'react';
import FadeInSection from './FadeInSection';

const avatar1 = "https://www.vgotyou.com/assets/venkat.png";
const avatar2 = "https://www.vgotyou.com/assets/santhosh.png";
const avatar3 = "https://www.vgotyou.com/assets/aravind.png";
const avatar4 = "https://www.vgotyou.com/assets/default.png";

const testimonials = [
    { name: "Venkat Krishnan, Director Of Rudhraa Exports", text: "VGot You transformed our online presence. Their attention to detail and creative vision is unparalleled.", avatar: avatar1 },
    { name: "Santhosh, Founder Of Arctic Textiles", text: "The logo they designed perfectly captures our brand's essence. We've received so many compliments!", avatar: avatar2 },
    { name: "Aravind Kumar, Manager Of Bloom Green Developers", text: "An incredibly professional and efficient team. They delivered our complex B2B site on time and exceeded expectations.", avatar: avatar3 },
    { name: "Sathish Kumar, Travel Coordinator at Akshaya Tours and Travels",text: "Our new website by Vgotyou has improved our enquiries and credibility. A highly professional team that understands business needs.",avatar: avatar4}
];

const TestimonialCard: React.FC<{ testimonial: { name: string; text: string; avatar: string; }, index: number }> = ({ testimonial, index }) => (
    <div 
        className="bg-white dark:bg-zinc-900 p-4 md:p-8 rounded-lg border border-gray-100 dark:border-zinc-800 text-left flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-gray-200 dark:hover:border-zinc-700 shadow-sm"
        style={{ transitionDelay: `${index * 150}ms` }}
    >
        <svg className="w-6 h-6 md:w-10 md:h-10 text-gray-300 dark:text-zinc-700 mb-3 md:mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
        </svg>
        <p className="text-gray-600 dark:text-gray-300 italic mb-4 md:mb-6 flex-grow leading-relaxed text-xs md:text-base">
             "{testimonial.text.startsWith('VGotYou') ? 
                <><span className="font-serif not-italic font-bold text-black dark:text-white">VGot You</span>{testimonial.text.substring(7)}</> : 
                testimonial.text
            }"
        </p>
        <div className="flex items-center mt-auto pt-3 md:pt-4 border-t border-gray-100 dark:border-zinc-800">
            <img src={testimonial.avatar} alt={testimonial.name.split(',')[0]} className="w-8 h-8 md:w-12 md:h-12 rounded-full mr-2 md:mr-4 object-cover ring-2 ring-gray-100 dark:ring-zinc-800 bg-gray-100" />
            <div className="overflow-hidden">
                <p className="font-bold text-black dark:text-white text-xs md:text-sm truncate">{testimonial.name.split(',')[0]}</p>
                <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{testimonial.name.split(',')[1]}</p>
            </div>
        </div>
    </div>
);

const Testimonials: React.FC = () => {
    return (
        <FadeInSection className="bg-zinc-50 dark:bg-zinc-950 py-16 md:py-20 border-t border-gray-100 dark:border-zinc-800 transition-colors duration-300">
            <div className="container mx-auto text-center px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-12 bg-gradient-to-r from-red-600 to-black dark:to-white bg-clip-text text-transparent">
                    What Our Clients Say
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
                    {testimonials.map((t, i) => (
                    <TestimonialCard key={t.name} testimonial={t} index={i} />
                    ))}
                </div>
            </div>
        </FadeInSection>
    );
};

export default Testimonials;
