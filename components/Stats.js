import { CATEGORY_ARCANA, calculateStreak } from '../lib/categories';
import WeeklyChart from './WeeklyChart';

export default function Stats({ logs }) {
  const counts = { shorts: 0, creator: 0, edukasi: 0, novel: 0 };
  logs.forEach((item) => {
    if (counts[item.kategori] !== undefined) counts[item.kategori]++;
  });

  const streak = calculateStreak(logs);

  return (
    <section id="stats">
      <div className="section-head">
        <span className="section-num">01</span>
        <div>
          <h2 className="section-title">Confidant Status</h2>
          <p className="section-desc">Progres tiap jalur kreatif — makin sering diasah, makin naik rank-nya.</p>
        </div>
      </div>

      {streak > 0 && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'var(--black2)',
            border: '1px solid var(--gold)',
            padding: '0.6rem 1.2rem',
            marginBottom: '2rem',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            letterSpacing: '0.05em',
          }}
        >
          <span style={{ fontSize: '1.3rem' }}>🔥</span>
          <span style={{ color: 'var(--gold)' }}>{streak} hari beruntun</span>
          <span style={{ color: 'var(--gray)', fontWeight: 400, fontSize: '0.85rem' }}>tetap aktif berkarya</span>
        </div>
      )}

      <div className="arcana-grid" style={{ marginBottom: '3rem' }}>
        {Object.entries(CATEGORY_ARCANA).map(([key, arcana]) => {
          const count = counts[key] || 0;
          const rank = Math.min(9, Math.floor(count / 3));
          const pct = Math.round((rank / 9) * 100);

          return (
            <div className="arcana-card" key={key}>
              <div className="arcana-icon">{arcana.icon}</div>
              <div className="arcana-name">{arcana.name}</div>
              <div className="arcana-count">
                {count}<small> {arcana.unit}</small>
              </div>
              <div className="rank-bar">
                <div className="rank-fill" style={{ width: pct + '%' }} />
              </div>
              <div className="rank-label">
                <span>Rank {rank}</span>
                <span>{arcana.unit}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cal-wrap">
        <div className="cal-head">
          <div className="cal-month" style={{ fontSize: '1.1rem' }}>Aktivitas 8 Minggu Terakhir</div>
        </div>
        <WeeklyChart logs={logs} />
      </div>
    </section>
  );
}
