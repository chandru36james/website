import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const m = motion as any;

const CookieConsent: React.FC = () => {
const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
const consent = localStorage.getItem('vgotyou-cookie-consent');
if (!consent) {
setIsVisible(true);
} else if (consent === 'accepted') {
enableTracking(); // auto-enable if already accepted
}
}, []);

const handleAccept = () => {
localStorage.setItem('vgotyou-cookie-consent', 'accepted');
setIsVisible(false);
enableTracking();
};

const handleDecline = () => {
localStorage.setItem('vgotyou-cookie-consent', 'declined');
setIsVisible(false);
};

const enableTracking = () => {
if (typeof window !== "undefined" && (window as any).gtag) {


  // ✅ Grant consent
  (window as any).gtag('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'granted',
    personalization_storage: 'granted'
  });

  const page = window.location.pathname + window.location.search;

  // ✅ Config with UTM
  (window as any).gtag('config', 'G-XRBQTY2DLC', {
    page_path: page
  });

  // 🔥 CRITICAL: Force page_view (fixes UTM tracking)
  (window as any).gtag('event', 'page_view', {
    page_location: window.location.href,
    page_path: page,
    page_title: document.title
  });
}


};

return ( <AnimatePresence>
{isVisible && (
<m.div
initial={{ y: 50, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
exit={{ y: 50, opacity: 0 }}
className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-[100]"
> <div className="bg-black border border-zinc-800 rounded-lg p-4 text-center">

        <h3 className="text-sm font-bold text-white mb-2">
          We use cookies
        </h3>

        <p className="text-xs text-zinc-400 mb-4">
          We use cookies to improve performance and track analytics.
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleDecline}
            className="flex-1 py-2 border border-zinc-700 text-xs text-zinc-400 rounded"
          >
            Decline
          </button>

          <button
            onClick={handleAccept}
            className="flex-1 py-2 bg-red-600 text-white text-xs rounded"
          >
            Accept
          </button>
        </div>

      </div>
    </m.div>
  )}
</AnimatePresence>

);
};

export default CookieConsent;
