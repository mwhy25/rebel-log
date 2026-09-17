import Link from 'next/link';
import SearchBox from './SearchBox';

export default function Navbar() {
  return (
    <nav>
      <Link href="/" className="logo" style={{ textDecoration: 'none' }}>
        REBEL<span className="dot">.</span>LOG
      </Link>
      <div className="nav-right">
        <ul>
          <li><a href="/#stats">Status</a></li>
          <li><a href="/#log">Diary</a></li>
          <li><a href="/#calendar">Kalender</a></li>
          <li><a href="/#works">Karya</a></li>
        </ul>
        <SearchBox />
      </div>
    </nav>
  );
}

