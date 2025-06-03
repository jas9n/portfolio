import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const username = 'jas9n';
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      console.error('GitHub token is not set');
      return NextResponse.json(
        { error: 'GitHub token is not configured' },
        { status: 401 }
      );
    }

    // Fetch events (commits)
    const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public`, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)'
      }
    });

    if (!eventsResponse.ok) {
      throw new Error(`Failed to fetch events: ${eventsResponse.statusText}`);
    }

    const events = await eventsResponse.json();

    // Fetch pinned repos via GraphQL
    const graphqlQuery = {
      query: `{
        user(login: "${username}") {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                }
              }
            }
          }
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }`
    };

    const pinnedResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)'
      },
      body: JSON.stringify(graphqlQuery)
    });

    if (!pinnedResponse.ok) {
      throw new Error(`Failed to fetch pinned repos: ${pinnedResponse.statusText}`);
    }

    const pinnedData = await pinnedResponse.json();

    // Fetch contribution graph HTML
    const contributionResponse = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        'Accept': 'text/html',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)'
      }
    });
    
    if (!contributionResponse.ok) {
      throw new Error(`Failed to fetch contribution graph: ${contributionResponse.statusText}`);
    }
    
    const contributionHtml = await contributionResponse.text();
    
    // Extract the SVG content
    const svgMatch = contributionHtml.match(/<svg[^>]*>[\s\S]*?<\/svg>/);
    
    let contributionSvg = null;
    if (svgMatch && svgMatch[0]) {
      contributionSvg = svgMatch[0]
        .replace(/class="([^"]+)"/g, '')
        .replace(/data-level="([^"]+)"/g, '')
        .replace(/data-count="([^"]+)"/g, '')
        .replace(/data-date="([^"]+)"/g, '')
        .replace(/#9be9a8/g, '#34d399')
        .replace(/#40c463/g, '#059669')
        .replace(/#30a14e/g, '#047857')
        .replace(/#216e39/g, '#065f46')
        .replace(/#ebedf0/g, '#f3f4f6'); // Light gray for empty days
    }

    // Get contribution data from GraphQL response
    const contributionData = pinnedData.data?.user?.contributionsCollection?.contributionCalendar;

    return NextResponse.json({
      commits: events
        .filter((event: any) => event.type === 'PushEvent')
        .flatMap((event: any) => 
          event.payload.commits.map((commit: any) => ({
            sha: commit.sha,
            message: commit.message,
            date: new Date(event.created_at).toLocaleDateString(),
            repo: event.repo.name,
            url: `https://github.com/${event.repo.name}/commit/${commit.sha}`
          }))
        )
        .slice(0, 5),
      pinnedRepos: pinnedData.data?.user?.pinnedItems?.nodes || [],
      contributionSvg,
      contributionData
    });
  } catch (error: any) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch GitHub data' },
      { status: error.status || 500 }
    );
  }
} 