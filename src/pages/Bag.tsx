import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Bag = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const bag = JSON.parse(localStorage.getItem("bag") || "[]");
    setCartItems(bag);
  }, []);

  const handleRemove = (idx: number) => {
    const updated = cartItems.filter((_, i) => i !== idx);
    setCartItems(updated);
    localStorage.setItem("bag", JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("bagUpdated"));
  };

  const handleQtyChange = (idx: number, qty: number) => {
    const updated = cartItems.map((item, i) =>
      i === idx ? { ...item, quantity: qty } : item
    );
    setCartItems(updated);
    localStorage.setItem("bag", JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("bagUpdated"));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 md:px-0">
      <h1 className="text-4xl font-bold mb-8 text-center md:text-left">
        My Bag: {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
      </h1>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          {cartItems.map((item, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-8 items-center mb-8">
              <img src={item.image} alt={item.name} className="w-48 h-64 object-cover rounded" />
              <div className="flex-1">
                <div className="text-2xl font-semibold mb-2">{item.name}</div>
                <div className="mb-1 text-base">
                  <span className="font-bold">Size:</span> {item.size}
                </div>
                <div className="mb-1 text-base">
                  <span className="font-bold">Color:</span> {item.color}
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <span className="font-bold">QTY</span>
                  <select
                    className="border rounded px-2 py-1"
                    value={item.quantity || 1}
                    onChange={e => handleQtyChange(idx, Number(e.target.value))}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                  <button className="ml-4 underline font-semibold cursor-pointer" onClick={() => handleRemove(idx)}>REMOVE</button>
                </div>
              </div>
              <div className="flex flex-col items-center min-w-[300px]">
                <div>
                  {item.oldPrice && (
                    <span className="line-through text-gray-400 mr-2">
                      € {Number(item.oldPrice).toFixed(2)}
                    </span>
                  )}
                  <span className="text-xl font-bold">
                    € {Number(item.price).toFixed(2)}
                  </span>
                </div>
                {item.savings && (
                  <div className="text-red-500 text-sm mt-1">
                    Applied: {item.savings}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full md:w-[400px] bg-white border rounded p-8 flex flex-col gap-6">
          <button
            className="bg-black text-white py-3 font-bold text-lg rounded mb-4 cursor-pointer"
            onClick={() => navigate('/checkout')}
          >
            CHECKOUT
          </button>
          <div className="border-t pt-6">
            <div className="text-xl font-bold mb-2">Order Summary</div>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>€ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>€ {subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 text-right">
        <a href="/fashion" className="text-gray-600 underline text-lg">Continue Shopping</a>
      </div>
    </div>
  );
};

export default Bag;
