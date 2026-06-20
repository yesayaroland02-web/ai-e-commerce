"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!email || !password) {
      alert("Email dan password wajib diisi");
      return;
    }

    if (password.length < 6) {
      alert("Password minimal 6 karakter");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      console.log("DATA:", data);
      console.log("ERROR:", error);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Registrasi berhasil, silakan login");

      router.push("/admin/login");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">

        <h1 className="text-2xl font-bold text-center mb-6">
          Register Admin
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="border rounded p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border rounded p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={register}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-4 text-sm">
          Sudah punya akun?
          <Link
            href="/admin/login"
            className="text-blue-600 ml-1 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}