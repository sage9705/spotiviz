import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/spotify/user-profile')
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile data available</div>;

  const profileImageUrl = profile.images && profile.images.length > 0
    ? profile.images[0].url
    : '/default-avatar.png';

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center">
        <Image 
          src={profileImageUrl} 
          alt="Profile" 
          width={100} 
          height={100} 
          className="rounded-full"
        />
        <div className="ml-6">
          <h2 className="text-2xl font-bold">{profile.display_name || 'Unknown User'}</h2>
          <p className="text-gray-600">@{profile.id || 'unknown'}</p>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <div>
          <p className="font-bold">{profile.followers?.total || 0}</p>
          <p className="text-gray-600">Followers</p>
        </div>
        <div>
          <p className="font-bold">{profile.following || 0}</p>
          <p className="text-gray-600">Following</p>
        </div>
        <div>
          <p className="font-bold">{profile.playlists || 0}</p>
          <p className="text-gray-600">Playlists</p>
        </div>
      </div>
    </div>
  );
}