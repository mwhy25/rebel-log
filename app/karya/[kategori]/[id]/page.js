import Link from 'next/link';
import { notFound } from 'next/navigation';
import { sb } from '../../../../lib/supabase';
import { CATEGORY_LABEL, formatDateLong } from '../../../../lib/categories';
import MediaPlayer from '../../../../components/MediaPlayer';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import ShareButton from '../../../../components/ShareButton';
import Reactions from '../../../../components/Reactions';
import CommentsTabs from '../../../../components/CommentsTabs';

export const revalidate = 0;

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

export async function generateMetadata({ params }) {
  const { data: item } = await sb
    .from('logs')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!item) {
    return { title: 'Karya tidak ditemukan' };
  }

  const plainText = stripHtml(item.catatan_html || item.catatan);
  const description = plainText.slice(0, 160) || CATEGORY_LABEL[item.kategori] || item.kategori;
  const ogImage = item.url_thumbnail || '/og-default.png';

  return {
    title: item.judul,
    description,
    openGraph: {
      title: item.judul,
      description,
      images: [{ url: ogImage }],
      type: 'article',
      publishedTime: item.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: item.judul,
      description,
      images: [ogImage],
    },
  };
}

export default async function KaryaDetailPage({ params }) {
  const { data: item, error } = await sb
    .from('logs')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !item) {
    notFound();
  }

  // Kalau kategori di URL tidak cocok dengan data asli, tetap tampilkan
  // (mencegah link lama/salah ketik jadi 404), tapi tautan lain akan pakai kategori yang benar.

  const isiLengkap = item.catatan_html || (item.catatan ? `<p>${item.catatan}</p>` : '');
  const tags = item.tags || [];

  return (
    <>
      <Navbar />
      <section className="detail-wrap">
        <Link href="/#works" className="detail-back">
          &larr; Kembali ke Hasil Karya
        </Link>

        <div className="detail-grid">
          <div className="detail-main">
            <div className="content-cat" style={{ marginBottom: '0.5rem' }}>
              {CATEGORY_LABEL[item.kategori] || item.kategori}
            </div>
            <h1 className="detail-title">{item.judul}</h1>
            <p className="section-desc" style={{ marginBottom: '1.5rem' }}>{formatDateLong(item.date)}</p>

            <MediaPlayer url={item.url_thumbnail} />

            {isiLengkap && (
              <div
                className="rich-content"
                style={{ marginTop: '2rem' }}
                dangerouslySetInnerHTML={{ __html: isiLengkap }}
              />
            )}

            {item.url_link && (
              <div style={{ marginTop: '1.5rem' }}>
                <a
                  href={item.url_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-source-link"
                >
                  🔗 Lihat Sumber Asli &rarr;
                </a>
              </div>
            )}

            {tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem' }}>
                {tags.map((tag) => (
                  <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="detail-tag-pill">
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {!isiLengkap && !item.url_thumbnail && (
              <p style={{ color: 'var(--gray)', marginTop: '2rem' }}>
                Belum ada detail tambahan untuk karya ini.
              </p>
            )}
          </div>

          <aside className="detail-side">
            <div className="detail-side-box">
              <Reactions logId={item.id} />
              <div style={{ marginTop: '1rem' }}>
                <ShareButton title={item.judul} />
              </div>
            </div>
          </aside>
        </div>

        <div className="detail-comments">
          <CommentsTabs logId={item.id} />
        </div>
      </section>
      <Footer />
    </>
  );
}
