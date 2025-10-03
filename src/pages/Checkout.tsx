import { useEffect, useState } from "react";
import { PlentyCountry } from "../models/enums/PlentyCountry";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  size?: string;
  color?: string;
  quantity: number;
  variationId?: number;
}

interface OrderItem {
  itemId: number;
  variationId?: number;
  typeId?: number;
  quantity: number;
  amounts: {
    currency: string;
    priceOriginalNet: number;
    priceOriginalGross: number;
  }[];
  name?: string;
  image?: string;
  size?: string;
  color?: string;
}

export interface Address {
  typeId: number;        // 1 = billing, 2 = delivery
  salutation?: "mr" | "ms" | "company";
  name1: string;         // first name or main name
  name2?: string;        // last name or secondary name
  name3?: string;        // optional third name
  company?: string;      // company name
  address1: string;      // street + number
  address2?: string;     // optional additional address
  address3?: string;     // optional additional address
  zip: string;           // postal code
  town: string;          // city
  countryId: number;     // PlentyONE country ID
  email?: string;        // email for this address/contact
  phone?: string;        // phone number
  isDefault?: boolean;   // true if default address
}


export default function Checkout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);

  const [billing, setBilling] = useState<Address>({
    typeId: 1, // Billing address
    salutation: undefined,
    name1: "",
    name2: "",
    name3: "",
    company: "",
    address1: "",
    address2: "",
    address3: "",
    zip: "",
    town: "",
    countryId: 0,
    email: "",
    phone: "",
    isDefault: false,
  });

  const [delivery, setDelivery] = useState<Address>({
    typeId: 2, // Delivery address
    salutation: undefined,
    name1: "",
    name2: "",
    name3: "",
    company: "",
    address1: "",
    address2: "",
    address3: "",
    zip: "",
    town: "",
    countryId: 0,
    email: "",
    phone: "",
    isDefault: false,
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    type: "billing" | "delivery"
  ) => {
    const { name, value } = e.target;
    if (type === "billing") {
      setBilling((prev) => ({ ...prev, [name]: name === "countryId" ? Number(value) : value }));
    } else {
      setDelivery((prev) => ({ ...prev, [name]: name === "countryId" ? Number(value) : value }));
    }
  };

  const countryOptions = Object.entries(PlentyCountry)
    .map(([name, id]) => ({ id, name }))
    .sort((a, b) => {
      if (a.name.localeCompare(b.name) === 0) {
        return a.id - b.id;
      }
      return a.name.localeCompare(b.name);
    });

  useEffect(() => {
    const bag: CartItem[] = JSON.parse(localStorage.getItem("bag") || "[]");
    setCartItems(bag);
    setSubtotal(
      bag.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    );
  }, []);

  const buildOrderItems = (): OrderItem[] => {
    return cartItems.map((item) => ({
      typeId: 4, // product line item
      itemId: item.id,
      variationId: item.variationId,
      quantity: item.quantity,
      amounts: [
        {
          currency: "EUR",
          priceOriginalNet: Number(Number(item.price).toFixed(2)), // Ensure item.price is a number
          priceOriginalGross: Number(Number(item.price).toFixed(2)), // Ensure item.price is a number
        },
      ],
    }));
  };

  const handleMolliePay = async () => {
    if (subtotal <= 0) {
      alert("Cart is empty.");
      return;
    }

    try {
      setLoading(true);

      const deliveryAddress = showDelivery ? delivery : billing;

      const orderItemsPayload = buildOrderItems();

      console.log("Order Items:", buildOrderItems());

      const res = await fetch(`${apiUrl}/create-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderItems: orderItemsPayload,
          billing,
          delivery: deliveryAddress,
          redirectUrl: `${window.location.origin}/order-success`,
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
            className="flex flex-col md:flex-row gap-8 items-start md:items-center border-b pb-6 mb-6" // Align items to the left on mobile
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-40 h-50 object-cover rounded" // Slightly increased size for mobile
            />
            <div className="flex-1 text-left"> {/* Align text to the left */}
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
                    Vorher: € {Number(item.oldPrice).toFixed(2)}
                  </div>
                  <div className="text-green-600 text-sm">
                    Sie sparen: €{" "}
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
              name="name1"
              value={billing.name1}
              onChange={(e) => handleInputChange(e, "billing")}
              className="w-full border rounded px-4 py-3 mb-4"
              placeholder="First Name"
            />
            <input
              name="name2"
              value={billing.name2}
              onChange={(e) => handleInputChange(e, "billing")}
              className="w-full border rounded px-4 py-3 mb-4"
              placeholder="Middle Name"
            />
            <input
              name="name3"
              value={billing.name3}
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
              name="countryId"
              value={billing.countryId}
              onChange={(e) => handleInputChange(e, "billing")}
              className="w-full border rounded px-4 py-3 mb-4"
            >
              <option value="">Select country</option>
              {countryOptions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
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
              name="town"
              value={billing.town}
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
            <>
              <input
                name="name1"
                value={delivery.name1}
                onChange={(e) => handleInputChange(e, "delivery")}
                className="w-full border rounded px-4 py-3 mb-4"
                placeholder="First Name*"
              />
              <input
                name="name2"
                value={delivery.name2}
                onChange={(e) => handleInputChange(e, "delivery")}
                className="w-full border rounded px-4 py-3 mb-4"
                placeholder="Middle Name"
              />
              <input
                name="name3"
                value={delivery.name3}
                onChange={(e) => handleInputChange(e, "delivery")}
                className="w-full border rounded px-4 py-3 mb-4"
                placeholder="Last Name*"
              />
              <input
                name="town"
                value={delivery.town}
                onChange={(e) => handleInputChange(e, "delivery")}
                className="w-full border rounded px-4 py-3 mb-4"
                placeholder="City*"
              />
              <select
                name="countryId"
                value={delivery.countryId}
                onChange={(e) => handleInputChange(e, "delivery")}
                className="w-full border rounded px-4 py-3 mb-4"
              >
                <option value="">Select country</option>
                {countryOptions.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
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
                value={delivery.town}
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
            </>
          )}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleMolliePay}
          disabled={loading}
          className="bg-black text-white p-5 font-bold text-lg rounded mb-4 cursor-pointer hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Weiterleitung..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
}