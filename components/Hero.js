export default function Hero() {
  return (
    <header>
      <div className="hero-corner">
        <div>PHANTOM THIEF OF</div>
        <div className="date">CREATIVITY</div>
      </div>

      <div className="hero-grid">
        <div className="hero-text">
          <div className="hero-tag">// TAKE YOUR CONTENT BACK</div>
          <h1 className="hero-title">
            <span>DAILY</span>
            <span className="fill">CREATOR</span>
            <span className="accent">RECORD</span>
          </h1>
          <p className="hero-sub">
            Log harian dari seorang kreator yang mencuri hati audiens satu konten AI dalam satu waktu — video, cerita, dan ide yang lahir tiap hari.
          </p>
        </div>

        <div className="hero-image">
          <img src="/hero-character.png" alt="Karakter kreator" />
        </div>
      </div>
    </header>
  );
}

