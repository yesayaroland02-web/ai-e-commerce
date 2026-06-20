"use client";

import { useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { supabase } from "@/lib/supabase";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function InvoicePage() {
  const params = useParams();
  const router = useRouter();
  const invoiceRef = useRef<HTMLDivElement>(null);

  const { cart, clearCart } = useCartStore();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // 🔥 UPDATE STOCK FUNCTION (SAFE REDUCE)
  const reduceStock = async () => {
    for (const item of cart) {
      const { data } = await supabase
        .from("products")
        .select("stock")
        .eq("id", item.id)
        .single();

      if (!data) continue;

      await supabase
        .from("products")
        .update({
          stock: Math.max(0, data.stock - item.quantity),
        })
        .eq("id", item.id);
    }
  };

  const downloadPDF = async () => {
    if (!invoiceRef.current) return;

    // 1. GENERATE PDF
    const canvas = await html2canvas(invoiceRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
      allowTaint: false,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save(`Invoice-${params.id}.pdf`);

    // 2. REDUCE STOCK
    await reduceStock();

    // 3. CLEAR CART
    clearCart();

    // 4. BACK TO PRODUCTS
    router.push("/admin/products");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* INVOICE AREA */}
      <div
        ref={invoiceRef}
        style={{
          backgroundColor: "#ffffff",
          color: "#000000",
          fontFamily: "Arial, sans-serif",
        }}
        className="p-6 rounded shadow"
      >
        <h1 style={{ fontSize: 28, fontWeight: "bold" }}>
          Invoice
        </h1>

        <p style={{ color: "#333", marginTop: 8 }}>
          No Invoice: {params.id}
        </p>

        <div style={{ marginTop: 20 }}>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <span>
                {item.name} x {item.quantity}
              </span>

              <span>
                Rp{" "}
                {(item.price * item.quantity).toLocaleString("id-ID")}
              </span>
            </div>
          ))}
        </div>

        <hr style={{ margin: "20px 0" }} />

        <h2 style={{ fontSize: 18, fontWeight: "bold" }}>
          Total: Rp {total.toLocaleString("id-ID")}
        </h2>

        <p style={{ color: "green", marginTop: 10, fontWeight: "bold" }}>
          Status: LUNAS
        </p>
      </div>

      {/* BUTTON */}
      <div className="mt-6">
        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Cetak Invoice & Checkout
        </button>
      </div>

    </div>
  );
}