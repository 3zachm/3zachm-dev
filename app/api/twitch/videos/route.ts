import { createRedisInstance } from '@/lib/redis';
import { getVideos } from '@/lib/twitch/api';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET( req: NextRequest ) {
  const token = await getToken({ req, secret: process.env.SECRET });
  // require mod role
  if (!token || !token.isMod) return new Response ('Unauthorized', { status: 403 });

    // error if redis is not connected
    const redis = createRedisInstance();
    if (!redis) return new Response ('Internal Server Error', { status: 500 });

  const channel = req.nextUrl.searchParams.get('c');
  if (!channel) return new Response ('No user specified', { status: 400 });
  const data = await getVideos(redis, channel);

  return NextResponse.json({ data: data.data, pagination: data.pagination });
}