import { NextResponse } from 'next/server';

// Force dynamic route - prevents static generation
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const LAST_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  try {
    if (!refresh_token) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Token response:', text);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

const getNowPlaying = async (access_token: string) => {
  try {
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status === 204) {
      return null;
    }

    if (!response.ok) {
      const text = await response.text();
      console.error('Now playing response:', text);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting now playing:', error);
    throw error;
  }
};

const getLastPlayed = async (access_token: string) => {
  try {
    const response = await fetch(LAST_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Last played response:', text);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.items[0];
  } catch (error) {
    console.error('Error getting last played:', error);
    throw error;
  }
};

export async function GET() {
  try {
    if (!refresh_token) {
      console.error('No refresh token found in environment variables');
      return NextResponse.json({ 
        isPlaying: false,
        error: 'No refresh token configured'
      }, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Surrogate-Control': 'no-store'
        }
      });
    }

    const access_token = await getAccessToken();
    const currentlyPlaying = await getNowPlaying(access_token);

    // If there's a currently playing track, return it
    if (currentlyPlaying?.item) {
      return NextResponse.json({
        isPlaying: true,
        title: currentlyPlaying.item.name,
        artist: currentlyPlaying.item.artists.map((_artist: any) => _artist.name).join(', '),
        albumImageUrl: currentlyPlaying.item.album.images[0].url,
        songUrl: currentlyPlaying.item.external_urls.spotify,
      }, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Surrogate-Control': 'no-store'
        }
      });
    }

    // If nothing is playing, get the last played track
    const lastPlayed = await getLastPlayed(access_token);
    
    if (lastPlayed?.track) {
      return NextResponse.json({
        isPlaying: false,
        title: lastPlayed.track.name,
        artist: lastPlayed.track.artists.map((_artist: any) => _artist.name).join(', '),
        albumImageUrl: lastPlayed.track.album.images[0].url,
        songUrl: lastPlayed.track.external_urls.spotify,
        lastPlayed: true,
      }, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Surrogate-Control': 'no-store'
        }
      });
    }

    return NextResponse.json({ isPlaying: false }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
      }
    });
  } catch (error) {
    console.error('Error in GET route:', error);
    return NextResponse.json({ 
      isPlaying: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
      }
    });
  }
} 