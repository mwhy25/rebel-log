# Rebel Log

Diary kreator konten AI bertema Persona 5, dibangun dengan Next.js + Supabase.

## Struktur folder

```
app/
  page.js         -> halaman utama (/), merakit semua komponen
  admin/page.js   -> halaman admin (/admin), dibungkus AdminGate
  api/check-password/route.js -> cek password admin di server
  karya/[id]/page.js -> halaman detail per karya
  layout.js       -> kerangka HTML dasar
  globals.css     -> semua styling visual
components/
  Navbar.js       -> menu navigasi atas
  Hero.js         -> judul besar di awal halaman
  Stats.js        -> kartu "Confidant Status", streak, dan grafik mingguan
  WeeklyChart.js  -> grafik batang aktivitas 8 minggu terakhir
  Diary.js        -> daftar log harian
  Calendar.js     -> kalender bulanan dengan navigasi
  Works.js        -> grid hasil karya + filter kategori, kartu bisa diklik
  Thumbnail.js    -> thumbnail cerdas (YouTube/gambar/ikon) untuk kartu karya
  MediaPlayer.js  -> embed video/gambar penuh untuk halaman detail
  Footer.js       -> footer
  AdminGate.js    -> form login sebelum admin bisa diakses
  AdminForm.js    -> form tambah & edit log (isi asli halaman admin)
lib/
  supabase.js     -> koneksi ke Supabase (satu tempat, dipakai di semua file)
  categories.js   -> label, format tanggal, dan hitung streak
  media.js        -> deteksi jenis link (YouTube / gambar)
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

### 3. Isi kredensial Supabase dan password admin
Salin file `.env.local.example` jadi `.env.local`, lalu isi dengan URL dan
anon key project Supabase kamu (Project Settings > API di dashboard Supabase),
serta password bebas untuk melindungi halaman `/admin`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_KEY=isi-anon-public-key-di-sini
ADMIN_PASSWORD=ganti-dengan-password-rahasia-kamu
```

Catatan: `ADMIN_PASSWORD` sengaja TIDAK diberi awalan `NEXT_PUBLIC_` supaya
tidak pernah terkirim ke browser — hanya bisa dibaca di server lewat API route.

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
  - `ADMIN_PASSWORD` = password bebas untuk melindungi halaman /admin
- Klik Deploy

Setelah selesai, situs online di alamat seperti `nama-project.vercel.app`,
dan halaman admin ada di `nama-project.vercel.app/admin`.

## Kolom tabel `logs` di Supabase

Pastikan tabel `logs` di Supabase punya kolom-kolom berikut:

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | int8 | primary key, auto increment |
| date | date | tanggal konten |
| judul | text | judul konten |
| kategori | text | shorts / creator / edukasi / novel |
| catatan | text | catatan singkat versi lama (masih dipakai sebagai fallback) |
| catatan_html | text | isi lengkap hasil editor WYSIWYG |
| url_thumbnail | text | link YouTube atau link gambar langsung (opsional) |
| url_link | text | link referensi tunggal, misal YouTube/Instagram (opsional) |
| tags | text[] | array tag bebas, misal {sains,komedi} (opsional) |

Plus dua tabel baru: `comments` dan `reactions`. Jalankan file
`setup-fitur-baru.sql` yang disertakan di paket ini lewat Supabase SQL Editor
untuk membuat semuanya sekaligus (aman dijalankan berkali-kali, tidak akan
error kalau kolom/tabel sudah ada). Untuk kolom `tags`, jalankan juga file
`setup-tags.sql`.

## Cara menambah konten baru sehari-hari

Cukup buka `/admin` di website yang sudah online, isi form, klik simpan.
Tidak perlu edit kode atau upload ulang apapun.

## Cara mengubah desain nanti

Semua warna dan style ada di `app/globals.css`. Struktur tiap bagian ada di
folder `components/`. Edit file yang relevan saja, simpan, lalu upload ulang
ke GitHub — Vercel otomatis re-deploy dalam waktu singkat.

## Fitur tambahan

### Edit log
Di halaman `/admin`, klik tombol "Edit" pada log manapun di daftar "Log
tersimpan terbaru". Form di atas otomatis terisi data log tersebut — ubah
yang perlu, klik "Update log". Klik "Batal" untuk kembali ke mode tambah baru.

### Halaman detail per karya
Setiap kartu di "Hasil Karya" sekarang bisa diklik, menuju halaman
`/karya/[id]` yang menampilkan video (embed YouTube), gambar penuh, atau
catatan lengkap (misalnya isi novel) tergantung apa yang diisi di form admin.

### Streak dan grafik mingguan
Bagian "Confidant Status" sekarang menampilkan:
- Badge "🔥 X hari beruntun" kalau kamu aktif mengisi log berturut-turut
- Grafik batang jumlah konten per minggu, 8 minggu terakhir

