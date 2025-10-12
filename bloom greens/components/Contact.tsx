import React, { useState } from 'react';
import { LocationIcon, PhoneIcon, EmailIcon } from './icons/ContactIcons';

interface ContactProps {
  isVisible?: boolean;
  isMobile?: boolean;
}

const Contact: React.FC<ContactProps> = ({ isVisible, isMobile }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      // Revert to idle after a few seconds so user can send another message
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <LocationIcon className="w-6 h-6" />,
      title: "Our Address",
      lines: ["Harshan complex, Tirupur - Vijayamangalam Rd,", "Kannipiran Colony, Valipalayam,", "Tiruppur, Tamil Nadu 641601"]
    },
    {
      icon: <EmailIcon className="w-6 h-6" />,
      title: "Email Us",
      lines: ["bloomgreendevelopers@gmail.com"]
    },
    {
      icon: <PhoneIcon className="w-6 h-6" />,
      title: "Call Us",
      lines: ["+91 9655653344 (Aravind)", "+91 72007 48803 (Aswin)"]
    }
  ];
  
  const titleWords = "Get In Touch".split(' ');
  
  return (
    <section 
      className={`w-full bg-gray-50 flex flex-col items-center justify-center overflow-hidden ${isMobile ? 'py-24' : 'h-full'}`}
      style={{
        backgroundImage: 'linear-gradient(135deg, rgba(0, 0, 0, 0.04) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, 0.04) 50%, rgba(0, 0, 0, 0.04) 75%, transparent 75%, transparent)',
        backgroundSize: '20px 20px',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:pl-24 lg:pr-24 py-8">
        <div className={`text-center mb-12`}>
          <h3 className={`text-brand-gold font-semibold tracking-widest uppercase mb-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>HAVE A QUESTION?</h3>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-brand-dark">
            {titleWords.map((word, index) => (
              <span key={index} className="inline-block overflow-hidden mr-3">
                <span
                  className={`inline-block transform transition-all duration-500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                  style={{ transitionDelay: `${100 + index * 100}ms` }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h2>
        </div>

        <div className={`max-w-6xl mx-auto bg-white p-8 lg:p-12 rounded-lg shadow-lg transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 lg:items-center">
            
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-playfair font-bold text-brand-dark mb-6">Contact Information</h3>
              <p className="text-gray-600 mb-8">
                We're here to help and answer any question you might have. We look forward to hearing from you.
              </p>
              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-gold text-white rounded-full flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-brand-dark">{item.title}</h4>
                      {item.lines.map((line, i) => {
                          if (item.title === "Call Us") {
                              const phoneNumber = line.match(/\+[\d\s]+/)?.[0]?.replace(/\s/g, '');
                              return (
                                  <a key={i} href={`tel:${phoneNumber}`} className="text-gray-600 block hover:text-brand-gold transition-colors duration-300">
                                      {line}
                                  </a>
                              )
                          }
                          if (item.title === "Email Us") {
                              return (
                                  <a key={i} href={`mailto:${line}`} className="text-gray-600 block hover:text-brand-gold transition-colors duration-300">
                                      {line}
                                  </a>
                              )
                          }
                          return <p key={i} className="text-gray-600">{line}</p>
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-playfair font-bold text-brand-dark mb-6">Send a Message</h3>
              {formStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center h-full text-center min-h-[360px]">
                  <h3 className="text-2xl font-playfair font-bold text-brand-dark mb-2">Thank You!</h3>
                  <p className="text-gray-600">Your message has been sent successfully. We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="w-full px-4 py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold transition" required />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" className="w-full px-4 py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold transition" required />
                  </div>
                  <div>
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" className="w-full px-4 py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold transition" required />
                  </div>
                  <div>
                    <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows={5} className="w-full px-4 py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold transition" required></textarea>
                  </div>
                  <div>
                    <button type="submit" disabled={formStatus === 'submitting'} className="btn-slide-hover slide-gray-800 w-full bg-brand-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed">
                      <span>{formStatus === 'submitting' ? 'Sending...' : 'Send Message'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;