import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_uri = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}/api/spotify/callback`
  : 'http://localhost:3000/api/spotify/callback';
const scope = 'user-read-currently-playing user-read-playback-state user-read-recently-played';

export async function GET() {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: client_id!,
    scope,
    redirect_uri,
  });

  return NextResponse.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
} 