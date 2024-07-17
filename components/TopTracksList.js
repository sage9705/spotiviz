import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';

export default function TopTracksList({ limit = 10 }) {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/spotify/top-tracks?limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        setTracks(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching top tracks:", error);
        setTracks([]);
        setIsLoading(false);
      });
  }, [limit]);

  if (isLoading) {
    return <div className="text-center py-4">Loading top tracks...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tracks.map((track, index) => (
        <div key={track.id} className="bg-gray-800 shadow-lg rounded-lg p-4 transition duration-300 transform hover:shadow-green-400/30 hover:scale-105">
     <div className="flex items-center mb-4">
            <Image src={track.album.images[0]?.url} alt={track.name} width={80} height={80} className="rounded-md" />
            <div className="ml-4">
              <p className="font-bold text-lg text-green-400">{index + 1}. {track.name}</p>
              <p className="text-gray-400 text-sm">{track.artists.map(a => a.name).join(', ')}</p>
            </div>
          </div>
          <div className="text-gray-300 text-sm flex justify-between items-center">
            <p>{formatDuration(track.duration_ms)}</p>
            <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">
              <FaPlay />
            </a>
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