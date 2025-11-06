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
    <div className="flex flex-col items-center transition-shadow bg-white border border-transparent hover:cursor-pointer">
      {/* 3:4 aspect ratio wrapper (paddingTop 133.3333% -> height = 1.3333 * width) */}
      <div className="w-full relative" style={{ paddingTop: '133.3333%' }}>
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">Loading...</span>
          </div>
        )}

        <img
          src={photo}
          alt={name}
          className={`absolute inset-0 w-full h-full object-cover mb-4 transition-opacity ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>

      <h5 className="font-bold mt-4 mb-1 text-gray-900 text-center text-xl">{name}</h5>
      <p className="text-black mb-4 text-center text-base">{price.toLocaleString()} €</p>
    </div>
  );
};

export default ProductItem;
