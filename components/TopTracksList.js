import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function TopTracksList({ limit = 10 }) {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetch(`/api/spotify/top-tracks?limit=${limit}`)
      .then(res => res.json())
      .then(data => setTracks(data));
  }, [limit]);

  return (
    <div className="grid grid-cols-2 gap-4">
      {tracks.map(track => (
        <div key={track.id} className="flex items-center bg-white shadow-md rounded-lg p-4">
          <Image src={track.album.images[0]?.url || '/default-album.png'} alt={track.name} width={60} height={60} />
          <div className="ml-4">
            <p className="font-bold">{track.name}</p>
            <p className="text-gray-600">{track.artists.map(a => a.name).join(', ')}</p>
            <p className="text-gray-500">{formatDuration(track.duration_ms)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function formatDuration(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds.padStart(2, '0')}`;
}