### Thumbnail di samping (layout horizontal)
Kartu di "Hasil Karya" sekarang menampilkan thumbnail di sisi kiri dan info
di kanan (menyesuaikan otomatis jadi vertikal di layar HP kecil).

### Editor WYSIWYG (Tiptap)
Field "Catatan / isi lengkap" di form admin sekarang berupa editor visual —
bisa bold, italic, heading, list, kutipan, dan link, tanpa perlu menulis kode
HTML manual. Hasilnya otomatis dirender rapi di halaman detail.

### Link referensi
Field "Link referensi" di form admin untuk satu link tujuan (YouTube,
Instagram, dll). Muncul sebagai tombol "Lihat Sumber Asli" di halaman detail.

### Share dan Like/Dislike
Di halaman detail ada tombol Bagikan (pakai share native HP, atau copy link
di desktop) dan tombol like/dislike yang tersimpan permanen di Supabase.
Satu pengunjung (dikenali lewat ID anonim di browser) hanya bisa memilih
salah satu reaksi per karya.

### Activity Diary dengan preview WYSIWYG
Diary di halaman utama sekarang menampilkan judul + preview isi (hasil format
dari editor WYSIWYG), dibatasi maksimal 1000 karakter. Kalau isi lebih
panjang, muncul link "See more" menuju halaman detail lengkap.

### Routing berdasar kategori
URL halaman detail sekarang mengikuti kategori kontennya:
`/karya/[kategori]/[id]` — misalnya `/karya/novel/12` atau `/karya/shorts/5`.

### Tags
Field baru "Tags" di form admin (pisahkan dengan koma, contoh:
`sains, komedi, tutorial`). Tampil sebagai pill kecil di halaman detail.

### Halaman detail full-responsive
Halaman detail sekarang pakai layout dua kolom di layar lebar (desktop):
konten utama di kiri, kotak like/dislike + share yang menempel (sticky) di
kanan. Di tablet/HP otomatis berubah jadi satu kolom penuh.

### SEO dan Open Graph
- Setiap halaman detail karya sekarang punya judul, deskripsi, dan gambar
  preview otomatis (diambil dari thumbnail karya tersebut) — jadi kalau
  link-nya di-share ke WhatsApp/Twitter/Discord, tampilannya rapi dan
  relevan, bukan cuma "REBEL LOG" generik.
- `sitemap.xml` dan `robots.txt` dibuat otomatis (lihat `app/sitemap.js` dan
  `app/robots.js`), membantu situs lebih mudah diindex Google.
- **Penting:** isi `NEXT_PUBLIC_SITE_URL` di `.env.local` dan Environment
  Variables Vercel dengan domain asli situsmu (tanpa garis miring di akhir),
  supaya semua URL yang digenerate benar.
- Taruh gambar `og-default.png` (1200x630px) di folder `public/` sebagai
  gambar preview default untuk halaman yang belum punya thumbnail sendiri.

### Halaman tag (bisa diklik)
Tag di halaman detail sekarang bisa diklik, menuju halaman `/tags/[nama]`
yang menampilkan semua karya dengan tag yang sama — seperti fitur tag di
blog/WordPress pada umumnya.

### Gambar karakter di Hero
Bagian hero (judul besar di awal halaman) sekarang punya slot gambar di sisi
kanan. Taruh file gambar (PNG dengan background transparan disarankan) di
`public/hero-character.png` — Next.js otomatis membacanya lewat path
`/hero-character.png` yang sudah diatur di `components/Hero.js`.

Kalau nama file atau formatnya beda, ubah baris `src="/hero-character.png"`
di `components/Hero.js` supaya sesuai.

### Komentar (2 tab)
Ada dua cara berkomentar di halaman detail:
- **Komentar Website** — tersimpan langsung ke tabel `comments` di Supabase,
  cukup isi nama dan pesan, tidak perlu login apapun.
- **Komentar via Google** — memakai widget gratis [Giscus](https://giscus.app),
  pengunjung login pakai akun Google (lewat GitHub) untuk berkomentar.

  **Cara setup Giscus (sekali saja):**
  1. Buat repository baru di GitHub, khusus untuk komentar (boleh dikosongkan, publik)
  2. Di repo itu, aktifkan **Discussions** lewat Settings > Features
  3. Install app **giscus** dari https://github.com/apps/giscus ke repo tersebut
  4. Buka https://giscus.app, isi nama repo kamu di form yang tersedia,
     nanti muncul potongan kode berisi `data-repo-id` dan `data-category-id`
  5. Salin nilai-nilai itu ke `.env.local` dan Environment Variables Vercel:
     `NEXT_PUBLIC_GISCUS_REPO`, `NEXT_PUBLIC_GISCUS_REPO_ID`,
     `NEXT_PUBLIC_GISCUS_CATEGORY`, `NEXT_PUBLIC_GISCUS_CATEGORY_ID`

  Kalau langkah ini dilewati, tab "Komentar via Google" akan menampilkan
  pesan bahwa fitur belum diaktifkan — tidak akan error.

