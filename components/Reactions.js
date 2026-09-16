'use client';

import { useState, useEffect } from 'react';
import { sb } from '../lib/supabase';
import { getVisitorId } from '../lib/visitor';

export default function Reactions({ logId }) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [myReaction, setMyReaction] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadReactions() {
    const { data, error } = await sb
      .from('reactions')
      .select('type, visitor_id')
      .eq('log_id', logId);

    if (error || !data) { setLoading(false); return; }

    const visitorId = getVisitorId();
    setLikes(data.filter((r) => r.type === 'like').length);
    setDislikes(data.filter((r) => r.type === 'dislike').length);
    const mine = data.find((r) => r.visitor_id === visitorId);
    setMyReaction(mine ? mine.type : null);
    setLoading(false);
  }

  useEffect(() => {
    loadReactions();
  }, [logId]);

  async function handleReact(type) {
    const visitorId = getVisitorId();
    if (!visitorId) return;

    if (myReaction === type) {
      await sb.from('reactions').delete().eq('log_id', logId).eq('visitor_id', visitorId);
    } else {
      await sb.from('reactions').upsert(
        { log_id: logId, visitor_id: visitorId, type },
        { onConflict: 'log_id,visitor_id' }
      );
    }
    loadReactions();
  }

  if (loading) return null;

  const btnStyle = (active, color) => ({
    background: active ? color : 'transparent',
    color: active ? 'var(--black)' : color,
    border: `1px solid ${color}`,
    padding: '0.5rem 1rem',
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
  });

  return (
    <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
      <button onClick={() => handleReact('like')} style={btnStyle(myReaction === 'like', 'var(--green, #7fd67f)')}>
        👍 <span>{likes}</span>
      </button>
      <button onClick={() => handleReact('dislike')} style={btnStyle(myReaction === 'dislike', 'var(--danger, #ff5c5c)')}>
        👎 <span>{dislikes}</span>
      </button>
    </div>
  );
}
