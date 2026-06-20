import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json({ error: "Message kosong" }, { status: 400 });
    }

    const { data: products, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      console.error("Supabase error:", error);
    }

    const safeProducts = products ?? [];

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // 🔥 lebih stabil dari pro
    });

    const prompt = `
Kamu adalah AI toko online.

DATA PRODUK:
${JSON.stringify(safeProducts)}

USER:
${message}

Jawab hanya berdasarkan produk yang tersedia.
Jika tidak ada, bilang tidak tersedia.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return Response.json({ answer: text });

  } catch (err: unknown) {
  console.error("CHAT ERROR:", err);

  const message =
    err instanceof Error ? err.message : "Unknown error";

  return Response.json(
    {
      error: "AI error",
      detail: message,
    },
    { status: 500 }
  );
}
}