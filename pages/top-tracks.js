import { useState, useEffect } from 'react';
import DashboardLayout from "../components/DashboardLayout";
import Image from 'next/image';
import { FaMusic } from 'react-icons/fa';

export default function TopTracks() {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/spotify/top-tracks?limit=50')
      .then(res => res.json())
      .then(data => {
        setTracks(data);
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
          <FaMusic className="mr-4" /> Your Top Tracks
        </h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-xl">Error: {error}</p>
        ) : (
          <div className="space-y-4">
            {tracks.map((track, index) => (
              <div key={track.id} className="flex items-center bg-gray-800 rounded-xl p-4 shadow-lg transition-all duration-300 hover:shadow-green-400/30 hover:scale-102">
                <div className="flex-shrink-0 mr-4">
                  <Image 
                    src={track.album.images[0]?.url} 
                    alt={track.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold text-green-400">{index + 1}. {track.name}</h2>
                  <p className="text-sm text-gray-400">{track.artists.map(a => a.name).join(', ')}</p>
                  <p className="text-xs text-gray-500">{track.album.name}</p>
                </div>
                <div className="flex-shrink-0 text-sm text-gray-500">
                  {Math.floor(track.duration_ms / 60000)}:{((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}