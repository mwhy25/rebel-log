'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { sb } from '../lib/supabase';
import { CATEGORY_LABEL } from '../lib/categories';
import { stripHtmlPlain } from '../lib/truncate';
import Thumbnail from './Thumbnail';

export default function SearchBox() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [allLogs, setAllLogs] = useState(null);
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      if (allLogs === null) loadLogs();
    }
  }, [open]);

  async function loadLogs() {
    setLoading(true);
    const { data, error } = await sb
      .from('logs')
      .select('*')
      .order('date', { ascending: false })
      .limit(300);
    setAllLogs(error || !data ? [] : data);
    setLoading(false);
  }

  function handleToggle() {
    setOpen((prev) => !prev);
    if (open) setQuery('');
  }

  function handleResultClick() {
    setOpen(false);
    setQuery('');
  }

  const results = (() => {
    if (!query.trim() || !allLogs) return [];
    const q = query.trim().toLowerCase();
    return allLogs
      .filter((item) => {
        const plainText = stripHtmlPlain(item.catatan_html || item.catatan || '');
        const tagsText = (item.tags || []).join(' ');
        return (
          item.judul.toLowerCase().includes(q) ||
          plainText.toLowerCase().includes(q) ||
          tagsText.toLowerCase().includes(q)
        );
      })
      .slice(0, 8);
  })();

  return (
    <div className="navsearch" ref={wrapRef}>
      <button className="navsearch-icon" onClick={handleToggle} aria-label="Cari">
        🔍
      </button>

      {open && (
        <div className="navsearch-panel">
          <input
            ref={inputRef}
            type="text"
            placeholder="Cari judul, isi, atau tag..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {query.trim() && (
            <div className="navsearch-results">
              {loading && <p className="navsearch-empty">Memuat...</p>}

              {!loading && results.length === 0 && (
                <p className="navsearch-empty">Tidak ada hasil untuk &quot;{query}&quot;.</p>
              )}

              {!loading && results.map((item) => (
                <Link
                  key={item.id}
                  href={`/karya/${item.kategori}/${item.id}`}
                  className="navsearch-item"
                  onClick={handleResultClick}
                >
                  <div className="navsearch-thumb">
                    <Thumbnail url={item.url_thumbnail} kategori={item.kategori} />
                  </div>
                  <div className="navsearch-item-info">
                    <div className="navsearch-item-title">{item.judul}</div>
                    <div className="navsearch-item-cat">{CATEGORY_LABEL[item.kategori] || item.kategori}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
