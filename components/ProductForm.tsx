"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

interface Props {
  onSubmit: (data: {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    image_url: string;
  }) => Promise<void>;
}

export default function ProductForm({
  onSubmit,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] =
    useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] =
    useState<File | null>(null);

  const handleSubmit = async () => {
    let imageUrl = "";

    if (image) {
      const fileName =
        Date.now() + "-" + image.name;

      const { error } =
        await supabase.storage
          .from("products")
          .upload(fileName, image);

      if (error) {
        alert(error.message);
        return;
      }

      const { data } =
        supabase.storage
          .from("products")
          .getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    await onSubmit({
      name,
      description,
      price: Number(price),
      category,
      stock: Number(stock),
      image_url: imageUrl,
    });
  };

  return (
    <div className="space-y-4">
      {/* form input */}
    </div>
  );
}