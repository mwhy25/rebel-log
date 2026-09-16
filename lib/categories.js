export const CATEGORY_LABEL = {
  shorts: 'YouTube Shorts',
  creator: 'AI Content Creator',
  edukasi: 'Video Edukasi',
  novel: 'Novel AI',
};

export const CATEGORY_SHORT_LABEL = {
  shorts: 'Shorts',
  creator: 'AI Creator',
  edukasi: 'Edukasi',
  novel: 'Novel',
};

export const CATEGORY_ICON = {
  shorts: '▶',
  creator: '▶',
  edukasi: '▶',
  novel: '📖',
};

export const CATEGORY_ARCANA = {
  shorts: { icon: '🎬', name: 'Magician', unit: 'shorts' },
  creator: { icon: '🤖', name: 'Devil', unit: 'videos' },
  edukasi: { icon: '📚', name: 'Priestess', unit: 'episode' },
  novel: { icon: '📖', name: 'Hermit', unit: 'bab' },
};

export function formatDateShort(iso) {
  const d = new Date(iso + 'T00:00:00');
  const bulan = ['JAN','FEB','MAR','APR','MEI','JUN','JUL','AGU','SEP','OKT','NOV','DES'];
  return d.getDate() + ' ' + bulan[d.getMonth()];
}

export function formatDateLong(iso) {
  const d = new Date(iso + 'T00:00:00');
  const bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  return d.getDate() + ' ' + bulan[d.getMonth()] + ' ' + d.getFullYear();
}

export function calculateStreak(logs) {
  if (!logs || logs.length === 0) return 0;

  const uniqueDates = [...new Set(logs.map((item) => item.date))].sort().reverse();
  const dateSet = new Set(uniqueDates);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let cursor = new Date(today);
  const todayIso = cursor.toISOString().slice(0, 10);

  if (!dateSet.has(todayIso)) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (true) {
    const iso = cursor.toISOString().slice(0, 10);
    if (dateSet.has(iso)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

