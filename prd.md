1. Product Overview

Product Name:
Koloni Food & Space Website

Type:
Smart Cafe Ordering Website (Prototype)

Objective:
Menyediakan sistem pemesanan mandiri berbasis QR Code untuk meningkatkan efisiensi pelayanan restoran.

2. Target Users
Customer
Scan QR meja
Melihat menu
Memesan makanan
Membayar via QRIS
Admin
Mengelola menu
Melihat pesanan
Update status order
3. Core Features
✅ Landing Page
Hero section Koloni
About Koloni
Gallery
Location Map
Contact
✅ Digital Menu
Kategori makanan
Foto menu
Harga
Deskripsi
Add to cart
✅ QR Table System

Setiap meja punya URL:

koloni.vercel.app/table/01
koloni.vercel.app/table/02

QR ditempel di meja.

✅ Order System

Customer:

Pilih menu
Input jumlah
Checkout

System:

Generate order ID
Simpan database
✅ QRIS Payment (Prototype Mode)

Flow:

User checkout
Website tampilkan QRIS
User bayar manual
Klik tombol:
✅ "Saya Sudah Bayar"

(untuk TA ini cukup — tidak perlu real payment gateway)

✅ Admin Dashboard

Admin bisa:

Tambah menu
Edit menu
Hapus menu
Lihat pesanan masuk
Update status:
Pending
Cooking
Ready
4. Non Functional Requirements
Mobile First Design
Fast loading
Responsive
Deployable via Vercel
No paid hosting required
5. Technology Stack
Layer	Technology
Frontend	Next.js
Styling	Tailwind
Database	Supabase
AI Coding	Gemini API
Deployment	Vercel
Payment	QRIS Prototype
6. Success Criteria

✅ Customer bisa order via QR
✅ Admin menerima order
✅ Payment simulation berjalan
✅ Website live di Vercel