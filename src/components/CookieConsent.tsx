import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface CookieConsentProps {
  onAccept: () => void;
  onReject: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept, onReject }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consentGiven = localStorage.getItem('cookie-consent');
    if (!consentGiven) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    onAccept();
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setIsVisible(false);
    onReject();
  };

  const handleClose = () => {
    // Treat close as reject
    handleReject();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4" style={{ background: 'rgba(0, 0, 0, 0.8)' }}>
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-3 relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close cookie consent"
        >
          <X size={16} />
        </button>
        
        <div className="pr-6">
          <h3 className="text-base font-bold mb-1 text-gray-900">
            We Value Your Privacy
          </h3>
          
          <p className="text-gray-700 mb-2 text-xs leading-relaxed">
            We use cookies to enhance your browsing experience and analyze website traffic. 
            This helps us improve our website and provide you with better content.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 mb-1">
            <button
              onClick={handleReject}
              className="border border-gray-300 text-gray-700 px-3 py-1.5 rounded font-medium hover:bg-gray-50 transition-colors flex-1 text-xs cursor-pointer"
            >
              Reject Non-Essential
            </button>
            <button
              onClick={handleAccept}
              className="bg-black text-white px-3 py-1.5 rounded font-medium hover:bg-gray-800 transition-colors flex-1 text-xs cursor-pointer"
            >
              Accept All Cookies
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Essential cookies are always enabled for basic functionality. 
            <a href="/privacy-policy" className="underline hover:text-gray-700 ml-1">Privacy Policy</a> | 
            <a href="/cookies-info" className="underline hover:text-gray-700 ml-1">Cookies Info</a> | 
            <a href="/impressum" className="underline hover:text-gray-700 ml-1">Impressum</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
