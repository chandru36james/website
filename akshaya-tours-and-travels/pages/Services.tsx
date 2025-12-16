import React from 'react';
import { SERVICES_LIST, PHONE_NUMBER } from '../constants';
import FadeIn from '../components/FadeIn';
import { ArrowRight } from 'lucide-react';

interface ServicesProps {
  id?: string;
}

const Services: React.FC<ServicesProps> = ({ id }) => {
  return (
    <section id={id} className="py-24 bg-light scroll-mt-20 relative overflow-hidden overflow-x-hidden">
      {/* Background Animated Traffic */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-5">
         
         {/* Car 1 */}
         <div className="absolute top-20 left-[-150px] animate-[drive_20s_linear_infinite]">
            <svg width="120" height="60" viewBox="0 0 60 30" fill="none" className="text-gray-800">
               <path d="M5 20 L15 20 L18 10 L42 10 L45 20 L55 20 A3 3 0 0 1 58 23 L58 28 L2 28 L2 23 A3 3 0 0 1 5 20 Z" fill="currentColor"/>
               <circle cx="12" cy="28" r="4" fill="currentColor"/>
               <circle cx="48" cy="28" r="4" fill="currentColor"/>
            </svg>
         </div>

         {/* Plane - High up */}
         <div className="absolute top-10 left-[-150px] animate-[fly_30s_linear_infinite_2s]">
             <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="text-gray-600 rotate-90">
                 <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="currentColor"/>
             </svg>
         </div>

         {/* Van */}
         <div className="absolute top-1/2 left-[-150px] animate-[drive_25s_linear_infinite_5s]">
             <svg width="140" height="70" viewBox="0 0 70 35" fill="none" className="text-gray-800">
                <path d="M5 25 L5 10 L20 5 L60 5 L65 15 L65 25 A3 3 0 0 1 68 28 L68 33 L2 33 L2 28 A3 3 0 0 1 5 25 Z" fill="currentColor"/>
                <circle cx="15" cy="33" r="5" fill="currentColor"/>
                <circle cx="55" cy="33" r="5" fill="currentColor"/>
             </svg>
         </div>

         {/* Bike - Bottom */}
         <div className="absolute bottom-20 left-[-150px] animate-[drive_12s_linear_infinite_8s]">
            <svg width="60" height="40" viewBox="0 0 40 25" fill="none" className="text-gray-800">
               <circle cx="8" cy="19" r="5" fill="currentColor" opacity="0.5"/>
               <circle cx="32" cy="19" r="5" fill="currentColor" opacity="0.5"/>
               <path d="M8 19 L15 10 L25 10 L32 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
               <path d="M15 10 L12 5" stroke="currentColor" strokeWidth="2" />
               <path d="M20 10 L28 10" stroke="currentColor" strokeWidth="3" />
            </svg>
         </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <h4 className="text-secondary font-bold tracking-widest text-sm uppercase mb-2">Our Expertise</h4>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6">Domestic Travels & Transport</h2>
            <p className="text-body max-w-2xl mx-auto text-lg">
              From <strong>Vehicle Rentals in Tambaram</strong> to <strong>Bus Travels</strong> booking, we offer complete travel solutions including <strong>Domestic Travels in Tambaram</strong> packages.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES_LIST.map((service, index) => (
            <FadeIn key={service.id} delay={index * 100}>
              <div className="group bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                
                {/* Background decorative blob */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-300"></div>

                <div className="relative z-10 flex items-start gap-4 md:gap-6">
                  <div className="flex-shrink-0 bg-white p-3 md:p-4 rounded-xl shadow-md text-secondary group-hover:bg-primary group-hover:text-white transition-colors duration-300 ring-1 ring-gray-100 group-hover:animate-bounce">
                    <service.icon size={28} className="md:w-8 md:h-8" />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-primary mb-2 md:mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-sm md:text-base text-body mb-4 md:mb-6 leading-relaxed">{service.description}</p>
                    
                    <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                       {service.id === 'local-taxi' && ['Vehicle Rentals in Tambaram', 'Travels Near Me', 'Travels in East Tambaram'].map(item => <li key={item} className="text-xs md:text-sm text-gray-500 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent rounded-full"></div>{item}</li>)}
                       {service.id === 'airport-transfer' && ['Airport Pickup', 'Drop Services', 'Domestic Travels'].map(item => <li key={item} className="text-xs md:text-sm text-gray-500 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent rounded-full"></div>{item}</li>)}
                       {service.id === 'outstation' && ['Bus Travels in Tambaram', 'Tempo Traveller Rental', 'Best Travels in Tambaram'].map(item => <li key={item} className="text-xs md:text-sm text-gray-500 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent rounded-full"></div>{item}</li>)}
                       {service.id === 'corporate' && ['Domestic Tour Packages', 'Corporate Vehicle Rentals', 'Group Booking'].map(item => <li key={item} className="text-xs md:text-sm text-gray-500 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent rounded-full"></div>{item}</li>)}
                    </ul>

                    <a 
                      href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} 
                      className="inline-flex items-center gap-2 text-accent font-bold hover:text-accent-hover transition group/link"
                    >
                       Book Now <ArrowRight size={18} className="transform group-hover/link:translate-x-1 transition" />
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;