# ⚡ Quick Start Guide - RecyCool Website

Panduan cepat untuk menjalankan website RecyCool dalam 5 menit!

## 🚀 Langkah Cepat

### 1. Install Dependencies
```bash
cd recycool-website
npm install
```

### 2. Setup Supabase Database

**A. Buat Project Supabase:**
- Kunjungi [supabase.com](https://supabase.com)
- Sign up / Login
- Create New Project
- Tunggu project selesai dibuat

**B. Jalankan SQL Schema:**
- Buka **SQL Editor** di Supabase Dashboard
- Copy seluruh isi file `supabase-schema.sql`
- Paste dan klik **Run**
- Tunggu hingga selesai

**C. Ambil API Credentials:**
- Buka **Settings** > **API**
- Copy:
  - Project URL
  - anon public key

### 3. Setup Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Jalankan Development Server

```bash
npm run dev
```

### 5. Buka Browser

```
http://localhost:3000
```

---

## ✅ Test Website

### Register Account:
1. Klik "Register" di header
2. Isi form dan submit
3. Otomatis login

### View Products:
1. Klik menu "Produk"
2. Lihat 3 sample products

### Redeem (Need Points First):
1. Buat admin account dulu (lihat di bawah)
2. Login sebagai admin
3. Tambah points ke user
4. Logout, login sebagai user
5. Klik "Redeem" dan tukar poin

---

## 👤 Buat Admin Account

### Via Supabase Dashboard:
1. Register account via website
2. Buka Supabase > Table Editor > users
3. Cari user yang baru dibuat
4. Edit, ubah `role` dari `user` ke `admin`
5. Logout dan login lagi
6. Menu "Admin" sekarang muncul!

### Via SQL:
```sql
UPDATE users 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

---

## 🎯 Test Admin Features

Login sebagai admin, lalu:

### 1. Update User Points:
- Tab "Users"
- Klik "Update Points"
- Masukkan angka (misal: 1000)

### 2. Update Product Stock:
- Tab "Products"
- Klik "Update Stock"
- Ubah jumlah stock

### 3. Confirm Redemptions:
- Tab "Redemptions"
- Klik "Confirm" atau "Cancel"

### 4. Control RVM:
- Tab "RVM"
- Klik "Turn ON/OFF"

---

## 📦 File Penting

| File | Deskripsi |
|------|-----------|
| `supabase-schema.sql` | **PENTING!** SQL untuk setup database |
| `.env.local.example` | Template environment variables |
| `README.md` | Dokumentasi lengkap |
| `SETUP_INSTRUCTIONS.md` | Panduan setup detail |
| `DEPLOYMENT_GUIDE.md` | Panduan deployment lengkap |

---

## 🎨 Customization

### Ganti Warna:
Edit `app/globals.css` line 9-16

### Update Team Members:
Edit `app/about/page.tsx` line 16-45

### Tambah Products:
Di Supabase Table Editor atau via SQL

---

## 🐛 Common Issues

### "Cannot connect to database"
→ Cek credentials di `.env.local`

### "Products tidak muncul"
→ Pastikan SQL schema sudah dijalankan

### "Admin menu tidak ada"
→ Update user role ke 'admin' di database

---

## 📚 Dokumentasi Lengkap

- **Setup Detail**: Baca `SETUP_INSTRUCTIONS.md`
- **Deployment**: Baca `DEPLOYMENT_GUIDE.md`
- **Features**: Baca `README.md`

---

## 🎉 Selesai!

Website RecyCool siap digunakan! 

Fitur yang sudah tersedia:
- ✅ Login/Register
- ✅ Landing Page dengan animasi
- ✅ Product Catalog
- ✅ Redeem System dengan ticket
- ✅ About Page
- ✅ Admin Dashboard lengkap
- ✅ Green/Blue theme
- ✅ Responsive design

---

**Butuh bantuan?** 
Baca dokumentasi lengkap di folder `recycool-website/`

**Happy coding!** 🚀♻️
