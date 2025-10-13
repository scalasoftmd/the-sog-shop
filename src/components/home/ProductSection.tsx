interface Product {
  image: string;
  name: string;
  price: string;
}

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  showAllHref: string;
}

export default function ProductSection({ title, subtitle, products, showAllHref }: ProductSectionProps) {
  return (
    <section className="product-section py-8 px-8 p-20 md:px-50">
      <div className="container mx-auto">
        <div className="flex items-center mb-6">
          <h2 className="text-4xl font-bold mr-4">{title}</h2>
          {subtitle && <p className="hidden md:block text-2xl text-gray-500 self-end">{subtitle}</p>}
          <div className="flex-grow text-right">
            <a href={showAllHref} className="text-black underline hover:text-black ml-[-20px] mr-5">show all</a>
          </div>
        </div>
        <div className="overflow-x-auto whitespace-nowrap scroll-smooth md:flex snap-x snap-mandatory">
          {products.map((product, index) => (
            <div key={index} className="inline-block text-center snap-center w-[70vw] mx-2 border border-transparent hover:border-gray-300 transition-all duration-200 pb-6 cursor-pointer">
              <img src={product.image} alt={product.name} className="w-full h-[600px] object-cover" />
              <p className="mt-2 font-bold">{product.name}</p>
              <p className="text-gray-500">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}