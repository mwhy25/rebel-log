import { CATEGORY_SHORT_LABEL, formatDateShort } from '../lib/categories';

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

        {recent.map((item) => (
          <div className="log-entry" key={item.id}>
            <div className="log-date">{formatDateShort(item.date)}</div>
            <div className="log-info">
              <div className="log-title">{item.judul}</div>
              <div className="log-meta">{item.catatan || ''}</div>
            </div>
            <div className="log-tag">
              <span>{CATEGORY_SHORT_LABEL[item.kategori] || item.kategori}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
