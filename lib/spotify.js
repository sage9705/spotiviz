const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

export async function getSpotifyData(accessToken, endpoint) {
  const res = await fetch(`${SPOTIFY_API_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.json();
}