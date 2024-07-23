import { getSession } from "next-auth/react";
import { getSpotifyData } from "../../../lib/spotify";

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (session.error === "RefreshAccessTokenError") {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const [userProfile, followingData, playlistsData] = await Promise.all([
      getSpotifyData(session.accessToken, "/me"),
      getSpotifyData(session.accessToken, "/me/following?type=artist"),
      getSpotifyData(session.accessToken, "/me/playlists")
    ]);

    const profile = userProfile || {};
    const following = followingData?.artists?.total || 0;
    const playlists = playlistsData?.total || 0;

    res.status(200).json({
      ...profile,
      following,
      playlists,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Error fetching user profile" });
  }
}