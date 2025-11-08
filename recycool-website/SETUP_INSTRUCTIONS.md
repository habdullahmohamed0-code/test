# 🚀 Panduan Setup RecyCool Website

Panduan lengkap untuk setup website RecyCool dari awal hingga production-ready.

## 📋 Checklist Setup

- [ ] Install Node.js dan npm
- [ ] Clone/download project
- [ ] Install dependencies
- [ ] Setup Supabase project
- [ ] Jalankan SQL schema
- [ ] Setup environment variables
- [ ] Test locally
- [ ] Deploy ke production

---

## 1️⃣ Persiapan Awal

### Install Node.js
1. Download Node.js versi LTS dari [nodejs.org](https://nodejs.org)
2. Verify installation:
   ```bash
   node --version  # harus v18 atau lebih
   npm --version
   ```

### Clone Project
```bash
cd recycool-website
```

---

## 2️⃣ Setup Supabase

### Buat Project Baru
1. Kunjungi [supabase.com](https://supabase.com)
2. Sign up / Login
3. Klik "New Project"
4. Isi detail project:
   - **Name**: RecyCool
   - **Database Password**: (simpan password ini!)
   - **Region**: Southeast Asia (Singapore) - untuk performa terbaik
5. Tunggu project selesai dibuat (~2 menit)

### Jalankan SQL Schema
1. Di Supabase Dashboard, buka menu **SQL Editor**
2. Klik "New Query"
3. Copy seluruh isi file `supabase-schema.sql`
4. Paste ke SQL Editor
5. Klik **Run** (atau tekan Ctrl/Cmd + Enter)
6. Tunggu hingga selesai (ada notifikasi "Success")

### Verifikasi Database
1. Buka menu **Table Editor**
2. Pastikan tabel-tabel ini sudah ada:
   - users
   - products
   - redemptions
   - rvm_data
   - rvm_status
   - website_traffic

### Get API Credentials
1. Buka menu **Settings** > **API**
2. Copy dua values ini:
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **anon public** key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

---

## 3️⃣ Setup Environment Variables

### Create .env.local
```bash
cp .env.local.example .env.local
```

### Edit .env.local
Buka file `.env.local` dan isi dengan credentials Supabase:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**⚠️ PENTING**: 
- Jangan commit file `.env.local` ke Git
- File ini sudah ada di `.gitignore`

---

## 4️⃣ Install Dependencies

```bash
cd recycool-website
npm install
```

Tunggu hingga semua dependencies terinstall (~2-3 menit).

---

## 5️⃣ Test Locally

### Jalankan Development Server
```bash
npm run dev
```

### Buka Browser
Kunjungi: `http://localhost:3000`

### Test Fitur-Fitur

#### ✅ Test 1: Register Account
1. Klik "Register" di header
2. Isi form:
   - Full Name: "Test User"
   - Email: "test@example.com"
   - Confirm Email: "test@example.com"
   - Password: "test123"
3. Klik "Register"
4. Harus redirect ke homepage dan menampilkan user di header

#### ✅ Test 2: Login
1. Logout (klik avatar > Logout)
2. Klik "Login"
3. Isi credentials yang tadi dibuat
4. Harus berhasil login

#### ✅ Test 3: Products Page
1. Klik menu "Produk"
2. Harus menampilkan 3 sample products:
   - Gantungan Kunci RecyCool
   - Totebag Reusable
   - Coaster Set

#### ✅ Test 4: Redeem Page
1. Login dulu
2. Klik menu "Redeem"
3. Harus menampilkan available products
4. Note: User baru punya 0 points, jadi belum bisa redeem

#### ✅ Test 5: About Page
1. Klik menu "Tentang Kami"
2. Harus menampilkan info tim dan misi RecyCool

---

## 6️⃣ Setup Admin Account

### Method 1: Via Supabase Dashboard (Recommended)
1. Register account baru via website (atau gunakan yang sudah ada)
2. Buka Supabase Dashboard
3. Klik menu **Table Editor** > **users**
4. Cari user yang mau dijadikan admin
5. Klik row user tersebut untuk edit
6. Ubah column `role` dari `user` ke `admin`
7. Klik "Save"
8. Logout dan login lagi di website
9. Sekarang menu "Admin" akan muncul di header

### Method 2: Via SQL Editor
```sql
UPDATE users 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

### Test Admin Features
1. Login dengan admin account
2. Klik menu "Admin" di header
3. Test fitur-fitur:
   - View statistics
   - Update user points
   - Update product stock
   - Confirm redemptions
   - Control RVM status

---

## 7️⃣ Tambah Sample Data (Optional)

### Tambah Points ke User
Di Admin Dashboard:
1. Klik tab "Users"
2. Klik "Update Points" pada user
3. Masukkan jumlah points (misal: 1000)
4. User sekarang bisa redeem products!

### Update Product Images (Optional)
Saat ini products menggunakan placeholder icons. Untuk menambahkan gambar:

1. Upload gambar ke Supabase Storage:
   - Di dashboard, buka **Storage**
   - Create bucket baru: "product-images" (public)
   - Upload gambar products

2. Update product image_url di database:
   ```sql
   UPDATE products 
   SET image_url = 'https://your-project.supabase.co/storage/v1/object/public/product-images/keychain.jpg'
   WHERE id = 'product-id';
   ```

---

## 8️⃣ Deploy ke Production

### Option 1: Vercel (Recommended)
1. Push code ke GitHub
2. Kunjungi [vercel.com](https://vercel.com)
3. Import GitHub repository
4. Add environment variables (sama seperti .env.local)
5. Deploy!

### Option 2: Netlify
1. Push code ke GitHub
2. Kunjungi [netlify.com](https://netlify.com)
3. Import repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Add environment variables
6. Deploy!

### Update App URL
Setelah deploy, update `.env.local` (atau environment variables di hosting):
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

---

## 🔧 Troubleshooting

### Error: "Supabase connection failed"
**Solusi**:
- Cek apakah SUPABASE_URL dan SUPABASE_ANON_KEY sudah benar
- Pastikan tidak ada spasi atau karakter tambahan
- Restart dev server: `Ctrl+C` lalu `npm run dev` lagi

### Error: "Failed to fetch products"
**Solusi**:
- Pastikan SQL schema sudah dijalankan
- Cek di Supabase Table Editor apakah tabel products ada
- Cek apakah RLS policies sudah aktif

### Login/Register tidak berfungsi
**Solusi**:
- Cek network tab di browser DevTools
- Pastikan email format valid
- Password minimal 6 karakter
- Cek console untuk error messages

### Admin menu tidak muncul
**Solusi**:
- Pastikan user role sudah diubah ke 'admin'
- Logout dan login lagi
- Clear browser cache

### Styling terlihat broken
**Solusi**:
- Hapus folder `.next`: `rm -rf .next`
- Restart dev server: `npm run dev`

---

## 📚 Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/

---

## 🆘 Butuh Bantuan?

Jika mengalami kesulitan:
1. Cek error message di terminal
2. Cek browser console (F12)
3. Baca dokumentasi di README.md
4. Contact tim RecyCool

---

## ✅ Setup Complete!

Selamat! Website RecyCool sudah siap digunakan. 

**Next Steps**:
- [ ] Customize konten (text, images)
- [ ] Setup Waste2Pay RVM integration
- [ ] Add more products
- [ ] Setup email notifications (optional)
- [ ] Setup analytics (optional)
- [ ] Launch! 🚀

---

Dibuat dengan ❤️ oleh Tim RecyCool
