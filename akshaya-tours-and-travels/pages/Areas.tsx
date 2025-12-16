import React from 'react';
import { AREAS_LIST } from '../constants';
import { MapPin } from 'lucide-react';
import FadeIn from '../components/FadeIn';

interface AreasProps {
  id?: string;
}

const Areas: React.FC<AreasProps> = ({ id }) => {
  return (
    <section id={id} className="py-16 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Areas We Serve</h2>
            <p className="text-body max-w-2xl mx-auto text-lg">
              Providing the fastest <strong>Local Taxi Service Tambaram</strong> and its neighborhoods.
            </p>
          </FadeIn>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Areas List */}
          <div className="lg:w-1/2">
            <FadeIn direction="left">
              <h3 className="text-2xl font-bold mb-6 text-primary">Local Coverage</h3>
              <div className="space-y-4">
                {AREAS_LIST.map((area, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition border border-gray-100 hover:border-gray-200 shadow-sm">
                    <MapPin className="text-accent mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h4 className="text-xl font-bold text-primary">{area.name}</h4>
                      <p className="text-body mt-1 text-sm">{area.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Visual/Map Placeholder */}
          <div className="lg:w-1/2">
            <FadeIn direction="right" delay={200}>
              <div className="bg-gray-200 w-full h-[180px] lg:h-[280px] rounded-xl flex items-center justify-center relative overflow-hidden shadow-inner group">
                 <img 
                  src="https://akshayatoursandtravels.com/assets/areas.png" 
                  alt="Map of Chennai Area" 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end justify-center pb-8">
                   <p className="text-white text-xl font-bold px-6 py-3 bg-primary bg-opacity-90 rounded-lg shadow-lg">
                     Serving 15+ Locations around Tambaram
                   </p>
                </div>
              </div>
              <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="font-bold text-lg mb-2 text-primary">Don't see your area?</h3>
                <p className="text-body">
                  We likely serve it too! If you are within a 15km radius of Tambaram, give us a call to check availability.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Areas;