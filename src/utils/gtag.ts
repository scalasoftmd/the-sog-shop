export const GA_TRACKING_ID = 'G-CJ92VYF5RP'
export const isProduction = process.env.NODE_ENV === 'production'

// Check if user has consented to cookies
const hasConsent = () => {
  return localStorage.getItem('cookie-consent') === 'accepted';
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (isProduction && window.gtag && hasConsent()) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (isProduction && window.gtag && hasConsent()) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Initialize consent mode
export const initConsent = () => {
  if (window.gtag) {
    window.gtag('consent', 'default', {
      analytics_storage: 'denied'
    });
  }
};

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}
