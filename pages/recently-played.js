import { useState, useEffect } from 'react';
import Layout from "../components/Layout";
import SidePanel from "../components/SidePanel";
import Image from 'next/image';

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
    <Layout>
      <div className="container mx-auto px-4 flex">
        <div className="w-1/4">
          <SidePanel />
        </div>
        <div className="w-3/4 pl-6">
          <h1 className="text-3xl text-[#903bac] font-bold my-8">Recently Played Tracks</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div className="space-y-4">
              {recentTracks.map((item, index) => (
                <div key={item.played_at} className="flex items-center bg-white rounded-lg shadow-md p-4">
                  <div className="flex-shrink-0 mr-4">
                    <Image 
                      src={item.track.album.images[0]?.url || '/default-album.png'} 
                      alt={item.track.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold">{item.track.name}</h2>
                    <p className="text-sm text-gray-500">{item.track.artists.map(a => a.name).join(', ')}</p>
                    <p className="text-xs text-gray-400">{item.track.album.name}</p>
                  </div>
                  <div className="flex-shrink-0 text-sm text-gray-500">
                    {new Date(item.played_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}