import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Image from 'next/image';
import { FaMusic } from 'react-icons/fa';

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/spotify/playlists')
      .then(res => res.json())
      .then(data => {
        setPlaylists(data.items);
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
          <FaMusic className="mr-4" /> Your Playlists
        </h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-xl">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {playlists.map(playlist => (
              <div key={playlist.id} className="bg-gray-800 rounded-xl p-4 shadow-lg transition-all duration-300 hover:shadow-green-400/30 hover:scale-105">
                <Image 
                  src={playlist.images[0]?.url} 
                  alt={playlist.name}
                  width={200}
                  height={200}
                  className="w-full h-auto rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold text-green-400 mb-2">{playlist.name}</h2>
                <p className="text-sm text-gray-400">{playlist.tracks.total} tracks</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}