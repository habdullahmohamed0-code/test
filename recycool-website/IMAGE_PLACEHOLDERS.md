# Image Placeholders Guide

This document lists all the image placeholders in the RecyCool website that you need to replace with actual images.

## 📸 Images to Replace

### 1. **Logo / Brand Images**

#### Header Logo
- **Location**: `components/Header.tsx` line ~18-24
- **Current**: `https://via.placeholder.com/48x48/22c55e/ffffff?text=RC`
- **Size**: 48x48 pixels
- **Format**: PNG with transparent background recommended
- **Description**: RecyCool logo to display in the header

### 2. **Landing Page** (`app/page.tsx`)

#### Hero Team Photo
- **Location**: Line ~96
- **Current**: `https://via.placeholder.com/600x700/22c55e/ffffff?text=RecyCool+Team`
- **Size**: 600x700 pixels (or 6:7 aspect ratio)
- **Description**: Main team photo showing RecyCool members and/or the Waste2Pay RVM
- **Suggestion**: Use a professional team photo with good lighting

#### Product Images (3 images)
- **Location**: Lines ~488-495 (in product map loop)
- **Current**: Dynamic placeholders based on product category
  - Accessories: Green placeholder
  - Bags: Blue placeholder
  - Home Decor: Teal placeholder
- **Size**: 400x300 pixels (4:3 aspect ratio)
- **Description**: Photos of actual merchandise products
- **Products to photograph**:
  1. Gantungan Kunci RecyCool (Keychain)
  2. Totebag Reusable
  3. Coaster Set

### 3. **About Page** (`app/about/page.tsx`)

#### Team Member Photos (5 images)
- **Location**: Lines ~20-38 (teamMembers array)
- **Current**: 
  - Ahmad Rizki: `https://via.placeholder.com/200x200/22c55e/ffffff?text=AR`
  - Siti Nurhaliza: `https://via.placeholder.com/200x200/0ea5e9/ffffff?text=SN`
  - Budi Santoso: `https://via.placeholder.com/200x200/14b8a6/ffffff?text=BS`
  - Dewi Lestari: `https://via.placeholder.com/200x200/22c55e/ffffff?text=DL`
  - Farhan Hidayat: `https://via.placeholder.com/200x200/0ea5e9/ffffff?text=FH`
- **Size**: 200x200 pixels (1:1 square aspect ratio)
- **Format**: JPEG or PNG
- **Description**: Professional headshots of team members
- **Tips**: 
  - Use consistent background or style
  - Good lighting
  - Smile and professional attire
  - Crop to show face and upper shoulders

### 4. **Products Page** (`app/products/page.tsx`)

#### Product Images (All Products)
- **Location**: Lines ~101-108 (in product map loop)
- **Current**: Dynamic placeholders based on category
- **Size**: 400x300 pixels (4:3 aspect ratio)
- **Description**: High-quality photos of all products in catalog
- **Tips**:
  - White or neutral background
  - Good lighting from multiple angles
  - Show product from best angle
  - Include size reference if possible

---

## 🔄 How to Replace Images

### Option 1: Using Supabase Storage (Recommended for Production)

1. **Upload to Supabase**:
   ```sql
   -- Create storage bucket
   INSERT INTO storage.buckets (id, name, public)
   VALUES ('product-images', 'product-images', true);
   ```

2. **Upload images** via Supabase Dashboard:
   - Go to Storage > product-images
   - Upload your images
   - Copy the public URL

3. **Update database**:
   ```sql
   UPDATE products 
   SET image_url = 'https://your-project.supabase.co/storage/v1/object/public/product-images/keychain.jpg'
   WHERE name = 'Gantungan Kunci RecyCool';
   ```

4. **Update code** to use `image_url` from database instead of placeholder

### Option 2: Using /public folder (For Testing)

1. Place images in `/public/images/` folder:
   ```
   /public/
     /images/
       /logo/
         recycool-logo.png
       /team/
         ahmad-rizki.jpg
         siti-nurhaliza.jpg
         ... (other team members)
       /products/
         keychain.jpg
         totebag.jpg
         coaster.jpg
   ```

2. Update image paths in code:
   ```tsx
   // Example for logo
   <Image
     src="/images/logo/recycool-logo.png"
     alt="RecyCool Logo"
     width={48}
     height={48}
   />
   
   // Example for team member
   <Image
     src="/images/team/ahmad-rizki.jpg"
     alt="Ahmad Rizki"
     width={200}
     height={200}
   />
   ```

### Option 3: Using External CDN

1. Upload images to image hosting service (Cloudinary, Imgur, etc.)
2. Copy the URL
3. Replace placeholder URLs with actual URLs

---

## 📏 Image Specifications

| Image Type | Recommended Size | Aspect Ratio | Format | Max File Size |
|------------|-----------------|--------------|---------|---------------|
| Logo | 48x48 - 512x512px | 1:1 | PNG | 100KB |
| Hero Image | 600x700px | 6:7 | JPEG/PNG | 500KB |
| Product Photos | 400x300px | 4:3 | JPEG | 300KB |
| Team Photos | 200x200px | 1:1 | JPEG | 150KB |

---

## 🎨 Photography Tips

### For Product Photos:
- ✅ Use natural lighting or softbox
- ✅ Plain white or light gray background
- ✅ Multiple angles (front, side, detail)
- ✅ Show actual product made from recycled plastic
- ✅ Clean and professional appearance

### For Team Photos:
- ✅ Consistent background for all members
- ✅ Professional but friendly expression
- ✅ Good lighting (avoid harsh shadows)
- ✅ Similar framing for all photos
- ✅ High resolution for clarity

### For Hero/Banner Images:
- ✅ Show team in action with RVM
- ✅ Include school or project branding
- ✅ Happy and energetic vibe
- ✅ Good composition and framing

---

## 🔍 Quick Find & Replace Guide

### Files to Update:

1. **`components/Header.tsx`**
   - Line ~18: Logo image

2. **`app/page.tsx`**
   - Line ~96: Hero team photo
   - Line ~488: Product images (dynamic)

3. **`app/about/page.tsx`**
   - Lines ~20-38: Team member photos in array

4. **`app/products/page.tsx`**
   - Line ~101: Product images (dynamic)

### Search for:
```
https://via.placeholder.com
```

Replace with your actual image URLs.

---

## ✅ Checklist

- [ ] RecyCool logo (48x48)
- [ ] Hero team photo (600x700)
- [ ] Product photos:
  - [ ] Gantungan Kunci / Keychain
  - [ ] Totebag Reusable
  - [ ] Coaster Set
  - [ ] Any additional products
- [ ] Team member photos (5 photos, 200x200 each):
  - [ ] Ahmad Rizki
  - [ ] Siti Nurhaliza
  - [ ] Budi Santoso
  - [ ] Dewi Lestari
  - [ ] Farhan Hidayat

---

## 💡 Pro Tips

1. **Optimize images** before uploading:
   - Use tools like TinyPNG, ImageOptim, or Squoosh
   - Reduce file size without losing quality
   - Faster page load times

2. **Use consistent naming**:
   ```
   logo-recycool.png
   team-ahmad-rizki.jpg
   product-keychain.jpg
   product-totebag.jpg
   ```

3. **Keep originals**: Save high-res originals in case you need to re-export

4. **Alt text**: When replacing images, ensure alt text is descriptive and meaningful

---

For questions or issues with image implementation, refer to the main README.md or SETUP_INSTRUCTIONS.md.
