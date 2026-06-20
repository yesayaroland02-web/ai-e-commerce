"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NewProductPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      let imageUrl = "";

      if (image) {
        const fileName = `${Date.now()}-${image.name}`;

        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(fileName, image);

        if (uploadError) {
          alert(uploadError.message);
          return;
        }

        const {
          data: { publicUrl },
        } = supabase.storage
          .from("products")
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      const { error } = await supabase
        .from("products")
        .insert([
          {
            name: form.name,
            description: form.description,
            price: Number(form.price),
            category: form.category,
            stock: Number(form.stock),
            image_url: imageUrl,
          },
        ]);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Produk berhasil ditambahkan");
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Tambah Produk
      </h1>

      <div className="space-y-4">

        <input
          placeholder="Nama Produk"
          className="w-full border p-3 rounded"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <textarea
          placeholder="Deskripsi Produk"
          className="w-full border p-3 rounded"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Harga"
          className="w-full border p-3 rounded"
          value={form.price}
          onChange={(e) =>
            setForm({
              ...form,
              price: e.target.value,
            })
          }
        />

        <input
          placeholder="Kategori"
          className="w-full border p-3 rounded"
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Stok"
          className="w-full border p-3 rounded"
          value={form.stock}
          onChange={(e) =>
            setForm({
              ...form,
              stock: e.target.value,
            })
          }
        />

        <div>
          <label className="block mb-2 font-medium">
            Upload Gambar
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded disabled:bg-gray-400"
        >
          {loading
            ? "Menyimpan..."
            : "Simpan Produk"}
        </button>

      </div>
    </div>
  );
}