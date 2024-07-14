import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SidePanel() {
  const router = useRouter();

  const linkClass = (path) => 
    `block py-2 px-4 rounded transition-colors duration-200 ${
      router.pathname === path
        ? 'bg-green-500 text-white'
        : 'text-gray-700 hover:bg-green-100'
    }`;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className={linkClass('/dashboard')}>
              Overview
            </Link>
          </li>
          <li>
            <h3 className="font-semibold mt-4 mb-2 text-gray-500">Profile</h3>
          </li>
          <li>
            <Link href="/top-artists" className={linkClass('/top-artists')}>
              Top Artists
            </Link>
          </li>
          <li>
            <Link href="/top-tracks" className={linkClass('/top-tracks')}>
              Top Tracks
            </Link>
          </li>
          <li>
            <Link href="/recently-played" className={linkClass('/recently-played')}>
              Recently Played
            </Link>
          </li>
          <li>
            <Link href="/playlists" className={linkClass('/playlists')}>
              Playlists
            </Link>
          </li>
          <li>
            <h3 className="font-semibold mt-4 mb-2 text-gray-500">Visualizations</h3>
          </li>
          <li>
            <Link href="/genre-distribution" className={linkClass('/genre-distribution')}>
              Genre Distribution
            </Link>
          </li>
          <li>
            <Link href="/listening-history" className={linkClass('/listening-history')}>
              Listening History
            </Link>
          </li>
          <li>
            <Link href="/artist-chart" className={linkClass('/artist-chart')}>
              Top Artists Chart
            </Link>
          </li>
          <li>
            <Link href="/track-chart" className={linkClass('/track-chart')}>
              Top Tracks Chart
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}