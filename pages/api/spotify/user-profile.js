import { getSession } from "next-auth/react";
import { getSpotifyData } from "../../../lib/spotify";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const userProfile = await getSpotifyData(session.accessToken, "/me");
    const followingCount = await getSpotifyData(session.accessToken, "/me/following?type=artist");
    const playlists = await getSpotifyData(session.accessToken, "/me/playlists");

    res.status(200).json({
      ...userProfile,
      following: followingCount.artists.total,
      playlists: playlists.total,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching user profile" });
  }
}