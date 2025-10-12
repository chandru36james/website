
import React from 'react';
import FacebookIcon from './icons/FacebookIcon';
import InstagramIcon from './icons/InstagramIcon';

interface SocialLinksProps {
  activeIndex: number;
  isLoaded?: boolean;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ activeIndex, isLoaded }) => {
  // Sections with dark backgrounds where light icons are needed
  const hasDarkBg = [0, 2, 4, 7].includes(activeIndex);
  const iconColorClass = hasDarkBg ? 'text-white' : 'text-brand-dark';

  const socialMedia = [
    { href: "https://www.facebook.com/profile.php?id=100054853566343", label: "Facebook", icon: <FacebookIcon /> },
    { href: "https://www.instagram.com/bloomgreen_developers", label: "Instagram", icon: <InstagramIcon /> }
  ];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 p-4 hidden md:flex flex-col space-y-4 z-40">
        {socialMedia.map((social, index) => (
           <a 
            key={social.label}
            href={social.href} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label={social.label} 
            className={`p-2 ${iconColorClass} transform transition-all duration-500 ease-out hover:text-brand-gold hover:scale-110 hover:-translate-y-1
              ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`
            }
            style={{ transitionDelay: `${400 + index * 100}ms` }}
          >
            {social.icon}
          </a>
        ))}
    </div>
  );
};

export default SocialLinks;