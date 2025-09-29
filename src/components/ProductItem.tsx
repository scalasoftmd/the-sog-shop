import React from "react";

interface ProductItemProps {
  id: string;
  name: string;
  price: number;
  photo: string;
}

const ProductItem: React.FC<ProductItemProps> = ({name, price, photo }) => (
  <div className="flex flex-col items-center transition-shadow bg-white border border-transparent hover:cursor-pointer h-auto min-h-[320px] md:min-h-[0]">
    <img
      src={photo}
      alt={name}
      className="w-[100%] h-80 p-5 md:p-0 md:h-100 object-cover mb-4"
    />
    <h5 className="font-semibold mb-1 text-gray-900 text-center text-lg">{name}</h5>
    <p className="text-gray-600 mb-4 text-center text-base">EUR {price.toLocaleString()}</p>
    {/* No add to bag button */}
  </div>
);

export default ProductItem;
