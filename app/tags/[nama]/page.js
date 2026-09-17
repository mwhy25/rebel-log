import Link from 'next/link';
import { sb } from '../../../lib/supabase';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Thumbnail from '../../../components/Thumbnail';
import { CATEGORY_LABEL, formatDateLong } from '../../../lib/categories';

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const tag = decodeURIComponent(params.nama);
  return {
    title: `#${tag}`,
    description: `Semua karya dengan tag ${tag} di REBEL LOG.`,
  };
}

export default async function TagPage({ params }) {
  const tag = decodeURIComponent(params.nama);

  const { data, error } = await sb
    .from('logs')
    .select('*')
    .contains('tags', [tag])
    .order('date', { ascending: false });

  const items = error || !data ? [] : data;

  return (
    <>
      <Navbar />
      <section>
        <Link href="/#works" className="detail-back">
          &larr; Kembali ke Hasil Karya
        </Link>

        <div className="section-head" style={{ marginTop: '1.5rem' }}>
          <div>
            <h2 className="section-title">#{tag}</h2>
            <p className="section-desc">
              {items.length} karya ditemukan dengan tag ini.
            </p>
          </div>
        </div>

        <div className="content-grid">
          {items.length === 0 && (
            <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>Belum ada karya dengan tag ini.</p>
          )}

          {items.map((item) => (
            <Link
              href={`/karya/${item.kategori}/${item.id}`}
              className="content-card"
              key={item.id}
              style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
            >
              <Thumbnail url={item.url_thumbnail} kategori={item.kategori} />
              <div className="content-body">
                <div className="content-cat">{CATEGORY_LABEL[item.kategori] || item.kategori}</div>
                <div className="content-title">{item.judul}</div>
                <div className="content-date">{formatDateLong(item.date)}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
