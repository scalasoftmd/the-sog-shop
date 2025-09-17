import { Link } from 'react-router-dom';
import { UserIcon as UserIconSolid, HeartIcon as HeartIconSolid, ShoppingBagIcon as ShoppingBagIconSolid, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (menu: string) => {
    setExpandedMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const menuItems = [
    { title: 'Start', link: '/' },
    { title: 'Fashion', link: '/fashion', subItems: ['Men', 'Women', 'Kids', 'Collections'] },
    // { title: 'Merchandise', link: '/merchandise', subItems: ['Accessories', 'Home & Living', 'Gifts & Bundles'] },
    { title: 'Books', link: '/books', subItems: ['Faith & Inspiration', 'Study & Theology', 'Kids & Youth'] },
    // { title: 'Training', link: '/training', subItems: ['Online Courses', 'Workshops', 'Certifications'] },
    { title: 'Events', link: '/events', subItems: ['Upcoming Events', 'Tickets', 'Past Highlights / Media'] },
    { title: 'About', link: '/about' },
  ];

  return (
    <header className="flex items-center bg-black px-8 h-14">
      {/* Hamburger Menu Button */}
      <div className="flex md:hidden items-center mr-auto">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6 text-white" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-white" />
          )}
        </button>
      </div>
      {/* Logo Center */}
      <div className="flex-none">
        <Link to="/">
          <img src="/assets/logo.png" alt="Logo" className="h-5" />
        </Link>
      </div>
      {/* Shopping Bag Right */}
      <div className="flex-none flex items-center ml-auto md:hidden">
        <Link to="/cart">
          <ShoppingBagIconSolid className="h-4 w-4 text-white hover:text-yellow-400" />
        </Link>
      </div>
      {/* Menu Center */}
      <nav className="flex-1 hidden md:flex justify-center">
        <div className="flex gap-12 font-roboto uppercase text-white font-medium tracking-widest text-xs">
          {menuItems.map((item) => (
            <Link key={item.title} to={item.link} className="hover:text-yellow-400">
              {item.title}
            </Link>
          ))}
        </div>
      </nav>
      {/* Mobile Menu */}
      <div
        className={`absolute top-0 left-0 h-full w-[85vw] bg-black text-white flex flex-col items-center gap-4 py-4 md:hidden z-50 transition-transform transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} duration-300`}
      >
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
          <span className="text-white uppercase text-lg font-bold">Menu</span>
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <XMarkIcon className="h-8 w-8 text-white" />
          </button>
        </div>
        <div className="flex flex-col justify-center h-full w-full">
          {menuItems.map((item) => (
            <div key={item.title} className="w-full">
              <button
                className="hover:text-yellow-400 uppercase py-4 text-left pl-6 text-lg w-50 flex items-center justify-between"
                onClick={() => item.subItems ? toggleMenu(item.title) : setIsMobileMenuOpen(false)}
              >
                <Link to={item.link} className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                  {item.title}
                </Link>
                {item.subItems && (
                  expandedMenus[item.title] ? (
                    <FaChevronUp className="ml-2" />
                  ) : (
                    <FaChevronDown className="ml-2" />
                  )
                )}
              </button>
              {item.subItems && expandedMenus[item.title] && (
                <div className="pl-8">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem}
                      to={`${item.link}/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block py-2 text-left hover:text-yellow-400"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {subItem}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Icons Right */}
      <div className="flex-none hidden md:flex items-center gap-6 ml-8">
        <Link to="/account">
          <UserIconSolid className="h-4 w-4 text-white hover:text-yellow-400" />
        </Link>
        <Link to="/favorites">
          <HeartIconSolid className="h-4 w-4 text-white hover:text-yellow-400" />
        </Link>
        <Link to="/cart">
          <ShoppingBagIconSolid className="h-4 w-4 text-white hover:text-yellow-400" />
        </Link>
      </div>
    </header>
  );
}