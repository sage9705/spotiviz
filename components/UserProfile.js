import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function UserProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch('/api/spotify/user-profile')
      .then(res => res.json())
      .then(data => setProfile(data));
  }, []);

  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center">
        <Image src={profile.images[0]?.url || '/default-avatar.png'} alt="Profile" width={100} height={100} className="rounded-full" />
        <div className="ml-6">
          <h2 className="text-2xl font-bold">{profile.display_name}</h2>
          <p className="text-gray-600">@{profile.id}</p>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <div>
          <p className="font-bold">{profile.followers.total}</p>
          <p className="text-gray-600">Followers</p>
        </div>
        <div>
          <p className="font-bold">{profile.following}</p>
          <p className="text-gray-600">Following</p>
        </div>
        <div>
          <p className="font-bold">{profile.playlists}</p>
          <p className="text-gray-600">Playlists</p>
        </div>
      </div>
    </div>
  );
}