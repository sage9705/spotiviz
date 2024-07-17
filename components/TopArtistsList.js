import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function TopArtistsList({ limit = 10 }) {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/spotify/top-artists?limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        setArtists(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching top artists:", error);
        setArtists([]);
        setIsLoading(false);
      });
  }, [limit]);

  if (isLoading) {
    return <div className="text-center py-4">Loading top artists...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {artists.map((artist, index) => (
        <div key={artist.id} className="bg-gray-800 shadow-lg rounded-lg p-4 transition duration-300 transform hover:shadow-green-400/30 hover:scale-105">
          <div className="flex items-center mb-4">
            <Image src={artist.images[0]?.url} alt={artist.name} width={80} height={80} className="rounded-full" />
            <div className="ml-4">
              <p className="font-bold text-lg text-green-400">{index + 1}. {artist.name}</p>
              <p className="text-gray-400 text-sm">{artist.genres.slice(0, 2).join(', ')}</p>
            </div>
          </div>
          <div className="text-gray-300 text-sm">
            <p>Popularity: {artist.popularity}%</p>
            <p>Followers: {artist.followers.total.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}