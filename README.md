# Rebel Log

Diary kreator konten AI bertema Persona 5, dibangun dengan Next.js + Supabase.

## Struktur folder

```
app/
  page.js         -> halaman utama (/), merakit semua komponen
  admin/page.js   -> halaman admin (/admin), form input log
  layout.js       -> kerangka HTML dasar
  globals.css     -> semua styling visual
components/
  Navbar.js       -> menu navigasi atas
  Hero.js         -> judul besar di awal halaman
  Stats.js        -> kartu "Confidant Status" (4 kategori)
  Diary.js        -> daftar log harian
  Calendar.js     -> kalender bulanan dengan navigasi
  Works.js        -> grid hasil karya + filter kategori
  Footer.js       -> footer
lib/
  supabase.js     -> koneksi ke Supabase (satu tempat, dipakai di semua file)
  categories.js   -> label, warna, dan format tanggal kategori
```

Kalau mau ubah tampilan salah satu bagian, buka file komponennya saja di atas.
Tidak perlu edit file lain.

## Setup dari nol

### 1. Install Node.js
Download dan install dari https://nodejs.org (pilih versi LTS).

### 2. Install dependency project
Buka folder ini di terminal / Command Prompt, lalu jalankan:

```
npm install
```

Ini akan membuat folder `node_modules` (jangan dihapus, jangan di-upload ke GitHub).

### 3. Isi kredensial Supabase
Salin file `.env.local.example` jadi `.env.local`, lalu isi dengan URL dan
anon key project Supabase kamu (Project Settings > API di dashboard Supabase):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_KEY=isi-anon-public-key-di-sini
```

### 4. Jalankan di komputer sendiri (opsional, untuk coba-coba dulu)

```
npm run dev
```

Buka http://localhost:3000 di browser.

### 5. Upload ke GitHub
- Buat repository baru di GitHub
- Upload semua file KECUALI `node_modules`, `.next`, dan `.env.local`
  (kalau pakai `git`, `.gitignore` sudah mengatur ini otomatis)

### 6. Deploy ke Vercel
- Buka vercel.com > Add New Project > pilih repo GitHub kamu
- Sebelum klik Deploy, buka bagian "Environment Variables", tambahkan:
  - `NEXT_PUBLIC_SUPABASE_URL` = url project Supabase kamu
  - `NEXT_PUBLIC_SUPABASE_KEY` = anon key Supabase kamu
- Klik Deploy

Setelah selesai, situs online di alamat seperti `nama-project.vercel.app`,
dan halaman admin ada di `nama-project.vercel.app/admin`.

## Cara menambah konten baru sehari-hari

Cukup buka `/admin` di website yang sudah online, isi form, klik simpan.
Tidak perlu edit kode atau upload ulang apapun.

## Cara mengubah desain nanti

Semua warna dan style ada di `app/globals.css`. Struktur tiap bagian ada di
folder `components/`. Edit file yang relevan saja, simpan, lalu upload ulang
ke GitHub — Vercel otomatis re-deploy dalam waktu singkat.
