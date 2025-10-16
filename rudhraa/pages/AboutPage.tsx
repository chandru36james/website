import React, { useEffect } from 'react';
import { ICONS } from '../constants';
import PageHeader from '../components/PageHeader';
import useAnimateOnScroll from '../components/useAnimateOnScroll';
import MetaTags from '../components/MetaTags';

const FounderStory: React.FC = () => {
    const [ref, isVisible] = useAnimateOnScroll(0.2);

    const highlights = [
        { icon: <img src="https://rudhraaexportsandimports.com/images/global.png" alt="Global Visionary Icon" />, title: "Global Visionary", text: "Transformed a family-run agricultural supply business into a global export powerhouse, Rudhraa Exports." },
        { icon: ICONS.ventures, title: "Diverse Ventures", text: "Successfully manages multiple businesses, including Arctic Textiles and the Vesa Homes lifestyle brand." },
        { icon: ICONS.ethics, title: "Ethical Leadership", text: "Committed to sustainable practices, fair trade, and building long-term partnerships that uplift communities." },
    ];

    return (
        <section ref={ref as React.RefObject<HTMLDivElement>} className="py-16 lg:py-24 bg-bg-main overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Image Column */}
                    <div className={`relative slide-in-left ${isVisible ? 'is-visible' : ''}`}>
                        <div className="relative aspect-square">
                           {/* Decorative background blocks */}
                           <div className="absolute -bottom-4 -left-4 w-full h-full bg-bg-alt rounded-lg transform -rotate-3"></div>
                           <div className="absolute -top-4 -right-4 w-full h-full bg-highlight rounded-lg transform rotate-3"></div>
                           
                           {/* Main Image */}
                           <img
                               src="https://rudhraaexportsandimports.com/images/IMG_8773.webp"
                               alt="Venkateshwaran Gopalakrishnan, Founder of Rudhraa Exports"
                               className="relative w-full h-full object-cover rounded-lg shadow-2xl z-10"
                           />
                        </div>
                    </div>

                    {/* Text Column */}
                    <div className={`space-y-6 slide-in-right ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
                        <div>
                            <p className="text-sm font-semibold tracking-widest text-text-alt uppercase">Meet The Founder</p>
                            <h2 className="mt-2 text-3xl font-bold font-lora text-text-main sm:text-4xl">Venkateshwaran Gopalakrishnan</h2>
                            <p className="text-md text-accent italic mt-1">Founder & CEO</p>
                        </div>
                        <div className="w-24 h-1 bg-accent my-4"></div>
                        <p className="text-text-alt leading-relaxed">
                            A dynamic entrepreneur with a deep passion for agriculture and business, Venkateshwaran has expanded his family’s legacy from Karur, Tamil Nadu, integrating modern practices to build a trusted name as a global exporter and importer of quality vegetables and fruits.
                        </p>
                        
                        <div className="space-y-6 pt-4">
                            {highlights.map((item, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                                        {React.cloneElement(item.icon, { className: 'w-6 h-6 object-contain' })}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold font-lora text-text-main">{item.title}</h3>
                                        <p className="text-text-alt mt-1">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const SpecializationSection: React.FC = () => {
    const [ref, isVisible] = useAnimateOnScroll(0.2);

    const specializations = [
        {
            icon: <img src="https://rudhraaexportsandimports.com/images/quality.png" alt="Quality Policy Icon" />,
            title: 'Quality Policy',
            description: 'We strive to achieve a unique place in the export industry by establishing a benchmark in quality and safety.'
        },
        {
            icon: <img src="https://rudhraaexportsandimports.com/images/logistics.png" alt="Advanced Logistics Icon" />,
            title: 'Advanced Logistics',
            description: 'State-of-the-art machinery and logistics give us an edge, providing quality and cost-effective solutions.'
        },
        {
            icon: <img src="https://rudhraaexportsandimports.com/images/expert.png" alt="Proven Expertise Icon" />,
            title: 'Proven Expertise',
            description: 'Four decades of family experience in the agricultural industry has given us the expertise to cope with current market trends.'
        }
    ];

    return (
        <section ref={ref as React.RefObject<HTMLDivElement>} className="py-16 lg:py-24 bg-bg-alt">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Title with Watermark */}
                <div className={`relative text-center mb-12 scroll-animate ${isVisible ? 'is-visible' : ''}`}>
                    <div className="absolute inset-0 flex items-center justify-center -z-0 ">
                        <span className="text-6xl lg:text-7xl font-extrabold text-gray-200 opacity-80 select-none tracking-widest">
                            SPECIALITY
                        </span>
                    </div>
                    <h2 className="relative text-3xl font-bold font-lora text-text-main uppercase">
                        Our Specialization
                    </h2>
                </div>
                
                {/* Cards Container with border */}
                <div className={`border border-highlight scroll-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {specializations.map((item, index) => (
                            <div 
                                key={item.title} 
                                className={`group cursor-pointer p-8 text-left transition-all duration-300 ease-in-out hover:bg-white hover:shadow-lg hover:-translate-y-2 ${index < specializations.length - 1 ? 'md:border-r md:border-highlight' : ''}`}
                            >
                                <div className="text-text-alt mb-6 w-12 h-12 transition-all duration-300 group-hover:text-accent group-hover:scale-110">
                                    {React.cloneElement(item.icon, { className: 'w-full h-full object-contain' })}
                                </div>
                                <h3 className="text-lg font-semibold font-lora text-text-main mb-3 uppercase tracking-wider">{item.title}</h3>
                                <p className="text-text-alt text-sm leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};


const AboutPage: React.FC = () => {
    const [visionRef, visionVisible] = useAnimateOnScroll(0.2);
    const [presenceRef, presenceVisible] = useAnimateOnScroll(0.2);

    return (
        <div>
            <MetaTags
                title="About Rudhraa Exports | Vegetable & Fruit Exporter in Karur, India"
                description="Learn about Rudhraa Exports, a leading exporter and importer of vegetables and fruits based in Karur, Tamil Nadu, India. Discover our story as a trusted global partner for high-quality agricultural products."
                imageUrl="https://rudhraaexportsandimports.com/images/about.jpeg"
            />
            <PageHeader 
                title="Our Story" 
                subtitle="Rooted in Trust and Quality." 
                imageUrl="https://rudhraaexportsandimports.com/images/about.jpeg"
            />

            <FounderStory />
            
            <SpecializationSection />

            <section ref={visionRef as React.RefObject<HTMLDivElement>} className="py-16 lg:py-24 bg-dot-pattern">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`max-w-3xl mx-auto bg-white/80 backdrop-blur-sm p-8 lg:p-12 rounded-lg shadow-lg border border-highlight scroll-animate ${visionVisible ? 'is-visible' : ''}`}>
                        <div className="text-center">
                            <h2 className="text-3xl font-bold font-lora text-text-main mb-4">Our Vision & Mission</h2>
                            <p className="text-text-alt leading-relaxed">
                                Our vision is to be the world's most trusted source for Indian agricultural products. Our mission is to achieve this by upholding the highest standards of quality, implementing sustainable practices, and fostering long-term, mutually beneficial relationships with our partners, from farm to fork.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            
            <section ref={presenceRef as React.RefObject<HTMLDivElement>} className="py-16 lg:py-24 bg-bg-alt">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className={`text-3xl font-bold font-lora text-text-main scroll-animate ${presenceVisible ? 'is-visible' : ''}`}>Our Global Presence</h2>
                        <p className={`mt-4 text-lg text-text-alt scroll-animate ${presenceVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '150ms' }}>Delivering freshness to every corner of the world.</p>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        <div className={`scroll-animate ${presenceVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '300ms' }}>
                            <img 
                                src="https://rudhraaexportsandimports.com/images/about.webp"
                                alt="A stylized world map highlighting global trade routes and connections" 
                                className="rounded-lg shadow-lg w-full h-auto object-cover"
                            />
                        </div>
                        <p className={`text-center mt-8 text-text-alt scroll-animate ${presenceVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '450ms' }}>
                            We proudly export to over 15 countries across North America, Europe, the Middle East, and Southeast Asia, building strong partnerships along the way.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;