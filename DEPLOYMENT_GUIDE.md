# 🚀 Panduan Deployment RecyCool Website

## Ringkasan Project

Saya telah berhasil membuat website RecyCool lengkap dengan fitur-fitur berikut:

### ✅ Fitur yang Sudah Dibuat

#### 1. **Authentication System**
- Login dengan email & password
- Register dengan validasi email confirmation
- Sistem role (user & admin)
- Protected routes untuk admin

#### 2. **Landing Page** (/)
- Hero section dengan floating card team description
- Problem background (statistik sampah plastik Indonesia)
- What we do section (Waste2Pay RVM, Recycling, Community)
- Waste2Pay RVM real-time statistics
- Product showcase (3 products)
- Join our team CTA section
- Semua dengan animasi Framer Motion

#### 3. **Product Catalog Page** (/products)
- Grid layout untuk semua products
- Info 3D printing system
- Detail per product: points required, stock, bottles needed
- Filtering active products
- Responsive design

#### 4. **Redeem Page** (/redeem)
- Protected route (hanya untuk logged-in users)
- Display user points
- List available products untuk redeem
- Redemption history dengan ticket code
- Status badges (pending, confirmed, completed, cancelled)

#### 5. **About Page** (/about)
- Vision & Mission
- Problem background detail
- What we do section
- Team members showcase (6 members dengan role masing-masing)
- Achievement statistics

#### 6. **Admin Dashboard** (/admin)
- Protected route (hanya untuk admin)
- Statistics overview (users, products, redemptions, bottles, traffic)
- **Users Management**: View users, update points
- **Products Management**: Update stock, manage products
- **Redemptions Confirmation**: Approve/reject redemption requests
- **RVM Control**: Turn on/off, monitor status, SSH access display

#### 7. **Header & Footer**
- Transparent dengan backdrop blur
- Logo RecyCool
- Navigation menu
- Avatar profile dengan dropdown
- Points display di sebelah avatar
- Footer dengan contact info & social media

