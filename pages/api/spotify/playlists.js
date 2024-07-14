import { getSession } from "next-auth/react";
import { getSpotifyData } from "../../../lib/spotify";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { limit = 20, offset = 0 } = req.query;

  try {
    const playlists = await getSpotifyData(
      session.accessToken,
      `/me/playlists?limit=${limit}&offset=${offset}`
    );
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ error: "Error fetching playlists" });
  }
}