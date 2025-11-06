import { useEffect, useState } from "react";
import { PlentyCountry } from "../models/enums/PlentyCountry";

interface CartItem {
  id: number;
  itemId: number;
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
  referrerId?: number;
  itemVariationId: number;
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
  const [promocode, setPromocode] = useState("");
  const [promoApplied, setPromoApplied] = useState<any>(null);
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

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

  const validatePromocode = async () => {
    if (!promocode.trim()) {
      setPromoError("Please enter a promocode");
      return;
    }

    try {
      setPromoLoading(true);
      setPromoError("");

      const res = await fetch(`${apiUrl}/validate-promocode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: promocode,
          subtotal: subtotal
        }),
      });

      const data = await res.json();

      if (res.ok && data.valid) {
        setPromoApplied(data);
        setPromoError("");
      } else {
        setPromoError(data.error || "Invalid promocode");
        setPromoApplied(null);
      }
    } catch (err) {
      setPromoError("Failed to validate promocode");
      setPromoApplied(null);
    } finally {
      setPromoLoading(false);
    }
  };

  const removePromocode = () => {
    setPromoApplied(null);
    setPromocode("");
    setPromoError("");
  };

  const buildOrderItems = (): OrderItem[] => {

    console.log("Building order items from cart:", cartItems);

    return cartItems.map((item) => ({
      typeId: 4, // product line item
      itemVariationId: item.id,
      referrerId: item.itemId,
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

  const validateRequiredFields = (): boolean => {
    const errors: string[] = [];
    
    // Validate billing address required fields
    if (!billing.name1.trim()) errors.push("First name is required");
    if (!billing.name3?.trim()) errors.push("Last name is required");
    if (!billing.phone?.trim()) errors.push("Mobile phone is required");
    if (!billing.email?.trim()) errors.push("Email is required");
    if (!billing.countryId) errors.push("Country is required");
    if (!billing.address1.trim()) errors.push("Address line 1 is required");
    if (!billing.town.trim()) errors.push("City is required");
    if (!billing.zip.trim()) errors.push("ZIP code is required");

    // Validate delivery address if different from billing
    if (showDelivery) {
      if (!delivery.name1.trim()) errors.push("Delivery first name is required");
      if (!delivery.name3?.trim()) errors.push("Delivery last name is required");
      if (!delivery.phone?.trim()) errors.push("Delivery mobile phone is required");
      if (!delivery.countryId) errors.push("Delivery country is required");
      if (!delivery.address1.trim()) errors.push("Delivery address line 1 is required");
      if (!delivery.town.trim()) errors.push("Delivery city is required");
      if (!delivery.zip.trim()) errors.push("Delivery ZIP code is required");
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleMolliePay = async () => {
    const finalTotal = promoApplied ? promoApplied.finalAmount : subtotal;
    
    if (finalTotal <= 0) {
      alert("Cart is empty.");
      return;
    }

    // Validate required fields
    if (!validateRequiredFields()) {
      return;
    }

    try {
      setLoading(true);

      const deliveryAddress = showDelivery ? delivery : billing;

      const orderItemsPayload = buildOrderItems();

      const res = await fetch(`${apiUrl}/create-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderItems: orderItemsPayload,
          billing,
          delivery: deliveryAddress,
          redirectUrl: `${window.location.origin}/order-success`,
          promocode: promoApplied ? promoApplied.code : null,
          discount: promoApplied ? promoApplied.discountAmount : 0,
          finalAmount: finalTotal
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
        Checkout
      </h2>

      <div className="flex flex-col lg:flex-row gap-10 mb-10">
        {/* LEFT SIDE - ADDRESSES */}
        <div className="lg:w-1/2 space-y-6">
          {/* Billing Address */}
          <div className="bg-white rounded shadow p-6">
            <h3 className="font-bold text-lg mb-4 bg-black text-white px-4 py-2 rounded">
              Billing Address
            </h3>
            <form className="space-y-3">
              <input
                name="name1"
                value={billing.name1}
                onChange={(e) => handleInputChange(e, "billing")}
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="First Name"
              />
              <input
                name="name2"
                value={billing.name2}
                onChange={(e) => handleInputChange(e, "billing")}
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Middle Name (optional)"
              />
              <input
                name="name3"
                value={billing.name3}
                onChange={(e) => handleInputChange(e, "billing")}
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Last Name"
              />
              <input
                name="phone"
                value={billing.phone}
                onChange={(e) => handleInputChange(e, "billing")}
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Mobile Phone"
              />
              <input
                name="email"
                value={billing.email}
                onChange={(e) => handleInputChange(e, "billing")}
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Email"
              />
              <select
                name="countryId"
                value={billing.countryId}
                onChange={(e) => handleInputChange(e, "billing")}
                className="w-full border rounded px-3 py-2 pr-12 text-sm cursor-pointer"
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
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Address Line 1"
              />
              <input
                name="address2"
                value={billing.address2}
                onChange={(e) => handleInputChange(e, "billing")}
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Address Line 2 (optional)"
              />
              <input
                name="town"
                value={billing.town}
                onChange={(e) => handleInputChange(e, "billing")}
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="City"
              />
              <input
                name="zip"
                value={billing.zip}
                onChange={(e) => handleInputChange(e, "billing")}
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="ZIP / Postcode"
              />
            </form>
          </div>

          {/* Delivery Address */}
          <div className="bg-white rounded shadow p-6">
            <h3 className="font-bold text-lg mb-4 bg-black text-white px-4 py-2 rounded">
              Delivery Address
            </h3>
            <div className="mb-4 space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={!showDelivery}
                  onChange={() => setShowDelivery(false)}
                  className="cursor-pointer"
                />
                Same as billing address
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={showDelivery}
                  onChange={() => setShowDelivery(true)}
                  className="cursor-pointer"
                />
                Use different delivery address
              </label>
            </div>
            {showDelivery && (
              <form className="space-y-3">
                <input
                  name="name1"
                  value={delivery.name1}
                  onChange={(e) => handleInputChange(e, "delivery")}
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="First Name"
                />
                <input
                  name="name2"
                  value={delivery.name2}
                  onChange={(e) => handleInputChange(e, "delivery")}
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="Middle Name (optional)"
                />
                <input
                  name="name3"
                  value={delivery.name3}
                  onChange={(e) => handleInputChange(e, "delivery")}
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="Last Name"
                />
                <input
                  name="phone"
                  value={delivery.phone}
                  onChange={(e) => handleInputChange(e, "delivery")}
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="Mobile Phone"
                />
                <select
                  name="countryId"
                  value={delivery.countryId}
                  onChange={(e) => handleInputChange(e, "delivery")}
                  className="w-full border rounded px-3 py-2 text-sm cursor-pointer"
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
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="Address Line 1"
                />
                <input
                  name="address2"
                  value={delivery.address2}
                  onChange={(e) => handleInputChange(e, "delivery")}
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="Address Line 2 (optional)"
                />
                <input
                  name="town"
                  value={delivery.town}
                  onChange={(e) => handleInputChange(e, "delivery")}
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="City / Suburb"
                />
                <input
                  name="zip"
                  value={delivery.zip}
                  onChange={(e) => handleInputChange(e, "delivery")}
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="ZIP / Postcode"
                />
              </form>
            )}
          </div>
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded shadow p-6 sticky top-4">
            <h3 className="font-bold text-xl mb-6 bg-black text-white px-4 py-3 rounded">
              Order Summary
            </h3>
            
            {cartItems.map((item, idx) => (
              <div
                key={idx}
                className={`flex gap-4 items-center pb-4 mb-4 ${idx < cartItems.length - 1 ? 'border-b' : ''}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="font-semibold mb-1 text-sm">{item.name}</div>
                  <div className="text-xs text-gray-600 mb-1">
                    <span className="font-medium">Size:</span> {item.size}
                  </div>
                  <div className="text-xs text-gray-600 mb-1">
                    <span className="font-medium">Color:</span> {item.color}
                  </div>
                  <div className="text-xs text-gray-600">
                    <span className="font-medium">Qty:</span> {item.quantity || 1}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">
                    € {Number(item.price).toFixed(2)}
                  </div>
                  {item.oldPrice && (
                    <div className="text-gray-400 line-through text-xs">
                      € {Number(item.oldPrice).toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Promocode Section */}
            <div className="pt-4 mb-4">

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={promocode}
                  onChange={(e) => setPromocode(e.target.value)}
                  placeholder="Enter promocode"
                  className="border rounded px-3 py-2 flex-1"
                  disabled={promoApplied}
                />
                {!promoApplied ? (
                  <button
                    onClick={validatePromocode}
                    disabled={promoLoading}
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50 whitespace-nowrap cursor-pointer"
                  >
                    {promoLoading ? "Checking..." : "Apply"}
                  </button>
                ) : (
                  <button
                    onClick={removePromocode}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 whitespace-nowrap cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              {promoError && (
                <div className="text-red-600 text-sm mb-2">{promoError}</div>
              )}
              
              {promoApplied && (
                <div className="bg-green-50 border border-green-200 rounded p-3 mb-4">
                  <div className="text-green-800 font-semibold text-sm">
                    Promocode "{promoApplied.code}" applied!
                  </div>
                  <div className="text-green-600 text-sm">
                    {(promoApplied.discount * 100)}% discount: -€ {promoApplied.discountAmount.toFixed(2)}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Subtotal</span>
                <span className="font-medium">€ {subtotal.toFixed(2)}</span>
              </div>
              
              {promoApplied && (
                <div className="flex justify-between items-center">
                  <span className="text-green-600">Discount ({promoApplied.code})</span>
                  <span className="text-green-600">-€ {promoApplied.discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center pt-2 border-t font-bold text-lg">
                <span>Total</span>
                <span>€ {(promoApplied ? promoApplied.finalAmount : subtotal).toFixed(2)}</span>
              </div>
            </div>

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
                <div className="text-red-800 font-semibold text-sm mb-2">
                  Please fill in the required fields:
                </div>
                <ul className="text-red-600 text-sm list-disc list-inside">
                  {validationErrors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={handleMolliePay}
              disabled={loading}
              className="w-full bg-black text-white p-4 font-bold text-lg rounded mt-6 cursor-pointer hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "Redirecting..." : "Proceed to Payment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}