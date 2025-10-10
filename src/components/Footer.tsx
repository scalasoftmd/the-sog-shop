import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaYoutube, FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import { Visa, Mastercard, Paypal, Klarna, Applepay} from "react-pay-icons";

export default function Footer() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:flex md:justify-center md:px-50">
          {[
            { title: 'FASHION', items: ['Men', 'Women', 'Kids'] },
            { title: 'ABOUT US', items: ['Our Mission', 'The Movement', 'Contact'] },
          ].map((section) => (
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
                    <li key={item}>{item}</li>
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
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-8">
          <FaYoutube className="text-white text-2xl hover:text-gray-400 cursor-pointer" />
          <FaFacebookF className="text-white text-2xl hover:text-gray-400 cursor-pointer" />
          <FaInstagram className="text-white text-2xl hover:text-gray-400 cursor-pointer" />
          <FaTiktok className="text-white text-2xl hover:text-gray-400 cursor-pointer" />
        </div>

        {/* Sons of God Logo */}
        <div className="flex justify-center">
          <img src="/assets/logo-white.png" alt="Sons of God" className="h-6" />
        </div>
      </div>
    </footer>
  );
}