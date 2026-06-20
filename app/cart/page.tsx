"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const router = useRouter();

  const { cart, removeFromCart } =
    useCartStore();

  const total = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Cart
      </h1>

      {cart.map((item) => (
        <div
          key={item.id}
          className="border p-4 mb-4 rounded"
        >
          <h2>{item.name}</h2>

          <p>
            Rp{" "}
            {item.price.toLocaleString(
              "id-ID"
            )}
          </p>

          <p>Qty: {item.quantity}</p>

          <button
            onClick={() =>
              removeFromCart(item.id)
            }
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Remove
          </button>
        </div>
      ))}

      <h2 className="text-xl font-bold mt-6">
        Total: Rp{" "}
        {total.toLocaleString("id-ID")}
      </h2>

      {cart.length > 0 && (
        <button
          onClick={() =>
            router.push("/checkout")
          }
          className="mt-4 bg-green-600 text-white px-6 py-3 rounded"
        >
          Checkout
        </button>
      )}
    </div>
  );
}