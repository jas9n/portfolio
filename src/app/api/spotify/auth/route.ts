import { NextResponse } from 'next/server';

const client_id = '76377f27b4b54be08fbde22f450e13e0';
const redirect_uri = 'https://jas9n.vercel.app/api/spotify/callback';
const scope = 'user-read-currently-playing user-read-playback-state';

export async function GET() {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id,
    scope,
    redirect_uri,
  });

  return NextResponse.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
} 