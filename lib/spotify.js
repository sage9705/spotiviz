import { RateLimiter } from "limiter";

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';
const limiter = new RateLimiter({ tokensPerInterval: 1, interval: "second" });

export async function getSpotifyData(accessToken, endpoint) {
  await limiter.removeTokens(1);
  
  try {
    const res = await fetch(`${SPOTIFY_API_BASE}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error(`Error fetching Spotify data: ${error.message}`);
    throw error;
  }
}