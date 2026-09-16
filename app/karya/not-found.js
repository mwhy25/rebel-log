import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function KaryaNotFound() {
  return (
    <>
      <Navbar />
      <section>
        <div className="section-head">
          <div>
            <h2 className="section-title">Karya tidak ditemukan</h2>
            <p className="section-desc">Konten yang kamu cari mungkin sudah dihapus atau linknya salah.</p>
          </div>
        </div>
        <Link href="/#works" style={{ color: 'var(--red)' }}>&larr; Kembali ke Hasil Karya</Link>
      </section>
      <Footer />
    </>
  );
}
