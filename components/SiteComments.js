'use client';

import { useState, useEffect } from 'react';
import { sb } from '../lib/supabase';

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'baru saja';
  if (mins < 60) return mins + ' menit lalu';
  const hours = Math.floor(mins / 60);
  if (hours < 24) return hours + ' jam lalu';
  const days = Math.floor(hours / 24);
  return days + ' hari lalu';
}

function getInitial(nama) {
  return (nama || '?').trim().charAt(0).toUpperCase();
}

export default function SiteComments({ logId }) {
  const [comments, setComments] = useState([]);
  const [nama, setNama] = useState('');
  const [isi, setIsi] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loadComments() {
    const { data, error } = await sb
      .from('comments')
      .select('*')
      .eq('log_id', logId)
      .order('created_at', { ascending: false });

    setComments(error || !data ? [] : data);
    setLoading(false);
  }

  useEffect(() => {
    loadComments();
  }, [logId]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nama.trim() || !isi.trim()) return;

    setSaving(true);
    const { error } = await sb.from('comments').insert([
      { log_id: logId, nama: nama.trim(), isi: isi.trim() },
    ]);
    setSaving(false);

    if (!error) {
      setIsi('');
      loadComments();
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Nama kamu"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />
        <textarea
          placeholder="Tulis komentar..."
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
          required
        />
        <button type="submit" className="btn" disabled={saving} style={{ maxWidth: '200px' }}>
          {saving ? 'Mengirim...' : 'Kirim Komentar'}
        </button>
      </form>

      {loading && <p style={{ color: 'var(--gray)', fontSize: '0.85rem' }}>Memuat komentar...</p>}

      {!loading && comments.length === 0 && (
        <p style={{ color: 'var(--gray)', fontSize: '0.85rem' }}>Belum ada komentar. Jadilah yang pertama!</p>
      )}

      <div>
        {comments.map((c) => (
          <div key={c.id} className="comment-item">
            <div className="comment-avatar">{getInitial(c.nama)}</div>
            <div className="comment-body">
              <div className="comment-head">
                <span className="comment-name">{c.nama}</span>
                <span className="comment-time">{timeAgo(c.created_at)}</span>
              </div>
              <p className="comment-text">{c.isi}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
