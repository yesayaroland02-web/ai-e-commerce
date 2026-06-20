import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
 const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
    });

  return Response.json(model);
}