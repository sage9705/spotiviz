import { getSession } from "next-auth/react";
import { getSpotifyData } from "../../../lib/spotify";

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const [userProfile, followingData, playlistsData] = await Promise.allSettled([
      getSpotifyData(session.accessToken, "/me"),
      getSpotifyData(session.accessToken, "/me/following?type=artist"),
      getSpotifyData(session.accessToken, "/me/playlists")
    ]);

    const profile = userProfile.status === 'fulfilled' ? userProfile.value : {};
    const following = followingData.status === 'fulfilled' ? followingData.value.artists?.total : 0;
    const playlists = playlistsData.status === 'fulfilled' ? playlistsData.value.total : 0;

    res.status(200).json({
      ...profile,
      following,
      playlists,
    });
  } catch (error) {
    console.error("Error in user profile API:", error);
    res.status(500).json({ error: "Error fetching user profile", details: error.message });
  }
}