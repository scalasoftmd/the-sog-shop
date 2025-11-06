const cartItems = [
  {
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    name: 'Pacsun Camo LA Division 80 Layered Long Sleeve T-Shirt',
    size: 'SML SIZE',
    color: 'CAMOUFLAGE',
    price: 682.5,
    oldPrice: 1050,
    qty: 1,
    savings: '35% Off Savings',
  },
];

const CartPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 md:px-0">
      <h1 className="text-4xl font-bold mb-8">My Bag: 1 item</h1>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          {cartItems.map((item, idx) => (
            <div key={idx} className="flex flex-row gap-8 items-center mb-8">
              <img src={item.image} alt={item.name} className="w-48 h-64 object-cover rounded" />
              <div className="flex-1">
                <div className="text-2xl font-semibold mb-2">{item.name}</div>
                <div className="mb-1 text-base"><span className="font-bold">Size:</span> {item.size}</div>
                <div className="mb-1 text-base"><span className="font-bold">Color:</span> {item.color}</div>
                <div className="flex items-center gap-4 mt-4">
                  <span className="font-bold">QTY</span>
                  <select className="border rounded px-2 py-1">
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                  <a href="#" className="ml-6 underline font-semibold">EDIT</a>
                  <a href="#" className="ml-4 underline font-semibold">REMOVE</a>
                </div>
              </div>
              <div className="flex flex-col items-end min-w-[200px]">
                <div>
                  <span className="line-through text-gray-400 mr-2">MDL {item.oldPrice.toFixed(2)}</span>
                  <span className="text-xl font-bold">MDL {item.price.toFixed(2)}</span>
                </div>
                <div className="text-red-500 text-sm mt-1">Applied: {item.savings}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full md:w-[400px] bg-white border rounded p-8 flex flex-col gap-6">
          <button className="bg-black text-white py-3 font-bold text-lg rounded mb-4">CHECKOUT</button>
          <div>
            <input type="text" placeholder="Enter Promo Code" className="border px-4 py-2 w-2/3 mr-2" />
            <button className="bg-gray-400 text-white px-6 py-2 font-bold rounded">APPLY</button>
          </div>
          <div className="border-t pt-6">
            <div className="text-xl font-bold mb-2">Order Summary</div>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>MDL 682.50</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>MDL 682.50</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 text-right">
        <a href="#" className="text-gray-600 underline text-lg">Continue Shopping</a>
      </div>
    </div>
  );
};

export default CartPage;
