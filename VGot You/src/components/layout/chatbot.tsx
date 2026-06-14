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

  const trackEvent = useCallback((eventName: string, data?: any) => {
    console.log(`[Analytics] ${eventName}`, data);
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, data);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const [showIntro2, setShowIntro2] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    if (isOpen) trackEvent('chatbot_opened');
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
    return saved ? JSON.parse(saved) : { mobile: '', projectType: '', budget: 0 };
  });

  useEffect(() => {
    localStorage.setItem('chatbot_lead_cache', JSON.stringify(lead));
  }, [lead]);

  const [error, setError] = useState('');
  const geo = useGeoLocation();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [step, error]);

  const validateMobile = (mobile: string) => {
    let clean = mobile.replace(/[\s\-\(\)\+]/g, '');
    if (clean.length < 10 || clean.length > 15) return false;
    if (/^(\d)\1+$/.test(clean)) return false;
    if ("1234567890876543210".includes(clean)) return false;
    const uniqueDigits = new Set(clean.split('')).size;
    if (uniqueDigits < 3) return false;
    if (geo.country_code === 'IN') {
      if (clean.startsWith('91') && clean.length === 12) clean = clean.substring(2);
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
    let defaultBudget = 0;
    if (geo.country_code === 'IN') {
      defaultBudget = 5000;
    } else {
      const min = geo.range?.min || 100;
      const max = geo.range?.max || 2000;
      defaultBudget = typeof geo.default === 'number' ? geo.default : Math.floor((min + max) / 2);
    }
    const updated = { ...lead, projectType: type };
    setLead(updated);
    submitLead(updated);
  };

  const handleBudget = (val: number) => {
    if (val > 0) setLead({ ...lead, budget: val });
  };

  const getWhatsAppUrl = (currentLead = lead) => {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "917871120415";
    const country = geo.country || 'Global';
    const message = `*New Lead from Website*\n\n*Mobile:* ${currentLead.mobile}\n*Project:* ${currentLead.projectType}\n*Country:* ${country}`;
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

  const submitLead = (currentLead?: LeadData | React.MouseEvent<HTMLButtonElement>) => {
    const finalLead = (currentLead && 'mobile' in currentLead) ? currentLead : lead;
    trackEvent("lead_submitted", { mobile: finalLead.mobile, project: finalLead.projectType, country: geo.country });
    setIsSubmitting(true);

    const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "091214e0-3412-4907-b547-3299b2e7ec3a";
    const country = geo.country || 'Global';

    if (web3formsKey && web3formsKey !== "YOUR_WEB3FORMS_ACCESS_KEY") {
      const formData = new FormData();
      formData.append("access_key", web3formsKey);
      formData.append("subject", `New Lead: ${finalLead.projectType}`);
      formData.append("mobile", finalLead.mobile);
      formData.append("project_type", finalLead.projectType);
      formData.append("country", country);
      formData.append("from_name", "VGot You Chatbot");
      fetch("https://api.web3forms.com/submit", { method: "POST", body: formData }).catch(err => console.error("Email send failed:", err));
    }

    setTimeout(() => {
      trackEvent('whatsapp_opened', { project: finalLead.projectType, country: geo.country });
      window.open(getWhatsAppUrl(finalLead), '_blank');
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
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  key="tooltip"
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="hidden sm:flex absolute bottom-full right-0 mb-3 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-[10px] shadow-lg border border-neutral-200/80 whitespace-nowrap items-center gap-2"
                >
                  <span className="text-xs font-medium text-neutral-800">Need help? Chat with us!</span>
                  <motion.span
                    animate={{ rotate: [0, 20, 0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="text-yellow-500 text-lg inline-block"
                  >
                    👋
                  </motion.span>
                  <div className="absolute top-full right-6 w-2.5 h-2.5 bg-white border-r border-b border-neutral-200/80 rotate-45 -translate-y-1.5"></div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                scale: { duration: 0.3, type: "spring", stiffness: 260, damping: 20 },
                opacity: { duration: 0.2 },
                y: { type: "spring", stiffness: 300, damping: 15 }
              }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setIsOpen(true)}
              className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-all duration-300 relative z-10"
              aria-label="Chat with us"
            >
              {/* Ripple Glow effect behind the transparent icon */}
              <motion.div
                className="absolute w-full h-full rounded-full bg-red-500/15 dark:bg-red-500/10 pointer-events-none z-0"
                animate={{
                  scale: [1, 1.6],
                  opacity: [0.6, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
              <motion.div
                className="absolute w-full h-full rounded-full bg-red-500/10 dark:bg-red-500/5 pointer-events-none z-0"
                animate={{
                  scale: [1, 1.3],
                  opacity: [0.4, 0]
                }}
                transition={{
                  duration: 3,
                  delay: 1.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />

              {/* Gently Shaking & Glowing Brand Icon */}
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 10, 0, 0, 0, 0, 0],
                  scale: [1, 1.1, 1.1, 1.1, 1.1, 1, 1, 1, 1, 1],
                  filter: [
                    "drop-shadow(0 0 2px rgba(220, 38, 38, 0.2))",
                    "drop-shadow(0 0 10px rgba(220, 38, 38, 0.7))",
                    "drop-shadow(0 0 10px rgba(220, 38, 38, 0.7))",
                    "drop-shadow(0 0 10px rgba(220, 38, 38, 0.7))",
                    "drop-shadow(0 0 10px rgba(220, 38, 38, 0.7))",
                    "drop-shadow(0 0 2px rgba(220, 38, 38, 0.2))",
                    "drop-shadow(0 0 2px rgba(220, 38, 38, 0.2))",
                    "drop-shadow(0 0 2px rgba(220, 38, 38, 0.2))",
                    "drop-shadow(0 0 2px rgba(220, 38, 38, 0.2))",
                    "drop-shadow(0 0 2px rgba(220, 38, 38, 0.2))"
                  ]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10 flex items-center justify-center p-2 rounded-full"
              >
                <MessageSquareIcon size={24} className="sm:w-7 sm:h-7" />
              </motion.div>
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-[340px] sm:w-[380px] bg-white rounded-[16px] shadow-2xl overflow-hidden border border-neutral-200/80"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-500 px-4 py-3 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                {step !== 'initial' && (
                  <button
                    onClick={handleBack}
                    className="p-1 -ml-1 hover:bg-white/15 rounded-full transition-colors"
                    aria-label="Go back"
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                )}
                <div className="w-8 h-8 bg-zinc-950 border border-white/10 rounded-full flex items-center justify-center shadow-md">
                  <img src="https://www.vgotyou.com/assets/logo.png" alt="VGot You" className="w-5 h-5 object-contain brightness-110" />
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-semibold">VGot You Assistant</p>
                  <p className="text-[10px] text-white/80">Online • Typically replies instantly</p>
                </div>
              </div>
              <button onClick={handleClose} className="p-1 hover:bg-white/15 rounded-full transition-colors">
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Content */}
            <div ref={scrollRef} className="h-[440px] overflow-y-auto p-4 space-y-4 bg-neutral-50/40">
              {step === 'initial' && (
                <>
                  <ChatMessage
                    avatar="https://www.vgotyou.com/assets/logo.png"
                    text="Hi 👋 I'm here to help you design and develop modern websites for your business!"
                    delay={0}
                  />
                  <AnimatePresence>
                    {showIntro2 && (
                      <ChatMessage
                        avatar="https://www.vgotyou.com/assets/logo.png"
                        text="Serving India, UK & clients worldwide 🌍"
                        delay={0.1}
                      />
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {showCTA && (
                      <>
                        <ChatMessage
                          avatar="https://www.vgotyou.com/assets/logo.png"
                          text="Get your website quote in seconds 🚀"
                          delay={0.2}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.4 }}
                          className="flex flex-col gap-2 pl-8"
                        >
                          <ChoiceButton
                            onClick={() => handleInitial('portfolio')}
                            label="View Portfolio"
                            variant="outline"
                          />
                          <ChoiceButton
                            onClick={() => handleInitial('quote')}
                            label="Get a Quote"
                            variant="solid"
                          />
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}

              {step !== 'initial' && (
                <>
                  <ChatMessage
                    avatar="https://www.vgotyou.com/assets/logo.png"
                    text="Great! Let's start with your mobile number so we can reach out."
                  />

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
                          className="w-full p-3 rounded-[12px] border border-neutral-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-sm transition-all bg-white"
                          autoFocus
                        />
                        <button
                          onClick={handleMobile}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-red-600 text-white rounded-[10px] hover:bg-red-700 transition-colors"
                        >
                          <ArrowRightIcon size={16} />
                        </button>
                      </div>
                      {error && <p className="text-[10px] text-red-600 font-medium pl-1">{error}</p>}
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-end pr-2">
                        <div className="bg-red-600 text-white p-3 rounded-[16px] rounded-tr-none text-sm shadow-sm max-w-[85%] break-words">
                          {lead.mobile}
                        </div>
                      </div>
                      <ChatMessage
                        avatar="https://www.vgotyou.com/assets/logo.png"
                        text="We’ll contact you on WhatsApp 👍"
                        isItalic
                      />
                    </>
                  )}
                </>
              )}

              {['project', 'budget', 'final'].includes(step) && (
                <>
                  <ChatMessage
                    avatar="https://www.vgotyou.com/assets/logo.png"
                    text="What kind of project are you looking for?"
                  />
                  {step === 'project' ? (
                    <div className="pl-8 grid grid-cols-1 gap-2">
                      {PROJECT_TYPES.map(type => (
                        <ChoiceButton
                          key={type}
                          onClick={() => handleProjectType(type)}
                          label={type}
                          variant="outline"
                          fullWidth
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-end pr-2">
                      <div className="bg-red-600 text-white p-3 rounded-[16px] rounded-tr-none text-sm shadow-sm">
                        {lead.projectType}
                      </div>
                    </div>
                  )}
                </>
              )}

              {step === 'budget' && (
                <>
                  <ChatMessage
                    avatar="https://www.vgotyou.com/assets/logo.png"
                    text={`What is your estimated budget? (${geo.country})`}
                  />
                  {step === 'budget' ? (
                    <div className="pl-8 space-y-5 py-2">
                      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white rounded-[16px] p-5 text-center shadow-md relative overflow-hidden">
                        <div className="absolute inset-0 bg-red-600/10 blur-xl"></div>
                        <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-[0.2em] mb-1 relative">Estimated Budget</p>
                        <p className="text-3xl font-black relative">
                          <span className="text-red-400 mr-1">{geo.currency_symbol || '$'}</span>
                          {(lead.budget || 0).toLocaleString()}
                        </p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
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
                          className="w-full h-2 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-red-600"
                        />
                        <p className="text-[10px] text-center text-neutral-500 italic">
                          {geo.country_code === 'IN'
                            ? 'Most clients choose ₹5k–₹10k'
                            : `Most clients choose ${geo.currency_symbol || '$'}${((geo.range?.min || 100) * 2).toLocaleString()}–${((geo.range?.min || 100) * 4).toLocaleString()}`}
                        </p>
                      </div>
                      <button
                        onClick={submitLead}
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-[12px] bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-all shadow-md shadow-red-600/20 flex items-center justify-center gap-2 group disabled:opacity-70"
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
                            <ArrowRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end pr-2">
                      <div className="bg-red-600 text-white p-3 rounded-[16px] rounded-tr-none text-sm shadow-sm">
                        {geo.currency_symbol || '$'}{(lead.budget || 0).toLocaleString()}
                      </div>
                    </div>
                  )}
                </>
              )}

              {step === 'final' && (
                <ChatMessage
                  avatar="https://www.vgotyou.com/assets/logo.png"
                  text={
                    <>
                      Thank you! Redirecting you to WhatsApp... If it doesn't open, please click the button below.
                      <button
                        onClick={() => window.open(getWhatsAppUrl(), '_blank')}
                        className="mt-3 w-full py-2 rounded-[10px] border border-red-600 text-red-600 text-xs font-medium hover:bg-red-50 transition-all"
                      >
                        Open WhatsApp Again
                      </button>
                      <button
                        onClick={resetChat}
                        className="mt-2 w-full text-center text-[10px] text-neutral-400 hover:text-neutral-600 underline"
                      >
                        Start Over
                      </button>
                    </>
                  }
                />
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-white border-t border-neutral-200/60 flex justify-center">
              <p className="text-[9px] text-neutral-400 uppercase tracking-[0.2em] font-medium">Powered by VGot You</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Subcomponents for cleaner code
const ChatMessage: React.FC<{
  avatar: string;
  text: string | React.ReactNode;
  delay?: number;
  isItalic?: boolean;
}> = ({ avatar, text, delay = 0, isItalic }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3 }}
    className="flex items-start gap-2"
  >
    <div className="w-6 h-6 bg-neutral-800 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-white/10">
      <img src={avatar} alt="Bot" className="w-3.5 h-3.5 object-contain" />
    </div>
    <div className={`bg-white p-3 rounded-[16px] rounded-tl-none shadow-sm border border-neutral-200/80 text-sm ${isItalic ? 'text-neutral-500 italic text-xs' : ''}`}>
      {text}
    </div>
  </motion.div>
);

const ChoiceButton: React.FC<{
  onClick: () => void;
  label: string;
  variant: 'solid' | 'outline';
  fullWidth?: boolean;
}> = ({ onClick, label, variant, fullWidth }) => (
  <button
    onClick={onClick}
    className={`text-left px-4 py-3 rounded-[12px] text-sm font-medium transition-all flex items-center justify-between group ${
      variant === 'solid'
        ? 'bg-red-600 text-white hover:bg-red-700 shadow-sm'
        : 'border border-neutral-200 bg-white text-neutral-700 hover:border-red-400 hover:text-red-600'
    } ${fullWidth ? 'w-full' : 'w-full'}`}
  >
    <span>{label}</span>
    <ArrowRightIcon size={14} className="group-hover:translate-x-0.5 transition-transform" />
  </button>
);