import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function TopArtistsList({ limit = 10 }) {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch(`/api/spotify/top-artists?limit=${limit}`)
      .then(res => res.json())
      .then(data => setArtists(data));
  }, [limit]);

  return (
    <div className="grid grid-cols-2 gap-4">
      {artists.map(artist => (
        <div key={artist.id} className="flex items-center bg-white shadow-md rounded-lg p-4">
          <Image src={artist.images[0]?.url || '/default-artist.png'} alt={artist.name} width={60} height={60} className="rounded-full" />
          <div className="ml-4">
            <p className="font-bold">{artist.name}</p>
            <p className="text-gray-600">{artist.genres.join(', ')}</p>
          </div>
        </div>
      ))}
    </div>
  );
}