'use client';

import { useState } from 'react';

export default function ShareButton({ title }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        // pengguna membatalkan share, tidak apa-apa
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // clipboard gagal, abaikan
    }
  }

  return (
    <button
      onClick={handleShare}
      style={{
        background: 'transparent',
        border: '1px solid var(--gray)',
        color: 'var(--white)',
        padding: '0.5rem 1rem',
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
      }}
    >
      🔗 <span>{copied ? 'Link disalin!' : 'Bagikan'}</span>
    </button>
  );
}
