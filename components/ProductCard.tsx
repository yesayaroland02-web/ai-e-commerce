"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    image_url: string;
  };
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity: 1,
    });

    alert("Produk ditambahkan ke cart");
  };

  return (
    <div className="bg-white rounded-xl shadow border overflow-hidden hover:shadow-lg transition">

      <div className="relative h-56 w-full">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            No Image
          </div>
        )}
      </div>

      <div className="p-4">

        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
          {product.category}
        </span>

        <h2 className="font-bold text-xl mt-2">
          {product.name}
        </h2>

        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        <p className="text-green-600 font-bold text-lg mt-3">
          Rp{" "}
          {product.price.toLocaleString("id-ID")}
        </p>

        <p className="text-sm text-gray-500">
          Stok: {product.stock}
        </p>

        <div className="flex gap-2 mt-4">

          <Link
            href={`/products/${product.id}`}
            className="flex-1 text-center border py-2 rounded hover:bg-gray-100"
          >
            Detail
          </Link>

          <button
            onClick={handleAddToCart}
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Add Cart
          </button>

        </div>
      </div>
    </div>
  );
}