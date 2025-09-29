import { useState, useEffect, useRef, useCallback } from 'react';
import ProductItem from '../components/ProductItem';
import FashionFilter from '../components/FashionFilter';
import Loader from '../components/Loader';

interface ProductImage {
  publicUrl: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  images: ProductImage[];
  variationAttributeValues?: { attributeId: number; valueId: number }[];
}

const apiUrl = import.meta.env.VITE_API_URL;

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A-Z' },
  { value: 'name-desc', label: 'Name: Z-A' },
];

const Fashion = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [rangeValue] = useState({ min: 0, max: 1500 });
  const [sort, setSort] = useState<string>('default');

  // Infinite scroll state
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Dynamic filter state: attributeId -> array of valueIds
  const [selectedFilters, setSelectedFilters] = useState<Record<number, number[]>>({});

  // Responsive filter sidebar state
  const [showFilters, setShowFilters] = useState(() =>
    typeof window !== "undefined"
      ? window.innerWidth >= 768 // md breakpoint
      : true
  );

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Fetch products for infinite scroll
  const fetchProducts = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}/variations?page=${page}&itemsPerPage=9`);
      const data = await res.json();
      const mappedProducts: Product[] = (data.entries || []).map((variation: any) => {
        // Only show main variations in the grid, but keep all variations for filtering
        if (!variation.isMain || !variation.item) return null;
        const item = variation.item;
        const title = variation.name;
        const price = variation.variationSalesPrices?.[0]?.price || variation.purchasePrice || 0;
        const images: ProductImage[] = Array.isArray(variation.images)
          ? variation.images.map((img: any) => ({
              publicUrl: img.url || '',
            }))
          : [];
        const variationAttributeValues = variation.variationAttributeValues || [];
        // Attach all variations for filtering
        return {
          id: item.id?.toString() || '',
          title,
          price,
          images,
          variationAttributeValues,
          allVariations: data.entries // keep all variations for filter logic
        };
      }).filter(Boolean); // Remove nulls
      setProducts((prev) => page === 1 ? mappedProducts : [...prev, ...mappedProducts]);
      setHasMore(!data.isLastPage && mappedProducts.length > 0);
    } catch (err) {
      setHasMore(false);
    }
    setIsLoading(false);
  }, [selectedFilters]);

  // Initial load and filter change
  useEffect(() => {
    setProducts([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchProducts(1);
  }, [fetchProducts]); // <-- Only run on mount and when fetchProducts changes, NOT when showFilters changes

  // Infinite scroll observer
  useEffect(() => {
    if (!hasMore || isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCurrentPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, isLoading]);

  // Fetch next page when currentPage changes
  useEffect(() => {
    if (currentPage === 1) return;
    fetchProducts(currentPage);
  }, [currentPage, fetchProducts, selectedFilters]);

  // Sort products before filtering
  const sortedProducts = [...products].sort((a, b) => {
    // Defensive: handle undefined price/title
    const priceA = typeof a.price === "number" ? a.price : 0;
    const priceB = typeof b.price === "number" ? b.price : 0;
    const titleA = typeof a.title === "string" ? a.title : "";
    const titleB = typeof b.title === "string" ? b.title : "";
    switch (sort) {
      case 'price-asc':
        return priceA - priceB;
      case 'price-desc':
        return priceB - priceA;
      case 'name-asc':
        return titleA.localeCompare(titleB);
      case 'name-desc':
        return titleB.localeCompare(titleA);
      default:
        return 0;
    }
  });

  // Filter products by price range and selected attribute values
  const filteredProducts = sortedProducts.filter((product: any) => {
    let match = product.price >= rangeValue.min && product.price <= rangeValue.max;
    Object.entries(selectedFilters).forEach(([attributeId, valueIds]) => {
      if (valueIds.length > 0) {
        // Check if any variation in allVariations matches the filter
        match =
          match &&
          valueIds.some((valueId) =>
            product.allVariations?.some(
              (v: any) =>
                v.variationAttributeValues?.some(
                  (attr: any) =>
                    attr.attributeId === Number(attributeId) &&
                    attr.valueId === valueId
                )
            )
          );
      }
    });
    return match;
  });

  useEffect(() => {
    // Listen for window resize to update filter sidebar visibility
    const handleResize = () => {
      setShowFilters(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="p-5 md:px-30">
      {/* Top shop navigation */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="flex items-center gap-2 ml-5"
        >
          {showFilters ? (
            <>
              <span>Close Filters &nbsp;</span>
              <span className="text-base" aria-label="close">&#10005;</span>
            </>
          ) : (
            <span>Open Filters</span>
          )}
        </button>
        <div className="flex items-center gap-2 mr-5">
          <span>Sort:</span>
          <select
            className="px-2 py-1 rounded outline-none"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        {/* Custom Filter Sidebar */}
        <div className={`${showFilters ? "block" : "hidden"} md:w-1/4`}>
          <FashionFilter
            apiUrl={apiUrl}
            onFilterChange={setSelectedFilters}
          />
        </div>
        {/* Products Grid */}
        <main className={`w-full ${showFilters ? "md:w-3/4" : "md:w-full"}`}>
          <div className={`grid grid-cols-2 ${showFilters ? "md:grid-cols-3" : "md:grid-cols-4"} gap-5`}>
            {filteredProducts.map((product: any) => (
              <div
                key={product.id}
                onClick={() => window.location.href = `/fashion/${product.id}`}
                className="cursor-pointer"
              >
                <ProductItem
                  id={product.id}
                  name={product.title}
                  price={product.price}
                  photo={product.images[0]?.publicUrl || ''}
                />
              </div>
            ))}
          </div>
          {/* Infinite scroll loader */}
          {hasMore && (
            <div ref={loaderRef}>
              {isLoading && <Loader />}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Fashion;
