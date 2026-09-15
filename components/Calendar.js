'use client';

import { useState } from 'react';

const MONTH_NAMES = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const DOW = ['Min','Sen','Sel','Rab','Kam','Jum','Sab'];
const DOT_CLASS = { shorts: 'dot-shorts', creator: 'dot-creator', edukasi: 'dot-edu', novel: 'dot-novel' };

export default function Calendar({ logs }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth();

  const logsByDay = {};
  logs.forEach((item) => {
    const [y, m, d] = item.date.split('-').map(Number);
    if (y === year && m - 1 === month) {
      if (!logsByDay[d]) logsByDay[d] = [];
      logsByDay[d].push(item.kategori);
    }
  });

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  }

  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <section id="calendar">
      <div className="section-head">
        <span className="section-num">03</span>
        <div>
          <h2 className="section-title">Kalender Aktivitas</h2>
          <p className="section-desc">Lihat sebaran hari kerja tiap kategori dalam satu bulan, seperti kalender waktu di Persona.</p>
        </div>
      </div>

      <div className="cal-wrap">
        <div className="cal-head">
          <div className="cal-month">{MONTH_NAMES[month]} {year}</div>
          <div className="cal-nav">
            <button onClick={prevMonth}>&lsaquo; Sebelum</button>
            <button onClick={nextMonth}>Sesudah &rsaquo;</button>
          </div>
        </div>

        <div className="cal-grid">
          {DOW.map((d) => <div className="cal-dow" key={d}>{d}</div>)}

          {cells.map((day, idx) => {
            if (day === null) return <div className="cal-day empty" key={'e' + idx} />;
            const cats = logsByDay[day] || [];
            const isToday = isCurrentMonth && day === now.getDate();
            return (
              <div className={'cal-day' + (cats.length ? ' active' : '') + (isToday ? ' today' : '')} key={day}>
                {day}
                {cats.length > 0 && (
                  <div className="dots">
                    {[...new Set(cats)].map((cat) => (
                      <span className={'dot ' + (DOT_CLASS[cat] || '')} key={cat} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="cal-legend">
          <div className="cal-legend-item"><span className="dot dot-shorts" />YouTube Shorts</div>
          <div className="cal-legend-item"><span className="dot dot-creator" />AI Content Creator</div>
          <div className="cal-legend-item"><span className="dot dot-edu" />Video Edukasi</div>
          <div className="cal-legend-item"><span className="dot dot-novel" />Novel AI</div>
        </div>
      </div>
    </section>
  );
}
