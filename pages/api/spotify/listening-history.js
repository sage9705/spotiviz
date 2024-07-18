import { getSession } from "next-auth/react";
import { getSpotifyData } from "../../../lib/spotify";

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (session.error === "RefreshAccessTokenError") {
      return res.status(403).json({ error: "Failed to refresh access token" });
    }

    const data = await getSpotifyData(session.accessToken, '/me/player/recently-played?limit=50');
    
    if (!data || !data.items || !Array.isArray(data.items)) {
      throw new Error('Invalid data structure received from Spotify API');
    }

    const history = data.items.map(item => ({
      track: item.track.name,
      artist: item.track.artists[0].name,
      played_at: item.played_at
    }));

    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching listening history:", error);
    res.status(500).json({ error: "Error fetching listening history", details: error.message });
  }
}