// Fix: Corrected import statement. Removed stray 'a,'.
import React, { useState } from 'react';
import { WHATSAPP_LINK, ICONS } from '../constants';
import PageHeader from '../components/PageHeader';
import useAnimateOnScroll from '../components/useAnimateOnScroll';
import MetaTags from '../components/MetaTags';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', country: '', message: '' });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [sectionRef, isSectionVisible] = useAnimateOnScroll(0.1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required.';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid.';
        }
        if (!formData.country.trim()) newErrors.country = 'Country is required.';
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required.';
        } else if (formData.message.length < 10) {
            newErrors.message = 'Message must be at least 10 characters long.';
        }
        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', country: '', message: '' });
        }, 1500);
    };
    
    return (
        <div>
            <MetaTags
                title="Contact Rudhraa Exports | Vegetable & Fruit Exporter & Importer"
                description="Contact Rudhraa Exports in Karur, Tamil Nadu, for inquiries on vegetables, fruits, and more. As a leading exporter and importer, we are ready to assist with quotes and bulk orders."
                imageUrl="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1200&q=80"
            />
            <PageHeader 
                title="Get in Touch" 
                subtitle="We're here to help and answer any question you might have."
                imageUrl="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1200&q=80"
            />

            <section ref={sectionRef as React.RefObject<HTMLDivElement>} className="py-16 lg:py-24 bg-bg-alt bg-dot-pattern">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-center">
                        {/* Contact Form */}
                        <div className={`bg-white p-8 rounded-lg shadow-lg border border-highlight scroll-animate ${isSectionVisible ? 'is-visible' : ''}`}>
                            <h2 className="text-2xl font-bold font-lora text-text-main mb-6">Send Us a Message</h2>
                            {isSubmitted ? (
                                <div className="text-center p-8 bg-green-50 text-green-800 rounded-lg border border-green-200 flex flex-col items-center gap-4">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <h3 className="text-xl font-semibold">Message Sent!</h3>
                                    <p>Thank you for reaching out. We will get back to you shortly.</p>
                                    <button 
                                        onClick={() => setIsSubmitted(false)}
                                        className="mt-4 px-6 py-2 text-sm font-semibold text-white bg-accent rounded-full hover:bg-accent-hover transition-colors"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Full Name"
                                            aria-label="Full Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className={`block w-full px-4 py-3 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-highlight focus:border-accent focus:ring-accent'}`}
                                            aria-invalid={!!errors.name}
                                            aria-describedby={errors.name ? 'name-error' : undefined}
                                        />
                                        {errors.name && <p id="name-error" className="mt-1 text-xs text-red-600">{errors.name}</p>}
                                    </div>
                                     <div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Email Address"
                                            aria-label="Email Address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className={`block w-full px-4 py-3 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-highlight focus:border-accent focus:ring-accent'}`}
                                            aria-invalid={!!errors.email}
                                            aria-describedby={errors.email ? 'email-error' : undefined}
                                        />
                                        {errors.email && <p id="email-error" className="mt-1 text-xs text-red-600">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <input
                                            id="country"
                                            name="country"
                                            type="text"
                                            placeholder="Country"
                                            aria-label="Country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            required
                                            className={`block w-full px-4 py-3 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm ${errors.country ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-highlight focus:border-accent focus:ring-accent'}`}
                                            aria-invalid={!!errors.country}
                                            aria-describedby={errors.country ? 'country-error' : undefined}
                                        />
                                        {errors.country && <p id="country-error" className="mt-1 text-xs text-red-600">{errors.country}</p>}
                                    </div>
                                    <div>
                                        <textarea
                                            id="message"
                                            name="message"
                                            placeholder="Your Message"
                                            aria-label="Your Message"
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            className={`block w-full px-4 py-3 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-highlight focus:border-accent focus:ring-accent'}`}
                                            aria-invalid={!!errors.message}
                                            aria-describedby={errors.message ? 'message-error' : undefined}
                                        />
                                        {errors.message && <p id="message-error" className="mt-1 text-xs text-red-600">{errors.message}</p>}
                                    </div>
                                    <div>
                                        <button 
                                            type="submit" 
                                            disabled={isSubmitting}
                                            className="w-full px-6 py-3 text-base font-semibold text-white bg-accent rounded-full hover:bg-accent-hover shadow-md hover:shadow-lg hover:-translate-y-px transform transition-all duration-200 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Sending...
                                                </>
                                            ) : (
                                                'Request for Bulk Order'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                        
                        {/* Contact Details & Map Combined Card */}
                        <div className={`scroll-animate ${isSectionVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
                            <div className="bg-white rounded-lg shadow-lg border border-highlight overflow-hidden h-full flex flex-col">
                                {/* Map at the top */}
                                <div className="h-80">
                                    <iframe 
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15668.51347690664!2d77.9998638368545!3d10.952998335965688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8575082155555%3A0x5f802efa956f45c2!2sVellalapatti%2C%20Karur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1647423985794!5m2!1sen!2sin"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen={true}
                                        loading="lazy"
                                        title="Rudhraa Exports Location"
                                    ></iframe>
                                </div>
                                {/* Contact details below */}
                                <div className="p-8 flex-grow">
                                    <h3 className="text-xl font-bold font-lora text-text-main mb-4">Our Office</h3>
                                    <div className="space-y-4 text-text-alt">
                                        <div className="flex items-start group">
                                            <span className="mt-1 mr-4 text-accent w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110">{ICONS.location}</span>
                                            <p>609 B, S. Vellalapatty South Industrial Estate, S. Vellalapatty Post, Karur - 639004, Tamil Nadu, India</p>
                                        </div>
                                        <div className="flex items-center group">
                                            <span className="mr-4 text-accent w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110">{ICONS.email}</span>
                                            <a href="mailto:info@rudhraaexportsandimports.com" className="hover:text-accent transition-colors duration-200">info@rudhraaexportsandimports.com</a>
                                        </div>
                                        <div className="flex items-center group">
                                            <span className="mr-4 text-accent w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110">{ICONS.phone}</span>
                                            <a href="tel:+917373745695" className="hover:text-accent transition-colors duration-200">+91 73737 45695</a>
                                        </div>
                                        <div className="flex items-center group">
                                            <span className="mr-4 text-accent w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110">{React.cloneElement(ICONS.whatsapp, { className: 'w-5 h-5'})}</span>
                                            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-200">WhatsApp Us</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;