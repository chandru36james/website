import React, { useState } from 'react';
import FadeInSection from '../components/FadeInSection';
import Swal from 'sweetalert2';
import { EmailIcon, PhoneIcon } from '../components/Icons';
import { Helmet } from "react-helmet";   // ✅ SEO

const AccordionItem: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onClick: () => void; }> = ({ title, children, isOpen, onClick }) => {
    return (
        <div className="border-b border-zinc-800">
            <Helmet>
  {/* ================= BASIC SEO ================= */}
  <title>Contact VGot You | Web Design & Branding Company in Karur, India</title>

  <meta
    name="description"
    content="Contact VGot You, a professional web design, logo design, and branding company in Karur, India. Get expert consultation for websites, SEO, and digital growth."
  />

  <meta
    name="keywords"
    content="contact web designer Karur, hire website designer India, branding company contact, SEO company Karur, VGot You contact, digital agency Tamil Nadu"
  />

  <link rel="canonical" href="https://www.vgotyou.com/contact" />
  <meta name="robots" content="index, follow" />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Contact VGot You | Web Design & Branding Company" />
  <meta
    property="og:description"
    content="Get in touch with VGot You for professional website design, branding, and SEO services in Karur, Tamil Nadu."
  />
  <meta property="og:url" content="https://www.vgotyou.com/contact" />
  <meta property="og:site_name" content="VGot You" />
  <meta property="og:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
  <meta property="og:locale" content="en_IN" />

  {/* ================= TWITTER ================= */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Contact VGot You | Web Design Company in Karur" />
  <meta
    name="twitter:description"
    content="Speak with VGot You for website design, branding, and SEO consultation."
  />
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/vgotyou.png" />

  {/* ================= LOCAL BUSINESS + CONTACT SCHEMA ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": "https://www.vgotyou.com/contact#contactpage",
      url: "https://www.vgotyou.com/contact",
      name: "Contact VGot You",
      description:
        "Contact page for VGot You, a web design, branding, and SEO company in Karur, Tamil Nadu.",
      about: {
        "@type": "LocalBusiness",
        "@id": "https://www.vgotyou.com/#localbusiness",
        name: "VGot You",
        url: "https://www.vgotyou.com/",
        logo: "https://www.vgotyou.com/assets/vgotyou.png",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Karur",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN"
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-7871120415",
          email: "info@vgotyou.com",
          contactType: "Sales & Support",
          availableLanguage: ["English", "Tamil"]
        },
        sameAs: [
          "https://share.google/vZ5YXKMHIBe17GjLI",
          "https://www.instagram.com/vgot_you/",
          "https://www.linkedin.com/company/vgotyou"
        ]
      }
    })}
  </script>
</Helmet>

            <button onClick={onClick} className="w-full flex justify-between items-center text-left py-4 md:py-6 text-sm md:text-lg font-semibold focus:outline-none text-white hover:text-red-500 transition-colors">
                <span className="pr-4">{title}</span>
                <svg className={`w-4 h-4 md:w-5 md:h-5 shrink-0 transition-transform transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pb-4 md:pb-6 text-zinc-400 text-xs md:text-base leading-relaxed">{children}</div>
            </div>
        </div>
    );
};

const Contact: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [formState, setFormState] = useState({ name: '', email: '', mobile: '', message: '' });
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormState(prev => ({ ...prev, [id]: value }));
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmissionStatus('sending');

        try {
            const formData = new FormData();
            formData.append("name", formState.name);
            formData.append("email", formState.email);
            formData.append("mobile", formState.mobile);
            formData.append("message", formState.message);
            formData.append("access_key", "091214e0-3412-4907-b547-3299b2e7ec3a");

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                Swal.fire({
                    title: "Mail Sent!",
                    text: "Thanks for contacting us! We'll get back to you soon.",
                    icon: "success",
                    background: '#18181b',
                    color: '#ffffff',
                    confirmButtonColor: '#dc2626'
                });
                setFormState({ name: "", email: "", mobile: "", message: "" });
                setSubmissionStatus('success');
            } else {
                setSubmissionStatus('error');
            }
        } catch (err) {
            console.error(err);
            setSubmissionStatus('error');
        }
    };

    const faqs = [
        {
            q: "What is your typical project timeline?",
            a: "Project timelines depend on scope and complexity. A standard website usually takes around 2-3 weeks from discovery to final delivery. We share a clear project plan with milestones before starting."
        },
        {
            q: "How much does a new website or logo cost?",
            a: "Pricing is tailored to each project based on requirements. After an initial discussion, we provide a detailed proposal outlining the scope, deliverables, and costs. We also offer value-based packages for combined services."
        },
        {
            q: "What kind of support do you offer after project completion?",
            a: "We provide 30 days of complimentary post-launch support to resolve any issues. Ongoing maintenance and support packages are available for updates, security, and long-term reliability."
        }
    ];

    const contactInfo = [
        { label: 'Email', value: 'info@vgotyou.com', href: 'mailto:info@vgotyou.com', icon: <EmailIcon className="w-5 h-5 md:w-6 md:h-6" /> },
        { label: 'Phone', value: '+91 78711 20415', href: 'tel:+917871120415', icon: <PhoneIcon className="w-5 h-5 md:w-6 md:h-6" /> },
    ];

    const clientImages = [
        "https://www.vgotyou.com/assets/venkat.png",
        "https://www.vgotyou.com/assets/santhosh.png",
        "https://www.vgotyou.com/assets/aravind.png"
    ];

    return (
        <div className="bg-black text-white selection:bg-red-600/30">
           
            {/* Hero Section - Reduced mobile height and cleared header */}
            <section className="h-[35vh] md:h-[50vh] w-full relative flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://vgotyou.com/assets/contact-banner.png" 
                        alt="Contact Banner" 
                        className="w-full h-full object-cover opacity-30 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
                </div>
                <div className="relative z-10 px-6 max-w-4xl mx-auto pt-20 md:pt-32">
                    <FadeInSection>
                        <h1 className="text-3xl md:text-8xl font-black mb-2 md:mb-6 tracking-tighter uppercase italic">
                            Let's <span className="text-red-600">Connect</span>
                        </h1>
                        <p className="text-sm md:text-2xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
                            Transforming visions into digital reality.
                        </p>
                    </FadeInSection>
                </div>
            </section>
            
            <div className="container mx-auto py-8 md:py-24 px-5 md:px-6 max-w-7xl">
                {/* Contact Info + Form */}
                <div className="grid lg:grid-cols-12 gap-8 md:gap-16 items-start">
                    {/* Info Sidebar */}
                    <div className="lg:col-span-4 space-y-6 md:space-y-12">
                        <FadeInSection>
                            <h2 className="text-xl md:text-3xl font-bold mb-5 md:mb-8 flex items-center gap-3">
                                <span className="w-4 h-1 bg-red-600 rounded-full"></span>
                                Reach Out
                            </h2>
                            <div className="space-y-4 md:space-y-8">
                                {contactInfo.map(info => (
                                    <div key={info.label} className="group p-4 md:p-6 rounded-xl md:rounded-2xl bg-zinc-900 border border-zinc-800 transition-all hover:border-red-600/30">
                                        <div className="flex items-center gap-4">
                                            <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-red-600/10 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                                                {info.icon}
                                            </div>
                                            <div>
                                                <p className="text-[9px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest mb-0.5 md:mb-1">{info.label}</p>
                                                <a href={info.href} className="text-sm md:text-lg font-semibold text-white hover:text-red-500 transition-colors">{info.value}</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FadeInSection>

                        <FadeInSection delay={0.2}>
                            <div className="p-5 md:p-8 rounded-xl md:rounded-2xl bg-gradient-to-br from-red-600 to-red-900 text-white shadow-xl">
                                <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">Work with us</h3>
                                <p className="text-red-100 mb-5 text-xs md:text-base leading-relaxed opacity-90">
                                    We're always looking for new challenges and creative partnerships.
                                </p>
                                <div className="flex -space-x-2 md:-space-x-3">
                                    {clientImages.map((src, i) => (
                                        <img key={i} src={src} className="w-7 h-7 md:w-10 md:h-10 rounded-full border-2 border-red-800 bg-black object-cover" alt="Client Logo" />
                                    ))}
                                    <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-red-800 flex items-center justify-center text-[8px] md:text-[10px] font-bold border-2 border-red-800">+10</div>
                                </div>
                            </div>
                        </FadeInSection>
                    </div>

                    {/* Form Container */}
                    <div className="lg:col-span-8">
                        <FadeInSection delay={0.1}>
                            <div className="bg-zinc-900 p-5 md:p-12 rounded-xl md:rounded-3xl border border-zinc-800 shadow-2xl">
                                <form className="grid md:grid-cols-2 gap-4 md:gap-8" onSubmit={handleFormSubmit}>
                                    <div className="space-y-1.5 md:space-y-2">
                                        <label htmlFor="name" className="text-[9px] md:text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1">Your Name</label>
                                        <input 
                                            type="text" 
                                            id="name" 
                                            value={formState.name} 
                                            onChange={handleFormChange} 
                                            required 
                                            placeholder="John Doe"
                                            className="w-full bg-black border border-zinc-800 rounded-lg md:rounded-xl p-3 md:p-4 text-xs md:text-base text-white focus:outline-none focus:ring-1 focus:ring-red-600/50 focus:border-red-600 transition-all placeholder:text-zinc-700" 
                                        />
                                    </div>
                                    <div className="space-y-1.5 md:space-y-2">
                                        <label htmlFor="email" className="text-[9px] md:text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            value={formState.email} 
                                            onChange={handleFormChange} 
                                            required 
                                            placeholder="john@example.com"
                                            className="w-full bg-black border border-zinc-800 rounded-lg md:rounded-xl p-3 md:p-4 text-xs md:text-base text-white focus:outline-none focus:ring-1 focus:ring-red-600/50 focus:border-red-600 transition-all placeholder:text-zinc-700" 
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-1.5 md:space-y-2">
                                        <label htmlFor="mobile" className="text-[9px] md:text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1">Mobile Number</label>
                                        <input 
                                            type="tel" 
                                            id="mobile" 
                                            value={formState.mobile} 
                                            onChange={handleFormChange} 
                                            required 
                                            placeholder="+91 00000 00000"
                                            className="w-full bg-black border border-zinc-800 rounded-lg md:rounded-xl p-3 md:p-4 text-xs md:text-base text-white focus:outline-none focus:ring-1 focus:ring-red-600/50 focus:border-red-600 transition-all placeholder:text-zinc-700" 
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-1.5 md:space-y-2">
                                        <label htmlFor="message" className="text-[9px] md:text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1">Message Details</label>
                                        <textarea 
                                            id="message" 
                                            rows={3} 
                                            value={formState.message} 
                                            onChange={handleFormChange} 
                                            required 
                                            placeholder="Tell us about your project..."
                                            className="w-full bg-black border border-zinc-800 rounded-lg md:rounded-xl p-3 md:p-4 text-xs md:text-base text-white focus:outline-none focus:ring-1 focus:ring-red-600/50 focus:border-red-600 transition-all placeholder:text-zinc-700 resize-none"
                                        ></textarea>
                                    </div>
                                    <div className="md:col-span-2 pt-2 md:pt-4">
                                        <button
                                            type="submit"
                                            disabled={submissionStatus === 'sending'}
                                            className="w-full md:w-auto min-w-[160px] md:min-w-[200px] bg-red-600 text-white py-3 md:py-4 px-8 md:px-12 rounded-full font-bold text-sm md:text-lg hover:bg-red-700 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                        >
                                            {submissionStatus === 'sending' ? (
                                                <>
                                                    <svg className="animate-spin h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    <span className="text-xs md:text-base">Processing...</span>
                                                </>
                                            ) : <span className="text-xs md:text-base">Send Message</span>}
                                        </button>
                                    </div>

                                    {submissionStatus === 'error' && (
                                        <p className="md:col-span-2 text-red-500 mt-2 md:mt-4 text-[10px] md:text-sm font-semibold text-center bg-red-500/10 p-2 md:p-4 rounded-lg border border-red-500/20 animate-pulse">
                                            Something went wrong. Please reach out via email directly.
                                        </p>
                                    )}
                                </form>
                            </div>
                        </FadeInSection>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-16 md:mt-40 max-w-4xl mx-auto">
                    <FadeInSection>
                        <div className="text-center mb-8 md:mb-16">
                            <h2 className="text-2xl md:text-5xl font-black mb-2 md:mb-4 tracking-tighter uppercase italic">FAQ</h2>
                            <p className="text-zinc-500 text-[10px] md:text-lg">Quick answers to common questions.</p>
                        </div>
                        <div className="divide-y divide-zinc-800">
                            {faqs.map((faq, index) => (
                                <AccordionItem 
                                    key={index} 
                                    title={faq.q} 
                                    isOpen={openFaq === index} 
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                >
                                    {faq.a}
                                </AccordionItem>
                            ))}
                        </div>
                    </FadeInSection>
                </div>
            </div>
        </div>
    );
};

export default Contact;