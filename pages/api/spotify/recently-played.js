import { getSession } from "next-auth/react";
import { getSpotifyData } from "../../../lib/spotify";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { limit = 20 } = req.query;

  try {
    const recentlyPlayed = await getSpotifyData(
      session.accessToken,
      `/me/player/recently-played?limit=${limit}`
    );
    res.status(200).json(recentlyPlayed.items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recently played tracks" });
  }
}