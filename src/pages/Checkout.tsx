import { useEffect, useState } from "react";
import countries from "world-countries";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  size?: string;
  color?: string;
  quantity?: number;
}

interface Address {
  firstName: string;
  lastName: string;
  email?: string;
  country: string;
  address1: string;
  address2?: string;
  city: string;
  zip: string;
  phone: string;
}

export default function Checkout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);

  const [billing, setBilling] = useState<Address>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    zip: "",
    phone: "",
  });

  const [delivery, setDelivery] = useState<Address>({
    firstName: "",
    lastName: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    zip: "",
    phone: "",
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  // Create country options from world-countries
  const countryOptions = countries
  .map((c) => ({ value: c.cca2, label: c.name.common }))
  .sort((a, b) => a.label.localeCompare(b.label));


  useEffect(() => {
    const bag: CartItem[] = JSON.parse(localStorage.getItem("bag") || "[]");
    setCartItems(bag);
    setSubtotal(
      bag.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    );
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    type: "billing" | "delivery"
  ) => {
    const { name, value } = e.target;
    if (type === "billing") {
      setBilling((prev) => ({ ...prev, [name]: value }));
    } else {
      setDelivery((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMolliePay = async () => {
    if (subtotal <= 0) {
      alert("Cart is empty.");
      return;
    }

    try {
      setLoading(true);

      const orderId = Date.now().toString();

      const res = await fetch(`${apiUrl}/create-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          amount: subtotal.toFixed(2),
          currency: "EUR",
          redirectUrl: `${window.location.origin}/order-success`,
          cartItems,
          billing,
          delivery: showDelivery ? delivery : billing,
        }),
      });

      const data = await res.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setLoading(false);
        console.error("Payment error:", data);
        alert("Payment error: No checkout URL received.");
      }
    } catch (err) {
      setLoading(false);
      console.error("Payment error:", err);
      alert("Payment error: Something went wrong.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 md:px-0">
      <h2 className="text-2xl font-bold mb-8 bg-black text-white px-4 py-3 rounded">
        Order Summary
      </h2>

      {/* CART */}
      <div className="bg-white rounded shadow p-6 mb-10">
        {cartItems.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row gap-8 items-center border-b pb-6 mb-6"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-40 h-56 object-cover rounded"
            />
            <div className="flex-1">
              <div className="text-xl font-semibold mb-2">{item.name}</div>
              <div className="mb-1 text-base">
                <span className="font-bold">Size:</span> {item.size}
              </div>
              <div className="mb-1 text-base">
                <span className="font-bold">Color:</span> {item.color}
              </div>
            </div>
            <div className="flex flex-col items-end w-full md:w-40">
              <div className="text-lg">{item.quantity || 1}</div>
              <div className="text-lg font-bold">
                € {Number(item.price).toFixed(2)}
              </div>
              {item.oldPrice && (
                <>
                  <div className="text-gray-400 line-through text-sm">
                    Was: € {Number(item.oldPrice).toFixed(2)}
                  </div>
                  <div className="text-green-600 text-sm">
                    You Save: €{" "}
                    {(Number(item.oldPrice) - Number(item.price)).toFixed(2)}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center pt-4">
          <span className="font-bold text-lg">Items subtotal</span>
          <span className="font-bold text-lg">€ {subtotal.toFixed(2)}</span>
        </div>
      </div>

      {/* BILLING & DELIVERY */}
      <div className="flex flex-col md:flex-row gap-10 mb-10">
        {/* Billing Address */}
        <div className="flex-1 bg-white rounded shadow p-6">
          <h3 className="font-bold text-lg mb-4 bg-black text-white px-4 py-2 rounded">
            Billing Address
          </h3>
          <form>
            <input
              name="firstName"
              value={billing.firstName}
              onChange={(e) => handleInputChange(e, "billing")}
              className="w-full border rounded px-4 py-3 mb-4"
              placeholder="First Name"
            />
            <input
              name="lastName"
              value={billing.lastName}
              onChange={(e) => handleInputChange(e, "billing")}
              className="w-full border rounded px-4 py-3 mb-4"
              placeholder="Last Name"
            />
            <input
              name="email"
              value={billing.email}
              onChange={(e) => handleInputChange(e, "billing")}
              className="w-full border rounded px-4 py-3 mb-4"
              placeholder="Email"
            />
            <select
              name="country"
              value={billing.country}
              onChange={(e) => handleInputChange(e, "billing")}
              className="w-full border rounded px-4 py-3 mb-4"
            >
              <option value="">Select country</option>
              {countryOptions.map((c) => (
                <option key={c.value} value={c.label}>
                  {c.label}
                </option>
              ))}
            </select>
            <input
              name="address1"
              value={billing.address1}
              onChange={(e) => handleInputChange(e, "billing")}
              className="w-full border rounded px-4 py-3 mb-4"
              placeholder="Address Line 1"
            />
            <input
              name="address2"
              value={billing.address2}
              onChange={(e) => handleInputChange(e, "billing")}
              className="w-full border rounded px-4 py-3 mb-4"
              placeholder="Address Line 2"
            />
            <input
              name="city"
              value={billing.city}
              onChange={(e) => handleInputChange(e, "billing")}
              className="w-full border rounded px-4 py-3 mb-4"
              placeholder="City / Suburb"
            />
            <input
              name="zip"
              value={billing.zip}
              onChange={(e) => handleInputChange(e, "billing")}
              className="w-full border rounded px-4 py-3 mb-4"
              placeholder="ZIP / Postcode"
            />
            <input
              name="phone"
              value={billing.phone}
              onChange={(e) => handleInputChange(e, "billing")}
              className="w-full border rounded px-4 py-3 mb-4"
              placeholder="Mobile Phone"
            />
          </form>
        </div>

        {/* Delivery Address */}
        <div className="flex-1 bg-white rounded shadow p-6">
          <h3 className="font-bold text-lg mb-4 bg-black text-white px-4 py-2 rounded">
            Delivery Address
          </h3>
          <div className="mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!showDelivery}
                onChange={() => setShowDelivery(false)}
              />
              Default (same as billing address)
            </label>
            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={showDelivery}
                onChange={() => setShowDelivery(true)}
              />
              Add an alternative delivery address
            </label>
          </div>
          {showDelivery && (
            <form>
              <input
                name="firstName"
                value={delivery.firstName}
                onChange={(e) => handleInputChange(e, "delivery")}
                className="w-full border rounded px-4 py-3 mb-4"
                placeholder="First Name*"
              />
              <input
                name="lastName"
                value={delivery.lastName}
                onChange={(e) => handleInputChange(e, "delivery")}
                className="w-full border rounded px-4 py-3 mb-4"
                placeholder="Last Name*"
              />
              <select
                name="country"
                value={delivery.country}
                onChange={(e) => handleInputChange(e, "delivery")}
                className="w-full border rounded px-4 py-3 mb-4"
              >
                <option value="">Select country</option>
                {countryOptions.map((c) => (
                  <option key={c.value} value={c.label}>
                    {c.label}
                  </option>
                ))}
              </select>
              <input
                name="address1"
                value={delivery.address1}
                onChange={(e) => handleInputChange(e, "delivery")}
                className="w-full border rounded px-4 py-3 mb-4"
                placeholder="Address Line 1*"
              />
              <input
                name="address2"
                value={delivery.address2}
                onChange={(e) => handleInputChange(e, "delivery")}
                className="w-full border rounded px-4 py-3 mb-4"
                placeholder="Address Line 2"
              />
              <input
                name="city"
                value={delivery.city}
                onChange={(e) => handleInputChange(e, "delivery")}
                className="w-full border rounded px-4 py-3 mb-4"
                placeholder="City / Suburb*"
              />
              <input
                name="zip"
                value={delivery.zip}
                onChange={(e) => handleInputChange(e, "delivery")}
                className="w-full border rounded px-4 py-3 mb-4"
                placeholder="ZIP / Postcode*"
              />
              <input
                name="phone"
                value={delivery.phone}
                onChange={(e) => handleInputChange(e, "delivery")}
                className="w-full border rounded px-4 py-3 mb-4"
                placeholder="Mobile Phone*"
              />
            </form>
          )}
        </div>
      </div>

      {/* ✅ Pay with Mollie button */}
      <div className="text-center">
        <button
          onClick={handleMolliePay}
          disabled={loading}
          className="bg-black text-white p-5 font-bold text-lg rounded mb-4 cursor-pointer hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Redirecting..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
}
