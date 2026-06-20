"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email.trim()) {
      alert("Email wajib diisi");
      return;
    }

    if (!password.trim()) {
      alert("Password wajib diisi");
      return;
    }

    try {
      setLoading(true);

      console.log("EMAIL:", email);
      console.log("PASSWORD:", password);

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      console.log("DATA:", data);
      console.log("ERROR:", error);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Login berhasil");

      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">

        <h1 className="text-2xl font-bold text-center mb-6">
          Login Admin
        </h1>

        <input
          type="email"
          value={email}
          className="border p-2 w-full mb-3 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          value={password}
          className="border p-2 w-full mb-4 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          disabled={loading}
          className="bg-black text-white w-full py-2 rounded hover:bg-gray-800 disabled:bg-gray-400"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <p className="text-center mt-4 text-sm">
          Belum punya akun?
          <Link
            href="/admin/register"
            className="text-blue-600 ml-1 hover:underline"
          >
            Silakan Registrasi
          </Link>
        </p>

      </div>
    </div>
  );
}