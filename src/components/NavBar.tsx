import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBagIcon as ShoppingBagIconSolid, Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const apiUrl = import.meta.env.VITE_API_URL;

interface SearchResult {
  id: number;
  name: string;
  price: string;
  image: string;
  itemId: number;
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const [bagCount, setBagCount] = useState<number>(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const updateBagCount = () => {
      const bag = JSON.parse(localStorage.getItem("bag") || "[]");
      setBagCount(bag.length);
    };
    updateBagCount();
    window.addEventListener("bagUpdated", updateBagCount);
    return () => window.removeEventListener("bagUpdated", updateBagCount);
  }, []);

  // Handle click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchProducts = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`${apiUrl}/search?q=${encodeURIComponent(query.trim())}&itemsPerPage=5`);
      const data = await response.json();
      
      const mappedResults: SearchResult[] = (data.entries || []).map((item: any) => ({
        id: item.id,
        itemId: item.id, // Use the item ID directly
        name: item.texts?.[0]?.name1 || 'Product Name',
        price: '', // Remove price from search results
        image: item.itemImages?.[0]?.url || '/assets/placeholder.png' // Use itemImages instead of images
      }));

      setSearchResults(mappedResults);
      setShowResults(mappedResults.length > 0);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setShowResults(false);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Debounce search API call
    debounceRef.current = setTimeout(() => {
      searchProducts(query);
    }, 300);
  };

  const handleResultClick = (itemId: number) => {
    navigate(`/product/${itemId}`);
    setShowResults(false);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const toggleMenu = (menu: string) => {
    setExpandedMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
      setShowResults(false);
    }
  };

  const menuItems = [
    { title: 'Start', link: '/' },
    { title: 'Fashion', link: '/fashion', subItems: ['Men', 'Women', 'Kids'] },
    // { title: 'Visionary', link: '/visionary' },
    { title: 'About us', link: '/about' },
    { title: 'Contacts', link: '/contacts' },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* <div className="bg-white text-black text-center text-[10px] md:text-[9px] font-semibold tracking-wide h-auto md:h-6 flex flex-col md:flex-row items-center justify-center">
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
      </div> */}
      
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
          <div ref={searchRef} className="relative w-full md:w-[50%]">
            <form onSubmit={handleSearch}>
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onFocus={() => searchQuery.trim() && setShowResults(true)}
                className="w-full px-10 py-2 bg-white text-black focus:outline-none"
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setShowResults(false);
                  setSearchQuery('');
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black md:hidden"
                type="button"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </form>

            {/* Search Results Dropdown */}
            {showResults && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg max-h-80 overflow-y-auto z-50">
                {isSearching ? (
                  <div className="p-4 text-center text-gray-500">Searching...</div>
                ) : searchResults.length > 0 ? (
                  <>
                    {searchResults.map((result) => (
                      <div
                        key={result.id}
                        onClick={() => handleResultClick(result.itemId)}
                        className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <img
                          src={result.image}
                          alt={result.name}
                          className="w-16 h-20 object-cover rounded mr-3"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {result.name}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="p-4 text-center text-gray-500">No results found</div>
                )}
              </div>
            )}
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
                  <Link to={item.link} className="flex-1 max-w-[150px]" onClick={() => setIsMobileMenuOpen(false)}>
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