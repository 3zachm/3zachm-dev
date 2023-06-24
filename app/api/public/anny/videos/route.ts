import { createRedisInstance } from '@/lib/redis';
import { getVideos } from '@/lib/twitch/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // error if redis is not connected
  const redis = createRedisInstance();
  if (!redis) return new Response('Internal Server Error', { status: 500 });

  const channel = "56418014" // anny
  const data = await getVideos(redis, channel);

  return NextResponse.json({ data: data.data, pagination: data.pagination });
}