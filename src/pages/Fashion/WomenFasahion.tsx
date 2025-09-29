import { useState, useEffect } from 'react';
import ProductItem from '../../components/ProductItem';

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

const MenFashion = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [rangeValue, setRangeValue] = useState({ min: 0, max: 1500 });
  const [page, setPage] = useState(1);
  const [lastPageNumber, setLastPageNumber] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${apiUrl}/variations?page=${page}`);
        const data = await res.json();

        const mappedProducts: Product[] = (data.entries || []).map((item: any) => {
          // Title from name
          const title = item.name || item.model || item.number || 'No title';
          // Price from variationSalesPrices
          const price = item.variationSalesPrices?.[0]?.price || 0;
          // Images from images array, use urlPreview or url
          const images: ProductImage[] = (item.images || []).map((img: any) => ({
            publicUrl: img.url || '',
          }));

          return { id: item.id?.toString() || '', title, price, images };
        });

        setProducts(mappedProducts);
        setAllProducts(mappedProducts);
        setLastPageNumber(data.lastPageNumber || 1);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts();
  }, [page]);

  // Filter by category (title search)
  const filterByCategory = (category: string) => {
    const filtered = allProducts.filter((p) =>
      p.title.toLowerCase().includes(category.toLowerCase())
    );
    setProducts(filtered);
  };

  // Filter by price range
  useEffect(() => {
    const filtered = allProducts.filter(
      (p) => p.price >= rangeValue.min && p.price <= rangeValue.max
    );
    setProducts(filtered);
  }, [rangeValue, allProducts]);

  return (
    <div className="container mx-auto py-10 px-5">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 bg-gray-100 p-5 rounded shadow-md">
          <h5 className="font-bold mb-5 text-lg text-gray-800">Categories</h5>
          <ul className="space-y-2">
            <li className="cursor-pointer text-gray-600 hover:text-blue-500" onClick={() => filterByCategory('hoodie')}>Hoodies</li>
            <li className="cursor-pointer text-gray-600 hover:text-blue-500" onClick={() => filterByCategory('sofa')}>Sofa</li>
            <li className="cursor-pointer text-gray-600 hover:text-blue-500" onClick={() => filterByCategory('lamp')}>Lamp</li>
            <li className="cursor-pointer text-gray-600 hover:text-blue-500" onClick={() => filterByCategory('vase')}>Vase</li>
          </ul>

          <h5 className="font-bold mt-5 text-lg text-gray-800">Price Range</h5>
          <p className="text-gray-600 mb-3">Price Range: ${rangeValue.min} - ${rangeValue.max}</p>
          <input
            type="range"
            min="0"
            max="1500"
            value={rangeValue.min}
            onChange={(e) => setRangeValue({ ...rangeValue, min: Number(e.target.value) })}
            className="w-full mb-2"
          />
          <input
            type="range"
            min="0"
            max="1500"
            value={rangeValue.max}
            onChange={(e) => setRangeValue({ ...rangeValue, max: Number(e.target.value) })}
            className="w-full"
          />
        </aside>

        {/* Products Grid */}
        <main className="w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {products.map((product) => (
              <ProductItem
                key={product.id}
                id={product.id}
                name={product.title}
                price={product.price}
                photo={product.images[0]?.publicUrl || ''}
                // Optionally add onAddToBag handler here
              />
            ))}
          </div>
          {/* Pagination Controls BELOW */}
          <div className="flex justify-between items-center mt-8">
            <button
              className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-gray-700">Page {page} of {lastPageNumber}</span>
            <button
              className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(lastPageNumber, p + 1))}
              disabled={page === lastPageNumber}
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MenFashion;