import { getSession } from "next-auth/react";
import { getSpotifyData } from "../../../lib/spotify";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { limit = 50, time_range = "long_term" } = req.query;

  try {
    const topArtists = await getSpotifyData(
      session.accessToken,
      `/me/top/artists?limit=${limit}&time_range=${time_range}`
    );
    res.status(200).json(topArtists.items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching top artists" });
  }
}