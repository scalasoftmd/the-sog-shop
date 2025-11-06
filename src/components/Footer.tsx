import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Visa, Mastercard, Paypal, Klarna, Applepay} from "react-pay-icons";
import { Link } from 'react-router-dom';

export default function Footer() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Typed footer data to ensure each item has a label (string) and optional path
  type FooterItem = { label: string; path?: string };
  type Section = { title: string; items: FooterItem[] };

  const sections: Section[] = [
    {
      title: 'FASHION',
      items: [
        { label: 'Men', path: '/fashion/men' },
        { label: 'Women', path: '/fashion/women' },
        { label: 'Kids', path: '/fashion/kids' },
      ],
    },
    {
      title: 'ABOUT US',
      items: [
        { label: 'About us', path: '/about' },
        { label: 'Visionary', path: '/visionary' },
        { label: 'Contacts', path: '/contacts' }
      ],
    },
  ];

  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-5">
        {/* Sections with links where routes exist */}
        <div className="grid grid-cols-1 md:flex md:justify-center md:px-50">
          {sections.map((section) => (
            <div key={section.title} className="md:col-span-1 md:px-20">
              <button
                className="font-bold mb-4 w-full text-left flex items-center justify-between md:hidden"
                onClick={() => toggleSection(section.title)}
              >
                {section.title}
                {expandedSections[section.title] ? (
                  <FaChevronUp className="ml-2" />
                ) : (
                  <FaChevronDown className="ml-2" />
                )}
              </button>
              <h4 className="font-bold mb-4 hidden md:block">{section.title}</h4>
              {expandedSections[section.title] || (
                typeof window !== 'undefined' && window.innerWidth >= 768
              ) ? (
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      {item.path ? (
                        <Link to={item.path} className="hover:underline">
                          {item.label}
                        </Link>
                      ) : (
                        <span>{item.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="flex justify-center items-center space-x-4 mt-12 mb-8">
          <Visa className="h-8" />
          <Mastercard className="h-8" />
          <Paypal className="h-8" />
          <Klarna className="h-8" />
          <Applepay className="h-8" />
        </div>

        {/* Legal Text */}
        <div className="text-center text-xs text-gray-400 mb-4">
          <p>*All prices include VAT plus shipping costs. **Free shipping within Germany - excluding islands</p>
          <p>***Our newsletter discount voucher is valid from a minimum order value of 100.- €</p>
          <p>© 2025 Portmedia GmbH / All rights reserved</p>
          
          {/* Legal Links */}
          <div className="mt-4 space-x-4">
            <Link to="/privacy-policy" className="hover:text-white underline">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link to="/cookies-info" className="hover:text-white underline">
              Cookies Info
            </Link>
            <span>|</span>
            <Link to="/impressum" className="hover:text-white underline">
              Impressum
            </Link>
          </div>
        </div>

        {/* Social Media Icons - adjusted to match Home.tsx */}
        <div className="flex justify-center space-x-6 mb-8">
          <a href="https://open.spotify.com/episode/7jxb7CnCFlPECEwfSwrUQj?si=l97dQeioT-ytIFqA7B6DVQ" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-spotify h-3 w-3 sm:h-4 sm:w-4 text-white hover:text-yellow-400"></i>
          </a>
          <a href="https://www.tiktok.com/@leadership.forum" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-tiktok h-3 w-3 sm:h-4 sm:w-4 text-white hover:text-yellow-400"></i>
          </a>
          <a href="https://www.youtube.com/@leadershipforum-eu" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube h-3 w-3 sm:h-4 sm:w-4 text-white hover:text-yellow-400"></i>
          </a>
        </div>

        {/* Sons of God Logo */}
        <div className="flex justify-center">
          <Link to="/">
            <img src="/assets/logo-white.png" alt="Sons of God" className="h-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
}