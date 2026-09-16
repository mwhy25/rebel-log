import { getYouTubeId, isImageUrl } from '../lib/media';

export default function MediaPlayer({ url }) {
  const youtubeId = getYouTubeId(url);

  if (youtubeId) {
    return (
      <div style={{ aspectRatio: '16/9', width: '100%', background: '#000' }}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title="Video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (isImageUrl(url)) {
    return (
      <div style={{ width: '100%', background: '#000' }}>
        <img src={url} alt="Media" style={{ width: '100%', display: 'block' }} />
      </div>
    );
  }

  return null;
}
