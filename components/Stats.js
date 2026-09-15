import { CATEGORY_ARCANA } from '../lib/categories';

export default function Stats({ logs }) {
  const counts = { shorts: 0, creator: 0, edukasi: 0, novel: 0 };
  logs.forEach((item) => {
    if (counts[item.kategori] !== undefined) counts[item.kategori]++;
  });

  return (
    <section id="stats">
      <div className="section-head">
        <span className="section-num">01</span>
        <div>
          <h2 className="section-title">Confidant Status</h2>
          <p className="section-desc">Progres tiap jalur kreatif — makin sering diasah, makin naik rank-nya.</p>
        </div>
      </div>

      <div className="arcana-grid">
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
    </section>
  );
}
