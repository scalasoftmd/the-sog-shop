import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'The SOG Shop - Premium Fashion & Lifestyle',
  description = 'Discover premium fashion and lifestyle products at The SOG Shop. Quality clothing for men, women, and kids.',
  keywords = 'fashion, clothing, lifestyle, premium, men, women, kids, shopping',
  image = '/og-image.jpg',
  url = 'https://the-sog.de',
  type = 'website'
}) => {
  const fullTitle = title.includes('The SOG Shop') ? title : `${title} | The SOG Shop`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMeta = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMeta('description', description);
    updateMeta('keywords', keywords);
    updateMeta('robots', 'index, follow');

    // Open Graph tags
    updateMeta('og:type', type, true);
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description, true);
    updateMeta('og:image', image, true);
    updateMeta('og:url', url, true);
    updateMeta('og:site_name', 'The SOG Shop', true);

    // Twitter Card tags
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // Structured data
    let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "The SOG Shop",
      "url": "https://the-sog.de",
      "logo": "https://the-sog.de/logo.png",
      "sameAs": [
        "https://facebook.com/thesogshop",
        "https://instagram.com/thesogshop",
        "https://twitter.com/thesogshop"
      ]
    });
  }, [fullTitle, description, keywords, image, url, type]);

  return null;
};

export default SEO;
