import React from 'react';
import { Link } from 'react-router-dom';
import FadeInSection from './FadeInSection';
import { SparklesIcon } from './Icons';

const allServices = [
    "Web Design",
    "Web Hosting",
    "Logo Design",
    "Brand Identity Development",
    "Ad Campaign Management (Google & Meta)",
    "Product Photography",
    "SEO Optimization",
    "Fast Delivery",
    "Fully Responsive Layouts",
    "Mobile-Friendly Designs"
];

const PricingCard = ({ 
    title, 
    subtitle, 
    price, 
    features, 
    icon, 
    isPopular,
    gradient,
    whatsappMessage
}: { 
    title: string, 
    subtitle: string, 
    price?: string, 
    features: string[], 
    icon: React.ReactNode, 
    isPopular?: boolean,
    gradient: string,
    whatsappMessage?: string
}) => {
    const phoneNumber = "917871120415"; 
    const whatsappUrl = whatsappMessage 
        ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`
        : null;

    return (
        <div className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl h-full ${isPopular ? 'bg-black text-white border-red-600 ring-2 ring-red-600 ring-offset-2 ring-offset-black' : 'bg-zinc-900 border-zinc-800'}`}>
            {isPopular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                    <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        Best Value
                    </span>
                </div>
            )}
            
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${gradient} text-white shadow-lg`}>
                {icon}
            </div>

            <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
            <p className="text-sm mb-6 text-zinc-400">{subtitle}</p>

            {price ? (
                <div className="mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider mb-1 text-zinc-500">Starting From</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-zinc-500">₹</span>
                        <span className="text-5xl font-extrabold tracking-tight text-white">{price}</span>
                    </div>
                </div>
            ) : (
                <div className="mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider mb-1 text-zinc-500">Custom Pricing</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold tracking-tight text-white">Get a Quote</span>
                    </div>
                </div>
            )}

            <div className="space-y-4 mb-8 flex-grow">
                {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-red-600/20 text-red-500`}>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className="text-sm text-zinc-300">{feature}</span>
                    </div>
                ))}
            </div>

            {whatsappUrl ? (
                <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`w-full py-4 rounded-xl font-bold text-center transition-all duration-300 block ${
                        isPopular 
                        ? 'bg-white text-black hover:bg-gray-100' 
                        : 'bg-zinc-800 text-white hover:bg-zinc-700'
                    }`}
                >
                    Get Started
                </a>
            ) : (
                <Link 
                    to="/contact" 
                    className={`w-full py-4 rounded-xl font-bold text-center transition-all duration-300 block ${
                        isPopular 
                        ? 'bg-white text-black hover:bg-gray-100' 
                        : 'bg-zinc-800 text-white hover:bg-zinc-700'
                    }`}
                >
                    Get Started
                </Link>
            )}
        </div>
    );
};

const Pricing: React.FC = () => {
    return (
        <FadeInSection className="py-24 bg-black transition-colors duration-300 relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-zinc-900 to-transparent opacity-50"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-red-600 font-bold tracking-wider text-sm uppercase mb-2 block">Our Pricing</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Digital Platform</span>
                    </h2>
                    <p className="text-zinc-400 text-lg">
                        Whether you need a high-performance custom website or a powerful e-commerce store, we have the perfect solution for you.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
                    <PricingCard 
                        title="Code-Based Website"
                        subtitle="Perfect for Portfolios, Corporate Sites & Landing Pages."
                        price="4,999"
                        features={[
                            "Built with React.js & Next.js",
                            "Blazing Fast Performance",
                            "Complete Customization",
                            "Interactive Animations",
                            "High Security & SEO Friendly"
                        ]}
                        icon={<img src="https://vgotyou.com/assets/code.png" alt="Code Development" className="w-8 h-8 object-contain invert" />}
                        gradient="from-blue-500 to-cyan-500"
                        whatsappMessage="Hello VGot You, I am interested in the Code-Based Website plan (Starting from ₹4,999). Please provide more details."
                    />

                    <PricingCard 
                        title="Shopify Store"
                        subtitle="The best solution for selling products online."
                        features={[
                            "Complete Store Setup",
                            "Premium Theme Customization",
                            "Payment Gateway Integration",
                            "Inventory Management System",
                            "Conversion Optimized Checkout"
                        ]}
                        icon={<img src="https://vgotyou.com/assets/shopify.png" alt="Shopify Store" className="w-8 h-8 object-contain invert" />}
                        isPopular={true}
                        gradient="from-green-500 to-emerald-600"
                        whatsappMessage="Hello VGot You, I am interested in the Shopify Store plan. Please provide more details."
                    />
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="relative rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-zinc-800 p-8 md:p-12 lg:p-16 shadow-2xl">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative z-10 text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-900/20 text-yellow-400 text-sm font-bold mb-6">
                                <SparklesIcon className="w-4 h-4" />
                                <span>All-Inclusive Package</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                Everything You Get
                            </h3>
                            <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
                                We don't just deliver a project; we deliver a complete ecosystem for your digital success. Every package includes these premium essentials.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12 relative z-10">
                            {allServices.map((service, index) => (
                                <div key={index} className="flex items-center gap-4 group p-3 rounded-xl transition-all duration-300 hover:bg-zinc-800/50">
                                    <div className="w-10 h-10 rounded-full bg-green-900/20 flex items-center justify-center flex-shrink-0 text-green-400 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-lg font-semibold text-zinc-200 group-hover:text-white transition-colors">
                                        {service}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 pt-8 border-t border-zinc-800 text-center relative z-10">
                             <p className="text-sm text-zinc-500 font-medium italic">
                                * Pricing may vary based on specific customization requirements.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </FadeInSection>
    );
};

export default Pricing;