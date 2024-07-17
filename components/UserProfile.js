import { useEffect, useState } from "react";
import Image from "next/image";
import { FaUser, FaUsers, FaListUl } from "react-icons/fa";

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/spotify/user-profile")
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading)
    return <div className="text-center py-4">Loading profile...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!profile)
    return <div className="text-yellow-500">No profile data available</div>;

  const profileImageUrl =
    profile.images && profile.images.length > 0
      ? profile.images[0].url
      : "/default-avatar.png";

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg p-6 text-center">
      <div>
        <Image
          src={profileImageUrl}
          alt="Profile"
          width={100}
          height={100}
          className="rounded-full border-4 border-green-400 inline-block mb-2"
        />
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-green-400">
          {profile.display_name || "Unknown User"}
        </h2>
        <p className="text-gray-400">
          <a
            href={`https://open.spotify.com/user/${profile.id || "unknown"}`}
            className="text-green-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            @{profile.id || "unknown"}
          </a>
        </p>
      </div>
      <div className="flex justify-between">
        <div className="text-center">
          <p className="font-bold text-2xl text-white">
            {profile.followers?.total || 0}
          </p>
          <p className="text-gray-400 flex items-center justify-center">
            <FaUsers className="mr-1" /> Followers
          </p>
        </div>
        <div className="text-center">
          <p className="font-bold text-2xl text-white">
            {profile.following || 0}
          </p>
          <p className="text-gray-400 flex items-center justify-center">
            <FaUser className="mr-1" /> Following
          </p>
        </div>
        <div className="text-center">
          <p className="font-bold text-2xl text-white">
            {profile.playlists || 0}
          </p>
          <p className="text-gray-400 flex items-center justify-center">
            <FaListUl className="mr-1" /> Playlists
          </p>
        </div>
      </div>
    </div>
  );
}
