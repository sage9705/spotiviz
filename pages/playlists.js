import { useState, useEffect } from 'react';
import Layout from "../components/Layout";
import SidePanel from "../components/SidePanel";
import Image from 'next/image';

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
    <Layout>
      <div className="container mx-auto px-4 flex">
        <div className="w-1/4">
          <SidePanel />
        </div>
        <div className="w-3/4 pl-6">
          <h1 className="text-3xl text-[#903bac] font-bold my-8">Your Playlists</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {playlists.map(playlist => (
                <div key={playlist.id} className="bg-white rounded-lg shadow-md p-4">
                  <Image 
                    src={playlist.images[0]?.url || '/default-playlist.png'} 
                    alt={playlist.name}
                    width={200}
                    height={200}
                    className="w-full h-auto rounded-md"
                  />
                  <h2 className="text-lg font-semibold mt-2">{playlist.name}</h2>
                  <p className="text-sm text-gray-500">{playlist.tracks.total} tracks</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}