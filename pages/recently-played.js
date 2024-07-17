import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Image from 'next/image';
import { FaHistory } from 'react-icons/fa';

export default function RecentlyPlayed() {
  const [recentTracks, setRecentTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/spotify/recently-played?limit=50')
      .then(res => res.json())
      .then(data => {
        setRecentTracks(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <DashboardLayout>
      <div className="bg-gray-900 text-white min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-8 text-green-400 flex items-center">
          <FaHistory className="mr-4" /> Recently Played Tracks
        </h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-xl">Error: {error}</p>
        ) : (
          <div className="space-y-4">
            {recentTracks.map((item, index) => (
              <div key={item.played_at} className="flex items-center bg-gray-800 rounded-xl p-4 shadow-lg transition-all duration-300 hover:shadow-green-400/30 hover:scale-102">
                <div className="flex-shrink-0 mr-4">
                  <Image 
                    src={item.track.album.images[0]?.url} 
                    alt={item.track.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold text-green-400">{item.track.name}</h2>
                  <p className="text-sm text-gray-400">{item.track.artists.map(a => a.name).join(', ')}</p>
                  <p className="text-xs text-gray-500">{item.track.album.name}</p>
                </div>
                <div className="flex-shrink-0 text-sm text-gray-500">
                  {new Date(item.played_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}