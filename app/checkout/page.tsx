"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutPage() {
  const router = useRouter();

  const { cart } = useCartStore();

  const total = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  const handlePayment = () => {
    const invoiceId =
      "INV-" + Date.now();

    router.push(
      `/invoice/${invoiceId}`
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Checkout
      </h1>

      <div className="border p-4 rounded">
        <h2 className="font-bold mb-3">
          Transfer Bank
        </h2>

        <p>Bank BCA</p>
        <p>1234567890</p>
        <p>a.n. PT Toko Laptop</p>

        <hr className="my-4" />

        <p>
          Total:
          Rp{" "}
          {total.toLocaleString("id-ID")}
        </p>

        <button
          onClick={handlePayment}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Saya Sudah Transfer
        </button>
      </div>
    </div>
  );
}