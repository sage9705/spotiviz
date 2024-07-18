const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';


let lastRequestTime = 0;
const minRequestInterval = 1000; // 1 second

async function rateLimitedFetch(url, options) {
  const now = Date.now();
  if (now - lastRequestTime < minRequestInterval) {
    const delay = minRequestInterval - (now - lastRequestTime);
    console.log(`Rate limiting: Waiting for ${delay}ms before next request`);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  lastRequestTime = Date.now();
  return fetch(url, options);
}

export async function getSpotifyData(accessToken, endpoint) {
  if (!accessToken) {
    console.error("No access token provided");
    throw new Error("No access token provided");
  }

  try {
    console.log(`Fetching Spotify data from endpoint: ${endpoint}`);
    
    const res = await rateLimitedFetch(`${SPOTIFY_API_BASE}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      let errorBody;
      try {
        errorBody = await res.text();
      } catch (e) {
        errorBody = 'Unable to read error response body';
      }
      
      console.error(`HTTP error! status: ${res.status}, body: ${errorBody}`);
      throw new Error(`HTTP error! status: ${res.status}, body: ${errorBody}`);
    }

    const data = await res.json();
    
    if (!data) {
      console.error("Received empty response from Spotify API");
      throw new Error("Received empty response from Spotify API");
    }

    return data;
  } catch (error) {
    console.error(`Error fetching Spotify data: ${error.message}`);
    console.error(`Error stack: ${error.stack}`);
    throw error;
  }
}

export async function refreshSpotifyToken(refreshToken) {
  const url = "https://accounts.spotify.com/api/token";
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  };

  try {
    const response = await fetch(url, payload);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return {
      accessToken: data.access_token,
      expiresIn: data.expires_in
    };
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
}