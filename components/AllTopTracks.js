import { useState, useEffect } from 'react';
import TopTracksList from './TopTracksList';

export default function AllTopTracks({ onBack }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
      >
        &larr; Back to Dashboard
      </button>
      <h2 className="text-3xl font-bold text-green-400">All Top Tracks</h2>
      {isLoading ? (
        <div className="text-center py-4">Loading all top tracks...</div>
      ) : (
        <TopTracksList limit={100} /> 
      )}
    </div>
  );
}