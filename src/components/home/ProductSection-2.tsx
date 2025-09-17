interface Product {
  image: string;
  name: string;
  price: string;
}

interface ProductSection2Props {
  title: string;
  subtitle?: string;
  products: Product[];
  showAllHref: string;
  assets: string[]; // array of image paths for first row
}

export default function ProductSection2({ title, subtitle, products, showAllHref, assets }: ProductSection2Props) {
  // First row: images from assets
  // Second row: products
  return (
    <section className="product-section py-10 px-4 md:px-10 md:py-30">
      <div className="container mx-auto">
        <div className="flex items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold inline-block align-bottom mr-3 tracking-tight">{title}</h2>
          {subtitle && <span className="text-lg md:text-xl text-gray-500 align-bottom">{subtitle}</span>}
            <div className="flex-grow text-right">
            <a href={showAllHref} className="text-black hover:underline hover:text-black ml-[-20px] mr-5">show all</a>
            </div>
        </div>
        {/* Top row: only images from assets, hidden on mobile */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3">
          {assets.map((image, idx) => (
            <div key={idx} className="relative flex flex-col items-center border border-transparent hover:border-gray-300 bg-white transition-all duration-200" style={{width: '500px', margin: '0 auto'}}>
              <div className="relative w-full" style={{height: '600px'}}>
                <img src={image} alt={`asset-${idx}`} className="w-full h-full object-cover" style={{aspectRatio: '1/1'}} />
                {idx === 0 && (
                  <>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(255,255,255,0.6)',
                      zIndex: 1
                    }} />
                    <a
                      href={showAllHref}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
                      style={{
                        minWidth: '120px',
                        minHeight: '40px',
                        border: '1px solid #222',
                        background: 'rgba(255,255,255,0.0)',
                        color: '#222',
                        fontWeight: 500,
                        fontSize: '16px',
                        textAlign: 'center',
                        letterSpacing: '0.01em',
                        boxShadow: 'none',
                        borderRadius: 0
                      }}
                    >
                      show all
                    </a>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Bottom row: products exactly like ProductSection */}
        <div className="overflow-x-auto whitespace-nowrap scroll-smooth md:flex snap-x snap-mandatory mt-8">
          {products.map((product, index) => (
            <div key={index} className="inline-block text-center snap-center w-[70vw] mx-2 border border-transparent hover:border-gray-300 transition-all duration-200 pb-6 cursor-pointer">
              <img src={product.image} alt={product.name} className="w-full object-cover" />
              <p className="mt-2 font-bold">{product.name}</p>
              <p className="text-gray-500">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
