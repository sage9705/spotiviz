import { getSession } from "next-auth/react";
import { getSpotifyData } from "../../../lib/spotify";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const data = await getSpotifyData(session.accessToken, '/me/top/artists?limit=50');
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
    console.error("Error fetching genre distribution", error);
    res.status(500).json({ error: "Error fetching genre distribution" });
  }
}