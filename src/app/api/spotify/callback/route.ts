import { NextResponse } from 'next/server';

const client_id = '76377f27b4b54be08fbde22f450e13e0';
const client_secret = '66e19820682d45f49b6b0444b8221005';
const redirect_uri = 'http://127.0.0.1:3000/api/spotify/callback';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Display the refresh token to the user
    return new NextResponse(`
      <html>
        <body>
          <h1>Success!</h1>
          <p>Here is your refresh token (save it somewhere safe):</p>
          <pre>${data.refresh_token}</pre>
          <p>You can now close this window and update your .env file with this token.</p>
        </body>
      </html>
    `, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    return NextResponse.json({ error: 'Failed to exchange code for tokens' }, { status: 500 });
  }
} 