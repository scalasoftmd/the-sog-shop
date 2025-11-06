import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Loader from '../components/Loader';

const apiUrl = import.meta.env.VITE_API_URL;

interface Product {
  id: number;
  itemId: number;
  name: string;
  images?: Array<{ url: string }>;
  variationSalesPrices?: Array<{ price: number }>;
  variationCategories?: Array<{ categoryId: number }>;
}

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);

  const fetchSearchResults = async (searchQuery: string, page: number = 1) => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/search?q=${encodeURIComponent(searchQuery)}&page=${page}&itemsPerPage=12`);
      const data = await response.json();
      
      setProducts(data.entries || []);
      setTotalPages(data.lastPageNumber || 1);
      setTotalEntries(data.totalsCount || 0);
    } catch (error) {
      console.error('Search error:', error);
      setProducts([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (query) {
      fetchSearchResults(query, currentPage);
    }
  }, [query, currentPage]);

  const getProductUrl = (product: Product) => {
    const categoryId = product.variationCategories?.[0]?.categoryId;
    let gender = 'men'; // default
    
    if (categoryId === 100) gender = 'women';
    else if (categoryId === 101) gender = 'kids';
    
    return `/fashion/${gender}/${product.itemId}`;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEO 
        title={`Search Results for "${query}"`}
        description={`Search results for ${query} at The SOG Shop`}
        url={`https://the-sog.de/search?q=${encodeURIComponent(query)}`}
      />
      
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Search Results</h1>
          <p className="text-gray-600">
            {isLoading ? 'Searching...' : `${totalEntries} results found for "${query}"`}
          </p>
        </div>

        {isLoading && <Loader />}

        {!isLoading && products.length === 0 && query && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">No products found</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find any products matching "{query}". Try different keywords or browse our categories.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/fashion/men" className="bg-black text-white px-6 py-2 hover:bg-gray-800">
                Shop Men
              </Link>
              <Link to="/fashion/women" className="bg-black text-white px-6 py-2 hover:bg-gray-800">
                Shop Women
              </Link>
              <Link to="/fashion/kids" className="bg-black text-white px-6 py-2 hover:bg-gray-800">
                Shop Kids
              </Link>
            </div>
          </div>
        )}

        {!isLoading && products.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {products.map((product) => (
                <div key={product.id} className="group">
                  <Link to={getProductUrl(product)} className="block">
                    <div className="aspect-square bg-gray-100 mb-4 overflow-hidden">
                      {product.images?.[0]?.url ? (
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <h3 className="font-medium text-sm mb-2 group-hover:text-gray-600">
                      {product.name}
                    </h3>
                    <p className="text-lg font-semibold">
                      €{product.variationSalesPrices?.[0]?.price?.toFixed(2) || '0.00'}
                    </p>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 border ${
                        currentPage === page
                          ? 'bg-black text-white border-black'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Search;
