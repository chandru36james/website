import React, { useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { Helmet } from "react-helmet";   // ✅ for seo

// Import all 12 images
import img1 from '@/assets/mockup logo/1.jpeg';
import img2 from '@/assets/mockup logo/2.jpeg';
import img3 from '@/assets/mockup logo/3.jpeg';
import img4 from '@/assets/mockup logo/4.jpeg';
import img5 from '@/assets/mockup logo/5.jpeg';
import img6 from '@/assets/mockup logo/6.jpeg';
import img7 from '@/assets/mockup logo/7.jpeg';
import img8 from '@/assets/mockup logo/8.jpeg';
import img9 from '@/assets/mockup logo/9.jpeg';
import img10 from '@/assets/mockup logo/10.png';
import img11 from '@/assets/mockup logo/11.png';
import img12 from '@/assets/mockup logo/12.jpeg';
import banner from '@/assets/logo-banner.png';

// Organize into rows
const logoGrid = [
  [img1, img2, img3, img4],     // Row 1
  [img5, img6, img7, img8],     // Row 2
  [img9, img10, img11, img12],  // Row 3
];

const Lightbox: React.FC<{ src: string; onClose: () => void }> = ({ src, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <button className="absolute top-4 right-4 text-white text-4xl">&times;</button>
      <img
        src={src}
        alt="Enlarged logo"
        className="max-w-[90vw] max-h-[90vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

const FadeInSection: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const ref = useFadeIn();
  return (
    <div ref={ref} className={`fade-in ${className}`}>
      {children}
    </div>
  );
};

const LogoShowcase: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="bg-brand-white text-brand-black">
        <Helmet>
  <title>Logo Showcase | Creative Logo Designs by VGot You</title>
  <meta 
    name="description" 
    content="Explore VGot You’s showcase of custom and professional logo designs created to elevate brand identities." 
  />
  <meta 
    name="keywords" 
    content="logo showcase, professional logo designs, branding, creative logos, VGot You" 
  />
  <link rel="canonical" href="https://www.vgotyou.com/logo-showcase" />

  {/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Logo Showcase | VGot You" />
  <meta property="og:description" content="See unique and creative logo designs made for brands worldwide." />
  <meta property="og:image" content="https://www.vgotyou.com/assets/logo-designer.png" />
  <meta property="og:url" content="https://www.vgotyou.com/logo-showcase" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Logo Showcase | VGot You" />
  <meta name="twitter:description" content="Browse our logo showcase with professional branding solutions." />
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/logo-designer.png" />

  {/* Schema.org */}
  <script type="application/ld+json">
    {`
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Logo Showcase",
      "url": "https://www.vgotyou.com/logo-showcase",
      "description": "Collection of creative and professional logos designed by VGot You."
    }
    `}
  </script>
</Helmet>

      {selectedImage && <Lightbox src={selectedImage} onClose={() => setSelectedImage(null)} />}

      {/* Hero Section */}
      <section
        className="h-[60vh] w-full relative flex items-center justify-center text-center text-white bg-cover bg-center"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Logo Design Showcase</h1>
          <p className="text-xl md:text-2xl text-gray-300">Identities that make an impact.</p>
        </div>
      </section>

         
      {/* Logo Grid */}
      <div className="container mx-auto py-20 px-6">
        <div className="grid grid-rows-3 gap-6">
          {logoGrid.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-4 gap-4">
              {row.map((src, colIndex) => (
                <div
                  key={colIndex}
                  className="aspect-square bg-brand-light-gray border border-zinc-200 rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(src)}
                >
                  <img
                    src={src}
                    alt={`Logo R${rowIndex + 1}C${colIndex + 1}`}
                    className="w-full h-full object-contain p-4 transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                    style={{ filter: 'grayscale(0%)' }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Process */}
        <FadeInSection className="max-w-4xl mx-auto mt-20">
          <h2 className="text-3xl font-bold mb-4 text-center">Our Creative Process</h2>
          <p className="text-zinc-700 text-lg text-center">
            Our logo design process is a collaborative journey. We start with a deep dive into your
            brand's values, audience, and mission. From there, we move to sketching concepts,
            refining digital drafts, and perfecting color palettes, ensuring the final logo is a true
            and powerful representation of your identity.
          </p>
        </FadeInSection>

        {/* Testimonials */}
        <FadeInSection className="max-w-4xl mx-auto mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Client Testimonials</h2>
          <div className="space-y-8">
            <div className="bg-brand-light-gray p-6 rounded-lg border border-zinc-200 text-center">
              <p className="text-zinc-700 italic mb-4">
                "The logo is perfect! It's modern, clean, and exactly what we envisioned."
              </p>
              <p className="font-bold text-brand-black">- Arctic Textiles.</p>
            </div>
            <div className="bg-brand-light-gray p-6 rounded-lg border border-zinc-200 text-center">
              <p className="text-zinc-700 italic mb-4">
                "<span className="font-cambria not-italic">VGot You</span> delivered a brand identity
                that truly sets us apart. The process was seamless and professional."
              </p>
              <p className="font-bold text-brand-black">- Bloom Green Developers</p>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default LogoShowcase;
