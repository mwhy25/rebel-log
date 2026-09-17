Taruh file gambar karaktermu di sini dengan nama persis: hero-character.png

Kode di components/Hero.js sudah mengarah ke /hero-character.png,
yang otomatis dibaca dari folder public/ ini oleh Next.js.

Kalau nama file/formatnya beda (misal .jpg), ganti juga baris
src="/hero-character.png" di components/Hero.js supaya cocok.

---

Tambahkan juga file og-default.png (ukuran disarankan 1200x630px) di folder
ini. Gambar ini yang muncul sebagai preview saat kamu share link situs ke
WhatsApp/Twitter/Discord, untuk halaman yang belum punya thumbnail sendiri.
