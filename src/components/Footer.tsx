import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function Footer() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-5">
        {/* <div className="text-left mb-16">
          <h4 className="font-bold mb-4">Get Connected</h4>
          <div className="flex space-x-4">
            <FaFacebook className="text-white text-2xl hover:text-gray-400" />
            <FaInstagram className="text-white text-2xl hover:text-gray-400" />
            <FaYoutube className="text-white text-2xl hover:text-gray-400" />
          </div>
        </div> */}
        <div className="grid grid-cols-1 md:flex md:justify-center md:px-50">
          {[
            { title: 'FASHION', items: ['Men', 'Women', 'Kids'] },
            // { title: 'MERCHANDISE', items: ['Accessories', 'Home & Living', 'Gifts & Bundles'] },
            // { title: 'BOOKS', items: ['Faith & Inspiration', 'Study & Theology', 'Kids & Youth'] },
            // { title: 'TRAINING', items: ['Online Courses', 'Workshops', 'Certifications'] },
            // { title: 'EVENTS', items: ['Upcoming Events', 'Tickets', 'Past Highlights / Media'] },
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
      </div>
    </footer>
  );
}