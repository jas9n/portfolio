import { NextResponse } from 'next/server';

// Force dynamic route - prevents static generation
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=50`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

interface SpotifyArtist {
  name: string;
}

interface SpotifyTrack {
  id?: string;
  name?: string;
  artists?: SpotifyArtist[];
  album?: {
    images?: { url: string }[];
    name?: string;
  };
  external_urls?: {
    spotify?: string;
  };
}

interface RecentlyPlayedItem {
  track?: SpotifyTrack;
  played_at?: string;
}

interface TrackSummary {
  title: string;
  artist: string;
  albumImageUrl?: string;
  songUrl: string;
  album?: string;
  playedAt?: string;
  playCount?: number;
}

const noStoreHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
  'Surrogate-Control': 'no-store'
};

const jsonResponse = (data: Record<string, unknown>) => NextResponse.json(data, {
  headers: noStoreHeaders,
});

const summarizeTrack = (track?: SpotifyTrack, playedAt?: string): TrackSummary | null => {
  if (!track?.name || !track.external_urls?.spotify) {
    return null;
  }

  return {
    title: track.name,
    artist: track.artists?.map(artist => artist.name).join(', ') || 'Unknown artist',
    albumImageUrl: track.album?.images?.[0]?.url,
    songUrl: track.external_urls.spotify,
    album: track.album?.name,
    playedAt,
  };
};

const getTopTrackThisWeek = (recentlyPlayed: RecentlyPlayedItem[]) => {
  const cutoff = Date.now() - ONE_WEEK_MS;
  const trackCounts = new Map<string, TrackSummary & { latestPlayedAt: number }>();

  recentlyPlayed.forEach(item => {
    const playedAt = item.played_at ? new Date(item.played_at).getTime() : 0;

    if (!playedAt || playedAt < cutoff) {
      return;
    }

    const summary = summarizeTrack(item.track, item.played_at);

    if (!summary) {
      return;
    }

    const key = item.track?.id || `${summary.title}-${summary.artist}`;
    const existing = trackCounts.get(key);

    if (existing) {
      existing.playCount = (existing.playCount || 1) + 1;
      existing.latestPlayedAt = Math.max(existing.latestPlayedAt, playedAt);
      return;
    }

    trackCounts.set(key, {
      ...summary,
      playCount: 1,
      latestPlayedAt: playedAt,
    });
  });

  const topTrack = [...trackCounts.values()].sort((a, b) => {
    const countDifference = (b.playCount || 0) - (a.playCount || 0);
    return countDifference || b.latestPlayedAt - a.latestPlayedAt;
  })[0];

  if (!topTrack) {
    return null;
  }

  const { latestPlayedAt: _latestPlayedAt, ...summary } = topTrack;
  return summary;
};

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

const getRecentlyPlayed = async (access_token: string): Promise<RecentlyPlayedItem[]> => {
  try {
    const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Recently played response:', text);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data.items) ? data.items : [];
  } catch (error) {
    console.error('Error getting recently played:', error);
    throw error;
  }
};

export async function GET() {
  try {
    if (!refresh_token) {
      console.error('No refresh token found in environment variables');
      return jsonResponse({ 
        isPlaying: false,
        error: 'No refresh token configured'
      });
    }

    const access_token = await getAccessToken();
    const [currentlyPlaying, recentlyPlayed] = await Promise.all([
      getNowPlaying(access_token),
      getRecentlyPlayed(access_token),
    ]);

    const currentTrack = summarizeTrack(currentlyPlaying?.item);
    const recentTrack = summarizeTrack(recentlyPlayed[0]?.track, recentlyPlayed[0]?.played_at);
    const primaryTrack = currentTrack || recentTrack;
    const topTrackThisWeek = getTopTrackThisWeek(recentlyPlayed);
    const isPlaying = Boolean(currentTrack && currentlyPlaying?.is_playing);

    if (primaryTrack) {
      return jsonResponse({
        isPlaying,
        title: primaryTrack.title,
        artist: primaryTrack.artist,
        albumImageUrl: primaryTrack.albumImageUrl,
        songUrl: primaryTrack.songUrl,
        album: primaryTrack.album,
        lastPlayed: !isPlaying,
        recentTrack,
        topTrackThisWeek,
      });
    }

    return jsonResponse({
      isPlaying: false,
      topTrackThisWeek,
    });
  } catch (error) {
    console.error('Error in GET route:', error);
    return jsonResponse({ 
      isPlaying: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
