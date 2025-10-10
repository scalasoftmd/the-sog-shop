import { Link } from 'react-router-dom';
import { ShoppingBagIcon as ShoppingBagIconSolid, Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const [bagCount, setBagCount] = useState<number>(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const updateBagCount = () => {
      const bag = JSON.parse(localStorage.getItem("bag") || "[]");
      setBagCount(bag.length);
    };
    updateBagCount();
    window.addEventListener("bagUpdated", updateBagCount);
    return () => window.removeEventListener("bagUpdated", updateBagCount);
  }, []);

  const toggleMenu = (menu: string) => {
    setExpandedMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const menuItems = [
    { title: 'Start', link: '/' },
    { title: 'Fashion', link: '/fashion', subItems: ['Men', 'Women', 'Kids'] },
    { title: 'About', link: '/about' },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="bg-white text-black text-center text-[10px] md:text-[9px] font-semibold tracking-wide h-auto md:h-6 flex flex-col md:flex-row items-center justify-center">
        <span className="block md:inline px-2 md:px-0">
          WELCOME TO THE SONS OF GOD
        </span>
        <span className="block md:inline px-2 md:px-0">
          &nbsp; - Get{" "}
          <span className="font-bold">15% OFF</span>{" "}
          with code{" "}
          <span className="font-bold">RISE20</span>{" "}
          -{" "}
          <a href="#" className="underline hover:text-yellow-600">
            Shop Now!
          </a>
        </span>
      </div>
      
      <header className="left-0 w-full bg-black z-50 flex items-center justify-between px-8 h-14">
        <div className="flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-white" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {!isSearchOpen && (
          <div className="flex-none ml-8">
            <Link to="/">
              <img src="/assets/logo-white.png" alt="Logo" className="h-5" />
            </Link>
          </div>
        )}

        <div className={`md:flex-1 ${isSearchOpen ? 'block' : 'hidden'} md:flex items-center justify-center`}>
          <div className="relative w-full md:w-[50%]">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full px-10 py-2 bg-white text-black focus:outline-none"
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black md:hidden"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="hidden md:flex mr-8 md:w-[150px]"></div>

        <div className="flex items-center gap-3">
          {!isSearchOpen && (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="cursor-pointer md:hidden"
            >
              <MagnifyingGlassIcon className="h-6 w-6 text-white" />
            </button>
          )}
          <Link to="/bag" className="relative">
            <ShoppingBagIconSolid className="h-6 w-6 text-white hover:text-yellow-400" />
            {bagCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-yellow-400 text-black px-[7px] py-0.5 rounded-full text-xs font-bold">
                {bagCount}
              </span>
            )}
          </Link>
        </div>

        <div
          className={`absolute top-0 left-0 h-screen w-[85vw] md:w-[30vw] bg-black text-white flex flex-col items-center gap-4 py-4 z-50 transition-transform transform ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } duration-300`}
        >
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
            <span className="text-white uppercase text-lg font-bold">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="cursor-pointer"
            >
              <XMarkIcon className="h-8 w-8 text-white" />
            </button>
          </div>
          <div className="flex flex-col justify-center h-full w-full">
            {menuItems.map((item) => (
              <div key={item.title}>
                <div className="hover:text-yellow-400 uppercase py-4 text-left pl-6 text-lg flex items-center justify-start">
                  <Link to={item.link} className="flex-1 max-w-[100px]" onClick={() => setIsMobileMenuOpen(false)}>
                    {item.title}
                  </Link>
                  {item.subItems && (
                    <span
                      className="ml-10 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu(item.title);
                      }}
                    >
                      {expandedMenus[item.title] ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  )}
                </div>
                {item.subItems && expandedMenus[item.title] && (
                  <div className="pl-10">
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
      </header>
    </div>
  );
}