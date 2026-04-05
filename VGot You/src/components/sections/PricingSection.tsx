import React from 'react';
import { Link } from 'react-router-dom';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PricingSection: React.FC = () => {
    const plans = [
        {
            name: "Starter",
            price: "₹14,999",
            description: "Perfect for small businesses and personal brands.",
            features: ["5 Pages Design", "Mobile Responsive", "Basic SEO", "1 Year Hosting", "SSL Certificate", "Contact Form"],
            buttonText: "Get Started",
            highlight: false
        },
        {
            name: "Professional",
            price: "₹29,999",
            description: "Ideal for growing startups and established companies.",
            features: ["10 Pages Design", "Custom UI/UX", "Advanced SEO", "High-Speed Hosting", "Business Emails", "Social Media Integration", "Priority Support"],
            buttonText: "Most Popular",
            highlight: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            description: "Tailored solutions for complex digital requirements.",
            features: ["Unlimited Pages", "E-commerce Ready", "Full SEO Strategy", "Dedicated Server", "Custom Functionality", "24/7 Support", "Monthly Maintenance"],
            buttonText: "Contact Us",
            highlight: false
        }
    ];
    return (
        <section id="pricing" className="py-24 md:py-32 px-6 md:px-12 bg-zinc-50">
            <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-8 h-[1px] bg-red-600"></div>
                        <span className="text-zinc-500 font-black tracking-[0.4em] uppercase text-[10px]">Investment</span>
                        <div className="w-8 h-[1px] bg-red-600"></div>
                    </div>
                    <h2 className="text-4xl md:text-7xl font-black text-zinc-900 leading-none tracking-tighter uppercase mb-8">
                        Simple <span className="text-red-600">Pricing</span>
                    </h2>
                    <p className="text-zinc-500 text-lg">Transparent packages designed to scale with your business needs.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div 
                            key={index}
                            className={cn(
                                "relative p-10 rounded-[2.5rem] transition-all duration-500 flex flex-col",
                                plan.highlight 
                                    ? "bg-zinc-900 text-white shadow-2xl scale-105 z-10" 
                                    : "bg-white text-zinc-900 border border-zinc-100 hover:shadow-xl"
                            )}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full">
                                    Recommended
                                </div>
                            )}
                            <div className="mb-8">
                                <h3 className="text-xl font-black uppercase tracking-widest mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl md:text-5xl font-black tracking-tighter">{plan.price}</span>
                                    {plan.price !== "Custom" && <span className="text-sm opacity-50">/project</span>}
                                </div>
                            </div>
                            <p className={cn("text-sm mb-8 leading-relaxed", plan.highlight ? "text-zinc-400" : "text-zinc-500")}>
                                {plan.description}
                            </p>
                            <div className="space-y-4 mb-10 flex-grow">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm">
                                        <div className={cn("w-1.5 h-1.5 rounded-full", plan.highlight ? "bg-red-600" : "bg-red-600")}></div>
                                        {feature}
                                    </div>
                                ))}
                            </div>
                            <Link 
                                to={`/contact?message=Hi VGot You, I'm interested in the ${plan.name} plan (${plan.price}). Please provide more details.`}
                                className={cn(
                                    "w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs text-center transition-all active:scale-95",
                                    plan.highlight 
                                        ? "bg-red-600 text-white hover:bg-red-700" 
                                        : "bg-zinc-900 text-white hover:bg-zinc-800"
                                )}
                            >
                                {plan.buttonText}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
