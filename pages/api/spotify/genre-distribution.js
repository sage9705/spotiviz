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

    const data = await getSpotifyData(session.accessToken, '/me/top/artists?limit=50');
    
    if (!data || !data.items) {
      throw new Error('Invalid data structure received from Spotify API');
    }

    const genres = data.items.flatMap(artist => artist.genres);
    const genreCounts = genres.reduce((acc, genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
      return acc;
    }, {});
    
    const topGenres = Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    res.status(200).json(topGenres);
  } catch (error) {
    console.error("Error fetching genre distribution:", error);
    res.status(500).json({ error: "Error fetching genre distribution", details: error.message });
  }
}