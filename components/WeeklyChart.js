'use client';

function getWeekKey(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const day = d.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(d);
  monday.setDate(d.getDate() + diffToMonday);
  return monday.toISOString().slice(0, 10);
}

function formatWeekLabel(mondayIso) {
  const d = new Date(mondayIso + 'T00:00:00');
  const bulan = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return d.getDate() + ' ' + bulan[d.getMonth()];
}

export default function WeeklyChart({ logs }) {
  const now = new Date();
  const weeks = [];
  for (let i = 7; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i * 7);
    weeks.push(getWeekKey(d.toISOString().slice(0, 10)));
  }

  const counts = {};
  weeks.forEach((w) => { counts[w] = 0; });
  logs.forEach((item) => {
    const wk = getWeekKey(item.date);
    if (counts[wk] !== undefined) counts[wk]++;
  });

  const values = weeks.map((w) => counts[w]);
  const maxVal = Math.max(1, ...values);

  const barWidth = 40;
  const gap = 20;
  const chartHeight = 140;
  const chartWidth = weeks.length * (barWidth + gap);

  return (
    <div style={{ overflowX: 'auto' }}>
      <svg width={chartWidth} height={chartHeight + 40} style={{ minWidth: '100%' }}>
        {weeks.map((w, i) => {
          const val = counts[w];
          const barHeight = (val / maxVal) * chartHeight;
          const x = i * (barWidth + gap) + gap / 2;
          const y = chartHeight - barHeight;

          return (
            <g key={w}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight || 2}
                fill={i === weeks.length - 1 ? 'var(--red)' : '#3a3a3a'}
              />
              {val > 0 && (
                <text
                  x={x + barWidth / 2}
                  y={y - 6}
                  textAnchor="middle"
                  fontSize="12"
                  fill="var(--white)"
                  fontFamily="'Barlow Condensed', sans-serif"
                  fontWeight="700"
                >
                  {val}
                </text>
              )}
              <text
                x={x + barWidth / 2}
                y={chartHeight + 20}
                textAnchor="middle"
                fontSize="11"
                fill="var(--gray)"
                fontFamily="'Barlow Condensed', sans-serif"
              >
                {formatWeekLabel(w)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
