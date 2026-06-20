"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useCartStore } from "@/store/cartStore";
import ChatWidget from "@/components/ChatWidget";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image_url: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { addToCart, cart } = useCartStore();

  useEffect(() => {
    const loadProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setProducts(data || []);
      setLoading(false);
    };

    loadProducts();
  }, []);

  const handleAddToCart = async (product: Product) => {
    if (product.stock <= 0) {
      alert("Stok habis!");
      return;
    }

    // ADD TO CART
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity: 1,
    });

    // UPDATE STOCK DI SUPABASE
    const { error } = await supabase
      .from("products")
      .update({ stock: product.stock - 1 })
      .eq("id", product.id);

    if (error) {
      alert(error.message);
      return;
    }

    // UPDATE UI LOKAL
    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id
          ? { ...p, stock: p.stock - 1 }
          : p
      )
    );
  };

  const deleteProduct = async (id: string) => {
    const confirmDelete = confirm("Yakin ingin menghapus produk?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (!error) {
      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-black">
        Loading products...
      </div>
    );
  }

  return (
    <div className="p-8 bg-white min-h-screen text-black">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Product Dashboard
        </h1>

        <div className="flex gap-3">

          <Link
            href="/cart"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Cart ({cart.length})
          </Link>

          <Link
            href="/admin/products/new"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Tambah Produk
          </Link>

        </div>
      </div>

      {/* PRODUCTS */}
      {products.length === 0 ? (
        <div className="border rounded p-6">
          Belum ada produk.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl overflow-hidden shadow bg-white"
            >

              {/* IMAGE */}
              {product.image_url ? (
                <img
                  src={product.image_url}
                  className="w-full h-52 object-cover"
                />
              ) : (
                <div className="w-full h-52 bg-gray-200 flex items-center justify-center">
                  No Image
                </div>
              )}

              {/* CONTENT */}
              <div className="p-4">

                <h2 className="text-xl font-bold">
                  {product.name}
                </h2>

                <p className="text-gray-500 text-sm">
                  {product.category}
                </p>

                <p className="text-gray-700 mt-2">
                  {product.description}
                </p>

                <p className="font-bold text-green-600 text-lg mt-3">
                  Rp{" "}
                  {Number(product.price).toLocaleString("id-ID")}
                </p>

                <p className="mb-4">
                  Stok: {product.stock}
                </p>

                {/* ACTION BUTTONS */}
                <div className="flex flex-wrap gap-2">

                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock <= 0}
                    className="bg-black text-white px-3 py-2 rounded disabled:opacity-50"
                  >
                    {product.stock <= 0
                      ? "Stok Habis"
                      : "Add To Cart"}
                  </button>

                  <Link
                    href={`/admin/products/edit/${product.id}`}
                    className="bg-blue-500 text-white px-3 py-2 rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-500 text-white px-3 py-2 rounded"
                  >
                    Delete
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>
      )}

      {/* CHAT */}
      <ChatWidget />

    </div>
  );
}