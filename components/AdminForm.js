'use client';

import { useState, useEffect } from 'react';
import { sb } from '../lib/supabase';
import RichEditor from './RichEditor';

const EMPTY_FORM = {
  date: '',
  judul: '',
  kategori: '',
  catatan: '',
  catatanHtml: '',
  urlThumbnail: '',
  urlLink: '',
  tags: '',
};

export default function AdminForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [recent, setRecent] = useState([]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

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

  function startEdit(item) {
    setEditingId(item.id);
    setForm({
      date: item.date,
      judul: item.judul,
      kategori: item.kategori,
      catatan: item.catatan || '',
      catatanHtml: item.catatan_html || '',
      urlThumbnail: item.url_thumbnail || '',
      urlLink: item.url_link || '',
      tags: (item.tags || []).join(', '),
    });
    setMsg(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setMsg(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.date || !form.judul.trim() || !form.kategori) {
      setMsg({ type: 'err', text: 'Lengkapi tanggal, judul, dan kategori dulu.' });
      return;
    }

    setSaving(true);

    const payload = {
      date: form.date,
      judul: form.judul.trim(),
      kategori: form.kategori,
      catatan: form.catatan.trim(),
      catatan_html: form.catatanHtml,
      url_thumbnail: form.urlThumbnail.trim(),
      url_link: form.urlLink.trim(),
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    let error;
    if (editingId) {
      ({ error } = await sb.from('logs').update(payload).eq('id', editingId));
    } else {
      ({ error } = await sb.from('logs').insert([payload]));
    }

    setSaving(false);

    if (error) {
      setMsg({ type: 'err', text: 'Gagal menyimpan: ' + error.message });
    } else {
      setMsg({ type: 'ok', text: editingId ? 'Log berhasil diperbarui.' : 'Log tersimpan.' });
      setEditingId(null);
      setForm(EMPTY_FORM);
      loadRecent();
    }
  }

  async function handleDelete(id) {
    const { error } = await sb.from('logs').delete().eq('id', id);
    if (!error) {
      if (editingId === id) cancelEdit();
      loadRecent();
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('admin-unlocked');
    window.location.reload();
  }

  return (
    <div className="panel" style={{ maxWidth: '700px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h1>ADMIN<span>.</span>LOG</h1>
        <button
          onClick={handleLogout}
          style={{
            background: 'transparent',
            border: '1px solid var(--gray)',
            color: 'var(--gray)',
            padding: '0.3rem 0.8rem',
            fontSize: '0.75rem',
            fontFamily: "'Barlow Condensed', sans-serif",
            cursor: 'pointer',
          }}
        >
          Keluar
        </button>
      </div>
      <p className="sub">
        {editingId
          ? 'Kamu sedang mengedit log yang sudah ada. Ubah field yang perlu, lalu simpan.'
          : 'Isi form ini setiap kali kamu selesai membuat konten. Otomatis masuk ke diary dan kalender di halaman utama.'}
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="f-date">Tanggal</label>
        <input id="f-date" type="date" value={form.date} onChange={(e) => updateField('date', e.target.value)} required />

        <label htmlFor="f-title">Judul konten</label>
        <input id="f-title" type="text" placeholder="Contoh: 5 Fakta Aneh Luar Angkasa" value={form.judul} onChange={(e) => updateField('judul', e.target.value)} required />

        <label htmlFor="f-category">Kategori</label>
        <select id="f-category" value={form.kategori} onChange={(e) => updateField('kategori', e.target.value)} required>
          <option value="">Pilih kategori</option>
          <option value="shorts">YouTube Shorts</option>
          <option value="creator">AI Content Creator</option>
          <option value="edukasi">Video Edukasi</option>
          <option value="novel">Novel AI</option>
        </select>

        <label htmlFor="f-thumb">Link thumbnail / video (opsional)</label>
        <input
          id="f-thumb"
          type="text"
          placeholder="Link YouTube atau link gambar langsung (.jpg/.png)"
          value={form.urlThumbnail}
          onChange={(e) => updateField('urlThumbnail', e.target.value)}
        />

        <label htmlFor="f-link">Link referensi (YouTube, Instagram, dll — opsional)</label>
        <input
          id="f-link"
          type="text"
          placeholder="Contoh: https://youtube.com/watch?v=... atau https://instagram.com/p/..."
          value={form.urlLink}
          onChange={(e) => updateField('urlLink', e.target.value)}
        />

        <label>Catatan / isi lengkap</label>
        <RichEditor
          value={form.catatanHtml}
          onChange={(html) => updateField('catatanHtml', html)}
        />

        <label htmlFor="f-tags">Tags (pisahkan dengan koma, opsional)</label>
        <input
          id="f-tags"
          type="text"
          placeholder="Contoh: sains, komedi, tutorial"
          value={form.tags}
          onChange={(e) => updateField('tags', e.target.value)}
        />

        <div style={{ display: 'flex', gap: '0.8rem', marginTop: '2rem' }}>
          <button type="submit" className="btn" disabled={saving} style={{ marginTop: 0 }}>
            {saving ? 'Menyimpan...' : editingId ? 'Update log' : 'Simpan log'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="btn"
              style={{ marginTop: 0, background: 'transparent', border: '1px solid var(--gray)', color: 'var(--gray)' }}
            >
              Batal
            </button>
          )}
        </div>

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
              <div className="meta">{item.date} · {item.kategori}{item.url_thumbnail ? ' · 🖼️' : ''}{item.url_link ? ' · 🔗' : ''}</div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => startEdit(item)}
                style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(item.id)}>Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
