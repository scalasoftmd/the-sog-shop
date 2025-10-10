import React, { useState } from "react";

interface ProductItemProps {
  id: string;
  name: string;
  price: number;
  photo: string;
}

const ProductItem: React.FC<ProductItemProps> = ({ name, price, photo }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="flex flex-col items-center transition-shadow bg-white border border-transparent hover:cursor-pointer h-auto min-h-[320px] md:min-h-[0]">
      {!isImageLoaded && (
        <div className="flex items-center justify-center w-full h-[350px] bg-gray-200">
          <span className="text-gray-500">Loading...</span> {/* Placeholder */}
        </div>
      )}
      <img
        src={photo}
        alt={name}
        className={`w-full h-auto object-cover mb-4 transition-opacity ${
          isImageLoaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy" // Lazy loading
        onLoad={() => setIsImageLoaded(true)}
      />
      <h5 className="font-bold mb-1 text-gray-900 text-center text-xl">{name}</h5>
      <p className="text-black mb-4 text-center text-base">{price.toLocaleString()} €</p>
    </div>
  );
};

export default ProductItem;
