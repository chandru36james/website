import React, { useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { Helmet } from "react-helmet";   // ✅ SEO
import Swal from 'sweetalert2' //success page

const FadeInSection: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className }) => {
    const ref = useFadeIn();
    return <div ref={ref} className={`fade-in ${className}`}>{children}</div>;
};

const AccordionItem: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onClick: () => void; }> = ({ title, children, isOpen, onClick }) => {
    return (
        <div className="border-b border-zinc-200">
            <button onClick={onClick} className="w-full flex justify-between items-center text-left py-4 text-lg font-semibold focus:outline-none">
                <span>{title}</span>
                <svg className={`w-5 h-5 transition-transform transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="p-4 pt-0 text-zinc-600">{children}</div>
            </div>
        </div>
    );
};

const Contact: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
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
  text: "Thanks for contacting us !",
  icon: "success"
});
                setFormState({ name: "", email: "", mobile: "", message: "" });
            } else {
                setSubmissionStatus('error');
            }
        } catch (err) {
            console.error(err);
            setSubmissionStatus('error');
        }
    };

    const faqs = [
        { q: "What is your typical project timeline?", a: "Timelines vary based on project complexity. A standard website takes about 4-6 weeks from discovery to delivery. We'll provide a detailed project plan with milestones before we begin." },
        { q: "How much does a new website or logo cost?", a: "Pricing is customized for each project. After our initial discovery call, we'll send a detailed proposal outlining the scope of work and all associated costs. We offer package deals for combined services." },
        { q: "What kind of support do you offer after the project is complete?", a: "We offer 30 days of complimentary support to fix any bugs or issues. We also have ongoing maintenance packages for regular updates, security checks, and peace of mind." },
    ];

    const contactInfo = [
        { label: 'Email', value: 'info@vgotyou.com', href: 'mailto:info@vgotyou.com' },
        { label: 'Phone', value: '+91 78711 20415', href: 'tel:+917871120415' },
    ];

    return (
        <div className="bg-brand-white text-brand-black">
            <Helmet>
              <title>Contact VGOT YOU | Hire a Web & Logo Designer</title>
              <meta name="description" content="Get in touch with VGOT YOU for creative logo design and web design services. Let’s build your brand’s digital presence together." />
              <link rel="canonical" href="https://www.vgotyou.com/contact" />
            </Helmet>

            {/* Hero Section */}
            <section className="h-[60vh] w-full relative flex items-center justify-center text-center text-white bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/1920/1080?grayscale&random=50')` }}>
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative z-10 px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4">Let's Talk</h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">Have a project in mind or just want to say hello? Drop me a line. I'd love to hear from you.</p>
                </div>
            </section>
            
            <div className="container mx-auto py-20 px-6">
                {/* Contact Info + Form */}
                <FadeInSection className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-5 gap-16">
                        {/* Info */}
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                {contactInfo.map(info => (
                                    <div key={info.label}>
                                        <p className="font-bold">{info.label}</p>
                                        <a href={info.href} className="text-zinc-600 hover:text-brand-black transition-colors">{info.value}</a>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-3 bg-brand-light-gray p-8 rounded-lg border border-zinc-200">
                            <form className="space-y-6" onSubmit={handleFormSubmit}>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                                    <input type="text" id="name" value={formState.name} onChange={handleFormChange} required className="w-full bg-white border border-zinc-300 rounded-md p-3" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                                    <input type="email" id="email" value={formState.email} onChange={handleFormChange} required className="w-full bg-white border border-zinc-300 rounded-md p-3" />
                                </div>
                                 <div>
                                    <label htmlFor="mobile" className="block text-sm font-medium text-zinc-600 mb-2">Mobile Number</label>
                                    <input type="tel" id="mobile" value={formState.mobile} onChange={handleFormChange} required className="w-full bg-brand-white border border-zinc-300 rounded-md p-3 focus:ring-brand-black focus:border-brand-black transition" />
                                 </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                                    <textarea id="message" rows={5} value={formState.message} onChange={handleFormChange} required className="w-full bg-white border border-zinc-300 rounded-md p-3"></textarea>
                                </div>
                                <div>
                                    <button type="submit" disabled={submissionStatus === 'sending'} className="bg-black text-white py-3 px-12 rounded-full">
                                        {submissionStatus === 'sending' ? 'Sending...' : 'Send Message'}
                                    </button>
                                </div>
                                {submissionStatus === 'success' && <p className="text-green-600 mt-4">✅ Thank you! Your message has been sent.</p>}
                                {submissionStatus === 'error' && <p className="text-red-600 mt-4">❌ Something went wrong. Please try again.</p>}
                            </form>
                        </div>
                    </div>
                </FadeInSection>

                {/* FAQ */}
                <FadeInSection className="max-w-3xl mx-auto mt-20">
                    <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                    <div>
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
    );
};

export default Contact;
