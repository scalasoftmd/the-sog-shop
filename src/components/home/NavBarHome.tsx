import { Link } from 'react-router-dom';
import { ShoppingBagIcon as ShoppingBagIconSolid } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';

export default function NavBarHome() {
  const [bagCount, setBagCount] = useState<number>(0);

  useEffect(() => {
    // Update bag count from localStorage
    const updateBagCount = () => {
      const bag = JSON.parse(localStorage.getItem("bag") || "[]");
      setBagCount(bag.length);
    };
    updateBagCount();
    window.addEventListener("bagUpdated", updateBagCount);
    return () => window.removeEventListener("bagUpdated", updateBagCount);
  }, []);

  return (
    <div>
      <div
        style={{
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#f8f9fa", // Adjust color as needed
          zIndex: 1000,
          textAlign: "center",
          padding: "10px 0",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
        className="bg-white text-black text-center text-[10px] md:text-[9px] font-semibold tracking-wide h-auto md:h-6 flex flex-col md:flex-row items-center justify-center"
      >
        <span className="block md:inline px-2 md:px-0">
          WELCOME TO THE SONS OF GOD
        </span>
        <span className="block md:inline px-2 md:px-0">
          &nbsp; - Get{" "}
          <span className="font-bold" style={{ fontSize: "inherit" }}>
            15% OFF
          </span>{" "}
          with code{" "}
          <span className="font-bold" style={{ fontSize: "inherit" }}>
            RISE20
          </span>{" "}
          -{" "}
          <a href="/fashion" className="underline hover:text-yellow-600">
            Shop Now!
          </a>
        </span>
      </div>
      <div className="flex items-center justify-between bg-black px-8 h-14">
        <div className="flex items-center">
          <img src="/assets/logo-white.png" alt="Sons of God Logo" className="h-5" />
        </div>
        <nav className="flex items-center gap-8 text-white text-sm">
          {['Start', 'Fashion', 'About'].map((item) => (
            <Link
              key={item}
              to={item.toLowerCase() === 'start' ? '/' : `/${item.toLowerCase()}`} // Ensure "Start" leads to "/"
              className="hover:text-yellow-400 uppercase"
            >
              {item}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/bag" className="relative">
            <ShoppingBagIconSolid className="h-6 w-6 text-white cursor-pointer hover:text-yellow-400" />
            {bagCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-yellow-400 text-black px-[7px] py-0.5 rounded-full text-xs font-bold">
                {bagCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}