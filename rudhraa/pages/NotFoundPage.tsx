import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] text-center px-4">
      <div>
        <h1 className="text-6xl font-extrabold text-primary font-lora">404</h1>
        <p className="text-2xl mt-4 font-semibold text-text-main">Page Not Found</p>
        <p className="mt-2 text-text-alt">Sorry, the page you are looking for does not exist.</p>
        <Link 
          to="/" 
          className="mt-8 inline-block px-8 py-3 bg-accent text-white font-semibold rounded-full hover:bg-accent-hover shadow-md hover:shadow-lg hover:-translate-y-px transform transition-all duration-200"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;