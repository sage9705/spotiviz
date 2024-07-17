import { useState, useEffect } from 'react';
import DashboardLayout from "../components/DashboardLayout";
import Image from 'next/image';

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
      <div className="container mx-auto px-4 flex">
        <div className="w-1/4">
        </div>
        <div className="w-3/4 pl-6">
          <h1 className="text-3xl text-[#903bac] font-bold my-8">Your Top Tracks</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div className="space-y-4">
              {tracks.map((track, index) => (
                <div key={track.id} className="flex items-center bg-white rounded-lg shadow-md p-4">
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
                    <h2 className="text-lg font-semibold">{index + 1}. {track.name}</h2>
                    <p className="text-sm text-gray-500">{track.artists.map(a => a.name).join(', ')}</p>
                    <p className="text-xs text-gray-400">{track.album.name}</p>
                  </div>
                  <div className="flex-shrink-0 text-sm text-gray-500">
                    {Math.floor(track.duration_ms / 60000)}:{((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}