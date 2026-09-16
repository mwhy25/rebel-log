'use client';

import { useState } from 'react';
import SiteComments from './SiteComments';
import GiscusComments from './GiscusComments';

export default function CommentsTabs({ logId }) {
  const [tab, setTab] = useState('site');

  const tabBtn = (active) => ({
    background: active ? 'var(--red)' : 'transparent',
    color: active ? 'var(--black)' : 'var(--white)',
    border: '1px solid var(--red)',
    padding: '0.6rem 1.4rem',
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    fontSize: '0.85rem',
    cursor: 'pointer',
  });

  return (
    <div style={{ marginTop: '3rem' }}>
      <div className="section-head" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h2 className="section-title" style={{ fontSize: '1.6rem' }}>Komentar</h2>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '2rem' }}>
        <button style={tabBtn(tab === 'site')} onClick={() => setTab('site')}>Komentar Website</button>
        <button style={tabBtn(tab === 'google')} onClick={() => setTab('google')}>Komentar via Google</button>
      </div>

      {tab === 'site' ? <SiteComments logId={logId} /> : <GiscusComments logId={logId} />}
    </div>
  );
}
