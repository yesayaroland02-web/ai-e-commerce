🚀 AI E-Commerce Chatbot

A modern AI-powered e-commerce application built with Next.js, Supabase, and Gemini AI integration to deliver an interactive shopping experience.

📦 Tech Stack
Next.js (App Router)
Supabase (Auth + Database)
Tailwind CSS
Gemini AI API
Vercel (Deployment)
🚀 Cara Menjalankan Setelah Deploy

Aplikasi sudah berhasil di-deploy menggunakan Vercel.

🔗 1. Akses aplikasi

👉 https://ai-e-commerce-seven.vercel.app

🔐 2. Login sebagai Admin

Akses halaman admin:

👉 https://ai-e-commerce-seven.vercel.app/admin/login

Login menggunakan akun yang sudah terdaftar di Supabase Auth.

Jika berhasil, akan diarahkan ke:

/admin/dashboard
🛍️ 3. Flow Penggunaan (User Side)
1. Browse Produk
Masuk ke halaman utama
Melihat daftar produk dari database Supabase
2. Detail Produk
Klik produk
Lihat detail (harga, deskripsi, stok)
3. AI Chatbot
User dapat bertanya ke AI
AI memberikan rekomendasi produk sesuai kebutuhan
4. Add to Cart
Klik “Add to Cart”
Produk masuk ke keranjang
5. Checkout (jika tersedia)
Melakukan proses pemesanan
Data tersimpan ke tabel orders
🧑‍💻 4. Flow Admin

Setelah login admin, fitur yang tersedia:

➕ Tambah produk
✏️ Edit produk
🗑️ Hapus produk
📦 Lihat order masuk
📊 Monitoring data (jika tersedia dashboard)
⚠️ 5. Catatan Penting
Semua data disimpan di Supabase
Authentication menggunakan Supabase Auth
Jika login gagal:
Pastikan user sudah terdaftar di Supabase
Cek environment variables di Vercel
🧠 6. Architecture
User → Next.js Frontend → API Routes (Next.js) → Supabase
                                     ↓
                                Gemini AI API
🚀 7. Deployment
Frontend: Vercel
Backend: Next.js API Routes (Serverless)
Database: Supabase (PostgreSQL)
Auth: Supabase Auth
AI: Gemini API
✨ Features
✅ Completed Features
Product listing (CRUD)
AI Chatbot product recommendation
Supabase authentication
Shopping cart system
Order management
Chat history storage
Responsive UI
⏳ Future Improvements
Payment gateway integration (Midtrans / Stripe)
Advanced recommendation system (ML-based)
Admin analytics dashboard
Product search optimization (Elasticsearch)
Real-time chat streaming improvements
🤖 AI Tools Used
Google Gemini API
Digunakan untuk chatbot dan product recommendation
Prompt engineering untuk memahami intent user
Menjaga konteks percakapan

AI diintegrasikan melalui Next.js API Routes (/app/api/chat).

⚖️ Technical Tradeoffs
1. Supabase vs Custom Backend

Menggunakan Supabase untuk mempercepat development.

Tradeoff:

✔ cepat & scalable
❌ kontrol backend lebih terbatas
2. Serverless Deployment (Vercel)

Pros:

Mudah deploy
Auto scaling

Cons:

Cold start latency
Tidak cocok untuk proses panjang
3. External AI API

Pros:

Implementasi cepat
Hasil AI berkualitas

Cons:

Tergantung API limit & cost
Latency tergantung network
4. Simple Recommendation Logic

Menggunakan:

Prompt-based AI
Basic filtering database

Tradeoff:

✔ cepat dibangun
❌ tidak sepersonal ML-based system
📊 Database Schema

Tables:

products
carts
cart_items
orders
order_items
chat_history
profiles

Detail schema tersedia di schema.sql.

👨‍💻 Author

Yesaya Roland Steven

💡 Notes

Project ini dibuat sebagai technical assessment yang berfokus pada:

Fullstack development
AI integration
Database design
Scalable architecture fundamentals
