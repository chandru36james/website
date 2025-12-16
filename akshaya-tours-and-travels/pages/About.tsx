import React from 'react';
import { BUSINESS_NAME, ADDRESS } from '../constants';
import { CheckCircle } from 'lucide-react';
import FadeIn from '../components/FadeIn';

interface AboutProps {
  id?: string;
}

const About: React.FC<AboutProps> = ({ id }) => {
  return (
    <section id={id} className="py-16 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">About Akshaya Tours and Travels</h2>
            <p className="text-body max-w-2xl mx-auto text-lg">
              The preferred choice for <strong>Travels in Tambharam</strong> (Tambaram) covering local and domestic needs.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left">
            <div>
              <img 
                src="https://akshayatoursandtravels.com/assets/temple.png" 
                alt="Akshaya Tours Fleet of Vehicles in Tambaram" 
                className="rounded-lg shadow-xl w-full hover:shadow-2xl transition duration-500 border border-gray-100"
              />
            </div>
          </FadeIn>
          
          <FadeIn direction="right">
            <div>
              <h3 className="text-2xl font-heading font-bold text-primary mb-6">Akshaya Tours and Travels</h3>
              <p className="text-body mb-4 leading-relaxed">
                Founded with a vision to provide quality transportation, we have grown to become the <strong>Best Travels in Tambaram</strong>. Whether you need <strong>Tourist Vehicles in Tambaram</strong> for a quick trip or <strong>Bus Travels in Tambaram</strong> for a family function, we have the right vehicle for you.
              </p>
              <p className="text-body mb-4 leading-relaxed">
                Searching for "<strong>travels near me</strong>"? We are located right here. We serve all areas including <strong>Travels in East Tambaram</strong>, West Tambaram, and Chromepet. Our expertise extends beyond local trips; we are leading <strong>Domestic Travels in Tambaram</strong> organizers for trips to Ooty, Kodaikanal, and Tirupati.
              </p>
              <p className="text-body mb-6 leading-relaxed">
                Located at <strong>{ADDRESS}</strong>, we also assist with airport pickup for all arrivals. For the <strong>Tambaram Travels Contact Number</strong>, call us anytime.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-secondary flex-shrink-0" size={20} />
                  <span className="text-body font-medium">Domestic Travels</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-secondary flex-shrink-0" size={20} />
                  <span className="text-body font-medium">Pilgrimage Tours</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-secondary flex-shrink-0" size={20} />
                  <span className="text-body font-medium">Vehicle & Bus Travels</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-secondary flex-shrink-0" size={20} />
                  <span className="text-body font-medium">Travels in East Tambaram</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default About;