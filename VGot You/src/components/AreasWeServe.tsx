import React from "react";
import FadeInSection from "./FadeInSection";

const areas = [
  {
    country: "United Kingdom",
    description:
      "Providing professional web design, development, and digital solutions for businesses across the UK.",
  },
  {
    country: "India",
    description:
      "Helping startups and local businesses across India build modern, fast, and scalable websites.",
  },
];

export default function AreasWeServe() {
  return (
    <FadeInSection className="py-24 bg-black text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Areas We Serve
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We work with businesses in multiple regions, delivering high-quality
            web design and digital solutions tailored for local markets.
          </p>
        </div>

        {/* Countries */}
        <div className="grid md:grid-cols-2 gap-8">
          {areas.map((area, index) => (
            <div
              key={index}
              className="border border-gray-800 rounded-2xl p-8 hover:border-gray-600 transition duration-300"
            >
              <h3 className="text-2xl font-semibold mb-3">
                {area.country}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}
