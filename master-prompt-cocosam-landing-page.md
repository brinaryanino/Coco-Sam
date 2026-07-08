# Master Prompt: Landing Page CocoSam (Next.js)

Copy-paste seluruh prompt di bawah ini ke AI coding agent (Antigravity/Cursor/dll).

---

## PROMPT

```
Buatkan landing page satu halaman (single page) menggunakan Next.js 14 (App Router) 
dan Tailwind CSS untuk brand berikut:

BRAND: CocoSam
PRODUK: Virgin Coconut Oil (VCO) 100% murni
TARGET PASAR: B2B — SPA, Resto, Hotel, dan Villa (bukan konsumen retail individu)
LOKASI: Lombok, Indonesia
TAGLINE UTAMA: "100% VCO murni untuk SPA, Resto, Hotel, dan Villa"
SUB-TAGLINE: "Repacking menarik, siap supply untuk bisnismu"

## STRUKTUR HALAMAN

### 1. Navbar
- Logo CocoSam (ikon kelapa hijau, simple, minimalist)
- Menu: Beranda, Produk, Manfaat, Testimoni, Kontak
- CTA button di kanan: "Hubungi via WhatsApp" (warna hijau, rounded)

### 2. Hero Section
- Headline besar: "Turunkan Kolesterol, Jaga Metabolisme"
- Sub-headline: "Virgin Coconut Oil 100% murni untuk kebutuhan bisnis SPA, 
  Resto, Hotel & Villa kamu"
- Foto produk (botol VCO CocoSam dengan background kelapa & daun tropis)
- 2 CTA button: "Pesan via WhatsApp" (primary) dan "Lihat Manfaat" (secondary, 
  scroll ke section benefit)
- Badge kecil: "100% Nature" + "Halal Certified" + "BPOM"

### 3. Trust Badges Section (strip horizontal)
- Logo/badge: Halal Indonesia, BPOM RI, 100% Nature
- Text kecil: "Diproduksi oleh IKM Al-Amin, Lombok - Indonesia"

### 4. Benefit Section (grid 2 kolom atau card grid)
Tampilkan sebagai card dengan icon checklist hijau:
- Bantu menurunkan kolesterol jahat (LDL)
- Tingkatkan metabolisme & energi tubuh
- Meningkatkan imunitas
- Baik untuk pencernaan & kesehatan kulit
- Menjaga kesehatan jantung
- Perawatan tubuh alami
- Pengganti minyak sehari-hari
- Memperkuat sistem imun
- Membantu mengelola diabetes

### 5. Kenapa Pilih CocoSam untuk Bisnismu (B2B focus section)
- Section khusus meyakinkan hotel/spa/resto/villa owner:
  - "Kualitas konsisten untuk kebutuhan supply rutin"
  - "Kemasan repacking bisa disesuaikan brand kamu"
  - "Harga khusus untuk pemesanan dalam jumlah besar (bulk order)"
  - "Sudah dipercaya oleh berbagai villa & resto di Lombok"
- Layout: 3-4 kolom feature card dengan icon

### 6. Produk Detail Section
- Foto produk dari berbagai angle (bottle shot, ingredient shot, lifestyle shot 
  dengan kelapa & daun tropis)
- Info produk:
  - Nama: Virgin Coconut Oil (VCO)
  - Net: 100ml (dan sebutkan bisa custom size untuk B2B)
  - Ingredient: Coconut fresh (100% natural, no heating process)
  - Cara pakai: untuk konsumsi (1 sendok makan/hari dewasa), untuk kulit & 
    rambut (aplikasikan merata)

### 7. Testimoni / Social Proof Section
- Placeholder untuk foto testimoni guest/klien (villa, resto, hotel yang 
  sudah pakai CocoSam)
- Layout carousel atau grid foto dengan caption singkat
- Quote testimoni singkat (buatkan 2-3 dummy quote yang bisa diedit nanti, 
  contoh: "Tamu villa kami selalu suka VCO dari CocoSam, kualitasnya premium 
  dan cocok untuk treatment spa" — [Nama Villa/Owner])

### 8. Proses Produksi (opsional, membangun trust)
- Foto/section singkat proses produksi yang bersih dan higienis
- Text: "Diproduksi langsung dari kelapa segar Lombok, tanpa proses pemanasan, 
  menjaga nutrisi alami tetap terjaga"

### 9. CTA Section (sebelum footer)
- Background hijau/kontras
- Headline: "Siap Supply Kebutuhan Bisnismu?"
- Sub-text: "Hubungi kami sekarang untuk penawaran khusus bulk order"
- Button besar: "Chat via WhatsApp" (link ke wa.me dengan nomor placeholder 
  081945058627, pesan default: "Halo CocoSam, saya tertarik untuk kerja sama 
  supply VCO untuk bisnis saya")

### 10. Footer
- Logo CocoSam
- Kontak: WhatsApp, alamat singkat (Lombok, Indonesia)
- Social media icon (Instagram: @cocosam02)
- Copyright text

## DESIGN GUIDELINES
- Color palette: hijau natural (#2D5F3F atau sejenis), putih/cream sebagai 
  background, aksen coklat kelapa (#8B5A2B) untuk detail
- Font: modern sans-serif, clean, readable (contoh: Inter atau Poppins)
- Style: natural, organic, clean — bukan flashy/corporate, karena produk 
  ini natural/wellness product
- Fully responsive (mobile-first, karena target hotel/villa owner kemungkinan 
  besar akses dari HP)
- Gunakan whitespace yang cukup, jangan terlalu padat
- Animasi subtle saat scroll (fade-in) untuk section, tidak perlu berlebihan
- Semua gambar produk pakai placeholder image dulu (bisa saya ganti manual 
  nanti dengan foto asli)

## TECHNICAL REQUIREMENTS
- Next.js 14 dengan App Router
- Tailwind CSS untuk styling
- Komponen dipecah per section (Hero.tsx, Benefits.tsx, Testimonials.tsx, dll) 
  agar mudah di-maintain
- Optimasi gambar pakai next/image
- Tombol WhatsApp menggunakan link format: 
  https://wa.me/6281945058627?text=[pesan yang sudah di-encode]
- SEO basic: title tag, meta description, open graph tags dengan konten 
  seputar "VCO Lombok untuk bisnis hotel spa resto villa"
- Pastikan halaman load cepat, minim dependency tambahan

Buatkan seluruh kode filenya, termasuk struktur folder yang jelas.
```

---

## Catatan Sebelum Pakai Prompt Ini

1. **Ganti nomor WhatsApp** kalau ternyata bukan nomor di label produk (081945058627) — konfirmasi dulu ke temanmu nomor mana yang aktif untuk bisnis.
2. **Testimoni dummy** di section 7 wajib diganti dengan testimoni asli dari guest/klien CocoSam sebelum publish — jangan biarkan konten fiktif tayang permanen.
3. **Foto produk asli** — setelah landing page jadi, minta temanmu kirim foto produk resolusi tinggi (bottle shot, proses produksi, testimoni klien) untuk replace placeholder image.
4. Setelah hasil pertama jadi, kamu bisa refine dengan prompt susulan seperti "buatkan versi testimoni jadi carousel" atau "tambahkan section FAQ untuk calon reseller".
