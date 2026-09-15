'use client';

import { useState, useEffect } from 'react';
import { sb } from '../../lib/supabase';

export default function AdminPage() {
  const [date, setDate] = useState('');
  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('');
  const [catatan, setCatatan] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [recent, setRecent] = useState([]);

  async function loadRecent() {
    const { data, error } = await sb
      .from('logs')
      .select('*')
      .order('date', { ascending: false })
      .limit(8);

    if (error) { setRecent([]); return; }
    setRecent(data || []);
  }

  useEffect(() => {
    loadRecent();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!date || !judul.trim() || !kategori) {
      setMsg({ type: 'err', text: 'Lengkapi tanggal, judul, dan kategori dulu.' });
      return;
    }

    setSaving(true);
    const { error } = await sb.from('logs').insert([
      { date, judul: judul.trim(), kategori, catatan: catatan.trim() },
    ]);
    setSaving(false);

    if (error) {
      setMsg({ type: 'err', text: 'Gagal menyimpan: ' + error.message });
    } else {
      setMsg({ type: 'ok', text: 'Log tersimpan.' });
      setDate(''); setJudul(''); setKategori(''); setCatatan('');
      loadRecent();
    }
  }

  async function handleDelete(id) {
    const { error } = await sb.from('logs').delete().eq('id', id);
    if (!error) loadRecent();
  }

  return (
    <div className="panel">
      <h1>ADMIN<span>.</span>LOG</h1>
      <p className="sub">Isi form ini setiap kali kamu selesai membuat konten. Otomatis masuk ke diary dan kalender di halaman utama.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="f-date">Tanggal</label>
        <input id="f-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

        <label htmlFor="f-title">Judul konten</label>
        <input id="f-title" type="text" placeholder="Contoh: 5 Fakta Aneh Luar Angkasa" value={judul} onChange={(e) => setJudul(e.target.value)} required />

        <label htmlFor="f-category">Kategori</label>
        <select id="f-category" value={kategori} onChange={(e) => setKategori(e.target.value)} required>
          <option value="">Pilih kategori</option>
          <option value="shorts">YouTube Shorts</option>
          <option value="creator">AI Content Creator</option>
          <option value="edukasi">Video Edukasi</option>
          <option value="novel">Novel AI</option>
        </select>

        <label htmlFor="f-note">Catatan singkat</label>
        <textarea id="f-note" placeholder="Contoh: Durasi 45 detik, upload malam ini" value={catatan} onChange={(e) => setCatatan(e.target.value)} />

        <button type="submit" className="btn" disabled={saving}>
          {saving ? 'Menyimpan...' : 'Simpan log'}
        </button>

        {msg && <div className={'msg show ' + msg.type}>{msg.text}</div>}
      </form>

      <div className="admin-list">
        <h2>Log tersimpan terbaru</h2>
        {recent.length === 0 && (
          <p style={{ color: 'var(--gray)', fontSize: '0.85rem' }}>Belum ada log tersimpan.</p>
        )}
        {recent.map((item) => (
          <div className="admin-row" key={item.id}>
            <div className="info">
              <div className="title">{item.judul}</div>
              <div className="meta">{item.date} · {item.kategori}</div>
            </div>
            <button onClick={() => handleDelete(item.id)}>Hapus</button>
          </div>
        ))}
      </div>
    </div>
  );
}
