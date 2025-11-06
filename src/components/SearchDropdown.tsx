import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';

const apiUrl = import.meta.env.VITE_API_URL;

interface Product {
  id: number;
  itemId: number;
  name: string;
  images?: Array<{ url: string }>;
  variationSalesPrices?: Array<{ price: number }>;
  variationCategories?: Array<{ categoryId: number }>;
}

interface SearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ isOpen, onClose, isMobile = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const searchProducts = async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/search?q=${encodeURIComponent(query)}&itemsPerPage=6`);
      const data = await response.json();
      setSearchResults(data.entries || []);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchProducts(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const getProductUrl = (product: Product) => {
    const categoryId = product.variationCategories?.[0]?.categoryId;
    let gender = 'men'; // default
    
    if (categoryId === 100) gender = 'women';
    else if (categoryId === 101) gender = 'kids';
    
    return `/fashion/${gender}/${product.itemId}`;
  };

  const handleProductClick = (product: Product) => {
    navigate(getProductUrl(product));
    setSearchQuery('');
    setShowResults(false);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleProductClick(searchResults[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`${isMobile ? 'block' : 'hidden'} md:flex md:flex-1 items-center justify-center`}>
      <div ref={searchRef} className="relative w-full md:w-[50%]">
        <form onSubmit={handleSubmit}>
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            ref={inputRef}
            type="text"
            placeholder="What are you looking for?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-10 py-2 bg-white text-black focus:outline-none"
          />
          {isMobile && (
            <button
              onClick={onClose}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
              type="button"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </form>

        {/* Search Results Dropdown */}
        {showResults && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg max-h-96 overflow-y-auto z-50">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">Searching...</div>
            ) : searchResults.length > 0 ? (
              <div className="py-2">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded mr-3 flex-shrink-0">
                      {product.images?.[0]?.url ? (
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        €{product.variationSalesPrices?.[0]?.price?.toFixed(2) || '0.00'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery.length >= 2 ? (
              <div className="p-4 text-center text-gray-500">
                No products found for "{searchQuery}"
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDropdown;
