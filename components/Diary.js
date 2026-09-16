import Link from 'next/link';
import { CATEGORY_SHORT_LABEL, formatDateShort } from '../lib/categories';
import { truncateHtml } from '../lib/truncate';

export default function Diary({ logs }) {
  const recent = logs.slice(0, 20);

  return (
    <section id="log" style={{ background: 'var(--black2)' }}>
      <div className="section-head">
        <span className="section-num">02</span>
        <div>
          <h2 className="section-title">Activity Diary</h2>
          <p className="section-desc">Catatan harian — apa yang dikerjakan, kapan, dan hasil apa yang keluar.</p>
        </div>
      </div>

      <div className="log-list">
        {recent.length === 0 && (
          <p style={{ color: 'var(--gray)', fontSize: '0.9rem', padding: '1rem 0' }}>
            Belum ada log. Isi lewat halaman /admin
          </p>
        )}

        {recent.map((item) => {
          const fullHtml = item.catatan_html || (item.catatan ? `<p>${item.catatan}</p>` : '');
          const { preview, isTruncated } = truncateHtml(fullHtml, 500);
          const detailUrl = `/karya/${item.kategori}/${item.id}`;

          return (
            <div className="diary-card" key={item.id}>
              <div className="diary-row diary-row-top">
                <div className="diary-card-title">{item.judul}</div>
                <div className="log-tag">
                  <span>{CATEGORY_SHORT_LABEL[item.kategori] || item.kategori}</span>
                </div>
              </div>

              <div className="diary-row diary-row-bottom">
                <div className="diary-card-date">{formatDateShort(item.date)}</div>
                <div className="diary-card-content">
                  {preview && (
                    <div className="diary-card-body" dangerouslySetInnerHTML={{ __html: preview }} />
                  )}

                  {(isTruncated || fullHtml) && (
                    <Link href={detailUrl} className="diary-see-more">
                      {isTruncated ? 'Lebih Lengkap →' : 'Lihat detail →'}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
