import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaHome, FaMicrophoneAlt, FaMusic, FaHistory, FaListUl, FaChartPie, FaCalendarAlt, FaChartBar, FaEye } from 'react-icons/fa';

export default function SidePanel() {
  const router = useRouter();

  const linkClass = (path) => 
    `flex items-center py-3 px-4 rounded-lg transition-all duration-300 ${
      router.pathname === path
        ? 'bg-green-500 text-white shadow-lg transform scale-105'
        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
    }`;

  const menuItems = [
    { href: '/', icon: FaHome, label: 'Home' },
    { href: '/dashboard', icon: FaEye, label: 'Overview' },
    { href: '/top-artists', icon: FaMicrophoneAlt, label: 'Top Artists' },
    { href: '/top-tracks', icon: FaMusic, label: 'Top Tracks' },
    { href: '/recently-played', icon: FaHistory, label: 'Recently Played' },
    { href: '/playlists', icon: FaListUl, label: 'Playlists' },
    { href: '/genre-distribution', icon: FaChartPie, label: 'Genre Distribution' },
    // { href: '/listening-history', icon: FaCalendarAlt, label: 'Listening History' },
    { href: '/artist-chart', icon: FaChartBar, label: 'Top Artists Chart' },
    // { href: '/track-chart', icon: FaChartBar, label: 'Top Tracks Chart' },
  ];

  return (
    <div className="bg-gray-900 text-white shadow-xl p-6 h-full overflow-y-auto scrollbar-hide">
      {/* <h2 className="text-2xl font-bold mb-8 text-center text-green-400">Spotify Insights</h2> */}
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={linkClass(item.href)}>
                <item.icon className="mr-3 text-lg" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}