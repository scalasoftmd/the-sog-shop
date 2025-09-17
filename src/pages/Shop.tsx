import { useState, useEffect } from 'react';

interface Product {
  id: string;
  title: string;
  price: number;
  image: { publicUrl: string }[];
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]); // keep all products for filtering
  const [rangeValue, setRangeValue] = useState({ min: 0, max: 1500 });

  // Fetch products from Node.js proxy on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://us-central1-thesog-473d3.cloudfunctions.net/api/items");
        const data = await res.json();
        // data.entries is the array of products
        const mappedProducts: Product[] = (data.entries || []).map((item: any) => {
          // Find the German text object
          const deText = (item.texts || []).find((t: any) => t.lang === 'de') || {};
          return {
            id: item.id?.toString() || '',
            title: deText.name1 || 'No title',
            price: item.sellingPrice?.[0]?.price || 0, // fallback if not present
            image: item.images?.map((img: any) => ({ publicUrl: img.url })) || [{ publicUrl: '' }],
          };
        });
        setProducts(mappedProducts);
        setAllProducts(mappedProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Filter by category (search in title)
  const filterByCategory = (category: string) => {
    const filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(category)
    );
    setProducts(filteredProducts);
  };

  // Filter by price range
  useEffect(() => {
    const filtered = allProducts.filter(
      (product) => product.price >= rangeValue.min && product.price <= rangeValue.max
    );
    setProducts(filtered);
  }, [rangeValue, allProducts]);

  return (
    <div className="container mx-auto py-10 px-5">
      <div className="flex flex-col md:flex-row gap-10">
        <aside className="w-full md:w-1/4 bg-gray-100 p-5 rounded shadow-md">
          <h5 className="font-bold mb-5 text-lg text-gray-800">Categories</h5>
          <ul className="space-y-2">
            <li className="cursor-pointer text-gray-600 hover:text-blue-500" onClick={() => filterByCategory('sofa')}>Sofa</li>
            <li className="cursor-pointer text-gray-600 hover:text-blue-500" onClick={() => filterByCategory('lamp')}>Lamp</li>
            <li className="cursor-pointer text-gray-600 hover:text-blue-500" onClick={() => filterByCategory('vase')}>Vase</li>
            <li className="cursor-pointer text-gray-600 hover:text-blue-500" onClick={() => filterByCategory('bedding')}>Bedding</li>
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
        <main className="w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {products.map((product) => (
              <div key={product.id} className="border p-5 rounded shadow-md hover:shadow-lg transition-shadow">
                <img src={product.image[0]?.publicUrl || ""} alt={product.title} className="w-full h-40 object-cover mb-3 rounded" />
                <h5 className="font-bold mb-2 text-gray-800">{product.title}</h5>
                <p className="text-gray-500 mb-2">${product.price}</p>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">Add to Cart</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shop;
