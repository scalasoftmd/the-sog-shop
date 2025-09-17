import React from "react";

interface Product {
  image: string;
  name: string;
  price: string;
}

interface BooksProductSectionsProps {
  products: Product[];
}

const BooksProductSections: React.FC<BooksProductSectionsProps> = ({ products }) => {
  return (
    <section className="w-full bg-white md:h-[120vh] h-[80vh] mt-10">
      <div className="w-full flex justify-center relative" style={{ minHeight: '320px' }}>
        <img
          src="/assets/books.PNG"
          alt="Books background"
          className="hidden md:block md:w-full object-cover"
          style={{ objectPosition: 'center'}}
        />
        <div className="absolute inset-0 flex mt-3 ml-3 md:pt-75 md:pl-40 flex-col items-start z-10">
          <h2 className="text-4xl font-bold text-black md:text-white ml-3 mb-2 drop-shadow">
            BOOKS <span className="font-normal hidden md:contents text-white text-2xl">for your personal journey</span>
          </h2>
        </div>
      </div>
      <div>
        
      </div>
      <div className="w-full flex justify-center absolute -mt-[30vh] md:-mt-[35vh] py-4 cursor-pointer">
        <div className="overflow-x-auto whitespace-nowrap md:flex md:justify-center scroll-smooth snap-x snap-mandatory w-full md:w-[80vw] gap-4 bg-white p-4 cursor-pointer">
          {products.map((product, idx) => (
            <div key={idx} className="inline-block text-center snap-center w-[70vw] md:w-[300px] mx-2 border border-transparent hover:border-gray-300 transition-all duration-200 pb-6 cursor-pointer">
              <img src={product.image} alt={product.name} className=" w-full object-cover cursor-pointer" />
              <p className="mt-2 font-bold">{product.name}</p>
              <p className="text-gray-500">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BooksProductSections;
