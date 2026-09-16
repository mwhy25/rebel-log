import { CATEGORY_ICON } from '../lib/categories';
import { getYouTubeId, isImageUrl } from '../lib/media';

export default function Thumbnail({ url, kategori }) {
  const youtubeId = getYouTubeId(url);

  if (youtubeId) {
    return (
      <div className="thumb" style={{ padding: 0, position: 'relative', background: '#000' }}>
        <img
          src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
          alt="Thumbnail video"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem', color: 'var(--white)',
            background: 'rgba(0,0,0,0.25)',
          }}
        >
          ▶
        </div>
      </div>
    );
  }

  if (isImageUrl(url)) {
    return (
      <div className="thumb" style={{ padding: 0 }}>
        <img
          src={url}
          alt="Thumbnail"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    );
  }

  return <div className="thumb">{CATEGORY_ICON[kategori] || '▶'}</div>;
}
