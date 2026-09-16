'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CATEGORY_LABEL, formatDateLong } from '../lib/categories';
import Thumbnail from './Thumbnail';

const FILTERS = [
  { key: 'all', label: 'Semua' },
  { key: 'shorts', label: 'Shorts' },
  { key: 'creator', label: 'AI Creator' },
  { key: 'edukasi', label: 'Edukasi' },
  { key: 'novel', label: 'Novel' },
];

export default function Works({ logs }) {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? logs : logs.filter((item) => item.kategori === filter);

  return (
    <section id="works">
      <div className="section-head">
        <span className="section-num">04</span>
        <div>
          <h2 className="section-title">Hasil Karya</h2>
          <p className="section-desc">Kumpulan konten yang sudah dirilis, tersusun rapi seperti koleksi trofi.</p>
        </div>
      </div>

      <div className="filter-row">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={'filter-btn' + (filter === f.key ? ' active' : '')}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="content-grid">
        {filtered.length === 0 && (
          <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>Belum ada karya di kategori ini.</p>
        )}

        {filtered.map((item) => (
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
  );
}
