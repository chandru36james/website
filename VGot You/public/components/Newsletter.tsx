import React, { useState, useEffect } from 'react';
import { XIcon } from './Icons';

const NewsletterPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const popupShown = sessionStorage.getItem('newsletterPopupShown');
    if (!popupShown) {
      const timer = setTimeout(() => setIsVisible(true), 5000); // Show after 5s
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('newsletterPopupShown', 'true');
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email) {
      setError('Please fill in both fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const form = new FormData();
      form.append("access_key", "091214e0-3412-4907-b547-3299b2e7ec3a");
      form.append("name", formData.name);
      form.append("email", formData.email);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => handleClose(), 5000); // Close after 5s
      } else {
        console.error("Web3Forms error:", result);
        setError('Failed to submit. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 animate-fade-in-up" style={{ animationDuration: '0.4s' }}>
      <div className="relative bg-white text-black rounded-lg shadow-2xl w-full max-w-sm p-6 md:p-8 text-center transform transition-all">
  <button
    onClick={handleClose}
    className="absolute top-3 right-3 text-gray-600 hover:text-black transition-colors"
    aria-label="Close newsletter popup"
  >
    <XIcon className="w-5 h-5" />
  </button>

  {isSubmitted ? (
    <div>
      <h2 className="text-xl font-display font-bold">Request Received!</h2>
      <p className="mt-3 text-gray-800 text-sm">
        Thank you, <span className="font-semibold">{formData.name}</span>!  
        We'll be in touch at <span className="font-semibold">{formData.email}</span> soon.
      </p>
    </div>
  ) : (
    <>
      <h2 className="text-xl md:text-2xl font-display font-bold">Get a Free Audit</h2>
      <p className="mt-3 text-gray-800 text-sm">
        Curious how your brand or website stacks up? Enter your details for a complimentary audit.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md text-black bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md text-black bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-6 py-2 rounded-md font-display font-medium text-sm transition-all duration-300 ${isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-black hover:bg-gray-900'} text-white`}
        >
          {isSubmitting ? 'Submitting...' : 'Get Free Audit'}
        </button>
      </form>
      {error && <p className="mt-2 text-red-500 text-xs">{error}</p>}
      <p className="mt-3 text-xs text-gray-500">We respect your privacy. No spam.</p>
    </>
  )}
</div>

    </div>
  );
};

export default NewsletterPopup;
