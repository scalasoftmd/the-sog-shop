import { useState, useEffect } from 'react';

export const useCookieConsent = () => {
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    setConsentGiven(consent === 'accepted');
  }, []);

  const giveConsent = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setConsentGiven(true);
    // Enable Google Analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
  };

  const revokeConsent = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setConsentGiven(false);
    // Disable Google Analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      });
    }
  };

  const hasConsented = () => {
    return localStorage.getItem('cookie-consent') === 'accepted';
  };

  return {
    consentGiven,
    giveConsent,
    revokeConsent,
    hasConsented
  };
};
