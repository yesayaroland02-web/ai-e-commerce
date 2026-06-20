"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    async function getProduct() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        alert(error.message);
        return;
      }

      setName(data.name ?? "");
      setDescription(data.description ?? "");
      setPrice(String(data.price ?? ""));
      setCategory(data.category ?? "");
      setStock(String(data.stock ?? ""));
      setImageUrl(data.image_url ?? "");

      setLoading(false);
    }

    if (id) {
      getProduct();
    }
  }, [id]);

  const updateProduct = async () => {
    try {
      setSaving(true);

      let finalImageUrl = imageUrl;

      if (image) {
        const fileName =
          Date.now() + "-" + image.name;

        const { error: uploadError } =
          await supabase.storage
            .from("products")
            .upload(fileName, image);

        if (uploadError) {
          alert(uploadError.message);
          return;
        }

        const { data } = supabase.storage
          .from("products")
          .getPublicUrl(fileName);

        finalImageUrl = data.publicUrl;
      }

      const { error } = await supabase
        .from("products")
        .update({
          name,
          description,
          price: Number(price),
          category,
          stock: Number(stock),
          image_url: finalImageUrl,
        })
        .eq("id", id);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Produk berhasil diupdate");

      router.push("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Edit Produk
      </h1>

      <div className="space-y-4">

        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="w-48 h-48 object-cover rounded border"
          />
        )}

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded"
          placeholder="Nama Produk"
        />

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full border p-3 rounded"
          placeholder="Deskripsi"
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-3 rounded"
          placeholder="Harga"
        />

        <input
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="w-full border p-3 rounded"
          placeholder="Kategori"
        />

        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full border p-3 rounded"
          placeholder="Stok"
        />

        <div>
          <label className="block mb-2">
            Upload Gambar Baru
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(
                e.target.files?.[0] || null
              )
            }
          />
        </div>

        <button
          onClick={updateProduct}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          {saving
            ? "Mengupdate..."
            : "Update Produk"}
        </button>

      </div>
    </div>
  );
}