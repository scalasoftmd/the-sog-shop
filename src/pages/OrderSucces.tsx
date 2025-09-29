import { useEffect, useState } from "react";

export default function OrderSuccess() {
  const [orderId, setOrderId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    // Read query params from URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("orderId");
    const amt = params.get("amount");

    if (id) setOrderId(id);
    if (amt) setAmount(amt);

    // Clear cart
    localStorage.removeItem("bag");
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-16 px-4 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-6">Thank You!</h1>
      <p className="text-lg mb-4">Your order has been successfully placed.</p>

      {orderId && (
        <p className="mb-2">
          <span className="font-semibold">Order ID:</span> {orderId}
        </p>
      )}

      {amount && (
        <p className="mb-6">
          <span className="font-semibold">Amount:</span> € {Number(amount).toFixed(2)}
        </p>
      )}

      <a
        href="/fashion"
        className="inline-block bg-black text-white p-5 rounded font-bold hover:bg-gray-800 transition"
      >
        Continue Shopping
      </a>
    </div>
  );
}
