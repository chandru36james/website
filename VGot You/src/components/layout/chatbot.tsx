import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useGeoLocation } from '../../hooks/useGeoLocation';
import { MessageSquareIcon, ArrowRightIcon, WavingHandIcon, XIcon, ChevronLeftIcon } from '../common/Icons';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

type Step = 'initial' | 'mobile' | 'project' | 'budget' | 'final';

interface LeadData {
  mobile: string;
  projectType: string;
  budget: number;
}

const PROJECT_TYPES = [
  'Landing Page',
  'E-commerce',
  'Portfolio',
  'Business Website',
  'Custom Project'
];

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [step, setStep] = useState<Step>('initial');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Analytics Helper
  const trackEvent = useCallback((eventName: string, data?: any) => {
    console.log(`[Analytics] ${eventName}`, data);
    
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, data);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const [showIntro2, setShowIntro2] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  // Track Open
  useEffect(() => {
    if (isOpen) {
      trackEvent('chatbot_opened');
    }
  }, [isOpen, trackEvent]);

  useEffect(() => {
    if (isOpen && step === 'initial') {
      setShowIntro2(false);
      setShowCTA(false);
      const t1 = setTimeout(() => setShowIntro2(true), 800);
      const t2 = setTimeout(() => setShowCTA(true), 1600);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [isOpen, step]);

  const [lead, setLead] = useState<LeadData>(() => {
    const saved = localStorage.getItem('chatbot_lead_cache');
    return saved ? JSON.parse(saved) : {
      mobile: '',
      projectType: '',
      budget: 0
    };
  });

  useEffect(() => {
    localStorage.setItem('chatbot_lead_cache', JSON.stringify(lead));
  }, [lead]);
  const [error, setError] = useState('');
  const geo = useGeoLocation();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [step, error]);

  const validateMobile = (mobile: string) => {
    let clean = mobile.replace(/[\s\-\(\)\+]/g, '');
    
    // Length check
    if (clean.length < 10 || clean.length > 15) return false;
    
    // Junk detection: repeated digits (e.g., 9999999999)
    if (/^(\d)\1+$/.test(clean)) return false;
    
    // Sequential digits (e.g., 1234567890)
    if ("1234567890876543210".includes(clean)) return false;

    // Unique digits count (at least 3 unique digits)
    const uniqueDigits = new Set(clean.split('')).size;
    if (uniqueDigits < 3) return false;

    // Region specific rules
    if (geo.country_code === 'IN') {
      // If starts with 91, remove it
      if (clean.startsWith('91') && clean.length === 12) {
        clean = clean.substring(2);
      }
      return /^[6-9]\d{9}$/.test(clean);
    }
    if (geo.country_code === 'US' || geo.country_code === 'GB') {
      return /^\d{10,12}$/.test(clean);
    }
    
    return /^\d{10,15}$/.test(clean);
  };

  const handleInitial = (choice: 'portfolio' | 'quote') => {
    trackEvent('initial_choice', { choice });
    if (choice === 'portfolio') {
      navigate('/portfolio');
      setIsOpen(false);
    } else {
      setStep('mobile');
    }
  };

  const handleMobile = () => {
    if (validateMobile(lead.mobile)) {
      trackEvent('mobile_entered');
      setError('');
      setStep('project');
    } else {
      setError('Please enter a valid mobile number.');
    }
  };

  const handleProjectType = (type: string) => {
    trackEvent('project_selected', { project: type });
    
    // Fix Default Budget Logic
    let defaultBudget = 0;
    if (geo.country_code === 'IN') {
      defaultBudget = 5000;
    } else {
      const min = geo.range?.min || 100;
      const max = geo.range?.max || 2000;
      defaultBudget = typeof geo.default === 'number' ? geo.default : Math.floor((min + max) / 2);
    }

    setLead({ ...lead, projectType: type, budget: defaultBudget });
    setStep('budget');
  };

  const handleBudget = (val: number) => {
    if (val > 0) setLead({ ...lead, budget: val });
  };

  const getWhatsAppUrl = () => {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "917871120415";
    const budgetFormatted = (lead.budget || 0).toLocaleString();
    const currency = geo.currency_symbol || '$';
    const country = geo.country || 'Global';
    
    const message = `*New Lead from Website*\n\n*Mobile:* ${lead.mobile}\n*Project:* ${lead.projectType}\n*Budget:* ${currency}${budgetFormatted}\n*Country:* ${country}`;
    
    return `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
  };

  const handleClose = () => {
    trackEvent('chatbot_closed', { step });
    setIsOpen(false);
  };

  const handleBack = () => {
    trackEvent('chatbot_back', { from_step: step });
    if (step === 'mobile') setStep('initial');
    else if (step === 'project') setStep('mobile');
    else if (step === 'budget') setStep('project');
    else if (step === 'final') setStep('initial');
  };

  const submitLead = () => {
    trackEvent("lead_submitted", {
      mobile: lead.mobile,
      project: lead.projectType,
      budget: lead.budget,
      country: geo.country
    });
    setIsSubmitting(true);
    
    const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY";
    
    const budgetFormatted = (lead.budget || 0).toLocaleString();
    const currency = geo.currency_symbol || '$';
    const country = geo.country || 'Global';
    
    // Background Email (Web3Forms)
    if (web3formsKey !== "YOUR_WEB3FORMS_ACCESS_KEY") {
      const formData = new FormData();
      formData.append("access_key", web3formsKey);
      formData.append("subject", `New Lead: ${lead.projectType}`);
      formData.append("mobile", lead.mobile);
      formData.append("project_type", lead.projectType);
      formData.append("budget", `${currency}${budgetFormatted}`);
      formData.append("country", country);
      formData.append("from_name", "VGot You Chatbot");

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      }).catch(err => console.error("Email send failed:", err));
    }

    // Instant WhatsApp Redirect with small delay for UX
    setTimeout(() => {
      trackEvent('whatsapp_opened', {
        project: lead.projectType,
        budget: lead.budget,
        country: geo.country
      });
      window.open(getWhatsAppUrl(), '_blank');
      setIsSubmitting(false);
      setStep('final');
      localStorage.removeItem('chatbot_lead_cache');
    }, 1500);
  };

  const resetChat = () => {
    trackEvent('chat_reset');
    setStep('initial');
    setLead({ mobile: '', projectType: '', budget: 0 });
    setError('');
    setShowIntro2(false);
    setShowCTA(false);
    localStorage.removeItem('chatbot_lead_cache');
  };

  return (
    <div className="relative font-sans flex flex-col items-end gap-4 pointer-events-auto">
      <AnimatePresence>
        {!isOpen && (
          <div className="relative group">
            {/* Waving Hand Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  key="tooltip"
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="hidden sm:flex absolute bottom-full right-0 mb-4 bg-white px-4 py-2 rounded-2xl shadow-xl border border-neutral-100 whitespace-nowrap items-center gap-2"
                >
                  <span className="text-xs font-bold text-neutral-800">Need help? Chat with us!</span>
                  <motion.div
                    animate={{ rotate: [0, 20, 0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <WavingHandIcon size={16} className="text-yellow-500" />
                  </motion.div>
                  <div className="absolute top-full right-6 w-3 h-3 bg-white border-r border-b border-neutral-100 rotate-45 -translate-y-1.5"></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating Button with Glow */}
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                boxShadow: [
                  "0 0 0 0px rgba(220, 38, 38, 0)",
                  "0 0 0 15px rgba(220, 38, 38, 0.2)",
                  "0 0 0 0px rgba(220, 38, 38, 0)"
                ]
              }}
              transition={{ 
                scale: { duration: 0.3 },
                opacity: { duration: 0.3 },
                boxShadow: { repeat: Infinity, duration: 2 }
              }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setIsOpen(true)}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:bg-red-700 transition-all active:scale-90 relative z-10"
            >
              <div className="sm:hidden">
                <MessageSquareIcon size={20} />
              </div>
              <div className="hidden sm:block">
                <MessageSquareIcon size={24} />
              </div>
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className="w-[320px] sm:w-[360px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden border border-neutral-100"
          >
            {/* Header */}
            <div className="bg-red-600 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                {step !== 'initial' && (
                  <button 
                    onClick={handleBack}
                    className="p-1 -ml-1 hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Go back"
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                )}
                <div className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center shadow-lg border border-white/10">
                  <img src="https://www.vgotyou.com/assets/logo.png" alt="VGot You" className="w-5 h-5 object-contain brightness-110" />
                </div>
                <div>
                  <p className="text-sm font-bold">VGot You Assistant</p>
                  <p className="text-[10px] opacity-80">Online • Typically replies instantly</p>
                </div>
              </div>
              <button onClick={handleClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Content */}
            <div ref={scrollRef} className="h-[400px] overflow-y-auto p-4 space-y-4 bg-neutral-50/50">
              {step === 'initial' && (
                <>
                  {/* Bot Intro Message 1 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2"
                  >
                    <div className="w-6 h-6 bg-zinc-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-white/10">
                      <img src="https://www.vgotyou.com/assets/logo.png" alt="Bot" className="w-3.5 h-3.5 object-contain brightness-110" />
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-neutral-100 text-sm">
                      Hi 👋 I'm here to help you design and develop modern websites for your business!
                    </div>
                  </motion.div>

                  {/* Bot Intro Message 2 */}
                  <AnimatePresence>
                    {showIntro2 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2"
                      >
                        <div className="w-6 h-6 bg-zinc-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-white/10">
                          <img src="https://www.vgotyou.com/assets/logo.png" alt="Bot" className="w-3.5 h-3.5 object-contain brightness-110" />
                        </div>
                        <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-neutral-100 text-sm">
                          Serving India, UK & clients worldwide 🌍
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bot CTA Message */}
                  <AnimatePresence>
                    {showCTA && (
                      <>
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-start gap-2"
                        >
                          <div className="w-6 h-6 bg-zinc-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-white/10">
                            <img src="https://www.vgotyou.com/assets/logo.png" alt="Bot" className="w-3.5 h-3.5 object-contain brightness-110" />
                          </div>
                          <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-neutral-100 text-sm">
                            Get your website quote in seconds 🚀
                          </div>
                        </motion.div>

                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col gap-2 pl-8"
                        >
                          <button 
                            onClick={() => handleInitial('portfolio')}
                            className="w-full text-left p-3 rounded-xl border border-red-100 bg-white text-red-600 text-sm font-medium hover:bg-red-50 transition-colors flex items-center justify-between group"
                          >
                            View Portfolio
                            <ArrowRightIcon size={14} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                          <button 
                            onClick={() => handleInitial('quote')}
                            className="w-full text-left p-3 rounded-xl border border-red-600 bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-between group"
                          >
                            Get a Quote
                            <ArrowRightIcon size={14} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}

              {/* Step: Mobile */}
              {step !== 'initial' && (
                <>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-zinc-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-white/10">
                      <img src="https://www.vgotyou.com/assets/logo.png" alt="Bot" className="w-3.5 h-3.5 object-contain brightness-110" />
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-neutral-100 text-sm">
                      Great! Let's start with your mobile number so we can reach out.
                    </div>
                  </div>

                  {step === 'mobile' ? (
                    <div className="pl-8 space-y-2">
                      <div className="relative">
                        <input 
                          type="tel"
                          inputMode="tel"
                          placeholder="e.g. +91 98765 43210"
                          value={lead.mobile}
                          onChange={(e) => setLead({ ...lead, mobile: e.target.value })}
                          onKeyPress={(e) => e.key === 'Enter' && handleMobile()}
                          className="w-full p-3 rounded-xl border border-neutral-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-sm transition-all"
                          autoFocus
                        />
                        <button 
                          onClick={handleMobile}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <ArrowRightIcon size={16} />
                        </button>
                      </div>
                      {error && <p className="text-[10px] text-red-600 font-medium pl-1">{error}</p>}
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-end pr-2">
                        <div className="bg-red-600 text-white p-3 rounded-2xl rounded-tr-none text-sm shadow-sm">
                          {lead.mobile}
                        </div>
                      </div>
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2"
                      >
                        <div className="w-6 h-6 bg-zinc-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-white/10">
                          <img src="https://www.vgotyou.com/assets/logo.png" alt="Bot" className="w-3.5 h-3.5 object-contain brightness-110" />
                        </div>
                        <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-neutral-100 text-xs text-neutral-500 italic">
                          We’ll contact you on WhatsApp 👍
                        </div>
                      </motion.div>
                    </>
                  )}
                </>
              )}

              {/* Step: Project Type */}
              {['project', 'budget', 'final'].includes(step) && (
                <>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-zinc-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-white/10">
                      <img src="https://www.vgotyou.com/assets/logo.png" alt="Bot" className="w-3.5 h-3.5 object-contain brightness-110" />
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-neutral-100 text-sm">
                      What kind of project are you looking for?
                    </div>
                  </div>

                  {step === 'project' ? (
                    <div className="pl-8 grid grid-cols-1 gap-2">
                      {PROJECT_TYPES.map(type => (
                        <button 
                          key={type}
                          onClick={() => handleProjectType(type)}
                          className="text-left p-3 rounded-xl border border-neutral-200 bg-white text-sm hover:border-red-600 hover:text-red-600 transition-all"
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-end pr-2">
                      <div className="bg-red-600 text-white p-3 rounded-2xl rounded-tr-none text-sm shadow-sm">
                        {lead.projectType}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Step: Budget */}
              {['budget', 'final'].includes(step) && (
                <>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-zinc-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-white/10">
                      <img src="https://www.vgotyou.com/assets/logo.png" alt="Bot" className="w-3.5 h-3.5 object-contain brightness-110" />
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-neutral-100 text-sm">
                      What is your estimated budget? ({geo.country})
                    </div>
                  </div>

                  {step === 'budget' ? (
                    <div className="pl-8 space-y-6 py-4">
                      {/* Amount Tab Display */}
                      <div className="bg-black text-white rounded-2xl p-6 text-center shadow-2xl transform -rotate-1 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent opacity-50"></div>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em] mb-2 relative z-10">Estimated Budget</p>
                        <p className="text-4xl font-black relative z-10">
                          <span className="text-red-600 mr-1">{geo.currency_symbol || '$'}</span>
                          {(lead.budget || 0).toLocaleString()}
                        </p>
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-red-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                          <span>{geo.currency_symbol || '$'}{(geo.range?.min || 100).toLocaleString()}</span>
                          <span>{geo.currency_symbol || '$'}{(geo.range?.max || 2000).toLocaleString()}+</span>
                        </div>
                        <input 
                          type="range"
                          min={geo.range?.min || 100}
                          max={geo.range?.max || 2000}
                          step={geo.country_code === 'IN' ? 500 : 50}
                          value={lead.budget}
                          onChange={(e) => handleBudget(parseInt(e.target.value) || 0)}
                          onMouseUp={() => trackEvent('budget_selected', { budget: lead.budget })}
                          onTouchEnd={() => trackEvent('budget_selected', { budget: lead.budget })}
                          className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                        />
                        <p className="text-[10px] text-center text-neutral-400 font-medium italic">
                          {geo.country_code === 'IN' ? 'Most clients choose ₹5k–₹10k' : `Most clients choose ${geo.currency_symbol || '$'}${((geo.range?.min || 100) * 2).toLocaleString()}–${((geo.range?.min || 100) * 4).toLocaleString()}`}
                        </p>
                      </div>
                      <button 
                        onClick={submitLead}
                        disabled={isSubmitting}
                        className="w-full p-4 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-3 group disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <motion.div 
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Opening WhatsApp...
                          </span>
                        ) : (
                          <>
                            <span>Confirm & Send</span>
                            <ArrowRightIcon size={18} className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end pr-2">
                      <div className="bg-red-600 text-white p-3 rounded-2xl rounded-tr-none text-sm shadow-sm">
                        {geo.currency_symbol || '$'}{(lead.budget || 0).toLocaleString()}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Step: Final */}
              {step === 'final' && (
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-zinc-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-white/10">
                    <img src="https://www.vgotyou.com/assets/logo.png" alt="Bot" className="w-3.5 h-3.5 object-contain brightness-110" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-neutral-100 text-sm">
                    Thank you! Redirecting you to WhatsApp... If it doesn't open, please click the button below.
                    <button 
                      onClick={() => window.open(getWhatsAppUrl(), '_blank')}
                      className="mt-3 w-full p-2 rounded-lg border border-red-600 text-red-600 text-xs font-bold hover:bg-red-50 transition-all"
                    >
                      Open WhatsApp Again
                    </button>
                    <button 
                      onClick={resetChat}
                      className="mt-2 w-full text-center text-[10px] text-neutral-400 hover:text-neutral-600 underline"
                    >
                      Start Over
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-white border-t border-neutral-100 flex justify-center">
              <p className="text-[9px] text-neutral-400 uppercase tracking-[0.2em]">Powered by VGot You</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
