import { getSession } from "next-auth/react";
import { getSpotifyData } from "../../../lib/spotify";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const data = await getSpotifyData(session.accessToken, '/me/top/artists?limit=10');
    res.status(200).json(data.items);
  } catch (error) {
    console.error("Error fetching top artists", error);
    res.status(500).json({ error: "Error fetching top artists" });
  }
}