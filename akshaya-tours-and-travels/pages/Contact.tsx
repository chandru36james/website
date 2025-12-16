import React, { useState } from 'react';
import { PHONE_NUMBER, PHONE_NUMBER_SECONDARY, WHATSAPP_NUMBER, ADDRESS, FAQS } from '../constants';
import { Phone, MapPin, Clock, MessageCircle, ChevronDown, Plus, Minus } from 'lucide-react';
import FadeIn from '../components/FadeIn';

interface ContactProps {
  id?: string;
}

interface FAQAccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQAccordionItem: React.FC<FAQAccordionItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`border-b border-gray-100 last:border-0 transition-colors duration-300 ${isOpen ? 'bg-blue-50/50' : 'bg-white'}`}>
      <button 
        onClick={onClick}
        className="w-full text-left py-5 px-6 flex justify-between items-center group cursor-pointer"
      >
        <span className={`font-bold text-lg transition-colors ${isOpen ? 'text-primary' : 'text-body group-hover:text-accent'}`}>
          {question}
        </span>
        <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-primary text-white rotate-180' : 'bg-gray-100 text-gray-500 group-hover:bg-accent group-hover:text-white'
        }`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="px-6 pb-6 text-body leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

const Contact: React.FC<ContactProps> = ({ id }) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id={id} className="py-24 bg-light scroll-mt-20">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <FadeIn>
             <h4 className="text-secondary font-bold tracking-widest text-sm uppercase mb-2">Get In Touch</h4>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-4">Contact & Support</h2>
            <p className="text-body max-w-xl mx-auto text-lg">
              Have questions? Need a quick quote? We are here to help you 24/7.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <FadeIn direction="left">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-heading font-bold text-primary mb-8">Contact Info</h3>
                
                <div className="space-y-8">
                  <div className="flex gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-secondary rounded-full flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                      <Phone size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">Phone Numbers</h4>
                      <p className="text-sm text-gray-500 mb-2">24/7 Customer Support</p>
                      <div className="flex flex-col gap-1">
                        <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="text-lg font-bold text-body hover:text-accent transition">
                          {PHONE_NUMBER}
                        </a>
                        <a href={`tel:${PHONE_NUMBER_SECONDARY.replace(/\s/g, '')}`} className="text-lg font-bold text-body hover:text-accent transition">
                          {PHONE_NUMBER_SECONDARY}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-secondary rounded-full flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">Office Address</h4>
                      <p className="text-body leading-relaxed group-hover:text-accent transition-colors">
                        {ADDRESS}
                      </p>
                    </div>
                  </div>

                   <div className="flex gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-secondary rounded-full flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                      <Clock size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">Working Hours</h4>
                      <p className="text-body group-hover:text-accent transition-colors">Monday - Sunday: 24 Hours</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Booking Card */}
              <div className="mt-8 bg-gradient-to-br from-primary to-blue-700 p-8 rounded-2xl shadow-xl text-white text-center">
                 <h3 className="text-2xl font-heading font-bold mb-4">Instant Booking</h3>
                 <p className="mb-8 opacity-90">Skip the forms. Call or WhatsApp us directly for immediate confirmation.</p>
                 <div className="space-y-4">
                   <a 
                     href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} 
                     className="block w-full bg-white text-accent font-bold py-3.5 rounded-xl hover:bg-gray-50 transition shadow-md flex items-center justify-center gap-2"
                   >
                     <Phone size={20} /> Call Now
                   </a>
                   <a 
                     href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi,%20I%20want%20to%20book%20a%20cab.`}
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="block w-full bg-[#25D366] text-white font-bold py-3.5 rounded-xl hover:bg-[#20bd5a] transition shadow-md flex items-center justify-center gap-2"
                   >
                     <MessageCircle size={20} /> WhatsApp Us
                   </a>
                 </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Map & FAQ */}
          <div className="lg:col-span-7">
             <FadeIn direction="right" delay={200}>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-[300px] mb-10 relative group">
                 <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7516886657287!2d80.1275000148216!3d12.92290009088746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f6e6f7b7b7b%3A0x1234567890abcdef!2sSelaiyur%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen={true} 
                  loading="lazy"
                  title="Google Map Location"
                  className="grayscale group-hover:grayscale-0 transition duration-500"
                ></iframe>
              </div>

               <h3 className="text-2xl font-heading font-bold text-primary mb-6 px-2">Frequently Asked Questions</h3>
               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                 {FAQS.map((faq, index) => (
                   <FAQAccordionItem 
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFAQ === index}
                    onClick={() => toggleFAQ(index)}
                   />
                 ))}
               </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;