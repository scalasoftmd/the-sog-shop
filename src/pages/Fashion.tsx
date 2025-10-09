import { useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight, FiCreditCard, FiTruck, FiGlobe } from 'react-icons/fi'; // Added icons for features
import ProductItem from '../components/ProductItem';
import Loader from '../components/Loader';
import FilterSort from '../components/FilterSort';

interface ProductImage {
  publicUrl: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  images: ProductImage[];
}

const apiUrl = import.meta.env.VITE_API_URL;

interface FashionProps {
  category?: string;
}

const Fashion = ({ category }: FashionProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSort, setCurrentSort] = useState<string>('price-asc');
  const [currentView, setCurrentView] = useState<'grid' | 'list' | '1' | '2' | '3' | '4' | '5'>(
    window.innerWidth >= 768 ? '3' : '1' // Default to '3' (3x3) for desktop and '1' (1x9) for mobile
  ); 
  const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth >= 768 ? 9 : 9); // Default items per page: 9 for both views

  const fetchProducts = useCallback(async (page: number, itemsPerPage: number) => {
    setIsLoading(true);
    try {
      const endpoint = category ? `/variations/${category}` : '/variations';
      const res = await fetch(`${apiUrl}${endpoint}?page=${page}&itemsPerPage=${itemsPerPage}`);
      const data = await res.json();
      const mappedProducts: Product[] = (data.entries || []).map((variation: any) => {
        if (!variation.isMain || !variation.item) return null;
        const item = variation.item;
        const title = variation.name;
        const price = variation.variationSalesPrices?.[0]?.price || variation.purchasePrice || 0;
        const images: ProductImage[] = Array.isArray(variation.images)
          ? variation.images.map((img: any) => ({
              publicUrl: img.url || '',
            }))
          : [];
        return {
          id: item.id?.toString() || '',
          title,
          price,
          images,
        };
      }).filter(Boolean);

      setProducts(mappedProducts);
      setHasMore(!data.isLastPage && mappedProducts.length > 0);
    } catch (err) {
      console.error('Error fetching products:', err);
      setHasMore(false);
    }
    setIsLoading(false);
  }, [category]);

  useEffect(() => {
    setProducts([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchProducts(1, itemsPerPage);
  }, [fetchProducts, itemsPerPage]);

  useEffect(() => {
    if (currentPage === 1) return;
    fetchProducts(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage, fetchProducts]);

  const handleFilterChange = (filterType: string, value: string) => {
    console.log(`Filter changed: ${filterType} = ${value}`);
    // Update state or fetch products based on filter
  };

  const handleSortChange = (value: string) => {
    setCurrentSort(value);
    // Update sorting logic
  };

  const handleViewChange = (viewType: 'grid' | 'list' | '1' | '2' | '3' | '4' | '5') => {
    setCurrentView(viewType);
    const itemsPerPageMap: { [key: string]: number } = {
      '1': 9, // Mobile default: 1x9
      '2': 8,
      '3': 9, // Desktop default: 3x3
      '4': 16,
      '5': 25,
    };
    setItemsPerPage(itemsPerPageMap[viewType] || 9); // Default to 9 if viewType is not mapped
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Update the current page
    fetchProducts(page, itemsPerPage); // Trigger a fetch with the updated page and itemsPerPage
  };

  return (
    <div>
      <div className='md:px-50 md:mt-15 mt-4'>
      {/* Statement Shirt Section */}
      <div className="flex flex-col md:flex-row items-center justify-center bg-black text-white">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-bold mt-5 md:mt-0 ml-10 mb-5 max-w-[300px]">THE STATEMENT SHIRT</h2>
          <p className="text-sm leading-relaxed mb-2 px-10">
            Our best-selling Son of God shirt is more than just a piece of clothing — it's a bold declaration of who you are. 
            Crafted from premium materials with a focus on comfort and durability, this tee combines timeless design with a powerful message.
          </p>
          <p className="text-sm leading-relaxed mb-2 px-10">
            Every detail is made to reflect quality, from the clean cut to the precise print, so you can wear it confidently in any setting.
          </p>
          <p className="text-sm leading-relaxed mb-2 px-10">
            This shirt is more than fashion; it's a symbol of faith, identity, and courage. Whether you're out on the streets, at an event, 
            or just living your everyday life, the Son of God Statement Tee reminds you — and the world around you — that creation is waiting 
            for the sons and daughters of God to rise.
          </p>
          {/* <button className="bg-white text-black ml-10 py-2 px-5 mt-2 font-medium">Check it out</button> */}
        </div>
        <div className="md:w-2/3 mt-10 md:mt-0">
          <img 
            src="/assets/statement-shirt.png" 
            alt="The Statement Shirt" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
      </div>

      <div className="p-5 md:px-50">
        <div className="mb-6"> {/* Add margin below the filter */}
          <FilterSort
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            onViewChange={handleViewChange}
            currentSort={currentSort}
            currentView={currentView}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          {/* Products Grid */}
          <main className="w-full">
            <div
              className={`grid gap-5 ${
                currentView === '1'
                  ? 'grid-cols-1' // Mobile default: 1 item per row
                  : currentView === '2'
                  ? 'grid-cols-2'
                  : currentView === '3'
                  ? 'grid-cols-3' // Desktop default: 3 items per row
                  : currentView === '4'
                  ? 'grid-cols-4'
                  : currentView === '5'
                  ? 'grid-cols-5'
                  : 'grid-cols-2 md:grid-cols-3'
              }`}
            >
              {products.map((product: any) => (
                <div
                  key={product.id}
                  onClick={() => (window.location.href = `/fashion/${category}/${product.id}`)}
                  className="cursor-pointer"
                >
                  <ProductItem
                    id={product.id}
                    name={product.title}
                    price={product.price}
                    photo={product.images[0]?.publicUrl || null} // Use null if no image URL is available
                  />
                </div>
              ))}
            </div>
            {isLoading && <Loader />}
          </main>
        </div>
        <div className="flex justify-center items-center gap-1 mt-6 py-20">
          {/* Pagination */}
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 disabled:bg-gray-300 disabled:text-gray-500 cursor-pointer"
          >
            <FiChevronLeft className="mr-2" /> Back
          </button>
          {[...Array(window.innerWidth >= 768 ? 10 : 5)].map((_, index) => ( // 10 pages for desktop, 5 for mobile
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 cursor-pointer ${
                currentPage === index + 1
                  ? 'bg-black text-white'
                  : 'bg-transparent text-black hover:bg-gray-100'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={!hasMore}
            onClick={() => handlePageChange(currentPage + 1)}
            className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 disabled:bg-gray-300 disabled:text-gray-500 cursor-pointer"
          >
            Next <FiChevronRight className="ml-2" />
          </button>
        </div>
      </div>
      {/* Features Section */}
      <div className="flex flex-col md:flex-row justify-center px-20 bg-gray-100 w-full md:grid-cols-4 gap-10 py-10 mx-auto">
        <div className="flex flex-col md:flex-row justify-center grid-cols-1">
          <div className="text-center py-10 md:p-10 max-w-[400px]">
            <div className="mb-4">
              <FiCreditCard size={24} className="mx-auto text-gray-400" />
            </div>
            <h3 className="font-bold text-lg">MULTIPLE PAYMENT OPTIONS</h3>
            <p className="text-xs text-gray-500 mt-2">Pay the way that suits you best – flexible and secure.</p> {/* Added mt-2 */}
          </div>
          <div className="text-center py-10 md:p-10 max-w-[400px]">
            <div className="mb-4">
              <FiTruck size={24} className="mx-auto text-gray-400" />
            </div>
            <h3 className="font-bold text-lg">FREE SHIPPING FROM €100</h3>
            <p className="text-xs text-gray-500 mt-2">Get free delivery within Germany on all orders over €100.</p> {/* Added mt-2 */}
          </div>
          <div className="text-center py-10 md:p-10 max-w-[400px]">
            <div className="mb-4">
              <FiGlobe size={24} className="mx-auto text-gray-400" />
            </div>
            <h3 className="font-bold text-lg">THE PORTAL FOR CHRISTIANS</h3>
            <p className="text-xs text-gray-500 mt-2">Fashion, products, and inspiration – all in one place. Living visibly what we believe, together.</p> {/* Added mt-2 */}
          </div>
        </div>
      </div>

      {/* Discover Section */}
      <div className="flex flex-col items-center justify-center pb-20 md:pt-20 bg-white">
          <img 
            src="/assets/discover-sog.png" 
            alt="Discover Sons of God" 
            className="w-full md:px-50 h-auto object-cover mb-6" 
          />
        <div className="w-full px-10 md:px-50">
          <h2 className="text-3xl font-bold mb-6 text-left mt-15">DISCOVER THE WORLD OF SONS OF GOD</h2>
          <p className="text-gray-500 text-base leading-relaxed text-left">
            The Sons of God website is more than an online store — it is a platform created to inspire, equip, and connect believers. 
            Here you will find a wide range of categories that reflect every aspect of Christian life. In the Fashion section, explore 
            premium clothing designed to combine style with a powerful message, so that what you wear becomes a visible statement of your identity.
          </p>
          <p className="text-gray-500 text-base leading-relaxed text-left mt-4">
            The Merchandise and Home & Living areas offer products that bring faith into your daily surroundings, from meaningful accessories 
            to inspiring décor for your home.
          </p>
          <p className="text-gray-500 text-base leading-relaxed text-left mt-4">
            For those who want to go deeper, our Books section provides resources for faith, study, and inspiration — from theology to practical 
            guides and material for the next generation. In Training, you can access online courses, workshops, and certifications designed to 
            strengthen leadership, faith, and practical living.
          </p>
          <p className="text-gray-500 text-base leading-relaxed text-left mt-4">
            The Events area keeps you updated about upcoming gatherings, where you can experience community, worship, and teaching live, and even 
            purchase your tickets directly online.
          </p>
          <p className="text-gray-500 text-base leading-relaxed text-left mt-4">
            At Sons of God, everything is connected through our mission, rooted in Romans 8:19: creation is waiting for the sons and daughters of 
            God to be revealed. This site is your place to discover, to grow, and to make your faith visible in everyday life — through what you 
            wear, what you read, and how you live.
          </p>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-100 p-10 md:px-50 text-center">
        <h2 className="text-2xl font-bold mb-4">Newsletter</h2>
        <p className="text-gray-700 text-sm mb-6">
          Enjoy €10 off your next order and benefit from our news and offers.
        </p>
        <div className="flex justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Your email address"
            className="hover:none focus:outline-none bg-white px-4 py-2 w-full max-w-md"
          />
          <button className="min-w-[120px] bg-black text-white px-6 py-2 border-none">Sign Up</button>
        </div>
        <p className="text-gray-500 text-xs mt-4">
          By signing up, you agree that your data will be used for our newsletter distribution. 
          The newsletter can be unsubscribed at any time. Further information and cancellation 
          instructions can be found in our <a href="/privacy-policy" className="underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default Fashion;