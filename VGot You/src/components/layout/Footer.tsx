
import React from 'react';


const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition-colors"
  >
    {children}  
  </a>
);

const Footer: React.FC = () => {
  const googleLink = "https://www.google.com/search?q=VGot+You+%E2%80%93+Web+Design+Company+in+karur&stick=H4sIAAAAAAAA_-NgU1I1qEhMMzVLMzNJtjS3NDY2MTK3MqhISjQ1TU6zMLGwME4xTjNKXsSqEeaeX6IQmV-q8KhhskJ4apKCS2pxZnqegnN-bkFiXqVCZp5CdmJRaREAmWh1LVQAAAA&hl=en&mat=CTYW_efeDqo4ElcBTVDHnjSrL1i_VTCa8_kuXYpK1iyu8maHPcIxMv-VA5S0wxGQN2FTkjTuTCQOIc3qOOv2BGOZtzpI4JPgrHCDZf5fjf6TpSzgZ-TLIOOTRC7snP24iCY&authuser=0";

  return (
    <footer className="bg-black text-white py-12 border-t border-zinc-800">
      <div className="container mx-auto px-6 text-center">
        {/* Logo + Name */}
        <div className="flex justify-center items-center mb-4">
          <img 
  src="https://www.vgotyou.com/assets/logo.png" 
  alt="VGot You Logo"
  className="h-10 w-10 mr-3"
/>

          <h3 className="text-3xl font-bold font-cambria">VGot You</h3>
        </div>

        <p className="text-gray-400 max-w-md mx-auto mb-8">
          Crafting digital experiences that are not only beautiful but also functional. Let's build
          something amazing together.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mb-8">
          <SocialIcon href="https://www.linkedin.com/in/vgotyou/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </SocialIcon>

          <SocialIcon href="https://vgotyou.medium.com/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.41-3.38 6.41s-3.38-2.87-3.38-6.41 1.51-6.41 3.38-6.41 3.38 2.87 3.38 6.41zM24 12c0 3.17-.53 5.75-1.19 5.75s-1.19-2.58-1.19-5.75.53-5.75 1.19-5.75S24 8.83 24 12z"/>
  </svg>
          </SocialIcon>

          <SocialIcon href="https://www.instagram.com/vgot_you/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </SocialIcon>

          <SocialIcon href={googleLink}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,5 12,5C14.5,5 16.22,6.17 17.03,6.94L19.31,4.64C17.43,2.97 14.9,2 12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.64,22 21.5,18.33 21.5,12.27C21.5,11.78 21.45,11.44 21.35,11.1Z" />
            </svg>
          </SocialIcon>
        </div>

        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} <span className="font-cambria">VGot You</span>. All
          Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
