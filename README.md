Pertanyaan Refleksi 

1. Mengapa Anda memilih tantangan ini? 
Saya memilih tantangan ini karena menggabungkan tiga aspek yang relevan dengan teknologi modern: e-commerce, integrasi AI, dan fullstack development. Saya ingin menunjukkan kemampuan dalam membangun aplikasi end-to-end menggunakan Next.js dan Supabase, sekaligus mengimplementasikan fitur AI chatbot yang dapat meningkatkan pengalaman pengguna dalam berbelanja. Selain itu, tantangan ini memberikan kesempatan untuk mengerjakan fitur yang realistis dan sering digunakan di produk digital saat ini.

2. Bagian mana yang paling sulit?
Bagian yang paling sulit adalah integrasi antara AI chatbot dengan backend e-commerce, terutama dalam mengatur alur komunikasi antara frontend, API route di Next.js, dan layanan AI. Selain itu, mengelola environment variable di Supabase dan memastikan semuanya berjalan dengan benar di production (Vercel) juga cukup menantang, terutama terkait error build dan runtime yang tidak langsung terlihat di local environment.

3. Apabila diberikan tambahan waktu satu hari, bagian mana yang akan Anda perbaiki? 
Jika diberikan tambahan waktu satu hari, saya akan fokus pada:
a. Meningkatkan kualitas prompt dan konteks AI agar chatbot lebih akurat dalam menjawab pertanyaan produk
b. Menambahkan caching atau optimasi query Supabase untuk meningkatkan performa
c. Memperbaiki UI/UX agar lebih interaktif dan responsif, terutama pada bagian chat interface
d. Menambahkan error handling yang lebih baik di sisi frontend dan API agar lebih stabil

5. Bagaimana cara Anda melakukan scaling terhadap aplikasi ini apabila jumlah pengguna bertambah?
Untuk scaling aplikasi, saya akan melakukan beberapa pendekatan:
a. Mengoptimalkan database Supabase dengan indexing yang tepat dan query yang efisien
b. Menggunakan caching layer (seperti Redis atau edge caching) untuk mengurangi beban database dan API AI
c. Memisahkan service AI ke background worker atau queue system agar tidak membebani request utama
d. Menggunakan serverless scaling (Vercel + Supabase) yang otomatis menyesuaikan traffic
e. Menambahkan rate limiting untuk mencegah abuse pada endpoint chat AI
f. Monitoring performa dengan logging dan observability tools untuk mendeteksi bottleneck lebih cepat
