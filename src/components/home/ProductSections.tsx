import { useState, useEffect } from "react";
import ProductSection from "./ProductSection";

const apiUrl = import.meta.env.VITE_API_URL;

interface ProductSectionsProps {
  onLoadingChange?: (loading: boolean) => void;
}

export default function ProductSections({ onLoadingChange }: ProductSectionsProps) {
  const [newArrivals, setNewArrivals] = useState([]);
  const [kidsProducts, setKidsProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Changed from true to false

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      onLoadingChange?.(true);
      try {
        // Fetch New Arrivals (Men)
        const menRes = await fetch(`${apiUrl}/variations/new`);
        const menData = await menRes.json();
        const menMapped = (menData.entries || []).map((product: any) => ({
          id: product.item.id,
          image: product.images?.[0]?.url,
          name: product?.name || "Product Name",
          price: "EUR " + (product.variationSalesPrices?.[0]?.price || "0.00"),
        }));

        // Fetch Kids Products
        const kidsRes = await fetch(`${apiUrl}/variations/kids?itemsPerPage=4`);
        const kidsData = await kidsRes.json();
        const kidsMapped = (kidsData.entries || []).map((product: any) => ({
          id: product.item.id,
          image: product.images?.[0]?.url,
          name: product.name || "Product Name",
          price: "EUR " + (product.variationSalesPrices?.[0]?.price || "0.00"),
        }));

        setNewArrivals(menMapped);
        setKidsProducts(kidsMapped);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
      setIsLoading(false);
      onLoadingChange?.(false);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <ProductSection
        title="New Arrivals"
        subtitle="elevate your style"
        showAllHref="/fashion"
        products={isLoading ? Array(4).fill({}) : newArrivals}
      />

      <ProductSection
        title="Kids"
        subtitle="the next Generation"
        showAllHref="/fashion/kids"
        products={isLoading ? Array(4).fill({}) : kidsProducts}
      />
    </div>
  );
}