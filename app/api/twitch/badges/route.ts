import { createRedisInstance } from '@/lib/redis';
import { getChannelBadges, getGlobalBadges } from '@/lib/twitch/api';
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
  const giveMinimal = req.nextUrl.searchParams.get('m') === '1';
  const channelData = channel ? await getChannelBadges(redis, channel) : null;
  const globalData = await getGlobalBadges(redis);

  if (giveMinimal) {
    // merge the data of channel and global badges, prioritize channel badges
    const mergedData = [...channelData.data, ...globalData.data]

    return NextResponse.json({ data: mergedData });
  }

  return NextResponse.json({ channel: channelData, global: globalData });
}