# RecyCool Website

Website resmi RecyCool - Gerakan keberlanjutan untuk Indonesia yang lebih hijau. Dibangun dengan Next.js 15, Supabase, dan Tailwind CSS.

![RecyCool](https://img.shields.io/badge/RecyCool-Green%20%26%20Blue-success)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-Database-green)

## 🌟 Fitur Utama

### Untuk Pengguna
- **Authentication System**: Login dan register dengan email & password
- **Landing Page**: Informasi lengkap tentang RecyCool dan krisis plastik di Indonesia
- **Product Catalog**: Katalog merchandise dari plastik daur ulang
- **Redeem System**: Tukar poin dengan merchandise
- **History**: Riwayat redemption dengan ticket code
- **Profile Management**: Lihat profil dan poin yang dimiliki

### Untuk Admin
- **Dashboard Statistics**: Overview website traffic, users, products, dan RVM data
- **User Management**: Kelola users dan update points
- **Product Management**: Kelola stok dan detail produk
- **Redemption Confirmation**: Konfirmasi atau cancel redemption requests
- **RVM Control**: Monitor dan kontrol Waste2Pay RVM (online/offline, SSH access)

## 🎨 Design

Website ini menggunakan tema warna hijau dan biru yang mencerminkan:
- **Hijau (Green)**: Recycle - Penghijauan dan keberlanjutan
- **Biru (Blue)**: Cool - Kesegaran dan inovasi

Design mengikuti inspirasi dari sewakuli.com dengan:
- Header dan footer transparan dengan backdrop blur
- Avatar profile di pojok kanan atas
- Points display di sebelah avatar
- Animasi smooth menggunakan Framer Motion

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Database**: Supabase (PostgreSQL)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📦 Instalasi

### Prerequisites
- Node.js 18+ 
- npm atau yarn
- Akun Supabase

### Setup

1. **Clone repository**
   ```bash
   cd recycool-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Supabase**
   - Buat project baru di [Supabase](https://supabase.com)
   - Jalankan SQL schema dari file `supabase-schema.sql` di SQL Editor Supabase
   - Copy URL dan Anon Key dari Settings > API

4. **Setup Environment Variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` dan isi dengan credentials Supabase kamu:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

5. **Jalankan development server**
   ```bash
   npm run dev
   ```

6. **Buka browser**
   ```
   http://localhost:3000
   ```

## 🗄️ Database Schema

Database menggunakan Supabase PostgreSQL dengan tabel:

- **users**: Data pengguna (email, password, role, points)
- **products**: Data merchandise (nama, deskripsi, points_required, stock)
- **redemptions**: History redemption pengguna
- **rvm_data**: Data submisi botol plastik
- **rvm_status**: Status dan statistik RVM
- **website_traffic**: Data traffic website

Semua SQL commands ada di file `supabase-schema.sql`.

## 👤 Default Admin Account

Setelah menjalankan SQL schema, buat admin account dengan cara:

1. Register melalui website
2. Update role user tersebut di Supabase Dashboard:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
   ```

## 📝 Struktur Project

```
recycool-website/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page
│   ├── login/             # Login page
│   ├── register/          # Register page
│   ├── products/          # Products catalog
│   ├── redeem/            # Redeem page
│   ├── about/             # About page
│   ├── admin/             # Admin dashboard
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn UI components
│   ├── Header.tsx        # Header component
│   └── Footer.tsx        # Footer component
├── context/              # React Context
│   └── AuthContext.tsx   # Authentication context
├── lib/                  # Utilities
│   ├── supabase.ts       # Supabase client
│   ├── auth.ts           # Auth functions
│   └── utils.ts          # Helper functions
├── public/               # Static files
└── supabase-schema.sql   # Database schema
```

## 🎯 Fitur Unggulan

### 1. Waste2Pay RVM Integration
Website terintegrasi dengan Reverse Vending Machine (RVM) yang dapat:
- Menerima botol plastik
- Memberikan poin otomatis ke user
- Menampilkan statistik real-time

### 2. Gamification System
- User mendapat poin dari submisi botol plastik
- Poin dapat ditukar dengan merchandise
- Sistem ticket untuk redemption

### 3. Admin Dashboard Lengkap
- Monitoring real-time
- User dan product management
- RVM control dan monitoring
- Redemption confirmation system

## 🌍 Impact

RecyCool bertujuan untuk:
- Mengurangi 64 juta ton sampah plastik di Indonesia
- Meningkatkan kesadaran tentang daur ulang
- Memberdayakan 400+ anggota komunitas
- Menciptakan ekonomi sirkular dari sampah plastik

## 🤝 Kontribusi

Untuk berkontribusi:
1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Project ini dibuat untuk SMA Pradita Dirgantara - RecyCool Team.

## 📞 Kontak

- Email: recycool@praditadirgantara.sch.id
- Website: [RecyCool](#)
- Instagram: [@recycool.id](#)

---

Dibuat dengan ❤️ oleh Tim RecyCool - SMA Pradita Dirgantara
