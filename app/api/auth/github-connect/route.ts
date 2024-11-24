import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      // Redirect to GitHub OAuth
      return new NextResponse(null, {
        status: 302,
        headers: {
          'Location': `/api/auth/signin/github?callbackUrl=${encodeURIComponent(process.env.NEXTAUTH_URL || '')}`
        }
      });
    }

    // Return success
    return new NextResponse(null, {
      status: 302,
      headers: {
        'Location': process.env.NEXTAUTH_URL || '/'
      }
    });

  } catch (error) {
    console.error('GitHub connection error:', error);
    return new NextResponse(null, {
      status: 302,
      headers: {
        'Location': '/?error=GitHubConnectionFailed'
      }
    });
  }
}