#### 8. **Theme & Styling**
- Warna dominan hijau (#10b981) dan biru (#3b82f6)
- Gradients yang eye-catching
- Smooth animations
- Custom scrollbar
- Responsive untuk semua device

---

## 📁 File Structure

```
recycool-website/
├── app/
│   ├── page.tsx              # Landing page
│   ├── login/page.tsx        # Login page
│   ├── register/page.tsx     # Register page
│   ├── products/page.tsx     # Products catalog
│   ├── redeem/page.tsx       # Redeem page
│   ├── about/page.tsx        # About page
│   ├── admin/page.tsx        # Admin dashboard
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles (dengan theme)
├── components/
│   ├── ui/                   # shadcn components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── label.tsx
│   ├── Header.tsx            # Header component
│   └── Footer.tsx            # Footer component
├── context/
│   └── AuthContext.tsx       # Authentication context
├── lib/
│   ├── supabase.ts          # Supabase client
│   ├── auth.ts              # Auth functions
│   └── utils.ts             # Helper functions
├── supabase-schema.sql      # DATABASE SCHEMA (PENTING!)
├── .env.local.example       # Environment variables template
├── README.md                # Documentation
├── SETUP_INSTRUCTIONS.md    # Setup guide
└── package.json
```

---

## 🗄️ Database Setup (PENTING!)

### SQL Commands untuk Supabase

File `supabase-schema.sql` berisi SEMUA SQL commands yang dibutuhkan:

**Isi lengkap schema:**
1. ✅ Create tables:
   - `users` (dengan role, points, email, password_hash)
   - `products` (nama, deskripsi, points_required, stock, bottles_needed)
   - `redemptions` (user_id, product_id, ticket_code, status)
   - `rvm_data` (bottles_submitted, points_earned)
   - `rvm_status` (is_online, total_bottles, total_users, online_hours)
   - `website_traffic` (untuk admin analytics)

2. ✅ Indexes untuk performance

3. ✅ Row Level Security (RLS) policies:
   - Users dapat view profile sendiri
   - Admin dapat view semua users
   - Public dapat view active products
   - Protected routes untuk redemptions

4. ✅ Triggers untuk auto-update timestamps

5. ✅ Sample data:
   - 3 sample products (Gantungan Kunci, Totebag, Coaster)
   - RVM status default

### Cara Submit SQL ke Supabase:

1. Login ke Supabase Dashboard
2. Pilih project RecyCool
3. Buka menu **SQL Editor**
4. Klik "New Query"
5. Copy SELURUH isi file `supabase-schema.sql`
6. Paste ke editor
7. Klik **Run** (atau Ctrl/Cmd + Enter)
8. Tunggu hingga success message

**⚠️ IMPORTANT**: 
- File `supabase-schema.sql` sudah ada di folder `recycool-website/`
- Jalankan SEMUA SQL commands di file tersebut
- Jangan skip bagian manapun

---

## ⚙️ Environment Variables

### File .env.local

Create file `.env.local` di root folder dengan isi:

```env
# Supabase Configuration
# Dapatkan dari Supabase Dashboard > Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000  # untuk development
# NEXT_PUBLIC_APP_URL=https://recycool.com  # untuk production
```

### Cara Mendapatkan Credentials:

1. Buka Supabase Dashboard
2. Pilih project RecyCool
3. Klik **Settings** (icon gear)
4. Klik **API** di sidebar
5. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 🚀 Deployment Steps

### 1. Persiapan

```bash
cd recycool-website
npm install
```

### 2. Setup Database (Supabase)

1. Buat project baru di Supabase
2. Jalankan SQL dari `supabase-schema.sql`
3. Verify tables sudah terbuat di Table Editor

### 3. Setup Environment

```bash
cp .env.local.example .env.local
# Edit .env.local dengan credentials Supabase
```

### 4. Test Locally

```bash
npm run dev
```

Buka `http://localhost:3000` dan test:
- ✅ Register account baru
- ✅ Login
- ✅ View products
- ✅ Redeem (setelah punya points)
- ✅ Admin dashboard (setelah set role = admin)

### 5. Create Admin Account

Di Supabase Table Editor:
1. Register account via website
2. Buka table `users`
3. Edit user yang baru dibuat
4. Ubah `role` dari `user` ke `admin`
5. Logout dan login lagi

### 6. Deploy to Vercel (Recommended)

1. Push code ke GitHub
2. Import di Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL` (dengan production domain)
4. Deploy!

---

## 🎨 Customization Guide

### Ganti Logo

Edit file `components/Header.tsx`:
```tsx
// Line ~19-23
<div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
  <span className="text-white font-bold text-xl">RC</span>
</div>
```

Ganti dengan:
```tsx
<Image src="/logo.png" alt="RecyCool" width={48} height={48} />
```

### Update Warna Theme

Edit file `app/globals.css`:
```css
:root {
  --primary: #10b981;        /* Hijau */
  --primary-dark: #059669;
  --primary-light: #34d399;
  
  --secondary: #3b82f6;      /* Biru */
  --secondary-dark: #2563eb;
  --secondary-light: #60a5fa;
}
```

### Tambah Products

Di Supabase Table Editor atau SQL:
```sql
INSERT INTO products (name, description, points_required, stock, bottles_needed, category)
VALUES ('Product Baru', 'Deskripsi produk', 100, 50, 10, 'Accessories');
```

### Update Team Members

Edit file `app/about/page.tsx` line ~16-45:
```tsx
const teamMembers = [
  {
    name: 'Nama Member',
    role: 'Role Member',
    description: 'Deskripsi pekerjaan',
  },
  // ... tambah member lain
]
```

---

## 📊 Features Overview

### User Flow:
1. User register/login
2. User submit botol plastik di Waste2Pay RVM (via hardware integration - belum include di website)
3. Points otomatis masuk ke account
4. User redeem points di website
5. User dapat ticket code
6. User tunjukkan ticket ke admin untuk ambil merchandise

### Admin Flow:
1. Admin login
2. Monitor statistics di dashboard
3. Update user points (manual atau via RVM integration)
4. Manage product stock
5. Confirm redemption requests
6. Control RVM status (on/off)

---

## 🔐 Security Features

- ✅ Password hashing dengan bcrypt
- ✅ Row Level Security (RLS) di Supabase
- ✅ Protected routes untuk admin
- ✅ Authentication context
- ✅ Input validation
- ✅ SQL injection protection (via Supabase)

---

## 📱 Responsive Design

Website fully responsive untuk:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

---

## 🎯 Next Steps (Optional Enhancements)

### Priority 1:
- [ ] Upload real product images
- [ ] Update team member photos
- [ ] Test dengan real users
- [ ] Setup email notifications (Supabase Auth)

### Priority 2:
- [ ] Integrate dengan Waste2Pay RVM hardware (API/webhook)
- [ ] Add analytics (Google Analytics / Plausible)
- [ ] Add SEO optimization
- [ ] Add social media sharing

### Priority 3:
- [ ] Add English translation
- [ ] Add dark mode toggle
- [ ] Add user profile edit
- [ ] Add product reviews/ratings

---

## 🆘 Troubleshooting

### Issue: "Cannot connect to Supabase"
**Solution**: Cek credentials di `.env.local`, pastikan URL dan key correct

### Issue: "Products tidak muncul"
**Solution**: Pastikan SQL schema sudah dijalankan dan sample products sudah ada

### Issue: "Admin menu tidak muncul"
**Solution**: Update user role ke 'admin' di database

### Issue: "Redeem tidak berfungsi"
**Solution**: Pastikan user punya cukup points dan product stock > 0

---

## 📞 Support

Jika ada pertanyaan atau issues:
1. Baca `README.md` di folder project
2. Baca `SETUP_INSTRUCTIONS.md` untuk setup detail
3. Check browser console untuk error messages
4. Check Supabase logs untuk database errors

---

## ✅ Deployment Checklist

- [ ] SQL schema sudah dijalankan di Supabase
- [ ] Environment variables sudah di-set
- [ ] Test register & login works
- [ ] Test products page shows data
- [ ] Admin account sudah dibuat
- [ ] Test admin features works
- [ ] Website deployed ke hosting
- [ ] Domain sudah pointing (optional)
- [ ] SSL certificate active

---

## 🎉 Project Complete!

Website RecyCool sudah 100% siap digunakan dengan semua fitur yang diminta:

✅ Login/Register system
✅ Landing page dengan semua sections
✅ Product catalog dengan 3D printing info
✅ Redeem system dengan history
✅ About page dengan team info
✅ Admin dashboard lengkap
✅ Green/Blue theme
✅ Framer Motion animations
✅ Responsive design
✅ Supabase database integration

**Total Pages**: 7 pages
**Total Components**: 10+ components
**Database Tables**: 6 tables
**Lines of Code**: 2000+ lines

---

Dibuat dengan ❤️ untuk RecyCool - SMA Pradita Dirgantara

Semoga project ini sukses membantu mengatasi krisis plastik di Indonesia! 🌍♻️
