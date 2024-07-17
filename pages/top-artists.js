import { useState, useEffect } from 'react';
import DashboardLayout from "../components/DashboardLayout";
import Image from 'next/image';

export default function TopArtists() {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/spotify/top-artists?limit=50')
      .then(res => res.json())
      .then(data => {
        setArtists(data);
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
          <h1 className="text-3xl text-[#903bac] font-bold my-8">Your Top Artists</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {artists.map((artist, index) => (
                <div key={artist.id} className="bg-white rounded-lg shadow-md p-4">
                  <Image 
                    src={artist.images[0]?.url} 
                    alt={artist.name}
                    width={200}
                    height={200}
                    className="w-full h-auto rounded-md"
                  />
                  <h2 className="text-lg font-semibold mt-2">{index + 1}. {artist.name}</h2>
                  <p className="text-sm text-gray-500">{artist.genres.slice(0, 2).join(', ')}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}