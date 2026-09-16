'use client';

import { useState, useEffect } from 'react';

export default function AdminGate({ children }) {
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('admin-unlocked');
    if (saved === 'true') setUnlocked(true);
    setChecking(false);
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/check-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (data.ok) {
        sessionStorage.setItem('admin-unlocked', 'true');
        setUnlocked(true);
      } else {
        setError(data.message || 'Password salah.');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Coba lagi.');
    }

    setLoading(false);
  }

  if (checking) return null;

  if (!unlocked) {
    return (
      <div className="panel">
        <h1>ADMIN<span>.</span>LOG</h1>
        <p className="sub">Halaman ini dilindungi password. Masukkan password untuk melanjutkan.</p>

        <form onSubmit={handleLogin}>
          <label htmlFor="gate-password">Password</label>
          <input
            id="gate-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password admin"
            autoFocus
            required
          />

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Memeriksa...' : 'Masuk'}
          </button>

          {error && <div className="msg show err">{error}</div>}
        </form>
      </div>
    );
  }

  return children;
}
